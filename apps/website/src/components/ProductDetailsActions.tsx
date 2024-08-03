import { useEffect, useRef } from 'react';
import { CartQuantityUpdater } from './CartQuantityUpdater';
import { AddToCartButton } from './AddToCartButton';
import type { Product } from '@/interfaces/product';

export function ProductDetailsActions(props: {
  product: Product<'Nome' | 'Descricao' | 'Foto' | 'Preco'>;
}) {
  const quantityInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (quantityInputRef.current) {
      quantityInputRef.current.value = '1';
    }
  }, []);

  return (
    <div className='flex flex-row items-center gap-3'>
      <CartQuantityUpdater
        ref={quantityInputRef}
      />
      <AddToCartButton
        product={props.product}
        quantityInputRef={quantityInputRef}
      />
    </div>
  );
}