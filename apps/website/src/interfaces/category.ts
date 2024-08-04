type CategoryBase = {
  id: number;
  attributes: {
    Nome: string;
  }
};

export type Category<T extends keyof CategoryBase['attributes'] = keyof CategoryBase['attributes']> = Omit<CategoryBase, 'attributes'> & {
  attributes: Pick<CategoryBase['attributes'], T>
};