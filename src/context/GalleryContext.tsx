import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { GalleryPhoto, SitePhotoSlots, PhotoSlotId, GalleryCategory } from '../types';
import { useAuth } from './AuthContext';

interface GalleryContextType {
  photos: GalleryPhoto[];
  siteSlots: SitePhotoSlots;
  loading: boolean;
  refreshGallery: () => Promise<void>;
  getPhotoForSlot: (slot: keyof SitePhotoSlots) => GalleryPhoto | undefined;
  getSlotUrl: (slot: keyof SitePhotoSlots, defaultUrl: string) => string;
  getSlotCaption: (slot: keyof SitePhotoSlots, defaultCaption: string) => string;
  uploadPersonalPhoto: (
    file: File,
    meta?: {
      title?: string;
      caption?: string;
      category?: GalleryCategory;
      slot?: PhotoSlotId;
    }
  ) => Promise<GalleryPhoto>;
  addPhotoByUrl: (data: {
    url: string;
    title?: string;
    caption?: string;
    category?: GalleryCategory;
    slot?: PhotoSlotId;
    isPersonalPhoto?: boolean;
    altText?: string;
  }) => Promise<GalleryPhoto>;
  updatePhoto: (id: string, updates: Partial<GalleryPhoto>) => Promise<void>;
  deletePhoto: (id: string) => Promise<void>;
  assignSlotPhoto: (slot: keyof SitePhotoSlots, photoId: string) => Promise<void>;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export const GalleryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [siteSlots, setSiteSlots] = useState<SitePhotoSlots>({});
  const [loading, setLoading] = useState(true);
  const { adminToken } = useAuth();

  const fetchGallery = useCallback(async () => {
    try {
      const res = await fetch('/api/gallery');
      if (res.ok) {
        const data = await res.json();
        setPhotos(data.photos || []);
        setSiteSlots(data.siteSlots || {});
      }
    } catch (err) {
      console.error('Failed to load gallery photos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  const getPhotoForSlot = useCallback(
    (slot: keyof SitePhotoSlots): GalleryPhoto | undefined => {
      const assignedId = siteSlots[slot];
      if (assignedId) {
        const found = photos.find((p) => p.id === assignedId || p.url === assignedId);
        if (found) return found;
      }
      // Fallback: look for a photo explicitly assigned to this slot
      return photos.find((p) => p.slot === slot);
    },
    [photos, siteSlots]
  );

  const getSlotUrl = useCallback(
    (slot: keyof SitePhotoSlots, defaultUrl: string): string => {
      const photo = getPhotoForSlot(slot);
      return photo?.url || defaultUrl;
    },
    [getPhotoForSlot]
  );

  const getSlotCaption = useCallback(
    (slot: keyof SitePhotoSlots, defaultCaption: string): string => {
      const photo = getPhotoForSlot(slot);
      return photo?.caption || defaultCaption;
    },
    [getPhotoForSlot]
  );

  const uploadPersonalPhoto = async (
    file: File,
    meta?: {
      title?: string;
      caption?: string;
      category?: GalleryCategory;
      slot?: PhotoSlotId;
    }
  ): Promise<GalleryPhoto> => {
    if (!adminToken) {
      throw new Error('Admin authorization required to upload photos.');
    }

    // Convert file to base64 data URL
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });

    const res = await fetch('/api/admin/gallery/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`
      },
      body: JSON.stringify({
        dataUrl,
        fileName: file.name,
        title: meta?.title || file.name.replace(/\.[^/.]+$/, ''),
        caption: meta?.caption || 'Gordylez Tech DIY — Solar & Electrical DIY Projects',
        category: meta?.category || 'workshop',
        slot: meta?.slot || 'gallery'
      })
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ error: 'Upload failed' }));
      throw new Error(errorData.error || 'Failed to upload photo.');
    }

    const data = await res.json();
    setPhotos((prev) => [data.photo, ...prev]);
    if (data.siteSlots) {
      setSiteSlots(data.siteSlots);
    }
    return data.photo;
  };

  const addPhotoByUrl = async (data: {
    url: string;
    title?: string;
    caption?: string;
    category?: GalleryCategory;
    slot?: PhotoSlotId;
    isPersonalPhoto?: boolean;
    altText?: string;
  }): Promise<GalleryPhoto> => {
    if (!adminToken) {
      throw new Error('Admin authorization required.');
    }

    const res = await fetch('/api/admin/gallery', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`
      },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ error: 'Failed to add photo' }));
      throw new Error(errorData.error || 'Failed to add photo.');
    }

    const resData = await res.json();
    setPhotos((prev) => [resData.photo, ...prev]);
    if (resData.siteSlots) {
      setSiteSlots(resData.siteSlots);
    }
    return resData.photo;
  };

  const updatePhoto = async (id: string, updates: Partial<GalleryPhoto>): Promise<void> => {
    if (!adminToken) {
      throw new Error('Admin authorization required.');
    }

    const res = await fetch(`/api/admin/gallery/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`
      },
      body: JSON.stringify(updates)
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ error: 'Failed to update photo' }));
      throw new Error(errorData.error || 'Failed to update photo.');
    }

    const resData = await res.json();
    setPhotos((prev) => prev.map((p) => (p.id === id ? resData.photo : p)));
    if (resData.siteSlots) {
      setSiteSlots(resData.siteSlots);
    }
  };

  const deletePhoto = async (id: string): Promise<void> => {
    if (!adminToken) {
      throw new Error('Admin authorization required.');
    }

    const res = await fetch(`/api/admin/gallery/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${adminToken}`
      }
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ error: 'Failed to delete photo' }));
      throw new Error(errorData.error || 'Failed to delete photo.');
    }

    const resData = await res.json();
    setPhotos((prev) => prev.filter((p) => p.id !== id));
    if (resData.siteSlots) {
      setSiteSlots(resData.siteSlots);
    }
  };

  const assignSlotPhoto = async (slot: keyof SitePhotoSlots, photoId: string): Promise<void> => {
    if (!adminToken) {
      throw new Error('Admin authorization required.');
    }

    const res = await fetch('/api/admin/slots', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`
      },
      body: JSON.stringify({ [slot]: photoId })
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ error: 'Failed to update slot' }));
      throw new Error(errorData.error || 'Failed to update slot.');
    }

    const resData = await res.json();
    setSiteSlots(resData.siteSlots);
  };

  return (
    <GalleryContext.Provider
      value={{
        photos,
        siteSlots,
        loading,
        refreshGallery: fetchGallery,
        getPhotoForSlot,
        getSlotUrl,
        getSlotCaption,
        uploadPersonalPhoto,
        addPhotoByUrl,
        updatePhoto,
        deletePhoto,
        assignSlotPhoto
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};

export const useGallery = (): GalleryContextType => {
  const context = useContext(GalleryContext);
  if (!context) {
    throw new Error('useGallery must be used within a GalleryProvider');
  }
  return context;
};
