import { cartItems, type CartItem } from '@/store/cart-store';
import { moneyFormatter } from '@/utils/money-formatter';
import { useStore } from '@nanostores/react';
import { useEffect, useMemo, useState } from 'react';

export function CheckoutCart() {
  const $cartItemsStore = useStore(cartItems);
  const [ cartItemsValue, setCartItems ] = useState<CartItem[]>([]);
  const subtotal = useMemo(() => {
    return cartItemsValue.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }, [cartItemsValue]);

  useEffect(() => {
    const filtered = Object.values($cartItemsStore) as CartItem[];
    setCartItems(filtered);
  }, [$cartItemsStore, setCartItems]);

  return (
    <table className='w-full mb-3'>
      <thead className='uppercase text-small-gray font-serif-text font-normal text-xs lg:text-sm'>
        <tr className='border-b border-b-gray-200 h-12'>
          <th className='font-normal text-start'>Produto</th>
          <th className='font-normal text-start'>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        { cartItemsValue.map(item => (
          <tr key={item.id} className='h-16 text-tiny-black border-b border-b-gray-200'>
            <td className='text-sm lg:text-base'>
              { item.name } x{item.quantity}
            </td>
            <td className='text-xs lg:text-sm pl-2'>
              { moneyFormatter.format(item.price * item.quantity) }
            </td>
          </tr>
        ))}
        <tr className='h-12 text-tiny-black'>
          <td className='text-xs lg:text-sm text-right'>
            SUBTOTAL
          </td>
          <td className='text-xs lg:text-sm border-b border-b-gray-200 pl-2'>
            { moneyFormatter.format(subtotal) }
          </td>
        </tr>
        <tr className='h-12 text-tiny-black'>
          <td className='text-xs lg:text-sm text-right'>
            FRETE
          </td>
          <td className='text-xs lg:text-sm border-b border-b-gray-200 pl-2'>
            R$ 0,00 (Grátis)
          </td>
        </tr>
        {/* add shipping costs to total */}
        <tr className='h-12 text-tiny-black'>
          <td className='text-xs lg:text-sm text-right'>
            TOTAL
          </td>
          <td className='text-xs lg:text-sm border-b border-b-gray-200 pl-2 font-bold'>
            { moneyFormatter.format(subtotal) }
          </td>
        </tr>
      </tbody>
    </table>
  );
}