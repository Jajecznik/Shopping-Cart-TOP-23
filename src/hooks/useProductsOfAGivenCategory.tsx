import { useState, useEffect, useContext } from "react";
import { ProductType } from "../types/Product";
import { ProductContext } from "../context/ProductContext";

export const fetchProductsOfAGivenCategory = async (
	category: string
): Promise<[]> => {
	const response = await fetch(
		`https://fakestoreapi.com/products/category/${category}`
	);
	if (!response.ok) throw new Error("Failed to fetch products");
	return await response.json();
};

export const useProductsOfAGivenCategory = (category: string | null) => {
	const context = useContext(ProductContext);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!category) {
			setLoading(false);
			setError("Category is not provided");
			return;
		}

		if (context && context.productsByCategory[category]) {
			setLoading(false);
			return;
		}

		const fetchAndStoreProducts = async () => {
			setLoading(true);
			try {
				const products: ProductType[] = await fetchProductsOfAGivenCategory(
					category
				);
				context?.setProductsForCategory(category, products);
			} catch (err) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError("An unexpected error occurred");
				}
			} finally {
				setLoading(false);
			}
		};

		fetchAndStoreProducts();
	}, [context, category]);

	return { error, loading };
};
