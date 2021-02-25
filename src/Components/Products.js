import React, { useContext } from "react";
import { ProductsContext } from "../Global/ProductsContext";
import { CartContext } from "../Global/CartContext";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";

import "../css/Products.css";

export const Products = () => {
	const { products } = useContext(ProductsContext);

	const { dispatch } = useContext(CartContext);

	return (
		<>
			{products.length !== 0 && (
				<h1 style={{ color: "whitesmoke" }}>Products</h1>
			)}
			<div className="products-container">
				{products.length === 0 && (
					<div>Slow internet or no products to display</div>
				)}
				{products.map(product => (
					<div class="product-card" key={product.ProductID}>
						<div class="product-tumb">
							<img src={product.ProductImg} alt="" />
						</div>
						<div class="product-details">
							<span class="product-catagory">Anime TShirts</span>
							<h4>
								<a href="">{product.ProductName}</a>
							</h4>

							<div class="product-bottom-details">
								<p class="product-price">Rs.{product.ProductPrice}</p>

								<IconContext.Provider
									value={{
										size: "2em",
										color: "#239B56",
									}}
								>
									<Link
										onClick={() => {
											dispatch({
												type: "ADD_TO_CART",
												id: product.ProductID,
												product,
											});
										}}
									>
										<FaCartPlus />
									</Link>
								</IconContext.Provider>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
};
