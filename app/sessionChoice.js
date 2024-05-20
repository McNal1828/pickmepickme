'use client';
import { useEffect, useState } from 'react';
import styles from './sessionChoice.module.css';
import { useRouter } from 'next/navigation';

export default function SeesionChoice({ session_id }) {
	const [sessionid, setsessionid] = useState('');
	useEffect(() => {
		if (session_id) {
			setsessionid(session_id);
		}

		// return () => {
		// 	second;
		// };
	}, []);
	const router = useRouter();
	return (
		<div>
			<div>
				<input
					type='text'
					value={sessionid}
					onChange={(e) => {
						setsessionid(e.target.value);
					}}
				/>
			</div>
			<div>
				<button
					onClick={(e) => {
						fetch('api/session', { method: 'POST' })
							.then((res) => res.json())
							.then((data) => {
								router.push('host');
							});
					}}
				>
					세션생성
				</button>
				<button
					onClick={(e) => {
						fetch('/api/session', {
							method: 'PATCH',
							cache: 'no-store',
							body: JSON.stringify({ sessionid }),
							headers: {
								'Content-Type': 'application/json',
							},
						}).then((res) => {
							if (res.ok) {
								console.log('session exists');
								router.push('host');
							} else {
								alert('존재하지 않는 세션입니다.');
							}
						});
					}}
				>
					세션입장
				</button>
			</div>
		</div>
	);
}
