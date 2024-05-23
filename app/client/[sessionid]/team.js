'use client';
import Image from 'next/image';
import styles from './team.module.css';
import useSWR from 'swr';
import { useEffect } from 'react';

export default function Team({ sessionid, team, teamstate, teamstatefunc }) {
	useEffect(() => {
		if (teamstate) {
			console.log('team', team, 'refresh');
			mutate();
			teamstatefunc(false);
		}
	}, [teamstate]);
	const fetcher = (...args) => fetch(...args, { cache: 'no-store' }).then((res) => res.json());
	const { data, error, isLoading, mutate } = useSWR(`/api/item?sessionid=${sessionid}&team=${team}`, fetcher, {
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
			{rows.map((item) => (
				<article key={item.uuid} className={styles.list}>
					<div className={styles.limg}>
						<Image src={item.picture_url} fill alt='아이템사진' />
					</div>
					<span className={styles.name}>{item.name}</span>
				</article>
			))}
		</>
	);
}
