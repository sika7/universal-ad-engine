export type BannerResponse = {
  url: string;
  img_src: string;
  alt?: string;
  width: number;
  height: number;
};

export const bannerValidation = {
  url: 'string|url|https',
  img_src: 'string|url|https',
  width: 'number|integer',
  height: 'number|integer',
};
