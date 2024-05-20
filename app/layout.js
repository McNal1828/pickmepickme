import './globals.css';

export const metadata = {
	title: 'pickmepickme',
	description: '선수를 골라 팀을 꾸려보세요',
};

export default function RootLayout({ children }) {
	return (
		<html lang='ko'>
			<body>{children}</body>
		</html>
	);
}
