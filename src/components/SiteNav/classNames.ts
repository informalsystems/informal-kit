import { tw } from '@/lib/tw'
import { twMerge } from 'tailwind-merge'

export function getClassNames({
  isInPortraitMode = false,
  isShowingMobileNav = false,
  variant = 'informalSystems',
}) {
  return {
    container: twMerge(
      `
        whitespace-nowrap
        font-display
        transition-all
        duration-700
      `,
      isInPortraitMode &&
        `
          fixed
          bottom-full
          left-0
          right-0
          top-0
          z-50
        `,
      isShowingMobileNav &&
        `
          bottom-0
          bg-shadedBgColor/90
          backdrop-blur-sm
        `,
      (variant === 'informalStaking' ||
        variant === 'informalSystemsBlog' ||
        (variant === 'informalSystems' && isShowingMobileNav)) &&
        `
          dark
        `,
    ),

    mobileNavToggleButton: ({ isDocumentScrolled = false }) =>
      twMerge(
        `
          absolute
          right-0
          z-10
          text-brandColor
          transition-all
        `,
        (variant === 'informalStaking' || variant === 'informalSystemsBlog') &&
          isInPortraitMode &&
          !isShowingMobileNav &&
          `
            text-white
          `,
        isDocumentScrolled
          ? `
              -top-2
            `
          : `
              top-0
            `,
        isInPortraitMode
          ? `
              cursor-pointer
              p-5
              text-2xl
              opacity-100
            `
          : `
              pointer-events-none
              opacity-0
            `,
      ),

    topLevelItemsContainer: twMerge(
      `
        flex
        text-xs
        dark:text-white/80
      `,
      isInPortraitMode
        ? `
            absolute
            -left-full
            bottom-0
            top-0
            flex-col
            gap-6
            whitespace-nowrap
            bg-brandColor
            py-6
            pl-6
            pr-12
            transition-all
            duration-500
          `
        : `
            gap-4
            lg:gap-6
          `,
      isShowingMobileNav &&
        `
          left-0
        `,
    ),

    topLevelItemContainer: ({ isActive = false } = {}) =>
      twMerge(
        `
          group/navItem
          relative
          flex
          cursor-pointer
          flex-col
        `,
        isActive &&
          (isInPortraitMode
            ? `
                font-bold
              `
            : `
                border-b-2
                border-b-brandColor
                font-bold
                dark:border-b-white
              `),
      ),

    topLevelButton: ({ isActive = false } = {}) =>
      twMerge(
        `
          text-textColor/60
          hover:text-textColor
          focus:text-textColor
          dark:text-white/60
          dark:hover:text-white
          dark:focus:text-white
        `,
        isActive &&
          `
            text-textColor
            dark:text-white
          `,
      ),

    popupMenu: twMerge(
      `
        light
        flex
        flex-col
        transition-all
      `,
      isInPortraitMode
        ? `
            mt-3
            gap-3
            text-white
          `
        : `
            pointer-events-none
            absolute
            left-0
            top-full
            -mx-6
            mt-3
            whitespace-nowrap
            bg-bgColor
            py-3
            text-textColor
            opacity-0
            shadow-2xl
            shadow-brandColor/20
            group-has-[:focus]/navItem:pointer-events-auto
            group-has-[:focus]/navItem:opacity-100
          `,
    ),

    popupMenuItem: ({ isActive = false }) => tw`
    `,

    popupMenuButton: ({ isActive = false }) =>
      twMerge(
        `
          block
          w-full
        `,
        isInPortraitMode
          ? `
              pl-6
            `
          : `
              py-2
              pl-6
              pr-12
              hover:bg-brandColor/10
              focus:bg-brandColor/10
            `,
        !isActive &&
          isInPortraitMode &&
          `
            opacity-60
          `,
        isActive &&
          (isInPortraitMode
            ? `
                opacity-100
              `
            : `
                bg-brandColor/10
              `),
      ),
  }
}
