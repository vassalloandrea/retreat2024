import { LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { storefrontAPI } from '~/storefrontAPI.server'

type Variant = {
  id: string
  title: string
  priceV2: {
    amount: string
    currencyCode: string
  }
}

export async function loader({ params }: LoaderFunctionArgs) {
  const { data: productData } = await storefrontAPI.request(productQuery, {
    variables: {
      handle: params.productHandle
    }
  })

  return json({ productData })
}

export default function ProductPage() {
  const { productData } = useLoaderData<typeof loader>()

  return (
    <div
      className="container mx-auto mt-5"
      style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}
    >
      <h1 className="text-3xl font-bold">{productData.product.title}</h1>
      <p className="mt-5">{productData.product.description}</p>
      <h2 className="mt-5 text-xl font-bold">Variants</h2>

      <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside"></ul>
      {productData.product.variants.edges.map(({ node }: { node: Variant }) => (
        <li key={node.id}>
          <span className="text-gray-500">{`${node.title} ---> `}</span>
          <span className="text-gray-500">
            {node.priceV2.amount} {node.priceV2.currencyCode}
          </span>
        </li>
      ))}
    </div>
  )
}

const productQuery = `#graphql
  query ProductQuery($handle: String) {
    product(handle: $handle) {
      id
      title
      description
      variants(first: 10) {
        edges {
          node {
            id
            title
            priceV2 {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`
