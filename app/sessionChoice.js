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
		<div className={styles.wrapper}>
			<div className={`${styles.container} container`}>
				<div>
					<input
						type='text'
						value={sessionid}
						onChange={(e) => {
							setsessionid(e.target.value);
						}}
					/>
				</div>
				<div className={styles.btns}>
					<button
						onClick={(e) => {
							fetch('api/session', { method: 'POST' })
								.then((res) => res.json())
								.then((data) => {
									console.log(data);
									router.push(`host/${data.sessionid}`);
								});
						}}
					>
						세션생성
					</button>
					<button
						onClick={(e) => {
							fetch(`/api/session?sessionid=${sessionid}`, {
								cache: 'no-store',
							}).then((res) => {
								if (res.ok) {
									console.log('session exists');
									router.push('participants');
								} else {
									alert('존재하지 않는 세션입니다.');
								}
							});
						}}
					>
						세션참여
					</button>
					<button
						onClick={(e) => {
							fetch(`/api/session?sessionid=${sessionid}`, {
								cache: 'no-store',
							}).then((res) => {
								console.log(res);
								if (res.ok) {
									console.log('session exists');
									router.push(`client/${sessionid}`);
								} else {
									alert('존재하지 않는 세션입니다.');
								}
							});
						}}
					>
						세션보기
					</button>
				</div>
			</div>
		</div>
	);
}
