import { useState, useEffect } from "react";

export const fetchProductCategories = async (): Promise<[]> => {
	const response = await fetch("https://fakestoreapi.com/products/categories");
	if (!response.ok) throw new Error("Failed to fetch categories");
	return await response.json();
};

export const useCategories = () => {
	const [categories, setCategories] = useState<string[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	const fetchCategories = async () => {
		try {
			const data: string[] = await fetchProductCategories();
			setCategories(data);
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
		fetchCategories();
	}, []);

	return { categories, error, loading };
};
