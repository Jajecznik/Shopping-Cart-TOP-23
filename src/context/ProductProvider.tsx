import { useState } from "react";
import { ProductContext } from "./ProductContext";
import { ProductType } from "../types/Product";

export const ProductProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [productsByCategory, setProductsByCategory] = useState<
		Record<string, ProductType[]>
	>({});

	const setProductsForCategory = (
		category: string,
		products: ProductType[]
	) => {
		setProductsByCategory((prev) => ({
			...prev,
			[category]: products,
		}));
	};

	const contextValue = {
		productsByCategory,
		setProductsForCategory,
	};

	return (
		<ProductContext.Provider value={contextValue}>
			{children}
		</ProductContext.Provider>
	);
};
