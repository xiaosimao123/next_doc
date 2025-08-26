import { getEnhancedPageMap } from '@components/get-page-map'
import type { Folder } from 'nextra'
import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs'
 
import { generateDefinition, TSDoc } from 'nextra/tsdoc'
import type { ComponentProps, FC, HTMLAttributes } from 'react'
import * as nextra from 'nextra'
import * as nextra_mdx_components_pre_index from 'nextra/mdx-components/pre/index'
import * as react_jsx_runtime from 'react/jsx-runtime'
import * as url from 'url'
import * as react from 'react'

import * as next_image from 'next/image'
import { UseMDXComponents } from 'nextra/mdx-components'

type TSDocProps = ComponentProps<typeof TSDoc>
type GenerateDefinitionArgs = Parameters<typeof generateDefinition>[0]

interface APIDocsProps
  extends Partial<TSDocProps>,
    Pick<GenerateDefinitionArgs, 'code' | 'flattened'> {
  componentName?: string
  groupKeys?: string
  packageName?: string
}

const { img: Image, ...docsComponents } = getDocsMDXComponents({
  // @ts-expect-error -- FIXME
  figure: (props) => <figure className="mt-[1.25em]" {...props} />,
  // @ts-expect-error -- FIXME
  figcaption: (props) => (
    <figcaption className="mt-2 text-center text-sm" {...props} />
  ),
  async APIDocs({
    componentName,
    groupKeys,
    packageName = 'nextra/components',
    code: $code,
    flattened,
    definition: $definition,
    ...props
  }: APIDocsProps) {
    if (Object.keys(props).length) {
      throw new Error(`Unexpected props: ${Object.keys(props)}`)
    }
    let code: string

    if (componentName) {
      const result = groupKeys
        ? `Omit<MyProps, keyof ${groupKeys}> & { '...props': ${groupKeys} }>`
        : 'MyProps'

      code = `
import type { ComponentProps } from 'react'
import type { ${componentName.split('.')[0]} } from '${packageName}'
type MyProps = ComponentProps<typeof ${componentName}>
type $ = ${result}

export default $`
    } else {
      code = $code
    }
    const definition = $definition ?? generateDefinition({ code, flattened })

    // TODO pass `'/api'` as first argument
    const pageMap = await getEnhancedPageMap()
    const apiPageMap = pageMap.find(
      (o): o is Folder => 'name' in o && o.name === 'api'
    )!.children

    return (
      <TSDoc
        definition={definition}
        typeLinkMap={{
          ...Object.fromEntries(
            apiPageMap
              .filter((o) => 'route' in o && o.name !== 'index')
              // @ts-expect-error -- fixme
              .map((o) => [o.title, o.route])
          ),
          NextConfig:
            'https://nextjs.org/docs/pages/api-reference/config/next-config-js',
          RehypePrettyCodeOptions: 'https://rehype-pretty.pages.dev/#options',
          PluggableList: 'https://github.com/unifiedjs/unified#pluggablelist',
          GitHubIcon:
            'https://github.com/shuding/nextra/blob/main/packages/nextra/src/client/icons/github.svg',
          DiscordIcon:
            'https://github.com/shuding/nextra/blob/main/packages/nextra/src/client/icons/discord.svg',
          PagefindSearchOptions:
            'https://github.com/CloudCannon/pagefind/blob/248f81d172316a642a83527fa92180abbb7f9c49/pagefind_web_js/types/index.d.ts#L72-L82',
          ReactNode:
            'https://github.com/DefinitelyTyped/DefinitelyTyped/blob/51fcf2a1c5da6da885c1f8c11224917bbc011493/types/react/index.d.ts#L426-L439',
          ReactElement:
            'https://github.com/DefinitelyTyped/DefinitelyTyped/blob/d44fce6cd8765acbdb0256195e5f16f67471430d/types/react/index.d.ts#L315-L322',
          TabItem:
            'https://github.com/shuding/nextra/blob/fb376a635de7fa287d5ffec9dbb5f40f1cfdb0f6/packages/nextra/src/client/components/tabs/index.client.tsx#L21',
          TabObjectItem:
            'https://github.com/shuding/nextra/blob/fb376a635de7fa287d5ffec9dbb5f40f1cfdb0f6/packages/nextra/src/client/components/tabs/index.client.tsx#L23',
          PageMapItem:
            'https://github.com/shuding/nextra/blob/fb376a635de7fa287d5ffec9dbb5f40f1cfdb0f6/packages/nextra/src/types.ts#L66',
          // ThemeProviderProps:
          //   'https://github.com/pacocoursey/next-themes/blob/c89d0191ce0f19215d7ddfa9eb28e1e4f94d37e5/next-themes/src/types.ts#L34-L57',
          LastUpdated:
            'https://github.com/shuding/nextra/blob/main/packages/nextra-theme-docs/src/components/last-updated.tsx',
          MDXRemote:
            'https://github.com/shuding/nextra/blob/main/packages/nextra/src/client/mdx-remote.tsx',
          MDXComponents:
            'https://github.com/DefinitelyTyped/DefinitelyTyped/blob/4c3811099cbe9ee60151c11a679b780d0ba785bf/types/mdx/types.d.ts#L65',
          ComboboxInputProps:
            'https://github.com/tailwindlabs/headlessui/blob/0933dd5e5f563675c8a36e4520905bf9b58df00e/packages/%40headlessui-react/src/components/combobox/combobox.tsx#L506',
        }}
      />
    )
  },
})

export const useMDXComponents: UseMDXComponents<any> = <T,>(
  components?: T
) => ({
  ...docsComponents,
  // @ts-expect-error -- FIXME
  img: (props) => (
    <Image
      {...props}
      className="nextra-border rounded-xl border drop-shadow-sm"
    />
  ),
  ...components,
})
// const DEFAULT_COMPONENTS: {
//   img: FC<next_image.ImageProps>
//   a: FC<
//     Omit<
//       Omit<
//         Omit<
//           react.AnchorHTMLAttributes<HTMLAnchorElement>,
//           keyof {
//             href: string | url.UrlObject
//             as?: string | url.UrlObject
//             replace?: boolean
//             scroll?: boolean
//             shallow?: boolean
//             passHref?: boolean
//             prefetch?: boolean | null
//             locale?: string | false
//             legacyBehavior?: boolean
//             onMouseEnter?: React.MouseEventHandler<HTMLAnchorElement>
//             onTouchStart?: React.TouchEventHandler<HTMLAnchorElement>
//             onClick?: React.MouseEventHandler<HTMLAnchorElement>
//             onNavigate?: (event: { preventDefault: () => void }) => void
//           }
//         > & {
//           href: string | url.UrlObject
//           as?: string | url.UrlObject
//           replace?: boolean
//           scroll?: boolean
//           shallow?: boolean
//           passHref?: boolean
//           prefetch?: boolean | null
//           locale?: string | false
//           legacyBehavior?: boolean
//           onMouseEnter?: React.MouseEventHandler<HTMLAnchorElement>
//           onTouchStart?: React.TouchEventHandler<HTMLAnchorElement>
//           onClick?: React.MouseEventHandler<HTMLAnchorElement>
//           onNavigate?: (event: { preventDefault: () => void }) => void
//         } & {
//           children?: React.ReactNode | undefined
//         } & react.RefAttributes<HTMLAnchorElement>,
//         'ref'
//       >,
//       'href'
//     > & {
//       href?: (string | url.UrlObject) | undefined
//     }
//   >
// } & {
//   a: FC<
//     Omit<
//       Omit<
//         Omit<
//           react.AnchorHTMLAttributes<HTMLAnchorElement>,
//           keyof {
//             href: string | url.UrlObject
//             as?: string | url.UrlObject
//             replace?: boolean
//             scroll?: boolean
//             shallow?: boolean
//             passHref?: boolean
//             prefetch?: boolean | null
//             locale?: string | false
//             legacyBehavior?: boolean
//             onMouseEnter?: React.MouseEventHandler<HTMLAnchorElement>
//             onTouchStart?: React.TouchEventHandler<HTMLAnchorElement>
//             onClick?: React.MouseEventHandler<HTMLAnchorElement>
//             onNavigate?: (event: { preventDefault: () => void }) => void
//           }
//         > & {
//           href: string | url.UrlObject
//           as?: string | url.UrlObject
//           replace?: boolean
//           scroll?: boolean
//           shallow?: boolean
//           passHref?: boolean
//           prefetch?: boolean | null
//           locale?: string | false
//           legacyBehavior?: boolean
//           onMouseEnter?: React.MouseEventHandler<HTMLAnchorElement>
//           onTouchStart?: React.TouchEventHandler<HTMLAnchorElement>
//           onClick?: React.MouseEventHandler<HTMLAnchorElement>
//           onNavigate?: (event: { preventDefault: () => void }) => void
//         } & {
//           children?: React.ReactNode | undefined
//         } & react.RefAttributes<HTMLAnchorElement>,
//         'ref'
//       >,
//       'href'
//     > & {
//       href?: (string | url.UrlObject) | undefined
//     }
//   >
//   blockquote: react.FunctionComponent<
//     react.DetailedHTMLProps<
//       react.BlockquoteHTMLAttributes<HTMLQuoteElement>,
//       HTMLQuoteElement
//     >
//   >
//   code: FC<
//     HTMLAttributes<HTMLElement> & {
//       'data-language'?: string
//     }
//   >
//   details: FC<
//     react.DetailedHTMLProps<
//       react.DetailsHTMLAttributes<HTMLDetailsElement>,
//       HTMLDetailsElement
//     >
//   >
//   h1: FC<
//     react.DetailedHTMLProps<
//       HTMLAttributes<HTMLHeadingElement>,
//       HTMLHeadingElement
//     >
//   >
//   h2: FC<
//     react.DetailedHTMLProps<
//       HTMLAttributes<HTMLHeadingElement>,
//       HTMLHeadingElement
//     >
//   >
//   h3: FC<
//     react.DetailedHTMLProps<
//       HTMLAttributes<HTMLHeadingElement>,
//       HTMLHeadingElement
//     >
//   >
//   h4: FC<
//     react.DetailedHTMLProps<
//       HTMLAttributes<HTMLHeadingElement>,
//       HTMLHeadingElement
//     >
//   >
//   h5: FC<
//     react.DetailedHTMLProps<
//       HTMLAttributes<HTMLHeadingElement>,
//       HTMLHeadingElement
//     >
//   >
//   h6: FC<
//     react.DetailedHTMLProps<
//       HTMLAttributes<HTMLHeadingElement>,
//       HTMLHeadingElement
//     >
//   >
//   hr: (
//     props: Omit<
//       react.DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement>,
//       'ref'
//     >
//   ) => react_jsx_runtime.JSX.Element
//   li: (
//     props: Omit<
//       react.DetailedHTMLProps<
//         react.LiHTMLAttributes<HTMLLIElement>,
//         HTMLLIElement
//       >,
//       'ref'
//     >
//   ) => react_jsx_runtime.JSX.Element
//   ol: (
//     props: Omit<
//       react.DetailedHTMLProps<
//         react.OlHTMLAttributes<HTMLOListElement>,
//         HTMLOListElement
//       >,
//       'ref'
//     >
//   ) => react_jsx_runtime.JSX.Element
//   p: (
//     props: Omit<
//       react.DetailedHTMLProps<
//         HTMLAttributes<HTMLParagraphElement>,
//         HTMLParagraphElement
//       >,
//       'ref'
//     >
//   ) => react_jsx_runtime.JSX.Element
//   pre: FC<nextra_mdx_components_pre_index.PreProps>
//   summary: FC<HTMLAttributes<HTMLElement>>
//   table: ({
//     className,
//     ...props
//   }: Omit<
//     react.DetailedHTMLProps<
//       react.TableHTMLAttributes<HTMLTableElement>,
//       HTMLTableElement
//     >,
//     'ref'
//   >) => react_jsx_runtime.JSX.Element
//   td: FC<HTMLAttributes<HTMLTableCellElement>>
//   th: FC<HTMLAttributes<HTMLTableCellElement>>
//   tr: FC<HTMLAttributes<HTMLTableRowElement>>
//   ul: (
//     props: Omit<
//       react.DetailedHTMLProps<
//         HTMLAttributes<HTMLUListElement>,
//         HTMLUListElement
//       >,
//       'ref'
//     >
//   ) => react_jsx_runtime.JSX.Element
//   wrapper({
//     toc,
//     children,
//     metadata,
//     bottomContent,
//     ...props
//   }: {
//     toc: nextra.Heading[]
//     children: react.ReactNode
//     metadata: nextra.$NextraMetadata
//     bottomContent?: react.ReactNode
//   }): react_jsx_runtime.JSX.Element
// }