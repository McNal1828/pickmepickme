import { cookies } from 'next/headers';

export default function Layout({ children, params }) {
	const cookiestore = cookies();
	const session_id = params.sessionid;
	if (!session_id) {
		return (
			<div className='container'>
				<nav>
					<ul>
						<li>
							<h1>호스트</h1>
						</li>
					</ul>
					<ul>
						<li>세션id : </li>
					</ul>
				</nav>
				<h1>메인페이지에서 세션을 생성해주세요</h1>
			</div>
		);
	}

	return (
		<div className='container'>
			<nav>
				<ul>
					<li>
						<h1>호스트</h1>
					</li>
				</ul>
				<ul>
					<li>세션id : {session_id}</li>
				</ul>
			</nav>
			{children}
		</div>
	);
}
