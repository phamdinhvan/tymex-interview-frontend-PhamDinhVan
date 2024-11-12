import { Form, Input, Select, Slider, Button, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

interface FilterFormProps {
  onSearch: (values: any) => void
  onReset: () => void
}

const FilterForm: React.FC<FilterFormProps> = ({ onSearch, onReset }) => {
  const [form] = Form.useForm()

  return (
    <Form form={form} onFinish={onSearch} layout='vertical'>
      <Form.Item name='search'>
        <Input
          prefix={<SearchOutlined className='!text-[#89888B]' />}
          placeholder='Quick search'
          className='w-full bg-transparent'
          size='large'
        />
      </Form.Item>
      <Form.Item
        name='priceRange'
        label='PRICE'
        className='!mb-0'
        initialValue={[50, 180]}
      >
        <Slider
          range
          min={0.01}
          max={200}
          step={0.01}
          className='mb-6'
          tooltip={{
            formatter: (value) => `${value} ETH`,
          }}
        />
      </Form.Item>
      <div className='mb-6 flex justify-between text-base text-[#d6d6d6]'>
        <div>0.01 ETH</div>
        <div>200 ETH</div>
      </div>

      <Space direction='vertical' className='w-full gap-4 bg-transparent'>
        <Form.Item name='tier' label='TIER'>
          <Select
            size='large'
            className='w-full bg-transparent'
            options={[
              { value: 'all', label: 'All' },
              { value: 'tier', label: 'tier' },
            ]}
          />
        </Form.Item>

        <Form.Item name='theme' label='THEME'>
          <Select
            size='large'
            className='w-full bg-transparent'
            options={[
              { value: 'all', label: 'All' },
              { value: 'tier', label: 'tier' },
            ]}
          />
        </Form.Item>

        <Form.Item name='time' label='TIME'>
          <Select
            size='large'
            className='w-full bg-transparent'
            options={[
              { value: 'all', label: 'All' },
              { value: 'tier', label: 'tier' },
            ]}
          />
        </Form.Item>

        <Form.Item name='price' label='PRICE'>
          <Select
            size='large'
            className='w-full bg-transparent'
            options={[
              { value: 'desc', label: 'Price: Low to High' },
              { value: 'asc', label: 'Price: High to Low' },
            ]}
          />
        </Form.Item>
      </Space>

      <div className='mt-4 flex gap-8'>
        <Button onClick={onReset} className='btn-shiny'>
          Reset Filter
        </Button>
        <button
          type='submit'
          className='hover:btn-shiny h-[34px] w-[120px] rounded-md bg-gradient-to-r from-[#DA458F] to-[#DA34DD] px-2 py-1 font-semibold text-white hover:bg-pink-500'
        >
          Search
        </button>
      </div>
    </Form>
  )
}

export default FilterForm
