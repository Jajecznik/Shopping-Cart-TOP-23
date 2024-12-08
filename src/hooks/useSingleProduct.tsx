import { useEffect, useState } from "react";
import { ProductType } from "../types/Product";

export const fetchSingleProductForId = async (
	id: string
): Promise<ProductType> => {
	const response = await fetch(`https://fakestoreapi.com/products/${id}`);
	if (!response.ok) throw new Error("Failed to fetch product");
	return await response.json();
};

export const useSingleProduct = (id: string) => {
	const [product, setProduct] = useState<ProductType | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	const fetchSingleProduct = async (id: string) => {
		try {
			setLoading(true);
			const product: ProductType = await fetchSingleProductForId(id);
			setProduct(product);
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("An unexpected error occurred");
			}
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchSingleProduct(id);
	}, [id]);

	return { product, error, loading };
};
