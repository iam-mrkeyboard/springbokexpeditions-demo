import type { ExternalImageService } from 'astro';

const service: ExternalImageService = {
  validateOptions(options) {
    return options;
  },
  getURL(options) {
    // Return original remote source immediately to bypass fetching/optimizing during build
    return typeof options.src === 'string' ? options.src : options.src.src;
  },
  getHTMLAttributes(options) {
    const { src, width, height, format, quality, ...attributes } = options;
    return {
      ...attributes,
      src: typeof src === 'string' ? src : src.src,
      width: width,
      height: height,
    };
  }
};

export default service;
