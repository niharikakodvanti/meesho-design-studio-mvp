import type { VercelRequest, VercelResponse } from '@vercel/node'

// You should store your Replicate API token in an environment variable
const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { prompt, sketchImage } = req.body
  if (!prompt || !sketchImage) {
    return res.status(400).json({ error: 'Missing prompt or sketchImage' })
  }

  try {
    // Call Replicate API
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        version: 'ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4',
        input: {
          prompt,
          image: sketchImage,
        },
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      return res.status(500).json({ error: error.detail || 'Failed to generate design' })
    }

    const data = await response.json()
    // You may want to poll for completion if using an async model
    return res.status(200).json(data)
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Internal server error' })
  }
} 