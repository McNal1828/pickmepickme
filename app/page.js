import styles from './page.module.css';
// import init from '@/util/initdb';
import { cookies } from 'next/headers';
import SeesionChoice from './sessionChoice.js';

export default function Home() {
	// init();
	const cookiestore = cookies();
	const session_id = cookiestore?.get('session_id').value;
	return (
		<>
			<div>
				<SeesionChoice session_id={session_id} />
			</div>
		</>
	);
}
