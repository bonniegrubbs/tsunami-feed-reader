// utils -> retrieve

import fetch from 'cross-fetch'

export default async (url) => {
  const res = await fetch(url, {
    headers: {
      'user-agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:104.0) Gecko/20100101 Firefox/104.0'
    }
  })
  const status = res.status
  if (status >= 400) {
    throw new Error(`Request failed with error code ${status}`)
  }
  const contentType = res.headers.get('content-type') || 'application/xml'
  const text = await res.text()

  if (contentType.includes('/xml')) {
    return { type: 'xml', text: text.trim(), status, contentType }
  }

  try {
    const data = JSON.parse(text)
    return { type: 'json', json: data, status, contentType }
  } catch (err) {
    throw new Error('Failed to convert data to JSON object')
  }
}
