import type { StrapiMedia } from './strapi-media';

type ProductBase = {
  id: number;
  attributes: {
    Nome: string;
    Descricao: string;
    Preco: number;
    slug: string;
    Foto: {
      data: {
        attributes: StrapiMedia
      }
    };
    categoria: {
      data: {
        id: number;
        attributes: {
          Nome: string;
        }
      }
    };
    Frete: {
      Altura_cm: number;
      Largura_cm: number;
      Comprimento_cm: number;
      Peso_kg: number;
    }
  }
}

export type Product<T extends keyof ProductBase['attributes'] = keyof ProductBase['attributes']> = Omit<ProductBase, 'attributes'> & {
  attributes: Pick<ProductBase['attributes'], T>
};