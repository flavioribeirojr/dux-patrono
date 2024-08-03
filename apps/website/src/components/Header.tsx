import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

const MIN_SCROLL_Y_OFFSET = 100;

export function Header(props: { pathname: string; className?: string; }) {
  const [ isMenuVisible, setIsMenuVisible ] = useState(false);
  const [ shouldChangeHeaderPosition, setShouldChangeHeaderPosition ] = useState(false);

  function handleScrollChange() {
    const shouldChangeHeaderPosition = window.scrollY > MIN_SCROLL_Y_OFFSET;
    console.log(shouldChangeHeaderPosition);

    if (shouldChangeHeaderPosition) {
      setShouldChangeHeaderPosition(true);
      return;
    }

    setShouldChangeHeaderPosition(false);
  }

  useEffect(() => {
    document.addEventListener('scroll', handleScrollChange);

    return () => {
      document.removeEventListener('scroll', handleScrollChange);
    };
  }, [handleScrollChange, setShouldChangeHeaderPosition]);

  return (
    <header
      className={`
        flex items-center px-8 py-6 top-0 w-full z-10
        ${shouldChangeHeaderPosition ? 'fixed bg-tiny-black h-auto animate-slide-in' : 'absolute'}
        ${props.className}
      `}>
      <a href='/' className='flex items-center'>
        <img
          src='/diamond.png'
          alt='Diamond'
          className='h-8 mr-4'
        />
        <h1 className='font-logo text-white font-medium uppercase text-2xl tracking-wide'>Dux Patrono</h1>
      </a>
      <nav className={`
        font-action text-xs ml-auto transition-all duration-300 origin-top-right ease-in-out
        fixed top-0 right-0 bottom-0
        lg:block lg:static
        ${ isMenuVisible ? 'left-0 bg-tiny-black' : 'left-far' }
      `}>
        <ul className='flex flex-col items-center justify-center h-full lg:items-center lg:flex-row gap-10'>
          <li>
            <HeaderLink pathname={props.pathname} link='/'>
              INÍCIO
            </HeaderLink>
          </li>
          <li>
            <HeaderLink pathname={props.pathname} link='/catalogo'>
              NOSSOS PRODUTOS
            </HeaderLink>
          </li>
          <li>
            <HeaderLink pathname={props.pathname} link='/carrinho'>
              MEU CARRINHO
            </HeaderLink>
          </li>
        </ul>
      </nav>
      <button
        className={`
          absolute top-5 right-5 lg:hidden text-white text-4xl
          ${ isMenuVisible ? 'block' : 'hidden' }
        `}
        onClick={() => {setIsMenuVisible(!isMenuVisible)}}
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <button
        className='text-white ml-auto text-2xl lg:hidden'
        onClick={() => {setIsMenuVisible(!isMenuVisible)}}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
    </header>
  );
}

function HeaderLink(props: {
  link: string;
  pathname: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={props.link}
      className={`
        ${ props.pathname === props.link ? 'underline' : '' }
        text-white tracking-widest underline-offset-8 hover:underline
      `}
    >
      { props.children }
    </a>
  );
}