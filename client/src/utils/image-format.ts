function isImage(link: string): boolean {
  return /\.(jpg|jpeg|png|gif|bmp|webp|svg|jfif|tiff?|ico|heic|heif|avif)$/i.test(link);
}

export { isImage };
