import { createContext } from "react";
import { ProductType } from "../types/Product";

type ProductContextType = {
	productsByCategory: Record<string, ProductType[]>;
	setProductsForCategory: (category: string, products: ProductType[]) => void;
};

export const ProductContext = createContext<ProductContextType | null>(null);
