import type { Category } from '@/interfaces/category';

export function ProductCatalogCategories(props: {
  categories: Category[];
  selectedCategory: string | null;
}) {
  function setFilterForCategory(categoryId: number) {
    const currentURL = new URL(location.toString());
    currentURL.searchParams.set('categoryId', categoryId.toString());

    window.location.assign(currentURL);
  }

  function removeCategoryFilter() {
    const currentURL = new URL(location.toString());
    currentURL.searchParams.delete('categoryId');

    window.location.assign(currentURL);
  }

  return (
    <nav className='flex gap-4 justify-center'>
      <div className='flex items-center'>
        <button
          className={`
            text-base text-small-gray hover:underline underline-offset-2
            ${props.selectedCategory === null ? 'text-tiny-black font-bold' : ''}
          `}
          onClick={() => { removeCategoryFilter() }}
        >
          Todos
        </button>
      </div>
      { props.categories.map(category => (
        <div key={category.id} className='flex items-center'>
          <button
            onClick={() => { setFilterForCategory(category.id) }}
            className={`
              text-base text-small-gray hover:underline underline-offset-2
              ${props.selectedCategory === category.id.toString() ? 'text-tiny-black font-bold' : ''}
            `}
          >
            { category.attributes.Nome }
          </button>
        </div>
      ))}
    </nav>
  );
}