import { AuthenticationError, type CollectionConfig } from 'payload'
import { currentAccount, isAdmin } from '../access/currentAccount'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: { useAsTitle: 'email' },
  auth: {
    useSessions: true,
    maxLoginAttempts: 5,
    tokenExpiration: 60 * 60,
    removeTokenFromResponses: true,
  },
  access: {
    admin: async ({ req }) => {
      const account = await currentAccount(req)
      return account?.status === 'active' &&
        (process.env.AZZURRA_ACCESS_MODE === 'open' || account.role === 'admin')
    },
    create: ({ req }) => isAdmin(req),
    read: async ({ req }) => {
      const account = await currentAccount(req)
      if (account?.status !== 'active') return false
      if (account.role === 'admin') return true
      return { id: { equals: account.id } }
    },
    update: ({ req }) => isAdmin(req),
    delete: ({ req }) => isAdmin(req),
  },
  hooks: {
    beforeLogin: [({ user }) => {
      if (user.status !== 'active') throw new AuthenticationError()
      if (process.env.AZZURRA_ACCESS_MODE !== 'open' && user.role !== 'admin') {
        throw new AuthenticationError()
      }
      return user
    }],
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'customer',
      options: [
        { label: 'Amministratore', value: 'admin' },
        { label: 'Personale', value: 'staff' },
        { label: 'Cliente', value: 'customer' },
      ],
      access: {
        create: ({ req }) => isAdmin(req),
        update: ({ req }) => isAdmin(req),
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'disabled',
      options: [
        { label: 'Attivo', value: 'active' },
        { label: 'Disabilitato', value: 'disabled' },
      ],
      access: {
        create: ({ req }) => isAdmin(req),
        update: ({ req }) => isAdmin(req),
      },
    },
  ],
}
