import styles from "./ProductsOfAGivenCategory.module.css";
import { useParams } from "react-router-dom";
import { useProductsOfAGivenCategory } from "../../hooks/useProductsOfAGivenCategory";
import SingleProduct from "../../components/single_product/SingleProduct";
import { ProductContext } from "../../context/ProductContext";
import { useContext } from "react";
import { ProductProvider } from "../../context/ProductProvider";

function ProductsOfAGivenCategory() {
	const { category } = useParams<{ category: string }>();
	const { error, loading } = useProductsOfAGivenCategory(category || null);
	const context = useContext(ProductContext);

	if (!context) {
		throw new Error("ProductContext must be used within a ProductProvider");
	}

	const products = category ? context.productsByCategory[category] || [] : [];

	if (loading) return <p className="loadingInfo">Loading products...</p>;
	if (error) return <p className="errorInfo">Error: {error}</p>;

	return (
		<ProductProvider>
			<h2>
				Selected category: <span>{category}</span>
			</h2>
			<div className={styles.productsContainer}>
				{products.map((product) => (
					<SingleProduct
						key={product.id}
						category={category!}
						product={product}
					/>
				))}
			</div>
		</ProductProvider>
	);
}

export default ProductsOfAGivenCategory;
