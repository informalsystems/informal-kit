import {
  BrandIconName,
  IconString,
  IconVariant,
  RegularIconName,
} from '@/components/Icon/types'

export function iconStringToVariantAndName(
  iconString: IconString,
): [IconVariant | undefined, RegularIconName | BrandIconName] {
  return iconString.includes(':')
    ? (iconString.split(':') as [IconVariant, RegularIconName | BrandIconName])
    : [undefined, iconString as RegularIconName]
}
