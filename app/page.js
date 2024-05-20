import StartBtn from '@/component/startbtn';
import styles from './page.module.css';
import init from '@/util/initdb';

export default function Home() {
	init();
	return (
		<>
			<div>
				<StartBtn />
			</div>
		</>
	);
}
