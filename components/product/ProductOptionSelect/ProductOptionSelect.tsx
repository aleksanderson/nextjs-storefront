import { MenuItem } from '@mui/material'
import { useTranslation } from 'next-i18next'

import KiboSelect from '@/components/common/KiboSelect/KiboSelect'

import type { ProductOptionValue } from '@/lib/gql/types'

export interface ProductOptionSelectProps {
  optionValues: ProductOptionValue[]
  name?: string
  value?: string
  error?: boolean
  errorHelperText?: string
  row?: boolean
  placeholder?: string
  onChange: (value: string) => void
}

const ProductOptionSelect = (props: ProductOptionSelectProps) => {
  const { optionValues, name, value, error = false, errorHelperText = '', onChange } = props
  const { t } = useTranslation('product-page')

  return (
    <KiboSelect
      name={name}
      error={error}
      helperText={errorHelperText}
      onChange={onChange}
      value={value}
      label={t('select-product-option')}
      placeholder={t('select-product-option')}
    >
      {optionValues.map((optionVal) => (
        <MenuItem key={optionVal?.value} value={optionVal?.value}>
          {optionVal?.stringValue}
        </MenuItem>
      ))}
    </KiboSelect>
  )
}

export default ProductOptionSelect