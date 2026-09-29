import { getPayload, Payload } from 'payload'
import config from '@/payload.config'

import { describe, it, beforeAll, expect } from 'vitest'

let payload: Payload

describe('API', () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
  })

  it('rejects anonymous user creation', async () => {
    await expect(payload.create({
      collection: 'users',
      overrideAccess: false,
      data: {
        email: 'anonymous@azzurra.invalid',
        password: 'testing-password-1234',
        role: 'admin',
        status: 'active',
      },
    })).rejects.toThrow()
  })
})
