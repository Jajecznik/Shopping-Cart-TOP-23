import styles from "./SingleProduct.module.css";
import AddToCartButton from "../add_to_cart_button/AddToCartButton";
import { NavLink } from "react-router-dom";
import { ProductType } from "../../types/Product";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

type SingleProductProps = {
	category: string;
	product: ProductType;
};

function SingleProduct({ category, product }: SingleProductProps) {
	const cartContext = useContext(CartContext);
	if (!cartContext) {
		throw new Error("AddToCartButton must be used within a CartProvider");
	}
	const { products } = cartContext;
	const inCart = products[product.id];

	return (
		<NavLink
			to={`/${encodeURIComponent(category)}/${encodeURIComponent(
				product.id
			)}/${encodeURIComponent(product.title)}`}
			state={{ product }}
		>
			<div className={styles.cardContainer}>
				<div className={styles.imageContainer}>
					<img src={product.image} alt={product.title} />
				</div>
				<div className={styles.infoContainer}>
					<p className={styles.title}>{product.title}</p>
					<div>
						<p className={styles.price}>
							<span>$</span>
							{product.price.toFixed(2)}
						</p>
						<div className={styles.actionContainer}>
							<AddToCartButton
								product={product}
								bgColor={inCart ? "orange" : ""}
								bgColorHover={inCart ? "#e68900" : ""}
							>
								{inCart ? <p>In Cart</p> : <p>Add to Cart</p>}
							</AddToCartButton>
						</div>
					</div>
				</div>
			</div>
		</NavLink>
	);
}

export default SingleProduct;
