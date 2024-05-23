'use client';
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import Team from './team';
import Nokori from './nokori';
import Image from 'next/image';
import { useAppSelector } from '@/util/redux/hooks';

export default function Home({ params }) {
	const { imgurl: pickimgurl, name: pickname, detail: pickdetail, uuid, choose, choosename } = useAppSelector((state) => state.pick);
	const sessionid = params.sessionid;
	const team = params.team;
	const [socket, setSocket] = useState(null);
	const [message, setMessage] = useState('');
	const [receivedMessages, setReceivedMessages] = useState([]);
	const [team1, setteam1] = useState(false);
	const [team2, setteam2] = useState(false);
	const [nokori, setnokori] = useState(false);
	const [curstate, setcurstate] = useState('');
	useEffect(() => {
		// WebSocket 연결 설정
		const ws = new WebSocket(`${process.env.NEXT_PUBLIC_SQLITEBACK_WS}/api/ws`);
		ws.onopen = () => {
			console.log('WebSocket connected');
			ws.send(JSON.stringify({ type: 'join', room: sessionid }));
		};
		ws.onmessage = (event) => {
			const data = JSON.parse(event.data);
			console.log(data);
			if (data.type === 'message') {
				setReceivedMessages((prevMessages) => [...prevMessages, data.content]);
				setTimeout(() => {
					const msli = document.getElementById('messagelist');
					msli.scrollTo(0, msli.scrollHeight);
				}, 50);
			}
			if (data.type === 'refresh') {
				setteam1(true);
				setteam2(true);
				setnokori(true);
			}
		};

		ws.onclose = () => {
			console.log('WebSocket disconnected');
		};

		setSocket(ws);
		return () => {
			ws.close();
			setSocket(null);
		};
	}, []);

	const sendMessage = () => {
		if (socket && socket.readyState === WebSocket.OPEN) {
			socket.send(JSON.stringify({ type: 'message', room: sessionid, content: message }));
			setMessage('');
		}
	};
	return (
		<>
			<div className={`${styles.container}`}>
				<div className={styles.side}>
					<Team sessionid={sessionid} team={1} teamstate={team1} teamstatefunc={setteam1} />
				</div>
				<div className={styles.center}>
					<div className={styles.centertop}>
						<div className={`${styles.selected}`}>
							<div id='cele' className={styles.cele} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
								<div className={styles.limg}>
									<Image src={pickimgurl} alt='선택자' fill />
								</div>
								<h4>{pickname}</h4>
							</div>
							<div style={{ flexGrow: 1, overflowY: 'scroll' }}>
								<ul>
									{pickdetail.map((item, index) => (
										<li key={index}>{item}</li>
									))}
								</ul>
							</div>
						</div>
						<div>
							<Nokori sessionid={sessionid} teamstate={nokori} teamstatefunc={setnokori} />
						</div>
					</div>
					<div>
						<article className={styles.messagelist} id='messagelist'>
							{receivedMessages.map((message, index) => (
								<div key={index}>{message}</div>
							))}
						</article>
						<form>
							<fieldset role='group'>
								<input
									value={message}
									onChange={(e) => {
										setMessage(e.target.value);
									}}
								/>
								<input
									onClick={(e) => {
										e.preventDefault();
										if (!!message) {
											sendMessage();
										}
									}}
									type='submit'
									value='전송'
								/>
							</fieldset>
						</form>
					</div>
				</div>
				<div className={styles.side}>
					<Team sessionid={sessionid} team={2} teamstate={team2} teamstatefunc={setteam2} />
				</div>
			</div>
		</>
	);
}
