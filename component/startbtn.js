'use client';

export default function StartBtn() {
	return (
		<button
			onClick={(e) => {
				fetch('api/session', { method: 'PUT' })
					.then((res) => res.json())
					.then((data) => {
						console.log(data);
					});
			}}
		>
			세션생성
		</button>
	);
}
