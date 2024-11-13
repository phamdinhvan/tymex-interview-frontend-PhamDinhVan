import { Form, Input, Select, Slider, Button, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import ShinyButton from '@/components/ShinyButton'

interface FilterFormProps {
  onSearch: (values: any) => void
  onReset: () => void
}

const FilterForm: React.FC<FilterFormProps> = ({ onSearch, onReset }) => {
  const [form] = Form.useForm()

  const onResetFilterForm = () => {
    form.resetFields()
    onReset()
  }

  return (
    <Form form={form} onFinish={onSearch} layout='vertical'>
      <Form.Item name='search'>
        <Input
          prefix={<SearchOutlined className='!text-[#89888B]' />}
          placeholder='Quick search'
          className='w-full bg-transparent'
          size='large'
          allowClear
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
          styles={{
            track: {
              background: 'transparent',
            },
            tracks: {
              background:
                ' linear-gradient(91.47deg, #DA458F -6%, #DA34DD 113.05%)',
            },
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
            allowClear
            size='large'
            className='w-full bg-transparent'
            options={[
              { value: 'All', label: 'All' },
              { value: 'Basic', label: 'Basic' },
              { value: 'Deluxe', label: 'Deluxe' },
              { value: 'Premium', label: 'Premium' },
            ]}
          />
        </Form.Item>

        <Form.Item name='theme' label='THEME'>
          <Select
            allowClear
            size='large'
            className='w-full bg-transparent'
            options={[
              { value: 'All', label: 'All' },
              { value: 'Light', label: 'Light' },
              { value: 'Dark', label: 'Dark' },
              { value: 'Halloween', label: 'Halloween' },
              { value: 'Colorful', label: 'Colorful' },
            ]}
          />
        </Form.Item>

        <Form.Item name='time' label='TIME'>
          <Select
            allowClear
            size='large'
            className='w-full bg-transparent'
            options={[
              { value: 'All', label: 'All' },
              { value: 'asc', label: 'Latest' },
              { value: 'desc', label: 'Oldest' },
            ]}
          />
        </Form.Item>

        <Form.Item name='price' label='PRICE'>
          <Select
            allowClear
            size='large'
            className='w-full bg-transparent'
            options={[
              { value: 'All', label: 'All' },
              { value: 'asc', label: 'Low to High' },
              { value: 'desc', label: 'High to Low' },
            ]}
          />
        </Form.Item>
      </Space>

      <div className='mt-4 flex gap-8'>
        <Button onClick={onResetFilterForm} className='btn-shiny'>
          Reset Filter
        </Button>
        <ShinyButton
          type='submit'
          title='Search'
          className='h-[34px] w-[120px] font-semibold text-white'
        />
      </div>
    </Form>
  )
}

export default FilterForm
