import { createContext } from "react";
import { ProductType } from "../types/Product";

type CartContextType = {
	isCartOpen: boolean;
	products: Record<number, { product: ProductType; quantity: number }>;
	totalPrice: number;
	setIsCartOpen: () => void;
	addProduct: (productId: number, product: ProductType) => void;
	removeProduct: (productId: number) => void;
	updateProductQuantity: (productId: number, quantity: number) => void;
	clearCart: () => void;
};

export const CartContext = createContext<CartContextType | null>(null);
