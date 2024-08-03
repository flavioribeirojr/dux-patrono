export function FieldWrapper(props: {
  label: string;
  children: React.ReactNode
  className?: string;
}) {
  return (
    <div className={`flex flex-col-reverse ${props.className}`}>
      { props.children }
      <label className={`
      peer-focus:text-tiny-black
        block text-xs font-serif text-small-gray mb-1
      `}>
        { props.label }
      </label>
    </div>
  );
}