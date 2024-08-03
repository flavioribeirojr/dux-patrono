import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { forwardRef, useImperativeHandle, useRef, } from 'react';

export const CartQuantityUpdater = forwardRef<HTMLInputElement>(function CartQuantityUpdater(_, forwardedRef) {
  const quantityInputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(forwardedRef, () => quantityInputRef.current as HTMLInputElement, []);

  function increaseQuantity(quantityToIncrease: number) {
    if (!quantityInputRef.current) {
      return;
    }

    let quantity = Number(quantityInputRef.current.value);

    if (isNaN(quantity)) {
      quantity = 0;
    }

    const increased = quantity + quantityToIncrease;

    if (increased < 1) {
      quantityInputRef.current.value = '1';
    } else {
      quantityInputRef.current.value = (quantity + quantityToIncrease).toString();
    }

    quantityInputRef.current.dispatchEvent(new Event('change'));
  }

  return (
    <div className='border-2 border-black inline-flex'>
      <input ref={quantityInputRef} type='number' className='w-14 h-8 outline-none text-center' />
      <div className='h-8 w-7 bg-black flex flex-col'>
        <button onClick={() => { increaseQuantity(1) }} className='text-white text-xs text-center'>
          <FontAwesomeIcon icon={faAngleUp} />
        </button>
        <button onClick={() => { increaseQuantity(-1) }} className='text-white text-xs text-center'>
          <FontAwesomeIcon icon={faAngleDown} />
        </button>
      </div>
    </div>
  );
});