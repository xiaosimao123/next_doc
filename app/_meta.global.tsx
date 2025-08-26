import type { MetaRecord } from 'nextra'
import { LinkArrowIcon } from 'nextra/icons'
import type { FC, ReactNode } from 'react'
import { useMDXComponents } from '../mdx-components'

// eslint-disable-next-line react-hooks/rules-of-hooks -- isn't react hook
const { code: Code } = useMDXComponents()

const ExternalLink: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      {children}&thinsp;
      <LinkArrowIcon
        // based on font-size
        height="1em"
        className="x:inline x:align-baseline x:shrink-0"
      />
    </>
  )
}

const FILE_CONVENTIONS: MetaRecord = {
  _: {
    type: 'separator',
    title: 'Files',
  },
  'page-file': 'page.mdx',
  'meta-file': '_meta.js',
  _2: {
    href: 'https://nextjs.org/docs/app/api-reference/file-conventions/page',
    title: <ExternalLink>page.jsx</ExternalLink>,
  },
  _3: {
    href: 'https://nextjs.org/docs/app/api-reference/file-conventions/layout',
    title: <ExternalLink>layout.jsx</ExternalLink>,
  },
  _4: {
    type: 'separator',
    title: 'Top-Level Files',
  },
  'mdx-components-file': 'mdx-components.js',
  _5: {
    type: 'separator',
    title: 'Top-Level Folders',
  },
  'content-directory': 'content',
  'src-directory': 'src',
  _6: {
    href: 'https://nextjs.org/docs/app/getting-started/installation?utm_source=nextra.site&utm_medium=referral&utm_campaign=sidebar#create-the-app-directory',
    title: <ExternalLink>app</ExternalLink>,
  },
  _7: {
    href: 'https://nextjs.org/docs/app/building-your-application/optimizing/static-assets?utm_source=nextra.site&utm_medium=referral&utm_campaign=sidebar',
    title: <ExternalLink>public</ExternalLink>,
  },
}

const GUIDE: MetaRecord = {
  demo: '',
  'syntax-highlighting': '',
}

const ADVANCED: MetaRecord = {
  npm2yarn: '',
  mermaid: '',
  'tailwind-css': '',
  latex: '',
  table: '',
  typescript: '',
  remote: ''
}

const BLOG_THEME: MetaRecord = {
  start: '',
  'get-posts-and-tags': '',
  // prettier-ignore
  posts: <><Code>/posts</Code>&nbsp;Page</>,
  // prettier-ignore
  tags: <><Code>/tags/:id</Code>&nbsp;Page</>,
  // prettier-ignore
  rss: <><Code>/rss.xml</Code>&nbsp;Route</>
}

export default {
  index: {
    type: 'page',
    display: 'hidden',
  },
  docs: {
    type: 'page',
    title: 'Documentation',
    items: {
      index: '',
      guide: { items: GUIDE },
    },
  },

  showcase: {
    type: 'page',
    theme: {
      typesetting: 'article',
      layout: 'full',
      timestamp: false,
      toc: false,
    },
  },
}
