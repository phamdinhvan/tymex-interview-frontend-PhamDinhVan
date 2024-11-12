import { Product } from '@/interfaces/common'
import ProductCard from './ProductCard'
import ShinyButton from '@/components/ShinyButton'

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
          <ProductCard
            key={i}
            tier={product.tier}
            title={product.title}
            price={product.price}
            isFavorite={product.isFavorite}
            author={product.author}
          />
        ))}
      </div>

      {products.length >= itemsPerPage ? (
        <div className='mt-8 flex justify-center'>
          <ShinyButton
            onClick={onLoadMore}
            className='px-6 py-2 text-base font-semibold'
            title='View More'
          />
        </div>
      ) : null}
    </div>
  )
}

export default ProductList
