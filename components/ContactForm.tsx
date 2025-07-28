'use client'

import { ComponentProps, useActionState, useEffect } from 'react'
import { twMerge } from 'tailwind-merge'
import { FormActionResponse } from '../lib/types'
import { useToasts } from './Toasts'

interface ContactFormProps extends ComponentProps<'form'> {
  inbox: string
  subject: string
}

export async function sendEmail(
  previousState: FormActionResponse,
  formData: FormData,
) {
  const body = Object.fromEntries(formData.entries())

  try {
    const response = await fetch('/api/sendmail', {
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    if (!response.ok) {
      const { error } = await response.json()

      return {
        success: false,
        messages: [`Error: ${JSON.stringify(error, null, 2)}`],
      }
    }

    return {
      success: true,
      messages: ['Message sent successfully!'],
    }
  } catch (error) {
    return {
      success: false,
      messages: [`Error: ${JSON.stringify(error, null, 2)}`],
    }
  }
}

export function ContactForm({
  children,
  className,
  inbox,
  subject,
  ...otherProps
}: ContactFormProps) {
  const { setToasts } = useToasts()
  const [formActionResponse, formAction, isSending] = useActionState(
    sendEmail,
    null,
  )

  useEffect(() => {
    if (formActionResponse) {
      setToasts([
        {
          message: formActionResponse.messages[0],
          variant: formActionResponse.success ? 'success' : 'error',
        },
      ])
    }
  }, [formActionResponse, setToasts])

  return (
    <form
      action={formAction}
      className={twMerge(
        `
          grid
          gap-6
          lg:grid-cols-2
        `,
        isSending &&
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
        name="subject"
        value={subject}
      />

      <input
        type="hidden"
        name="inbox"
        value={inbox}
      />

      <input
        className="input-text"
        name="fullName"
        placeholder="Full Name"
        type="text"
        required={true}
      />

      <input
        className="input-text"
        name="email"
        placeholder="Email Address"
        type="email"
        required={true}
      />

      {children}

      <textarea
        className="input-text lg:col-span-2"
        name="message"
        placeholder="Message"
        rows={6}
      />

      <div
        className="
          flex
          justify-end
          lg:col-span-2
        "
      >
        <button
          type="submit"
          className="button-primary"
        >
          Send
        </button>
      </div>
    </form>
  )
}
