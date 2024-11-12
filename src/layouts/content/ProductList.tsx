import { Product } from '@/layouts/content/index'
import Character from './Character'

interface ProductListProps {
  products: Product[]
  onLoadMore: () => void
  itemsPerPage: number
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  onLoadMore,
  itemsPerPage,
}) => {
  return (
    <div>
      <div className='mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
        {products.map((product, i) => (
          <Character key={i} product={product} />
        ))}
      </div>

      {products.length >= itemsPerPage && (
        <div className='mt-8 flex justify-center'>
          <button
            onClick={onLoadMore}
            className='hover:btn-shiny rounded-md bg-gradient-to-r from-[#DA458F] to-[#DA34DD] px-4 py-2 text-white  hover:bg-pink-500'
          >
            View More
          </button>
        </div>
      )}
    </div>
  )
}

export default ProductList
