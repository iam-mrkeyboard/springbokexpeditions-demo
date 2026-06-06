import { CLOUDINARY_CLOUD_NAME } from './constants';
const cloud = CLOUDINARY_CLOUD_NAME;
const base = cloud ? `https://res.cloudinary.com/${cloud}` : '';

export const isCloudinaryConfigured = Boolean(cloud);

export const cloudinaryVideoUrl = (publicId: string): string => {
  if (!cloud) return '';
  return `${base}/video/upload/q_auto,f_auto/${publicId}.mp4`;
};

export const cloudinaryImageUrl = (publicId: string): string => {
  if (!cloud) return '';
  return `${base}/image/upload/q_auto,f_auto/${publicId}.jpg`;
};
