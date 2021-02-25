import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { auth } from "../Config/Config";
import GoogleButton from "react-google-button";
import firebase from "firebase/app";

var provider = new firebase.auth.GoogleAuthProvider();

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<Link color="inherit" href="/">
				ShopKart
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const useStyles = makeStyles(theme => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function Login(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const classes = useStyles();

	const login = e => {
		e.preventDefault();
		auth
			.signInWithEmailAndPassword(email, password)
			.then(() => {
				setEmail("");
				setPassword("");
				setError("");
				props.history.push("/");
			})
			.catch(err => setError(err.message));
	};

	const googleSignIn = () => {
		firebase
			.auth()
			.signInWithPopup(provider)
			.then(result => {
				// var credential = result.credential;

				// This gives you a Google Access Token. You can use it to access the Google API.
				// var token = credential.accessToken;
				// The signed-in user info.
				var user = result.user;
				// ...
				console.log(user.providerData[0].providerId);

				props.history.push("/");
			})
			.catch(error => {
				// Handle Errors here.
				// var errorCode = error.code;
				// var errorMessage = error.message;
				// // The email of the user's account used.
				// var email = error.email;
				// The firebase.auth.AuthCredential type that was used.
				// var credential = error.credential;
				// ...
			});
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<form className={classes.form} onSubmit={login} noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						onChange={e => setEmail(e.target.value)}
						value={email}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						onChange={e => setPassword(e.target.value)}
						value={password}
					/>
					{error && <span className="error-msg">{error}</span>}
					<FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign In
					</Button>
					<hr style={{ color: "whitesmoke" }} />
					<div style={{ display: "flex", justifyContent: "center" }}>
						<GoogleButton onClick={googleSignIn}>Google Sign-In</GoogleButton>
					</div>
					<br />
					<Grid container justify="flex-end">
						<Grid item>
							<Link href="/signup" variant="body2">
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
}
