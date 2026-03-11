import Logo from '@/Assets/Images/logo.png'
import { Header } from '@/Components/Layout/Header/Header'
import { CompareBtn } from '@/Shared/Ui/Compare/CompareBtn'
import { StoreProvider } from '@/Store/Provider'
import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
export const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
})

export const poppins = Poppins({
	subsets: ['latin'],
	weight: ['500', '600', '700'],
	variable: '--font-poppins',
})

export const metadata: Metadata = {
	title: {
		template: '%s | MediaHub',
		default: 'MediaHub — Media Comparison Engine',
	},
	description:
		'A universal catalog for searching and comparing media content. Find the best movies, games, and books in one place.',
	keywords: ['movies', 'games', 'books', 'comparison', 'catalog'],
	openGraph: {
		title: 'MediaHub — Your guide to the world of entertainment',
		description: 'Compare content and choose the best.',
		images: [Logo.src],
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<head>
				<Script
					src='https://graphicslab.io/sdk/v2/rendex-sdk.min.js'
					strategy='lazyOnload'
				/>
				<link
					rel='preconnect'
					href='https://graphicslab.io'
					crossOrigin='anonymous'
				/>
				<link
					rel='preconnect'
					href='https://image.tmdb.org'
					crossOrigin='anonymous'
				/>
			</head>
			<body className={`${inter.variable} ${poppins.variable} antialiased`}>
				<StoreProvider>
					<Header />
					<div className='relative pt-20'>
						{' '}
						{children}
						<div className='absolute bottom-0 right-6'>
							<CompareBtn />
						</div>
					</div>
				</StoreProvider>
				<div id='portal-root'></div>
				<Script
					id='adsterra-social-bar'
					strategy='afterInteractive'
					className='m-5'
					src='https://pl28734127.effectivegatecpm.com/ab/71/4d/ab714dc25ea17a55f341d613262efb5e.js'
				/>
			</body>
		</html>
	)
}
