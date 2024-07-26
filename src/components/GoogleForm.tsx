'use client'

import { Notifications, StyledText } from '@/components'
import { FormActionResponse } from '@/lib/types'
import { ComponentProps, useActionState } from 'react'
import { twMerge } from 'tailwind-merge'

interface GoogleFormProps extends ComponentProps<'form'> {
  googleFormID: string
}

async function submitGoogleForm(
  previousState: FormActionResponse,
  data: FormData,
) {
  const fieldValues = Object.fromEntries(data.entries()) as Record<
    string,
    string
  >
  const formattedData = new URLSearchParams(fieldValues)

  const googleFormURL = `https://docs.google.com/forms/u/0/d/e/${fieldValues.googleFormID}/formResponse`

  try {
    await fetch(googleFormURL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Accept':
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: String(formattedData),
    })

    return { success: true, messages: ['Form submitted successfully!'] }
  } catch (error) {
    return { success: false, messages: [`Error submitting form: ${error}`] }
  }
}

export function GoogleForm({
  action,
  children,
  className,
  googleFormID,
  ...otherProps
}: GoogleFormProps) {
  const [formActionResponse, formAction, isSubmitting] = useActionState(
    submitGoogleForm,
    null,
  )

  return (
    <form
      action={formAction}
      className={twMerge(
        `
          grid
          gap-6
          lg:grid-cols-2
        `,
        isSubmitting &&
          `
            animate-pulse
            opacity-50
          `,
        className,
      )}
      {...otherProps}
    >
      <input
        type="hidden"
        name="googleFormID"
        value={googleFormID}
      />

      <Notifications formActionResponse={formActionResponse} />

      {children}

      <div
        className="
          flex
          justify-end
          lg:col-span-2
        "
      >
        <StyledText
          as="button"
          variant="button.primary"
        >
          Send
        </StyledText>
      </div>
    </form>
  )
}
