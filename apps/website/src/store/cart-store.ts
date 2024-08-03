import { persistentMap } from '@nanostores/persistent';

export type CartItem = {
  id: number;
  name: string;
  image: {
    url: string;
    width: number;
    height: number;
  };
  price: number;
  quantity: number;
}

export const cartItems = persistentMap<Record<number, CartItem | undefined>>('cart', {}, {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export function addItemToCart(item: CartItem) {
  const itemAlreadyInCart = cartItems.get()[item.id];

  if (itemAlreadyInCart) {
    cartItems.setKey(item.id, {
      ...itemAlreadyInCart,
      quantity: itemAlreadyInCart.quantity + item.quantity,
    });
    return;
  }

  cartItems.setKey(item.id, {
    ...item,
    quantity: item.quantity,
  });
}

export function modifyItemQuantity(input: { id: number; newQuantity: number }) {
  const itemAlreadyInCart = cartItems.get()[input.id];

  if (itemAlreadyInCart) {
    cartItems.setKey(input.id, {
      ...itemAlreadyInCart,
      quantity: input.newQuantity,
    });
  }
}

export function removeFromCart(id: number) {
  cartItems.setKey(id, undefined);
}