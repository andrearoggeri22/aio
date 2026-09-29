import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const email = process.env.BOOTSTRAP_ADMIN_EMAIL
const password = process.env.BOOTSTRAP_ADMIN_PASSWORD

if (!email || !password || password.length < 16) {
  throw new Error('Set BOOTSTRAP_ADMIN_EMAIL and a password of at least 16 characters')
}

const payload = await getPayload({ config })
const existing = await payload.find({ collection: 'users', limit: 1, overrideAccess: true })

if (existing.totalDocs !== 0) {
  throw new Error('Bootstrap refused: the users collection is not empty')
}

await payload.create({
  collection: 'users',
  overrideAccess: true,
  data: { email, password, role: 'admin', status: 'active' },
})

console.log('Initial administrator created')
