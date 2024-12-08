import styles from "./Home.module.css";

function Home() {
	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<h1 className={styles.title}>Welcome to GigaShop</h1>
				<p className={styles.subtitle}>
					Discover our amazing products and great deals!
				</p>
			</header>
		</div>
	);
}

export default Home;
