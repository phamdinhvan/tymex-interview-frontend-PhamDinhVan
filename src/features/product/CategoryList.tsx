import { Category } from '@/interfaces/common'
import { cn } from '@/utils/cn'

interface CategoryListProps {
  categories: Category[]
  activeCategory: string | null
  onCategoryClick: (categoryName?: string) => void
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  activeCategory,
  onCategoryClick,
}) => {
  return (
    <div className='mb-4 flex flex-wrap gap-2'>
      <button
        onClick={() => onCategoryClick(null)}
        className={cn(
          'hover:btn-shiny rounded-md px-4 py-2 text-white hover:bg-pink-500',
          activeCategory === null
            ? 'bg-gradient-to-r from-[#DA458F] to-[#DA34DD]'
            : 'bg-gradient-to-r from-[rgba(218,69,143,0.4)] to-[rgba(218,52,221,0.4)]',
        )}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryClick(category.name)}
          className={cn(
            'hover:btn-shiny rounded-md px-4 py-2 text-white hover:bg-pink-700',
            activeCategory === category.name
              ? 'bg-gradient-to-r from-[#DA458F] to-[#DA34DD]'
              : 'bg-gradient-to-r from-[rgba(218,69,143,0.4)] to-[rgba(218,52,221,0.4)]',
          )}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}

export default CategoryList
