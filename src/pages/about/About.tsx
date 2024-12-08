import styles from "./About.module.css";

function About() {
	return (
		<div className={styles.container}>
			<div>
				<header className={styles.header}>
					<h1 className={styles.title}>About Us</h1>
					<p className={styles.subtitle}>
						Learn more about our mission and values.
					</p>
				</header>
				<section className={styles.contentSection}>
					<p className={styles.text}>
						At GigaShop, we are passionate about providing high-quality products
						at affordable prices. Our mission is to deliver exceptional customer
						service and create a seamless shopping experience.
					</p>
					<p className={styles.text}>
						Founded in 2022, GigaShop started with a simple goal: to bring joy
						to our customers through a curated selection of products. Today, we
						are proud to serve a growing community of satisfied shoppers.
					</p>
				</section>
			</div>
			<footer className={styles.contactSection}>
				<h2 className={styles.contactTitle}>Contact Information</h2>
				<p className={styles.contactInfo}>
					<strong>Address:</strong> 123 Main Street, GigaCity, YC 12345
				</p>
				<p className={styles.contactInfo}>
					<strong>Phone:</strong> (123) 456-7890
				</p>
				<p className={styles.contactInfo}>
					<strong>Email:</strong> contact@gigashop.com
				</p>
			</footer>
		</div>
	);
}

export default About;
