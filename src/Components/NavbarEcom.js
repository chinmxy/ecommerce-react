import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { auth } from "../Config/Config";
import { useHistory } from "react-router-dom";
import { CartContext } from "../Global/CartContext";
import { Navbar, Button } from "react-bootstrap";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";

const StyledBadge = withStyles(theme => ({
	badge: {
		right: -3,
		top: 13,
		border: `2px solid ${theme.palette.background.paper}`,
		padding: "0 4px",
	},
}))(Badge);

export const NavbarEcom = ({ user }) => {
	const history = useHistory();
	const { totalQty } = useContext(CartContext);

	// handle logout
	const handleLogout = () => {
		auth.signOut().then(() => {
			history.push("/login");
		});
	};

	return (
		<>
			<Navbar
				style={{ color: "#333438", boxShadow: "0px 0px 20px #151515" }}
				variant="dark"
			>
				<Navbar.Brand href="/">ShopKart</Navbar.Brand>
				<Navbar.Toggle />
				<Navbar.Collapse className="justify-content-end">
					<div style={{ marginRight: "10px" }}>
						<Link to="/cartproducts">
							<IconButton aria-label="cart" style={{ color: "white" }}>
								<StyledBadge badgeContent={totalQty} color="secondary">
									<ShoppingCartIcon />
								</StyledBadge>
							</IconButton>
						</Link>
					</div>
					<Navbar.Text>
						Signed in as: <span style={{ color: "white" }}>{user}</span>
					</Navbar.Text>
					<div style={{ marginLeft: "20px" }}>
						<Button variant="outline-danger" onClick={handleLogout}>
							Logout
						</Button>
					</div>
				</Navbar.Collapse>
			</Navbar>
		</>
	);
};
