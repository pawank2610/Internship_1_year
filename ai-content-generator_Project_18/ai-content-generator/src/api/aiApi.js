// Talks directly to the Anthropic Messages API from the browser.
// Requires the user's own API key (entered in Settings, stored only in localStorage).
// Docs: https://docs.claude.com/en/api/messages
const API_URL = 'https://api.anthropic.com/v1/messages'
const API_VERSION = '2023-06-01'

export const MODELS = [
  { value: 'claude-sonnet-5', label: 'Claude Sonnet 5 (balanced)' },
  { value: 'claude-haiku-4-5-20251001', label: 'Claude Haiku 4.5 (fast)' },
  { value: 'claude-opus-4-8', label: 'Claude Opus 4.8 (most capable)' }
]

export const API_KEY_STORAGE = 'ai-content-gen:api-key'

export function getStoredApiKey() {
  return localStorage.getItem(API_KEY_STORAGE) || ''
}

export function setStoredApiKey(key) {
  if (key) localStorage.setItem(API_KEY_STORAGE, key)
  else localStorage.removeItem(API_KEY_STORAGE)
}

/**
 * Generate text from a prompt using the Anthropic API.
 * @param {Object} params
 * @param {string} params.prompt - the user's content prompt
 * @param {string} [params.system] - optional system instruction (tone/format guidance)
 * @param {string} [params.model]
 * @param {number} [params.maxTokens]
 */
export async function generateText({ prompt, system, model = 'claude-sonnet-5', maxTokens = 1024 }) {
  const apiKey = getStoredApiKey()
  if (!apiKey) {
    const err = new Error('No API key set. Add your Anthropic API key in Settings first.')
    err.code = 'NO_API_KEY'
    throw err
  }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': API_VERSION,
      'anthropic-dangerous-direct-browser-access': 'true'
    },
    body: JSON.stringify({
      model,
      max_tokens: maxTokens,
      system: system || undefined,
      messages: [{ role: 'user', content: prompt }]
    })
  })

  if (!res.ok) {
    let message = `Request failed (status ${res.status})`
    try {
      const errBody = await res.json()
      message = errBody?.error?.message || message
    } catch {
      // ignore parse errors
    }
    throw new Error(message)
  }

  const data = await res.json()
  const text = (data.content || [])
    .filter((block) => block.type === 'text')
    .map((block) => block.text)
    .join('\n')

  return { text, usage: data.usage || null, model: data.model }
}

// Prompt templates for the "multiple prompts" feature — each pre-fills a
// scaffold and a system instruction tuned for that content type.
export const TEMPLATES = [
  {
    id: 'custom',
    label: 'Custom',
    system: 'You are a skilled, versatile writing assistant. Follow the user\'s instructions precisely.',
    placeholder: 'Write about anything — describe exactly what you want.'
  },
  {
    id: 'blog-intro',
    label: 'Blog intro',
    system: 'You write engaging, concise blog post introductions. Hook the reader in the first sentence. 2-3 short paragraphs, no headers.',
    placeholder: 'Topic: "Why remote teams need async communication"'
  },
  {
    id: 'tweet',
    label: 'Social post',
    system: 'You write punchy short-form social media posts under 280 characters. No hashtags unless asked. Return only the post text.',
    placeholder: 'Topic or announcement to post about...'
  },
  {
    id: 'product-desc',
    label: 'Product description',
    system: 'You write persuasive, benefit-led e-commerce product descriptions. Around 100-150 words, no headers, end with a short punchy line.',
    placeholder: 'Product name and 2-3 key features...'
  },
  {
    id: 'email',
    label: 'Email',
    system: 'You write clear, professional emails. Include a subject line on the first line prefixed with "Subject:", then the email body.',
    placeholder: 'Who it\'s to, and what the email needs to say...'
  },
  {
    id: 'summary',
    label: 'Summarize',
    system: 'You summarize the given text clearly and concisely, preserving key facts. Use plain prose, no fluff.',
    placeholder: 'Paste the text you want summarized...'
  }
]
