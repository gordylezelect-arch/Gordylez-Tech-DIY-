import crypto from 'node:crypto';
import { readDb, writeDb, Session } from './db';

/**
 * Securely hashes a password using scrypt with a unique cryptographically random salt.
 */
export function hashPassword(password: string): { hash: string; salt: string } {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return { hash, salt };
}

/**
 * Verifies a plaintext password against stored scrypt hash and salt using constant-time comparison.
 */
export function verifyPassword(password: string, storedHash: string, salt: string): boolean {
  try {
    const testHash = crypto.scryptSync(password, salt, 64).toString('hex');
    const bufA = Buffer.from(testHash, 'hex');
    const bufB = Buffer.from(storedHash, 'hex');
    if (bufA.length !== bufB.length) return false;
    return crypto.timingSafeEqual(bufA, bufB);
  } catch (err) {
    console.error('Password verification error:', err);
    return false;
  }
}

/**
 * Creates and persists a secure session token for a visitor or admin.
 */
export function createSession(userId: string, role: 'visitor' | 'admin'): string {
  const token = crypto.randomBytes(32).toString('hex');
  const now = new Date();
  // Visitors get 14 days, admins get 2 days session expiration
  const validityDays = role === 'admin' ? 2 : 14;
  const expiresAt = new Date(now.getTime() + validityDays * 24 * 60 * 60 * 1000).toISOString();

  const db = readDb();
  db.sessions.push({
    token,
    userId,
    role,
    createdAt: now.toISOString(),
    expiresAt
  });
  writeDb(db);

  return token;
}

/**
 * Validates a session token and returns the session if valid and unexpired.
 */
export function verifySession(token: string): Session | null {
  if (!token) return null;
  const db = readDb();
  const session = db.sessions.find(s => s.token === token);
  if (!session) return null;

  const now = new Date().toISOString();
  if (session.expiresAt <= now) {
    // Expired session, remove it
    db.sessions = db.sessions.filter(s => s.token !== token);
    writeDb(db);
    return null;
  }

  return session;
}

/**
 * Removes a session token (logout).
 */
export function destroySession(token: string): void {
  if (!token) return;
  const db = readDb();
  db.sessions = db.sessions.filter(s => s.token !== token);
  writeDb(db);
}
