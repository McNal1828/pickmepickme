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
};

module.exports = nextConfig;
