import { MediaDescriptor } from '@/components/SiteContextProvider'
import { getContentfulEntriesByType } from '@/lib/contentfulClient'
import { TypeJsonSpotCopySkeleton } from '@/lib/contentfulTypes'

export async function getContentfulSpotCopy(slugStartsWith?: string) {
  const items = await getContentfulEntriesByType<TypeJsonSpotCopySkeleton>(
    'jsonSpotCopy',
    { 'fields.codeName[match]': slugStartsWith },
  )

  const filteredItems = slugStartsWith
    ? items.filter(entry =>
        String(entry.fields.codeName).startsWith(slugStartsWith),
      )
    : items

  const spotCopy = Object.fromEntries(
    filteredItems.map(item => {
      return [
        item.fields.codeName,
        {
          attachedMedia:
            item.fields.attachedMedia?.reduce<MediaDescriptor[]>(
              (acc, media) => {
                if ('fields' in media && media.fields.file?.url) {
                  return [
                    ...acc,
                    {
                      description: media.fields.description ?? '',
                      height: media.fields.file.details.image?.height ?? 0,
                      title: media.fields.title || '(untitled)',
                      url: `https:${media.fields.file.url}`,
                      width: media.fields.file.details.image?.width ?? 0,
                    },
                  ]
                }

                return acc
              },
              [],
            ) ?? [],
          content: item.fields.body,
          json: item.fields.json,
          contentfulURL: `https://app.contentful.com/spaces/${item.sys.space.sys.id}/entries/${item.sys.id}`,
        },
      ]
    }),
  )

  return { spotCopy }
}
