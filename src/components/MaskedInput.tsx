import { useMask } from '@react-input/mask';
import type { HTMLProps } from 'react';

export function MaskedInput(props: HTMLProps<HTMLInputElement> & {
  mask: string;
  replacement: { [key: string]: RegExp };
}) {
  const { mask, replacement, ...inputProps } = props;
  const ref = useMask({ mask, replacement });

  return (
    <input
      {...inputProps}
      ref={ref}
      type='text'
      className={`
        border-2 border-gray-300 w-full h-9
        outline-none px-2 text-sm text-tiny-black
        focus:border-tiny-black peer
      `}
    />
  );
}