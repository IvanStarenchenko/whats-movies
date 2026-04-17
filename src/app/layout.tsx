import { Header } from '@/Components/Layout/Header/Header'
import { CompareBtn } from '@/Shared/Ui/Compare/CompareBtn'
import { ContactForm } from '@/Shared/Ui/Feedback/Feedback'
import { StoreProvider } from '@/Store/Provider'
import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

export const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter'
})

export const poppins = Poppins({
	subsets: ['latin'],
	weight: ['500', '600', '700'],
	variable: '--font-poppins'
})

export const metadata: Metadata = {
	metadataBase: new URL('https://media-hub.lol'),
	title: {
		template: '%s | MediaHub',
		default: 'MediaHub — Смотреть фильмы, сериалы и игры онлайн в HD'
	},
	description:
		'Универсальный каталог для поиска и сравнения медиа-контента. Смотрите фильмы, сериалы и находите лучшие игры в одном месте.',
	keywords: [
		'смотреть фильмы',
		'сериалы онлайн',
		'база игр',
		'imdb поиск',
		'mediahub'
	],
	icons: {
		icon: [{ url: '/favicon.ico' }, { url: '/icon.png', type: 'image/png' }],
		apple: [{ url: '/apple-icon.png' }]
	},
	openGraph: {
		title: 'MediaHub — Твой гид в мире развлечений',
		description: 'Сравнивай контент и выбирай лучшее. Все новинки кино и игр.',
		url: 'https://media-hub.lol',
		siteName: 'MediaHub',
		images: [
			{
				url: '/opengraph-image.png',
				width: 1200,
				height: 630,
				alt: 'MediaHub Logo'
			}
		],
		locale: 'ru_RU',
		type: 'website'
	}
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="ru">
			<body className={`${inter.variable} ${poppins.variable} antialiased`}>
				<Script
					src="https://graphicslab.io/sdk/v2/rendex-sdk.min.js"
					strategy="lazyOnload"
				/>
				<StoreProvider>
					<Header />
					<main className="relative pt-20">
						{children}
						<div className="fixed bottom-8 right-3 z-20">
							<ContactForm />
						</div>
						<div className="absolute bottom-0 right-6">
							<CompareBtn />
						</div>
					</main>
				</StoreProvider>
				<div id="portal-root"></div>
			</body>
		</html>
	)
}
