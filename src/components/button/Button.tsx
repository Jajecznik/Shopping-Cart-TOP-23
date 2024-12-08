import { useContext } from "react";
import style from "./Button.module.css";
import { CartContext } from "../../context/CartContext";

type ButtonProps = {
	children: React.ReactNode;
};

function Button({ children }: ButtonProps) {
	const cartContext = useContext(CartContext);
	if (!cartContext) {
		throw new Error("AddToCartButton must be used within a CartProvider");
	}

	const { products, setIsCartOpen } = cartContext;

	return (
		<button className={style.button} onClick={() => setIsCartOpen()}>
			{children}
			<div className={style.amount}>{Object.keys(products).length}</div>
		</button>
	);
}

export default Button;
