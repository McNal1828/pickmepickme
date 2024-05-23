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
	console.log(choose);
	useEffect(() => {
		// WebSocket 연결 설정
		const ws = new WebSocket(`${process.env.NEXT_PUBLIC_SQLITEBACK_WS}/api/ws`);
		ws.onopen = () => {
			console.log('WebSocket connected');
			ws.send(JSON.stringify({ type: 'join', room: sessionid }));
			ws.send(JSON.stringify({ type: 'leader', room: sessionid, team }));
			ws.send(JSON.stringify({ type: 'state', room: sessionid, team }));
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
			if (data.type === 'state') {
				setcurstate(data.content);
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
			{curstate === 'rspwaiting' ? (
				<dialog open>
					<article>
						<h2>가위바위보 선택</h2>
						<p>버튼을 클릭해주세요</p>
						<div style={{ display: 'flex', justifyContent: 'space-around' }}>
							<button
								onClick={(e) => {
									socket.send(JSON.stringify({ type: 'rsp', room: sessionid, content: 'scissors', team }));
								}}
							>
								가위
							</button>
							<button
								onClick={(e) => {
									socket.send(JSON.stringify({ type: 'rsp', room: sessionid, content: 'rock', team }));
								}}
							>
								바위
							</button>
							<button
								onClick={(e) => {
									socket.send(JSON.stringify({ type: 'rsp', room: sessionid, content: 'paper', team }));
								}}
							>
								보
							</button>
						</div>
					</article>
				</dialog>
			) : (
				''
			)}
			{curstate === 'oprspwaiting' ? (
				<dialog open>
					<article>
						<h2>가위바위보 선택</h2>
						<p>상대방의 선택을 기다리는 중...</p>
					</article>
				</dialog>
			) : (
				''
			)}

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
							<button
								className={styles.choosebtn}
								onClick={(e) => {
									document.getElementById('cele').classList.add(styles.clicked);
									setTimeout(function () {
										document.getElementById('cele').classList.remove(styles.clicked);
									}, 500);
									socket.send(JSON.stringify({ type: 'turn', room: sessionid, team, content: choose }));
									socket.send(JSON.stringify({ type: 'message', room: sessionid, content: `${team}팀 ${choosename}선택` }));
								}}
								disabled={curstate == 'opturn' ? true : curstate == 'myturn' ? false : true}
							>
								{curstate == 'opturn' ? '상대턴' : curstate == 'myturn' ? '내턴' : '대기중'}
							</button>
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
