'use client'

import { createContext, CSSProperties, ReactNode, useContext } from 'react'

const defaultStyles: Record<string, CSSProperties> = {
  'container': {
    border: '1px solid white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 0 0 10px var(--color-theme-accent-color)',
    backgroundColor: 'var(--color-theme-accent-color)',
  },
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

export const CodeSnippetContext = createContext<{
  styles: Record<string, CSSProperties>
}>({
  styles: defaultStyles,
})

export function CodeSnippetContextProvider({
  children,
  styles = defaultStyles,
}: {
  children: ReactNode
  styles?: Record<string, CSSProperties>
}) {
  return (
    <CodeSnippetContext.Provider value={{ styles }}>
      {children}
    </CodeSnippetContext.Provider>
  )
}

export function useCodeSnippetStyles() {
  return useContext(CodeSnippetContext)
}
