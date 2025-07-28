import { useState } from 'react'
import { twJoin } from 'tailwind-merge'
import { distributeEvenly } from '../lib/distributeEvenly'
import { Card } from './Card'
import { CollapsibleBox } from './CollapsibleBox'
import { SpotCopy } from './Contentful/SpotCopy'
import { Icon } from './Icon'

export function FrequentlyAskedQuestions({
  faqs,
  headingLevel = 1,
  classNameForProseContainer,
}: {
  faqs: string[]
  headingLevel?: number
  classNameForProseContainer?: string
}) {
  const [isCollapsedByPath, setIsCollapsedByPath] = useState<
    Record<string, boolean>
  >({})

  function handleClickQuestion(path: string) {
    setIsCollapsedByPath(prevState => {
      const newState = { ...prevState }
      newState[path] =
        typeof newState[path] === 'boolean' ? !newState[path] : false
      return newState
    })
  }

  const columns = distributeEvenly(faqs, 2)

  return (
    <div className={twJoin('grid gap-6 md:grid-cols-2')}>
      {columns.map((paths, columnIndex) => (
        <div
          key={columnIndex}
          className={twJoin('flex flex-col gap-6')}
        >
          {paths.map((faqPath, faqIndex) => {
            const isCollapsed = isCollapsedByPath[faqPath] ?? true

            return (
              <SpotCopy<{ question: string }>
                key={faqIndex}
                path={faqPath}
                headingLevel={headingLevel}
                className={twJoin('relative')}
                classNameForProseContainer={classNameForProseContainer}
              >
                {({ body, json }) => {
                  return (
                    <>
                      <Card />

                      <div className="relative z-10 flex w-full flex-col">
                        <div
                          className={twJoin(
                            'flex items-baseline gap-3',
                            'p-3',
                            'cursor-pointer select-none',
                            'hover:bg-theme-bg-color-shaded',
                          )}
                          onClick={() => handleClickQuestion(faqPath)}
                        >
                          <div
                            className={twJoin(
                              'relative flex size-6 items-center justify-center',
                              'text-theme-accent-color',
                              'transition-all',
                              !isCollapsed && 'rotate-315',
                            )}
                          >
                            <Icon name="solid:plus" />
                          </div>
                          <div
                            className={twJoin(
                              'cursor-pointer text-lg',
                              'hover:text-theme-accent-color',
                              !isCollapsed && 'text-theme-accent-color',
                            )}
                          >
                            {json?.question}
                          </div>
                        </div>

                        <CollapsibleBox isCollapsed={isCollapsed}>
                          {/* Icon size-6 + gap-3 = ml-9 */}
                          <div className="ml-9 p-3 pt-0">{body}</div>
                        </CollapsibleBox>
                      </div>
                    </>
                  )
                }}
              </SpotCopy>
            )
          })}
        </div>
      ))}
    </div>
  )
}
