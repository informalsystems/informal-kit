import { ReactNode, useState } from 'react'
import { twJoin } from 'tailwind-merge'
import { distributeEvenly } from '../lib/distributeEvenly'
import { Card } from './Card'
import { CollapsibleBox } from './CollapsibleBox'
import { Icon } from './Icon'

export function FrequentlyAskedQuestions({
  faqs,
}: {
  faqs: Array<{ question: ReactNode; answer: ReactNode }>
}) {
  const [isCollapsedByIndex, setIsCollapsedByIndex] = useState<
    Record<number, boolean>
  >({})

  function handleClickQuestion(index: number) {
    setIsCollapsedByIndex(prevState => {
      const newState = { ...prevState }
      newState[index] =
        typeof newState[index] === 'boolean' ? !newState[index] : false
      return newState
    })
  }

  const columns = distributeEvenly(faqs, 2)

  return (
    <div className={twJoin('grid gap-6 md:grid-cols-2')}>
      {columns.map((columnFaqs, columnIndex) => (
        <div
          key={columnIndex}
          className={twJoin('flex flex-col gap-6')}
        >
          {columnFaqs.map((faq, faqIndex) => {
            const originalIndex = faqIndex * 2 + columnIndex
            const isCollapsed = isCollapsedByIndex[originalIndex] ?? true

            return (
              <div
                key={originalIndex}
                className={twJoin('relative')}
              >
                <Card />

                <div className="relative z-10 flex w-full flex-col">
                  <div
                    className={twJoin(
                      'flex items-baseline gap-3',
                      'p-3',
                      'cursor-pointer select-none',
                      'hover:bg-theme-bg-color-shaded',
                    )}
                    onClick={() => handleClickQuestion(originalIndex)}
                  >
                    <div
                      className={twJoin(
                        'relative flex size-6 items-center justify-center',
                        'text-theme-brand-color',
                        'transition-all',
                        !isCollapsed && 'rotate-315',
                      )}
                    >
                      <Icon name="solid:plus" />
                    </div>
                    <div
                      className={twJoin(
                        'cursor-pointer text-lg',
                        'hover:text-theme-brand-color',
                        !isCollapsed && 'text-theme-brand-color',
                      )}
                    >
                      {faq.question}
                    </div>
                  </div>

                  <CollapsibleBox isCollapsed={isCollapsed}>
                    {/* Icon size-6 + gap-3 = ml-9 */}
                    <div className="ml-9 p-3 pt-0">{faq.answer}</div>
                  </CollapsibleBox>
                </div>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
