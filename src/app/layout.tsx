import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KNO.ACADEMY - Learn to Earn Platform',
  description: 'Plateforme d\'apprentissage révolutionnaire qui récompense vos connaissances avec des tokens $KNO. Formez-vous, gagnez des cryptomonnaies et participez à l\'économie de la connaissance.',
  keywords: 'learn to earn, formation, blockchain, tokens, KNO, éducation, cryptomonnaie, apprentissage',
  openGraph: {
    title: 'KNO.ACADEMY - Learn to Earn Platform',
    description: 'Plateforme d\'apprentissage révolutionnaire qui récompense vos connaissances avec des tokens $KNO',
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KNO.ACADEMY - Learn to Earn Platform',
    description: 'Plateforme d\'apprentissage révolutionnaire qui récompense vos connaissances avec des tokens $KNO',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}