import React, { useEffect } from "react";
import { NavbarEcom } from "./NavbarEcom";
import { Products } from "./Products";
import { useHistory } from "react-router-dom";
import { auth } from "../Config/Config";

export const Home = ({ user }) => {
	const history = useHistory();

	useEffect(() => {
		// forcing user to signup
		auth.onAuthStateChanged(user => {
			if (!user) {
				history.push("/login");
			}
		});
	});

	return (
		<div className="wrapper">
			<NavbarEcom user={user} />
			<Products />
		</div>
	);
};
