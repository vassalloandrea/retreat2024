import { LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return json({
    productHandle: params.productHandle
  })
}

export default function ProductPage() {
  const { productHandle } = useLoaderData<typeof loader>()

  return <h1>Product detail of: {productHandle}</h1>
}
