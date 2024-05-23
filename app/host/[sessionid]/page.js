'use client';
import { useRef, useState } from 'react';
import styles from './page.module.css';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';

export default function Home({ params }) {
	const sessionid = params.sessionid;
	const [itemlist, setitemlist] = useState([]);
	const [itemimg, setitemimg] = useState('/image/default.jpg');
	const [itemimgfile, setitemimgfile] = useState(null);
	const [itemimgext, setitemimgext] = useState('jpg');
	const [itemname, setitemname] = useState('');
	const [itemintro, setitemintro] = useState('');
	const [itemdetail, setitemdetail] = useState([]);
	const [itemdetailt, setitemdetailt] = useState('');
	const [isuploading, setisuploading] = useState(false);

	const imginput = useRef(null);

	return (
		<>
			<div className={styles.wrapper}>
				<div className={`${styles.itemlist} container`}>
					{''}
					{itemlist.map((item) => (
						<article className={`${styles.article}`} key={item.uuid}>
							<svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg' className='header_icon__8SHkt'>
								<g clipPath='url(#clip0_1128_3162)'>
									<rect x='11' y='13' width='18' height='2' rx='1' fill='currentColor'></rect>
									<rect x='11' y='19' width='18' height='2' rx='1' fill='currentColor'></rect>
									<rect x='11' y='25' width='18' height='2' rx='1' fill='currentColor'></rect>
								</g>
							</svg>
							<div className={styles.articlewrapper}>
								<div className={styles.nlimg}>
									<Image src={item.picture_url} alt='아이템 이미지' fill />
								</div>
								<p className={styles.listName}>{item.name}</p>
							</div>

							<svg width='30' height='30' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
								<g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
								<g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
								<g id='SVGRepo_iconCarrier'>
									<path
										d='M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z'
										fill='currentColor'
									></path>
								</g>
							</svg>
						</article>
					))}
				</div>
				<div className={styles.itencreate}>
					<form>
						<div>
							<div className={styles.iteminfo}>
								<div className={styles.imgcontainer}>
									<div className={styles.nimg}>
										<Image src={itemimg} alt='아이템 이미지' fill />
									</div>
									<input
										type='file'
										accept='image/*'
										onChange={(e) => {
											const file = e.target.files[0];
											if (file) {
												const url = URL.createObjectURL(file);
												setitemimg(url);
												setitemimgfile(file);
												setitemimgext(file.name.substring(file.name.lastIndexOf('.') + 1));
											}
										}}
										ref={imginput}
									/>
								</div>
								<div style={{ flexGrow: 1 }}>
									<label>이름</label>
									<input
										value={itemname}
										onChange={(e) => {
											setitemname(e.target.value);
										}}
									/>
									<label>소개</label>
									<input
										value={itemintro}
										onChange={(e) => {
											setitemintro(e.target.value);
										}}
									/>
								</div>
							</div>
							<label>상세항목</label>
							<fieldset role='group'>
								<input
									value={itemdetailt}
									onChange={(e) => {
										setitemdetailt(e.target.value);
									}}
								/>
								<div
									role='button'
									style={{
										padding: 0,
										borderRadius: '0 5px 5px 0',
										minWidth: '50px',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}
									onClick={(e) => {
										if (itemdetailt.length != 0) {
											setitemdetail((list) => [...list, itemdetailt]);
											setitemdetailt('');
										}
									}}
								>
									추가
								</div>
							</fieldset>
							<ul>
								{itemdetail.map((detail, index) => (
									<li key={index}>{detail}</li>
								))}
							</ul>
						</div>
						<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
							{isuploading ? (
								<article aria-busy='true' className='outline' style={{ marginBottom: 0 }}>
									등록중입니다.
								</article>
							) : (
								''
							)}
							<button
								onClick={(e) => {
									e.preventDefault();
									if (!itemname) {
										alert('이름은 필수항목입니다');
									} else {
										const uuid_ = uuidv4();
										setisuploading(true);
										if (!!!itemimgfile) {
											const newItem = {
												id: sessionid,
												name: itemname,
												introduce: itemintro,
												detail: itemdetail,
												picture_url: `https://s3.mcnal.net/pickmepickme/default.jpg`,
												uuid: uuid_,
												team: 0,
											};
											setitemlist((list) => [...list, newItem]);
											setitemname('');
											setitemintro('');
											setitemdetail([]);
											setitemdetailt('');
											setitemimg('/image/default.jpg');
											setitemimgfile(null);
											setitemimgext('jpg');
											setisuploading(false);
											imginput.current.value = '';
										} else {
											const newItem = {
												id: sessionid,
												name: itemname,
												introduce: itemintro,
												detail: itemdetail,
												picture_url: `https://s3.mcnal.net/pickmepickme/${sessionid}/${uuid_}.${itemimgext}`,
												uuid: uuid_,
												team: 0,
											};
											fetch('/api/item', {
												method: 'PUT',
												cache: 'no-store',
												body: JSON.stringify({ sessionid: sessionid, uuid: uuid_, ext: itemimgext }),
												headers: {
													'Content-Type': 'application/json',
												},
											})
												.then((res) => res.json())
												.then((data) => {
													fetch(data.presignedUrl, { method: 'PUT', body: itemimgfile })
														.then((res) => res.ok)
														.then((data) => {
															setitemlist((list) => [...list, newItem]);
															setitemname('');
															setitemintro('');
															setitemdetail([]);
															setitemdetailt('');
															setitemimg('/image/default.jpg');
															setitemimgfile(null);
															setitemimgext('jpg');
															setisuploading(false);
															imginput.current.value = '';
														});
												});
										}
									}
								}}
							>
								선수등록하기
							</button>
						</div>
					</form>
				</div>
			</div>
			<div className={styles.btns}>
				<button
					className='secondary'
					onClick={(e) => {
						setitemlist([]);
					}}
				>
					초기화하기
				</button>
				<button
					className='contrast'
					onClick={(e) => {
						fetch(`/api/session`, {
							method: 'PATCH',
							cache: 'no-store',
							body: JSON.stringify({ sessionid }),
							headers: {
								'Content-Type': 'application/json',
							},
						}).then((res) => {
							if (res.ok) {
								alert('세션 팀구성을 초기화했습니다');
							} else {
								alert('존재하지 않는 세션입니다.');
							}
						});
					}}
				>
					팀다시구성하기
				</button>
				<button
					onClick={(e) => {
						fetch(`/api/session`, {
							method: 'PUT',
							cache: 'no-store',
							body: JSON.stringify({ sessionid, data: itemlist }),
							headers: {
								'Content-Type': 'application/json',
							},
						}).then((res) => {
							if (res.ok) {
								alert('저장을 완료했습니다.');
							} else {
								alert('존재하지 않는 세션입니다.');
							}
						});
					}}
				>
					저장하기
				</button>
			</div>
		</>
	);
}
