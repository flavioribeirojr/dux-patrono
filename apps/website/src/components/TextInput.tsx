import type { HTMLProps } from 'react';

export function TextInput(props: HTMLProps<HTMLInputElement>) {
  return (
    <input
      {...props}
      type='text'
      className={`
        border-2 border-gray-300 w-full h-9
        outline-none px-2 text-sm text-tiny-black
        focus:border-tiny-black peer
      `}
    />
  );
}