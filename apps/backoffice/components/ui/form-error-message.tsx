import { ReactNode } from 'react';

export function FormErrorMessage(props: {
  className?: string;
  children: ReactNode
}) {
  return (
    <p className={`${props.className} text-red-400 text-sm`}>
      { props.children }
    </p>
  );
}