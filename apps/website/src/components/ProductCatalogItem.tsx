import type { Product } from '@/interfaces/product';
import { moneyFormatter } from '@/utils/money-formatter';
import { useEffect, useRef } from 'react';
import { CartQuantityUpdater } from './CartQuantityUpdater';
import { AddToCartButton } from './AddToCartButton';

export function ProductCatalogItem(props: {
  product: Product<'Nome' | 'slug' | 'Descricao' | 'Foto' | 'Preco'>;
  image?: React.ReactNode;
}) {
  const { product } = props;
  const quantityInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (quantityInputRef.current) {
      quantityInputRef.current.value = '1';
    }
  }, []);

  return (
    <div className='w-full flex flex-col lg:grid lg:grid-cols-5 lg:gap-5 border-b border-b-gray-200 pb-5 last:border-b-0'>
      <div className='relative mr-4 w-full lg:w-full lg:col-start-1 lg:col-end-3'>
        { props.image }
      </div>
      <div className='w-fit block lg:col-start-3 lg:col-end-6'>
        <a href={`/${product.attributes.slug}`} className='block self-start uppercase text-base font-serif font-medium mb-3 hover:underline underline-offset-2 text-tiny-black'>
          { product.attributes.Nome }
        </a>
        <p className='text-tiny-black text-base font-light leading-7 self-start mb-4 font-sans'>
          { product.attributes.Descricao }
        </p>
        <p className='font-serif font-light text-black text-sm mb-5'>
          { moneyFormatter.format(product.attributes.Preco) }
        </p>
        <div className='flex flex-row items-center gap-3'>
          <CartQuantityUpdater
            ref={quantityInputRef}
          />
          <AddToCartButton
            product={product}
            quantityInputRef={quantityInputRef}
          />
        </div>
      </div>
    </div>
  );
}