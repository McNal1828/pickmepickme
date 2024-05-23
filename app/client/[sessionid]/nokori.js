'use client';
import Image from 'next/image';
import styles from './nokori.module.css';
import useSWR from 'swr';
import { useAppDispatch } from '@/util/redux/hooks';
import { chgpick, choose, rstpick } from '@/util/redux/reducers/pick';
import { useEffect, useState } from 'react';

export default function Nokori({ sessionid, teamstate, teamstatefunc }) {
	useEffect(() => {
		if (teamstate) {
			console.log('nokori refresh');
			mutate();
			teamstatefunc(false);
			dispatch(rstpick());
			setsemiselect('');
			setselect('');
		}
	}, [teamstate]);
	const [semiselect, setsemiselect] = useState('');
	const [select, setselect] = useState('');
	const dispatch = useAppDispatch();
	const fetcher = (...args) => fetch(...args, { cache: 'no-store' }).then((res) => res.json());
	const { data, error, isLoading, mutate } = useSWR(`/api/item?sessionid=${sessionid}&team=0`, fetcher, {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
		revalidateOnMount: true,
	});
	if (isLoading) {
		return (
			<>
				<article aria-busy='true'></article>
			</>
		);
	}
	if (error) {
		return (
			<>
				<article aria-busy='true'></article>
			</>
		);
	}

	/**
	 * @type {[{id,idx,name,picture_url,intruduce,detail,uuid,team}]}
	 */
	const rows = data.rows;

	return (
		<>
			<div className={styles.container}>
				{rows.map((item) => (
					<article
						key={item.uuid}
						className={styles.item}
						onMouseEnter={(e) => {
							setsemiselect(item.uuid);
							dispatch(chgpick({ imgurl: item.picture_url, name: item.name, detail: item.detail, uuid: item.uuid }));
						}}
						onClick={(e) => {
							dispatch(choose(item.uuid));
							setselect(item.uuid);
						}}
						data-semiselected={semiselect == item.uuid ? true : false}
						data-selected={select == item.uuid ? true : false}
					>
						<div className={styles.img}>
							<Image src={item.picture_url} fill alt='아이템사진' />
						</div>
					</article>
				))}
			</div>
		</>
	);
}
