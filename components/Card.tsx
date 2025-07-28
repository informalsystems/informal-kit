import { twJoin } from 'tailwind-merge'

export function Card() {
  return (
    <div
      className={twJoin(
        'absolute z-10',
        'bg-theme-bg-color-shaded/80',
        'backdrop-blur-md',
        'rounded-md',
        'inset-0',
      )}
    />
  )
}
