/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: `${process.env.SQLITEBACK}/:path*`,
			},
		];
	},
	images: {
		remotePatterns: [
			{
				hostname: 's3.mcnal.net',
				pathname: '/**',
				protocol: 'https',
			},
		],
	},
	reactStrictMode: false,
};

module.exports = nextConfig;
