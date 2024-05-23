import StoreProvider from '@/util/redux/storeProvider';
import './globals.css';

export const metadata = {
	title: 'pickmepickme',
	description: '선수를 골라 팀을 꾸려보세요',
};

export default function RootLayout({ children }) {
	return (
		<html lang='ko'>
			<head>
				<meta name='color-scheme' content='light dark' />
				<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.cyan.min.css' />
			</head>
			<body>
				<StoreProvider> {children}</StoreProvider>
			</body>
		</html>
	);
}
