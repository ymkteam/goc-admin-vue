import config from '../utils/config'
import { maska, mask, tokens } from 'maska'

export const maskDirective = maska

export const getMaskedValue = (value, maskValue) => {
  return mask(value, maskValue, tokens)
}

const getThousandSeparatorMask = () => {
  const maskArray = []
  let maskItem = ''
  for (let index = 1; index <= 9; index++) {
    if (index % 3 === 1 && index > 3) {
      const thousandSeparatorSymbol = '.'
      maskItem = thousandSeparatorSymbol + maskItem
    }
    maskItem = '#' + maskItem

    maskArray.push(maskItem)
  }
  return maskArray
}

export const numberWithThousandSeparatorMask = getThousandSeparatorMask()
export const phoneMask = config.mask.phoneMask
export const numberMask = config.mask.numberMask

export const getMaskedPhone = value => {
  if (!value) return null
  return getMaskedValue(value, phoneMask)
}
