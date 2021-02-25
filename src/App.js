import React, { Component } from "react";
import { ProductsContextProvider } from "./Global/ProductsContext";
import { Home } from "./Components/Home";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import { NotFound } from "./Components/NotFound";
import { auth, db } from "./Config/Config";
import { CartContextProvider } from "./Global/CartContext";
import { Cart } from "./Components/Cart";
import Login from "./Components/Login";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
	palette: {
		primary: {
			// light: will be calculated from palette.primary.main,
			main: "#90CAF9",
			// dark: will be calculated from palette.primary.main,
			// contrastText: will be calculated to contrast with palette.primary.main
		},
		secondary: {
			light: "#0066ff",
			main: "#F48FB1",
			// dark: will be calculated from palette.secondary.main,
			contrastText: "#ffcc00",
		},
		type: "dark",
	},
});

export class App extends Component {
	state = {
		user: null,
	};

	componentDidMount() {
		// getting user info for navigation bar
		auth.onAuthStateChanged(user => {
			if (user) {
				let userName;
				if (user.providerData[0].providerId === "google.com") {
					userName = user.displayName;
					this.setState({
						user: userName,
					});
				} else {
					db.collection("SignedUpUsersData")
						.doc(user.uid)
						.get()
						.then(snapshot => {
							this.setState({
								user: snapshot.data().Name,
							});
						});
				}
			} else {
				this.setState({
					user: null,
				});
			}
		});
	}

	render() {
		return (
			<ThemeProvider theme={theme}>
				<ProductsContextProvider>
					<CartContextProvider>
						<BrowserRouter>
							<Switch>
								<Route
									exact
									path="/"
									component={() => <Home user={this.state.user} />}
								/>

								<Route path="/signup" component={Signup} />

								<Route path="/login" component={Login} />

								<Route
									path="/cartproducts"
									component={() => <Cart user={this.state.user} />}
								/>

								<Route component={NotFound} />
							</Switch>
						</BrowserRouter>
					</CartContextProvider>
				</ProductsContextProvider>
			</ThemeProvider>
		);
	}
}

export default App;
