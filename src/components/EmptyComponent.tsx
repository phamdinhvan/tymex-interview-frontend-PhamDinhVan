import { Empty, EmptyProps } from 'antd'
import React from 'react'

interface EmptyComponentProps extends EmptyProps {}

const EmptyComponent: React.FC<EmptyComponentProps> = (props) => {
  return (
    <div className='mt-20 flex h-full min-w-[calc(100vw-84rem)] items-center justify-center'>
      <Empty {...props} />
    </div>
  )
}

export default EmptyComponent
