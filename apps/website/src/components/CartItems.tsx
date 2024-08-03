import { cartItems, modifyItemQuantity, removeFromCart, type CartItem } from '@/store/cart-store';
import { moneyFormatter } from '@/utils/money-formatter';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useStore } from '@nanostores/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import { CartQuantityUpdater } from './CartQuantityUpdater';

export function CartItems() {
  const $cartItemsStore = useStore(cartItems);
  const [ cartItemsValue, setCartItems ] = useState<CartItem[]>([]);

  useEffect(() => {
    const filtered = Object.values($cartItemsStore) as CartItem[];
    setCartItems(filtered);
  }, [$cartItemsStore, setCartItems]);

  return (
    <table className='w-full mt-5'>
      <thead className='uppercase text-small-gray font-serif font-normal text-xs'>
        <tr className='border-b border-b-gray-200 h-12'>
          <th></th>
          <th className='font-normal text-start w-1/3'>Produto</th>
          <th className='font-normal'>Preço</th>
          <th className='font-normal'>Quantidade</th>
          <th className='font-normal'>Total</th>
        </tr>
      </thead>
      <tbody>
        { cartItemsValue.map(item =>
          <Fragment key={`cart_item_${item?.id}`}>
            {item && <CartItem item={item} /> }
          </Fragment>
        )}
      </tbody>
    </table>
  );
}

function CartItem(props: { item: CartItem }) {
  const { item } = props;
  const quantityRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let listener: (event: Event) => void;

    if (quantityRef.current) {
      quantityRef.current.value = item.quantity.toString();

      listener = event => {
        const inputValue = (event!.target as HTMLInputElement)!.value;

        modifyItemQuantity({
          id: item.id,
          newQuantity: Number(inputValue),
        });
      };

      quantityRef.current.addEventListener('change', listener);
    }

    return () => {
      if (listener) {
        quantityRef.current?.removeEventListener('change', listener);
      }
    };
  }, []);

  return (
    <tr
      className='h-16 text-tiny-black border-b border-b-gray-200'
    >
      <td>
        <button
          onClick={() => { removeFromCart(item.id) }}
          className='px-3 text-xs text-red-400 lg:text-xl'
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </td>
      <td className='text-sm'>
        <div className='flex items-center gap-2'>
          <img
            src={item.image.url}
            alt={item.name}
            width={item.image.width}
            height={item.image.height}
            className='object-cover w-9 h-9'
          />
          <p>
            { item.name }
          </p>
        </div>
      </td>
      <td className='text-sm text-center'>
        { moneyFormatter.format(item.price) }
      </td>
      <td>
        <div className='w-full flex justify-center'>
          <CartQuantityUpdater ref={quantityRef} />
        </div>
      </td>
      <td className='text-sm text-center'>
        { moneyFormatter.format(item.quantity * item.price) }
      </td>
    </tr>
  );
}