import { useState } from "react";
import { CartContext } from "./CartContext";
import { ProductType } from "../types/Product";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
	const [isCartOpen, setIsOpen] = useState(false);
	const [products, setProducts] = useState<
		Record<number, { product: ProductType; quantity: number }>
	>({});
	const [totalPrice, setTotalPrice] = useState(0);

	const setIsCartOpen = () => {
		setIsOpen(!isCartOpen);
	};

	const addProduct = (productId: number, product: ProductType) => {
		setProducts((prev) => {
			const updatedProducts = {
				...prev,
				[productId]: {
					product: product,
					quantity: 1,
				},
			};

			setTotalPrice((prevTotal) => prevTotal + product.price);

			return updatedProducts;
		});
	};

	const removeProduct = (productId: number) => {
		setProducts((prev) => {
			if (!prev[productId]) {
				return prev;
			}

			const updatedProducts = { ...prev };
			delete updatedProducts[productId];

			const newTotalPrice = Object.values(updatedProducts).reduce(
				(sum, item) => sum + item.product.price * item.quantity,
				0
			);

			setTotalPrice(newTotalPrice);

			return updatedProducts;
		});
	};

	const updateProductQuantity = (productId: number, quantity: number) => {
		setProducts((prev) => {
			if (!prev[productId]) {
				return prev;
			}

			const updatedProducts = {
				...prev,
				[productId]: {
					...prev[productId],
					quantity,
				},
			};

			const newTotalPrice = Object.values(updatedProducts).reduce(
				(sum, item) => sum + item.product.price * item.quantity,
				0
			);

			setTotalPrice(newTotalPrice);

			return updatedProducts;
		});
	};

	const clearCart = () => {
		setProducts({});
		setTotalPrice(0);
	};

	const contextValue = {
		isCartOpen,
		products,
		totalPrice,
		addProduct,
		removeProduct,
		updateProductQuantity,
		clearCart,
		setIsCartOpen,
	};

	return (
		<CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
	);
};
