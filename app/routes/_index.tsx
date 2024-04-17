import { type MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' }
  ]
}

const PRODUCT_HANDLES = ['developer-cap', 'developer-tshirt', 'hoodie']

export default function Index() {
  return (
    <div
      style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}
      className="container m-5 flex flex-col gap-y-5"
    >
      <h1 className="text-3xl font-bold underline">
        Welcome to Remix, Nebulab!
      </h1>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-gray-900">
          List of products:
        </h2>

        <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside">
          {PRODUCT_HANDLES.map((handle) => (
            <li key={handle}>
              <a href={`/products/${handle}`}>{handle}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
