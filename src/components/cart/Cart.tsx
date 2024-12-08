import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import styles from "./Cart.module.css";
import { ProductContext } from "../../context/ProductContext";
import { NavLink } from "react-router-dom";

function Cart() {
	const cartContext = useContext(CartContext);
	const productContext = useContext(ProductContext);

	if (!cartContext) {
		throw new Error("Cannot get cart data!");
	}
	if (!productContext) {
		throw new Error("Cannot get product data!");
	}

	const {
		isCartOpen,
		products,
		totalPrice,
		setIsCartOpen,
		removeProduct,
		updateProductQuantity,
		clearCart,
	} = cartContext;

	const handleRemove = (productId: number) => {
		removeProduct(productId);
	};

	const handleQuantityChange = (productId: number, quantity: number) => {
		updateProductQuantity(productId, quantity);
	};

	const handleCartClose = () => {
		setIsCartOpen();
	};

	return (
		<div className={`${styles.cart} ${isCartOpen ? styles.open : ""}`}>
			<div className={styles.header}>
				<h2>Your Cart</h2>
				<span onClick={handleCartClose}>&#x2716;</span>
			</div>
			<div className={styles.cartContent}>
				{Object.keys(products).length === 0 ? (
					<p>Your cart is empty</p>
				) : (
					Object.entries(products).map(([productId, { product, quantity }]) => (
						<div key={productId} className={styles.product}>
							<div className={styles.productInfo}>
								<p>{product.title}</p>
								<div style={{ maxWidth: "150px" }}>
									<img src={product.image}></img>
								</div>
								<p>Price: ${product.price.toFixed(2)}</p>
								<p>Total price: ${(product.price * quantity).toFixed(2)}</p>
							</div>
							<div className={styles.productActions}>
								<button
									className={styles.removeBtn}
									onClick={() => handleRemove(Number(productId))}
								>
									Remove
								</button>
								<input
									type="number"
									value={quantity}
									min="1"
									onChange={(e) =>
										handleQuantityChange(
											Number(productId),
											Number(e.target.value)
										)
									}
									className={styles.quantityInput}
								/>
							</div>
						</div>
					))
				)}
			</div>
			<div>
				{Object.keys(products).length > 0 && (
					<p>
						To be paid: <span>$</span>
						{totalPrice.toFixed(2)}
					</p>
				)}
			</div>
			<div className={styles.cartActions}>
				<button
					disabled={Object.keys(products).length === 0}
					className={styles.checkoutBtn}
				>
					<NavLink
						to={`/payment`}
						style={{
							pointerEvents:
								Object.keys(products).length === 0 ? "none" : "auto",
							color: Object.keys(products).length === 0 ? "gray" : "inherit",
						}}
					>
						Go to Checkout
					</NavLink>
				</button>

				<button className={styles.clearBtn} onClick={clearCart}>
					Clear Cart
				</button>
			</div>
		</div>
	);
}

export default Cart;
