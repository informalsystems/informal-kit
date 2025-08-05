const filtersByVariant = {
  blue: 'invert(20%) sepia(100%) saturate(1000%) hue-rotate(200deg) brightness(80%) contrast(110%)',

  lavender:
    'brightness(0) saturate(100%) invert(24%) sepia(1) saturate(4563%) hue-rotate(249deg) brightness(156%) contrast(59%)',

  white: 'invert(1) brightness(2)',
}

export function BlackColorAdjustmentLayer({
  children,
  style,
  variant,
  ...otherProps
}: React.ComponentProps<'div'> & {
  variant: keyof typeof filtersByVariant
}) {
  return (
    <div
      style={{
        ...style,
        filter: filtersByVariant[variant],
      }}
      {...otherProps}
    >
      {children}
    </div>
  )
}
