import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import style from "./AddToCartButton.module.css";
import { ProductType } from "../../types/Product";

type AddToCartButtonProps = {
	children: React.ReactNode;
	product: ProductType;
	bgColor: string;
	bgColorHover: string;
};

function AddToCartButton({
	children,
	product,
	bgColor,
	bgColorHover,
}: AddToCartButtonProps) {
	const [hover, setHover] = useState(false);
	const cartContext = useContext(CartContext);
	if (!cartContext) {
		throw new Error("AddToCartButton must be used within a CartProvider");
	}
	const { addProduct } = cartContext;

	const handleAdd = (event: React.MouseEvent) => {
		event.preventDefault();
		addProduct(product.id, product);
	};

	return (
		<button
			onClick={handleAdd}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			className={style.addToCartButton}
			style={{ backgroundColor: hover ? bgColorHover : bgColor }}
		>
			{children}
		</button>
	);
}

export default AddToCartButton;
