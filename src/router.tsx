import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./components/error_page/ErrorPage";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import ProductsOfAGivenCategory from "./pages/products_of_a_given_category/ProductsOfAGivenCategory";
import SingleProductDetails from "./pages/single_product_details/SingleProductDetails";
import Payment from "./pages/payment/Payment";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "",
				element: <Home />,
				errorElement: <ErrorPage />,
			},
			{
				path: "about",
				element: <About />,
				errorElement: <ErrorPage />,
			},
			{
				path: ":category",
				element: <ProductsOfAGivenCategory />,
				errorElement: <ErrorPage />,
			},
			{
				path: ":category/:productId/:productName",
				element: <SingleProductDetails />,
				errorElement: <ErrorPage />,
			},
			{
				path: "payment",
				element: <Payment />,
				errorElement: <ErrorPage />,
			},
		],
	},
]);

export default router;
