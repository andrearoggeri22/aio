import React from 'react'

export const metadata = {
  description: 'Piattaforma gestionale Azzurra',
  title: 'Azzurra',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="it">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
