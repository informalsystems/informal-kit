'use client'

import { Atom } from '@/components'
import { useToasts } from '@/components/Toasts'
import { FormActionResponse } from '@/lib/types'
import { ComponentProps, useActionState, useEffect } from 'react'
import { twMerge } from 'tailwind-merge'

interface GoogleFormProps extends ComponentProps<'form'> {
  googleFormID: string
}

async function submitGoogleForm(
  _previousState: FormActionResponse,
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
  const { setToasts } = useToasts()
  const [formActionResponse, formAction, isSubmitting] = useActionState(
    submitGoogleForm,
    null,
  )

  useEffect(() => {
    if (formActionResponse?.success) {
      setToasts([
        { message: 'Form submitted successfully!', variant: 'success' },
      ])
    } else {
      setToasts([
        { message: formActionResponse?.messages?.[0], variant: 'error' },
      ])
    }
  }, [formActionResponse])

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

      {children}

      <div
        className="
          flex
          justify-end
          lg:col-span-2
        "
      >
        <Atom
          as="button"
          variant="button.primary"
        >
          Send
        </Atom>
      </div>
    </form>
  )
}
