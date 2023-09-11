import './style.css'

export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body className='primary'>{children}</body>
      </html>
    )
  }
  