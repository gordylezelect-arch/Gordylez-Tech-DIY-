import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'node:fs';
import crypto from 'node:crypto';
import { createServer as createViteServer } from 'vite';
import { readDb, writeDb, Inquiry, VisitorUser, AdminUser, GalleryPhoto, SitePhotoSlots } from './server/db';
import { hashPassword, verifyPassword, createSession, verifySession, destroySession } from './server/auth';

interface AuthRequest extends Request {
  userId?: string;
  userRole?: 'visitor' | 'admin';
}

function extractBearerToken(req: Request): string | null {
  const header = req.headers.authorization;
  if (!header) return null;
  const parts = header.split(' ');
  if (parts.length === 2 && parts[0].toLowerCase() === 'bearer') {
    return parts[1];
  }
  return null;
}

// Middleware: Requires any authenticated user (visitor or admin)
function requireAuth(req: AuthRequest, res: Response, next: NextFunction): void {
  const token = extractBearerToken(req);
  if (!token) {
    res.status(401).json({ error: 'Authentication required. Please log in.' });
    return;
  }
  const session = verifySession(token);
  if (!session) {
    res.status(401).json({ error: 'Session invalid or expired. Please log in again.' });
    return;
  }
  req.userId = session.userId;
  req.userRole = session.role;
  next();
}

// Middleware: Strictly requires Admin authentication and role
function requireAdmin(req: AuthRequest, res: Response, next: NextFunction): void {
  const token = extractBearerToken(req);
  if (!token) {
    res.status(401).json({ error: 'Admin authentication required.' });
    return;
  }
  const session = verifySession(token);
  if (!session || session.role !== 'admin') {
    res.status(403).json({ error: 'Access denied. Administrator privileges required.' });
    return;
  }
  req.userId = session.userId;
  req.userRole = 'admin';
  next();
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON and URL-encoded Body parsing (supports high-res photo uploads)
  app.use(express.json({ limit: '35mb' }));
  app.use(express.urlencoded({ limit: '35mb', extended: true }));

  // Serve static user uploads directly
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  app.use('/uploads', express.static(uploadsDir));

  // ----------------------------------------------------
  // Health Check
  // ----------------------------------------------------
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // ----------------------------------------------------
  // VISITOR AUTHENTICATION ROUTES
  // ----------------------------------------------------

  // Register new visitor
  app.post('/api/auth/visitor/signup', (req, res) => {
    try {
      const { email, password, name } = req.body;
      if (!email || !password || !name) {
        res.status(400).json({ error: 'Name, email, and password are required.' });
        return;
      }
      const trimmedEmail = String(email).trim().toLowerCase();
      const trimmedName = String(name).trim();

      if (trimmedName.length < 2) {
        res.status(400).json({ error: 'Please enter a valid name (at least 2 characters).' });
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
        res.status(400).json({ error: 'Please enter a valid email address.' });
        return;
      }
      if (String(password).length < 6) {
        res.status(400).json({ error: 'Password must be at least 6 characters long.' });
        return;
      }

      const db = readDb();
      const existing = db.visitors.find(v => v.email.toLowerCase() === trimmedEmail);
      if (existing) {
        res.status(409).json({ error: 'An account with this email already exists. Please log in.' });
        return;
      }

      const { hash, salt } = hashPassword(String(password));
      const newVisitor: VisitorUser = {
        id: 'vis-' + crypto.randomBytes(8).toString('hex'),
        email: trimmedEmail,
        name: trimmedName,
        passwordHash: hash,
        salt,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };

      db.visitors.push(newVisitor);
      writeDb(db);

      const token = createSession(newVisitor.id, 'visitor');

      res.status(201).json({
        success: true,
        token,
        user: {
          id: newVisitor.id,
          email: newVisitor.email,
          name: newVisitor.name,
          role: 'visitor',
          createdAt: newVisitor.createdAt
        }
      });
    } catch (err) {
      console.error('Error during visitor signup:', err);
      res.status(500).json({ error: 'Failed to create visitor account. Please try again.' });
    }
  });

  // Visitor Login
  app.post('/api/auth/visitor/login', (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ error: 'Email and password are required.' });
        return;
      }
      const trimmedEmail = String(email).trim().toLowerCase();

      const db = readDb();
      const visitor = db.visitors.find(v => v.email.toLowerCase() === trimmedEmail);
      if (!visitor) {
        res.status(401).json({ error: 'Invalid email or password.' });
        return;
      }

      const isValid = verifyPassword(String(password), visitor.passwordHash, visitor.salt);
      if (!isValid) {
        res.status(401).json({ error: 'Invalid email or password.' });
        return;
      }

      visitor.lastLogin = new Date().toISOString();
      writeDb(db);

      const token = createSession(visitor.id, 'visitor');

      res.json({
        success: true,
        token,
        user: {
          id: visitor.id,
          email: visitor.email,
          name: visitor.name,
          role: 'visitor',
          createdAt: visitor.createdAt
        }
      });
    } catch (err) {
      console.error('Error during visitor login:', err);
      res.status(500).json({ error: 'Login failed. Please try again.' });
    }
  });

  // Verify current visitor session
  app.get('/api/auth/visitor/me', requireAuth, (req: AuthRequest, res) => {
    const db = readDb();
    const visitor = db.visitors.find(v => v.id === req.userId);
    if (!visitor) {
      // Could be admin viewing
      if (req.userRole === 'admin') {
        const admin = db.admins.find(a => a.id === req.userId);
        if (admin) {
          res.json({
            user: {
              id: admin.id,
              email: admin.email,
              name: admin.username,
              role: 'admin'
            }
          });
          return;
        }
      }
      res.status(404).json({ error: 'User not found.' });
      return;
    }
    res.json({
      user: {
        id: visitor.id,
        email: visitor.email,
        name: visitor.name,
        role: 'visitor',
        createdAt: visitor.createdAt
      }
    });
  });

  // Visitor Logout
  app.post('/api/auth/visitor/logout', (req, res) => {
    const token = extractBearerToken(req);
    if (token) {
      destroySession(token);
    }
    res.json({ success: true });
  });

  // ----------------------------------------------------
  // ADMIN AUTHENTICATION & SETUP ROUTES
  // ----------------------------------------------------

  // Check if an admin account already exists
  app.get('/api/auth/admin/status', (_req, res) => {
    const db = readDb();
    res.json({
      hasAdmin: db.admins.length > 0
    });
  });

  // Initial Admin Setup (Locked permanently once an admin exists)
  app.post('/api/auth/admin/setup', (req, res) => {
    try {
      const db = readDb();
      if (db.admins.length > 0) {
        res.status(403).json({
          error: 'Administrator account has already been configured. Initial setup is locked.'
        });
        return;
      }

      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        res.status(400).json({ error: 'Username, email, and password are required.' });
        return;
      }

      const trimmedUsername = String(username).trim();
      const trimmedEmail = String(email).trim().toLowerCase();

      if (trimmedUsername.length < 3) {
        res.status(400).json({ error: 'Admin username must be at least 3 characters long.' });
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
        res.status(400).json({ error: 'Please enter a valid administrator email.' });
        return;
      }
      if (String(password).length < 8) {
        res.status(400).json({ error: 'Admin password must be at least 8 characters long for security.' });
        return;
      }

      const { hash, salt } = hashPassword(String(password));
      const admin: AdminUser = {
        id: 'adm-' + crypto.randomBytes(8).toString('hex'),
        username: trimmedUsername,
        email: trimmedEmail,
        passwordHash: hash,
        salt,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };

      db.admins.push(admin);
      writeDb(db);

      const token = createSession(admin.id, 'admin');

      res.status(201).json({
        success: true,
        message: 'Administrator account created successfully.',
        token,
        user: {
          id: admin.id,
          username: admin.username,
          email: admin.email,
          role: 'admin'
        }
      });
    } catch (err) {
      console.error('Error during admin setup:', err);
      res.status(500).json({ error: 'Failed to configure administrator account.' });
    }
  });

  // Admin Login
  app.post('/api/auth/admin/login', (req, res) => {
    try {
      const { identifier, password } = req.body;
      if (!identifier || !password) {
        res.status(400).json({ error: 'Username/email and password are required.' });
        return;
      }

      const cleanId = String(identifier).trim().toLowerCase();
      const db = readDb();
      const admin = db.admins.find(
        a => a.username.toLowerCase() === cleanId || a.email.toLowerCase() === cleanId
      );

      if (!admin) {
        res.status(401).json({ error: 'Invalid administrator credentials.' });
        return;
      }

      const isValid = verifyPassword(String(password), admin.passwordHash, admin.salt);
      if (!isValid) {
        res.status(401).json({ error: 'Invalid administrator credentials.' });
        return;
      }

      admin.lastLogin = new Date().toISOString();
      writeDb(db);

      const token = createSession(admin.id, 'admin');

      res.json({
        success: true,
        token,
        user: {
          id: admin.id,
          username: admin.username,
          email: admin.email,
          role: 'admin'
        }
      });
    } catch (err) {
      console.error('Error during admin login:', err);
      res.status(500).json({ error: 'Administrator login failed.' });
    }
  });

  // Verify current admin session
  app.get('/api/auth/admin/me', requireAdmin, (req: AuthRequest, res) => {
    const db = readDb();
    const admin = db.admins.find(a => a.id === req.userId);
    if (!admin) {
      res.status(404).json({ error: 'Administrator account not found.' });
      return;
    }
    res.json({
      user: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: 'admin',
        createdAt: admin.createdAt,
        lastLogin: admin.lastLogin
      }
    });
  });

  // Admin Logout
  app.post('/api/auth/admin/logout', (req, res) => {
    const token = extractBearerToken(req);
    if (token) {
      destroySession(token);
    }
    res.json({ success: true });
  });

  // ----------------------------------------------------
  // PROTECTED ADMIN DATA ROUTES
  // ----------------------------------------------------

  // Admin Stats
  app.get('/api/admin/stats', requireAdmin, (_req, res) => {
    const db = readDb();
    const newInquiries = db.inquiries.filter(i => i.status === 'new').length;
    res.json({
      totalInquiries: db.inquiries.length,
      newInquiries,
      totalVisitors: db.visitors.length,
      activeSessions: db.sessions.length,
      systemStatus: 'Operational',
      workshopLocation: 'Abiriba, Abia State, Nigeria'
    });
  });

  // Get Inquiries list
  app.get('/api/admin/inquiries', requireAdmin, (_req, res) => {
    const db = readDb();
    const sorted = [...db.inquiries].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    res.json({ inquiries: sorted });
  });

  // Update Inquiry Status
  app.patch('/api/admin/inquiries/:id', requireAdmin, (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    if (!['new', 'in-progress', 'completed'].includes(status)) {
      res.status(400).json({ error: 'Invalid status value.' });
      return;
    }

    const db = readDb();
    const inquiry = db.inquiries.find(i => i.id === id);
    if (!inquiry) {
      res.status(404).json({ error: 'Inquiry not found.' });
      return;
    }

    inquiry.status = status;
    writeDb(db);
    res.json({ success: true, inquiry });
  });

  // Delete Inquiry
  app.delete('/api/admin/inquiries/:id', requireAdmin, (req, res) => {
    const { id } = req.params;
    const db = readDb();
    const initialLen = db.inquiries.length;
    db.inquiries = db.inquiries.filter(i => i.id !== id);
    if (db.inquiries.length === initialLen) {
      res.status(404).json({ error: 'Inquiry not found.' });
      return;
    }
    writeDb(db);
    res.json({ success: true, message: 'Inquiry deleted.' });
  });

  // Get Registered Visitors
  app.get('/api/admin/visitors', requireAdmin, (_req, res) => {
    const db = readDb();
    const safeVisitors = db.visitors.map(v => ({
      id: v.id,
      email: v.email,
      name: v.name,
      createdAt: v.createdAt,
      lastLogin: v.lastLogin
    })).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    res.json({ visitors: safeVisitors });
  });

  // Delete Visitor Account
  app.delete('/api/admin/visitors/:id', requireAdmin, (req, res) => {
    const { id } = req.params;
    const db = readDb();
    const initialLen = db.visitors.length;
    db.visitors = db.visitors.filter(v => v.id !== id);
    if (db.visitors.length === initialLen) {
      res.status(404).json({ error: 'Visitor not found.' });
      return;
    }
    // Also remove their sessions
    db.sessions = db.sessions.filter(s => s.userId !== id);
    writeDb(db);
    res.json({ success: true, message: 'Visitor account deleted.' });
  });

  // Change Admin Credentials
  app.post('/api/admin/change-credentials', requireAdmin, (req: AuthRequest, res) => {
    try {
      const { currentPassword, newUsername, newEmail, newPassword } = req.body;
      if (!currentPassword) {
        res.status(400).json({ error: 'Current password is required to make changes.' });
        return;
      }

      const db = readDb();
      const admin = db.admins.find(a => a.id === req.userId);
      if (!admin) {
        res.status(404).json({ error: 'Admin account not found.' });
        return;
      }

      const isCurrentValid = verifyPassword(String(currentPassword), admin.passwordHash, admin.salt);
      if (!isCurrentValid) {
        res.status(401).json({ error: 'Current password verification failed.' });
        return;
      }

      if (newUsername && String(newUsername).trim().length >= 3) {
        admin.username = String(newUsername).trim();
      }
      if (newEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(newEmail).trim())) {
        admin.email = String(newEmail).trim().toLowerCase();
      }
      if (newPassword) {
        if (String(newPassword).length < 8) {
          res.status(400).json({ error: 'New password must be at least 8 characters long.' });
          return;
        }
        const { hash, salt } = hashPassword(String(newPassword));
        admin.passwordHash = hash;
        admin.salt = salt;
      }

      writeDb(db);

      res.json({
        success: true,
        message: 'Administrator credentials updated successfully.',
        user: {
          id: admin.id,
          username: admin.username,
          email: admin.email,
          role: 'admin'
        }
      });
    } catch (err) {
      console.error('Error changing admin credentials:', err);
      res.status(500).json({ error: 'Failed to update credentials.' });
    }
  });

  // ----------------------------------------------------
  // PUBLIC/VISITOR INQUIRY SUBMISSION
  // ----------------------------------------------------
  app.post('/api/inquiries', (req, res) => {
    try {
      const { name, email, phone, projectCategory, systemVoltage, estimatedBudget, message } = req.body;
      if (!name || !email || !message) {
        res.status(400).json({ error: 'Name, email, and message are required.' });
        return;
      }

      const newInquiry: Inquiry = {
        id: 'inq-' + crypto.randomBytes(6).toString('hex'),
        name: String(name).trim(),
        email: String(email).trim().toLowerCase(),
        phone: phone ? String(phone).trim() : undefined,
        projectCategory: String(projectCategory || 'general'),
        systemVoltage: systemVoltage ? String(systemVoltage).trim() : undefined,
        estimatedBudget: estimatedBudget ? String(estimatedBudget).trim() : undefined,
        message: String(message).trim(),
        status: 'new',
        createdAt: new Date().toISOString()
      };

      const db = readDb();
      db.inquiries.push(newInquiry);
      writeDb(db);

      res.status(201).json({
        success: true,
        message: 'Inquiry received by Gordylez Tech DIY workshop.',
        inquiryId: newInquiry.id
      });
    } catch (err) {
      console.error('Error saving inquiry:', err);
      res.status(500).json({ error: 'Failed to submit inquiry. Please try again.' });
    }
  });

  // ----------------------------------------------------
  // PHOTO GALLERY & SITE PHOTO PLACEMENTS
  // ----------------------------------------------------

  // Public: Get all gallery photos and active slot assignments
  app.get('/api/gallery', (_req, res) => {
    try {
      const db = readDb();
      res.json({
        photos: db.gallery || [],
        siteSlots: db.siteSlots || {}
      });
    } catch (err) {
      console.error('Error fetching gallery:', err);
      res.status(500).json({ error: 'Failed to fetch gallery photos.' });
    }
  });

  // Admin: Upload a personal photo file (base64)
  app.post('/api/admin/gallery/upload', requireAdmin, (req: AuthRequest, res: Response) => {
    try {
      const { dataUrl, fileName, title, caption, category, slot } = req.body;
      if (!dataUrl || typeof dataUrl !== 'string') {
        res.status(400).json({ error: 'Valid image dataUrl is required.' });
        return;
      }

      // Match data URL pattern: data:image/(png|jpeg|jpg|webp);base64,...
      const match = dataUrl.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
      if (!match) {
        res.status(400).json({ error: 'Invalid image format. Must be a valid JPEG, PNG, or WebP image.' });
        return;
      }

      let ext = match[1].toLowerCase();
      if (ext === 'jpeg') ext = 'jpg';
      const base64Data = match[2];
      const buffer = Buffer.from(base64Data, 'base64');

      const safeSuffix = crypto.randomBytes(4).toString('hex');
      const filename = `gordylez-${Date.now()}-${safeSuffix}.${ext}`;
      const filePath = path.join(process.cwd(), 'public', 'uploads', filename);

      fs.writeFileSync(filePath, buffer);

      const db = readDb();
      const newPhoto: GalleryPhoto = {
        id: 'photo-' + crypto.randomBytes(6).toString('hex'),
        url: `/uploads/${filename}`,
        title: title ? String(title).trim() : 'Gordylez Tech DIY',
        caption: caption ? String(caption).trim() : 'Gordylez Tech DIY — Solar & Electrical DIY Projects',
        category: category || 'workshop',
        slot: slot || 'gallery',
        dateAdded: new Date().toISOString(),
        isPersonalPhoto: true,
        altText: title || 'Gordylez Tech DIY personal photo'
      };

      if (!db.gallery) db.gallery = [];
      db.gallery.unshift(newPhoto);

      if (!db.siteSlots) db.siteSlots = {};
      if (slot && ['hero', 'about', 'projects', 'youtube', 'contact'].includes(slot)) {
        db.siteSlots[slot as keyof SitePhotoSlots] = newPhoto.id;
      }

      writeDb(db);

      res.status(201).json({
        success: true,
        message: 'Personal photo uploaded and added to Gordylez Tech DIY collection.',
        photo: newPhoto,
        siteSlots: db.siteSlots
      });
    } catch (err) {
      console.error('Error uploading photo:', err);
      res.status(500).json({ error: 'Failed to process photo upload.' });
    }
  });

  // Admin: Add a new photo via URL
  app.post('/api/admin/gallery', requireAdmin, (req: AuthRequest, res: Response) => {
    try {
      const { url, title, caption, category, slot, isPersonalPhoto, altText } = req.body;
      if (!url || typeof url !== 'string' || !url.trim()) {
        res.status(400).json({ error: 'Image URL is required.' });
        return;
      }

      const db = readDb();
      const newPhoto: GalleryPhoto = {
        id: 'photo-' + crypto.randomBytes(6).toString('hex'),
        url: String(url).trim(),
        title: title ? String(title).trim() : 'Gordylez Tech DIY',
        caption: caption ? String(caption).trim() : 'Gordylez Tech DIY — Solar & Electrical DIY Projects',
        category: category || 'workshop',
        slot: slot || 'gallery',
        dateAdded: new Date().toISOString(),
        isPersonalPhoto: isPersonalPhoto ?? true,
        altText: altText || title || 'Gordylez Tech DIY'
      };

      if (!db.gallery) db.gallery = [];
      db.gallery.unshift(newPhoto);

      if (!db.siteSlots) db.siteSlots = {};
      if (slot && ['hero', 'about', 'projects', 'youtube', 'contact'].includes(slot)) {
        db.siteSlots[slot as keyof SitePhotoSlots] = newPhoto.id;
      }

      writeDb(db);

      res.status(201).json({
        success: true,
        photo: newPhoto,
        siteSlots: db.siteSlots
      });
    } catch (err) {
      console.error('Error adding photo:', err);
      res.status(500).json({ error: 'Failed to add photo.' });
    }
  });

  // Admin: Update an existing photo
  app.put('/api/admin/gallery/:id', requireAdmin, (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const { title, caption, category, slot, altText, isPersonalPhoto, url } = req.body;

      const db = readDb();
      const photo = (db.gallery || []).find(p => p.id === id);
      if (!photo) {
        res.status(404).json({ error: 'Photo not found.' });
        return;
      }

      if (title !== undefined) photo.title = String(title).trim();
      if (caption !== undefined) photo.caption = String(caption).trim();
      if (category !== undefined) photo.category = category;
      if (altText !== undefined) photo.altText = String(altText).trim();
      if (isPersonalPhoto !== undefined) photo.isPersonalPhoto = Boolean(isPersonalPhoto);
      if (url !== undefined && String(url).trim()) photo.url = String(url).trim();

      if (slot !== undefined) {
        photo.slot = slot;
        if (!db.siteSlots) db.siteSlots = {};
        if (['hero', 'about', 'projects', 'youtube', 'contact'].includes(slot)) {
          db.siteSlots[slot as keyof SitePhotoSlots] = photo.id;
        }
      }

      writeDb(db);

      res.json({
        success: true,
        photo,
        siteSlots: db.siteSlots
      });
    } catch (err) {
      console.error('Error updating photo:', err);
      res.status(500).json({ error: 'Failed to update photo.' });
    }
  });

  // Admin: Delete a photo
  app.delete('/api/admin/gallery/:id', requireAdmin, (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const db = readDb();
      const photoIndex = (db.gallery || []).findIndex(p => p.id === id);
      if (photoIndex === -1) {
        res.status(404).json({ error: 'Photo not found.' });
        return;
      }

      const [removed] = db.gallery.splice(photoIndex, 1);

      // Clean up file if it's local in /uploads/
      if (removed && removed.url.startsWith('/uploads/')) {
        const localPath = path.join(process.cwd(), 'public', removed.url);
        if (fs.existsSync(localPath)) {
          try {
            fs.unlinkSync(localPath);
          } catch (e) {
            console.error('Error deleting local image file:', e);
          }
        }
      }

      // If any slot pointed to this photo, reset it to another available photo or null
      if (db.siteSlots) {
        for (const [slotKey, photoId] of Object.entries(db.siteSlots)) {
          if (photoId === id) {
            const fallback = db.gallery.find(p => p.slot === slotKey) || db.gallery[0];
            db.siteSlots[slotKey as keyof SitePhotoSlots] = fallback ? fallback.id : undefined;
          }
        }
      }

      writeDb(db);

      res.json({
        success: true,
        message: 'Photo deleted successfully.',
        siteSlots: db.siteSlots
      });
    } catch (err) {
      console.error('Error deleting photo:', err);
      res.status(500).json({ error: 'Failed to delete photo.' });
    }
  });

  // Admin: Update site photo slots mapping
  app.post('/api/admin/slots', requireAdmin, (req: AuthRequest, res: Response) => {
    try {
      const { hero, about, projects, youtube, contact } = req.body;
      const db = readDb();
      if (!db.siteSlots) db.siteSlots = {};

      if (hero !== undefined) db.siteSlots.hero = hero;
      if (about !== undefined) db.siteSlots.about = about;
      if (projects !== undefined) db.siteSlots.projects = projects;
      if (youtube !== undefined) db.siteSlots.youtube = youtube;
      if (contact !== undefined) db.siteSlots.contact = contact;

      writeDb(db);

      res.json({
        success: true,
        message: 'Site photo slots updated successfully.',
        siteSlots: db.siteSlots
      });
    } catch (err) {
      console.error('Error updating site slots:', err);
      res.status(500).json({ error: 'Failed to update site slots.' });
    }
  });

  // ----------------------------------------------------
  // VITE MIDDLEWARE / STATIC ASSETS
  // ----------------------------------------------------
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Gordylez Tech DIY server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
