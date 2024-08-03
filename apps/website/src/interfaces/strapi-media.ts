export type StrapiMedia = {
  name: string;
  width: number;
  height: number;
  formats: {
    large: StrapiMediaImageSize;
    small: StrapiMediaImageSize;
    medium: StrapiMediaImageSize;
    thumbnail: StrapiMediaImageSize;
  }
}

type StrapiMediaImageSize = {
  url: string;
  width: number;
  height: number;
}