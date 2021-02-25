import React, { useContext, useEffect } from "react";
import { CartContext } from "../Global/CartContext";
import { NavbarEcom } from "./NavbarEcom";
import { Icon } from "react-icons-kit";
import { ic_add } from "react-icons-kit/md/ic_add";
import { ic_remove } from "react-icons-kit/md/ic_remove";
import { iosTrashOutline } from "react-icons-kit/ionicons/iosTrashOutline";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { auth } from "../Config/Config";
import { Alert } from "react-bootstrap";

export const Cart = ({ user }) => {
	const { shoppingCart, dispatch, totalPrice, totalQty } = useContext(
		CartContext
	);

	const history = useHistory();

	useEffect(() => {
		auth.onAuthStateChanged(user => {
			if (!user) {
				history.push("/login");
			}
		});
	});

	return (
		<>
			<NavbarEcom user={user} />
			<>
				{shoppingCart.length !== 0 && <h1 className="cart-color">Cart</h1>}
				<div className="cart-container">
					{shoppingCart.length === 0 && (
						<>
							<Alert variant="danger">
								No items in your cart or slow internet. Click{" "}
								<Alert.Link href="/">here</Alert.Link> to return to home page.
							</Alert>
						</>
					)}
					{shoppingCart &&
						shoppingCart.map(cart => (
							<div className="cart-card" key={cart.ProductID}>
								<div className="cart-img">
									<img src={cart.ProductImg} alt="not found" />
								</div>

								<div className="cart-name cart-color">{cart.ProductName}</div>

								<div className="cart-price-orignal">
									Rs {cart.ProductPrice}.00
								</div>

								<div
									className="inc cart-color"
									onClick={() =>
										dispatch({ type: "INC", id: cart.ProductID, cart })
									}
								>
									<Icon icon={ic_add} size={24} />
								</div>

								<div className="quantity cart-color">{cart.qty}</div>

								<div
									className="dec cart-color"
									onClick={() =>
										dispatch({ type: "DEC", id: cart.ProductID, cart })
									}
								>
									<Icon icon={ic_remove} size={24} />
								</div>

								<div className="cart-price cart-color">
									Rs {cart.TotalProductPrice}.00
								</div>

								<button
									className="delete-btn"
									onClick={() =>
										dispatch({ type: "DELETE", id: cart.ProductID, cart })
									}
								>
									<Icon icon={iosTrashOutline} size={24} />
								</button>
							</div>
						))}
					{shoppingCart.length > 0 && (
						<div className="cart-summary">
							<div className="cart-summary-heading cart-color">
								Cart-Summary
							</div>
							<div className="cart-summary-price cart-color">
								<span>Total Price</span>
								<span>{totalPrice}</span>
							</div>
							<div className="cart-summary-price cart-color">
								<span>Total Qty</span>
								<span>{totalQty}</span>
							</div>
							<br />
							<br />

							<div style={{ display: "flex", justifyContent: "center" }}>
								<Link to="/cashout" className="cashout-link">
									<button
										className="btn btn-success btn-md"
										style={{ marginTop: 5 + "px" }}
									>
										Proceed to payment
									</button>
								</Link>{" "}
							</div>
						</div>
					)}
				</div>
			</>
		</>
	);
};
