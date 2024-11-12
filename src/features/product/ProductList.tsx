import ShinyButton from '@/components/ShinyButton'
import SkeletonLoader from '@/components/SkeletonLoader'
import { Product } from '@/interfaces/common'
import ProductCard from './ProductCard'

interface ProductListProps {
  products: Product[]
  onLoadMore: () => void
  itemsPerPage: number
  loading: boolean
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  onLoadMore,
  itemsPerPage,
  loading,
}) => {
  return (
    <div>
      {loading ? (
        <SkeletonLoader />
      ) : (
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
      )}

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
