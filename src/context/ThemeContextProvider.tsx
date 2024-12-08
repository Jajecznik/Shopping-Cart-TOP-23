import { useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";

export const ThemeContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [theme, setTheme] = useState("light");

	const toggleTheme = () => {
		setTheme((prev) => (prev === "light" ? "dark" : "light"));
	};

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
	}, [theme]);

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
