import { createStorefrontApiClient } from '@shopify/storefront-api-client'

export const storefrontAPI = createStorefrontApiClient({
  storeDomain: 'http://nebulab-development-store.myshopify.com',
  apiVersion: '2024-04',
  publicAccessToken: '26096edb61eef226de5b06ed85539ca1'
})
