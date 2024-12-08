import styles from "./Payment.module.css";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

function Payment() {
	const context = useContext(CartContext);

	if (!context) {
		throw new Error("Cannot get cart data!");
	}

	const { totalPrice } = context;

	return (
		<div className={styles.paymentContainer}>
			<h1 className={styles.title}>Payment Summary</h1>
			<div className={styles.paymentDetails}>
				<p className={styles.label}>Total Price:</p>
				<p className={styles.amount}>${totalPrice.toFixed(2)}</p>
			</div>
			<div className={styles.buttonContainer}>
				<button className={styles.payButton}>Proceed to Payment</button>
			</div>
		</div>
	);
}

export default Payment;
