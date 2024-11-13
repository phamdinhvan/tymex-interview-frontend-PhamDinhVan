import { Skeleton } from 'antd'

const SkeletonLoader = () => {
  return (
    <div className='m-2 size-full rounded-lg bg-[#3A384199] p-4'>
      <Skeleton.Node active className='min-h-[235px] min-w-[280px]' />
      <div className='flex items-center justify-between px-1 py-4'>
        <Skeleton.Input active />
        <div className='flex items-center'>
          <Skeleton.Input active className='!w-12 !min-w-10' />
        </div>
      </div>
      <div className='flex items-center gap-2'>
        <Skeleton.Avatar active />
        <Skeleton.Input active />
      </div>
    </div>
  )
}

const SkeletonLoaderList = () => {
  return (
    <div data-testid='skeleton-loader-list'>
      <div className='mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonLoader key={i} />
        ))}
      </div>
    </div>
  )
}

export default SkeletonLoaderList
