import './sass/globals.sass'

export const metadata = {
  title: 'Wheater',
  description: 'A Wheater app that show you the time of your city',
  icons: {
    // icon: '/icon.png',
    shortcut: '/icon48.png',
  },
  
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  )
}
