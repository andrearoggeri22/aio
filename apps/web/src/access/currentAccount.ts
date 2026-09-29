import type { PayloadRequest } from 'payload'

type Account = {
  id: number | string
  role: 'admin' | 'staff' | 'customer'
  status: 'active' | 'disabled'
}

const perRequest = new WeakMap<PayloadRequest, Promise<Account | null>>()

export function currentAccount(req: PayloadRequest): Promise<Account | null> {
  if (!req.user) return Promise.resolve(null)

  const cached = perRequest.get(req)
  if (cached) return cached

  const account = req.payload
    .findByID({ collection: 'users', id: req.user.id, overrideAccess: true, depth: 0 })
    .then((user) => user as Account)
    .catch(() => null)

  perRequest.set(req, account)
  return account
}

export async function isAdmin(req: PayloadRequest): Promise<boolean> {
  const user = await currentAccount(req)
  return user?.status === 'active' && user.role === 'admin'
}
