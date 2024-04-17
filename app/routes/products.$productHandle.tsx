import { LoaderFunctionArgs, json } from '@remix-run/node'
import { Form, useActionData, useLoaderData } from '@remix-run/react'
import { useRef } from 'react'

import { storefrontAPI } from '~/storefrontAPI.server'
import { supabase } from '~/supabaseClient.server'

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

export async function action({ request, params }: LoaderFunctionArgs) {
  const formData = await request.formData()
  const comment = String(formData.get('comment'))

  const { data, error } = await supabase
    .from('comments')
    .insert([{ comment: comment, product_handle: params.productHandle }])
    .select()

  if (error) {
    return json(
      {
        success: false,
        error: 'Failed to leave feedback'
      },
      {
        status: 500
      }
    )
  } else {
    console.log(JSON.stringify(data, null, 2))

    return json({ success: true, error: null })
  }
}

export default function ProductPage() {
  const { productData } = useLoaderData<typeof loader>()
  const actionData = useActionData<typeof action>()

  const formRef = useRef<HTMLFormElement>(null)

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

      <hr className="mt-5" />

      {actionData?.error ? (
        <div className="mt-5">
          <em className="text-red-500">{actionData?.error}</em>
        </div>
      ) : null}

      {actionData?.success ? (
        <div className="mt-5">
          <em className="text-green-500">Comment created successfully</em>
        </div>
      ) : null}

      <Form
        method="post"
        className="mt-5 w-96"
        ref={formRef}
        onSubmit={() => {
          formRef.current?.reset()
        }}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="comment"
          >
            Comment
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="comment"
            name="comment"
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Leave feedback
        </button>
      </Form>
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
