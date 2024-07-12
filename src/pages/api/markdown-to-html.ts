import { NextApiRequest, NextApiResponse } from 'next'
import { marked } from 'marked'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const markdown = req.body.markdown
    const html = marked(markdown)
    res.setHeader('Content-Type', 'text/html')
    res.status(200).send(html)
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
