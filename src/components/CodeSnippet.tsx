'use client'

import { CopyToClipboardButton } from '@/components/CopyToClipboardButton'
import { Icon } from '@/components/Icon'
import { ComponentProps } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { twMerge } from 'tailwind-merge'

interface CodeSnippetProps extends ComponentProps<'pre'> {
  code: string
  language?: string
}

const styles = {
  'hljs': {
    display: 'block',
    overflowX: 'auto',
    color: 'white',
    fontSize: '0.8rem',
  },
  'linenumber': {
    opacity: 0.5,
    textAlign: 'right',
    width: 50,
  },
  'hljs-keyword': {
    color: '#c792ea',
    fontStyle: 'italic',
  },
  'hljs-built_in': {
    color: '#addb67',
    fontStyle: 'italic',
  },
  'hljs-type': {
    color: '#82aaff',
  },
  'hljs-literal': {
    color: '#ff5874',
  },
  'hljs-number': {
    color: '#F78C6C',
  },
  'hljs-regexp': {
    color: '#5ca7e4',
  },
  'hljs-string': {
    color: '#ecc48d',
  },
  'hljs-subst': {
    color: '#d3423e',
  },
  'hljs-symbol': {
    color: '#82aaff',
  },
  'hljs-class': {
    color: '#ffcb8b',
  },
  'hljs-function': {
    color: '#82AAFF',
  },
  'hljs-title': {
    color: '#DCDCAA',
    fontStyle: 'italic',
  },
  'hljs-params': {
    color: '#7fdbca',
  },
  'hljs-comment': {
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#ffcb8b',
    fontStyle: 'italic',
  },
  'hljs-doctag': {
    color: '#7fdbca',
  },
  'hljs-meta': {
    color: '#82aaff',
  },
  'hljs-meta-keyword': {
    color: '#82aaff',
  },
  'hljs-meta-string': {
    color: '#ecc48d',
  },
  'hljs-section': {
    color: '#82b1ff',
  },
  'hljs-tag': {
    color: '#7fdbca',
  },
  'hljs-name': {
    color: '#7fdbca',
  },
  'hljs-builtin-name': {
    color: '#7fdbca',
  },
  'hljs-attr': {
    color: '#7fdbca',
  },
  'hljs-attribute': {
    color: '#80cbc4',
  },
  'hljs-variable': {
    color: '#addb67',
  },
  'hljs-bullet': {
    color: '#d9f5dd',
  },
  'hljs-code': {
    color: '#80CBC4',
  },
  'hljs-emphasis': {
    color: '#c792ea',
    fontStyle: 'italic',
  },
  'hljs-strong': {
    color: '#addb67',
    fontWeight: 'bold',
  },
  'hljs-formula': {
    color: '#c792ea',
  },
  'hljs-link': {
    color: '#ff869a',
  },
  'hljs-quote': {
    color: '#697098',
    fontStyle: 'italic',
  },
  'hljs-selector-tag': {
    color: '#ff6363',
  },
  'hljs-selector-id': {
    color: '#fad430',
  },
  'hljs-selector-class': {
    color: '#addb67',
    fontStyle: 'italic',
  },
  'hljs-selector-attr': {
    color: '#c792ea',
    fontStyle: 'italic',
  },
  'hljs-selector-pseudo': {
    color: '#c792ea',
    fontStyle: 'italic',
  },
  'hljs-template-tag': {
    color: '#c792ea',
  },
  'hljs-template-variable': {
    color: '#addb67',
  },
  'hljs-addition': {
    color: '#addb67ff',
    fontStyle: 'italic',
  },
  'hljs-deletion': {
    color: '#EF535090',
    fontStyle: 'italic',
  },
}

export function CodeSnippet({
  className,
  code,
  language = 'plaintext',
  ...otherProps
}: CodeSnippetProps) {
  return (
    <pre
      className={twMerge(
        `
          not-prose
          group
          relative
          w-full
          cursor-default
          rounded
          border
          bg-blue-900
          shadow-inner
          ring-4
          ring-blue-900
        `,
        className,
      )}
      {...otherProps}
    >
      <SyntaxHighlighter
        className="
          overflow-x-auto
          bg-slate-900/40
          px-4
          py-3
          font-mono
          [text-shadow:_1px_1px_0_rgb(0_0_0_/_60%)]
        "
        language={language}
        lineProps={{ class: 'block hover:bg-slate-900/40' } as any}
        showLineNumbers={true}
        style={styles as any}
        wrapLines={true}
      >
        {code}
      </SyntaxHighlighter>

      <div
        className="
          absolute
          right-3
          top-3
          font-body
          text-white
          opacity-0
          transition-opacity
          hover:!opacity-100
          group-hover:opacity-60
        "
      >
        <CopyToClipboardButton
          children={(isCopied) => (
            <span>
              <Icon name={isCopied ? 'check' : 'clipboard'} />
              {isCopied ? 'Copied!' : 'Copy'}
            </span>
          )}
          payload={code}
        />
      </div>
    </pre>
  )
}
