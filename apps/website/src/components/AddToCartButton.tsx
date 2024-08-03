import type { Product } from '@/interfaces/product';
import { renderImageUrl } from '@/lib/strapi';
import { addItemToCart } from '@/store/cart-store';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function AddToCartButton(props: {
  product: Product<'Nome' | 'Descricao' | 'Foto' | 'Preco'>
  quantityInputRef: React.RefObject<HTMLInputElement>;
}) {
  const { product, quantityInputRef } = props;

  function addToCart() {
    if (!quantityInputRef.current) {
      return;
    }

    const quantity = Number(quantityInputRef.current.value);

    if (isNaN(quantity) || quantity < 1) {
      alert('Qualidade inválida');
      return;
    }

    addItemToCart({
      id: product.id,
      name: product.attributes.Nome,
      image: {
        url: renderImageUrl(
          product.attributes.Foto.data.attributes.formats.small.url
        ),
        width: product.attributes.Foto.data.attributes.formats.small.width,
        height: product.attributes.Foto.data.attributes.formats.small.height,
      },
      price: product.attributes.Preco,
      quantity
    });

    window.location.href = '/carrinho';
  }

  return (
    <button
      onClick={() => { addToCart() }}
      className='
        font-serif-text inline-flex items-center border-2 border-black text-tiny-black
      hover:text-white hover:bg-black h-9 px-6 text-sm uppercase transition-colors
      '
    >
      <FontAwesomeIcon icon={faCartPlus} className='mr-1' /> adicionar
    </button>
  );
}