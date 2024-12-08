import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useCategories } from "../../hooks/useCategories";
import { useState } from "react";

function NavBar() {
	const { categories, error, loading } = useCategories();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	if (loading) return <p className="loadingInfo">Loading categories...</p>;
	if (error) return <p className="errorInfo">Error: {error}</p>;

	return (
		<div>
			<div className={styles.menu} onClick={() => setIsMenuOpen(true)}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					className={styles.icon}
				>
					<path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
				</svg>
			</div>
			<nav
				className={`${styles.navBar} ${
					isMenuOpen ? `${styles.open} ${styles.ulListOpen}` : styles.close
				}`}
			>
				<ul className={styles.ulList}>
					<li className={styles.liList}>
						<Link to="/" onClick={() => setIsMenuOpen(false)}>
							Home
						</Link>
					</li>
					<li className={`${styles.liList} ${styles.productsList}`}>
						<p>Categories &#9660;</p>
						{categories && (
							<ul className={styles.dropdown}>
								{categories.map((category) => (
									<li key={category} className={styles.dropdownItem}>
										<NavLink
											to={`/${encodeURIComponent(category)}`}
											onClick={() => setIsMenuOpen(false)}
										>
											<p>{category.toUpperCase()}</p>
										</NavLink>
									</li>
								))}
							</ul>
						)}
					</li>
					<li className={styles.liList}>
						<Link to="/about" onClick={() => setIsMenuOpen(false)}>
							About
						</Link>
					</li>
				</ul>
				<p
					className={`${styles.menuExit}`}
					onClick={() => setIsMenuOpen(false)}
				>
					&#x2716;
				</p>
			</nav>
		</div>
	);
}

export default NavBar;
