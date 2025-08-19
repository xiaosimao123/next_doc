import nextra from 'nextra'

const withNextra = nextra({})

const nextConfig = withNextra({
  webpack(config) {
    // rule.exclude doesn't work starting from Next.js 15
    const { test: _test, ...imageLoaderOptions } = config.module.rules.find(
      // @ts-expect-error -- fixme
      (rule) => rule.test?.test?.('.svg')
    )
    config.module.rules.push({
      test: /\.svg$/,
      oneOf: [
        {
          resourceQuery: /svgr/,
          use: ['@svgr/webpack'],
        },
        imageLoaderOptions,
      ],
    })
    return config
  },
  turbopack: {
    resolveAlias: {
      // Path to your `mdx-components` file with extension+
      'next-mdx-import-source-file': './mdx-components.tsx',
    },
    rules: {
      './components/icons/*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  experimental: {
    optimizePackageImports: ['@components/icons'],
  },
})

export default nextConfig
