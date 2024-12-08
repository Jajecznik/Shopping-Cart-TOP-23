import { Link, useLocation, useParams } from "react-router-dom";
import styles from "./SingleProductDetails.module.css";
import { useSingleProduct } from "../../hooks/useSingleProduct";
import AddToCartButton from "../../components/add_to_cart_button/AddToCartButton";
import { ProductType } from "../../types/Product";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

function SingleProductDetails() {
	const location = useLocation();
	const { productId } = useParams<{
		productId: string;
	}>();
	const productFromState = location.state?.product;
	const { product, error, loading } = useSingleProduct(productId!);

	const singleProduct: ProductType = productFromState || product;

	const cartContext = useContext(CartContext);
	if (!cartContext) {
		throw new Error("AddToCartButton must be used within a CartProvider");
	}
	const { products } = cartContext;

	if (!product) {
		return <p>Product data not available</p>;
	}
	if (loading) return <p className="loadingInfo">Loading categories...</p>;
	if (error) return <p className="errorInfo">Error: {error}</p>;

	const inCart = products[singleProduct.id];

	return (
		<div>
			<p className={styles.returnToCategories}>
				<Link to={`/${encodeURIComponent(singleProduct.category)}`}>
					Back to <span>{singleProduct.category}</span>
				</Link>
			</p>
			<div className={styles.container}>
				<h2 className={styles.title}>{singleProduct.title}</h2>
				<img
					className={styles.image}
					src={singleProduct.image}
					alt={singleProduct.title}
				/>
				<p className={styles.price}>
					Price: <span>${singleProduct.price.toFixed(2)}</span>
				</p>
				<p className={styles.category}>Category: {singleProduct.category}</p>
				<p className={styles.description}>
					Description: {singleProduct.description}
				</p>
				<p className={styles.rating}>
					Rating: {singleProduct.rating.rate} / 5 ({singleProduct.rating.count}{" "}
					reviews)
				</p>
				<div className={styles.cartButton}>
					<AddToCartButton
						product={singleProduct}
						bgColor={inCart ? "orange" : ""}
						bgColorHover={inCart ? "#e68900" : ""}
					>
						{inCart ? <p>In Cart</p> : <p>Add to Cart</p>}
					</AddToCartButton>
				</div>
			</div>
		</div>
	);
}

export default SingleProductDetails;
