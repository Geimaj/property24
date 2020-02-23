import React, { useState, useContext, useEffect, Suspense } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { PropertyContext } from "../../context/PropertyContext";
import { UserContext } from "../../context/UserContext";
import { LinkBehavior } from "../../util";
import Properties from "../../containers/Properties";
import { Property as PropertyApi } from "@geimaj/zaio-property24-api/api/Property";

const useStyles = makeStyles(theme => ({
	heroContent: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(8, 0, 6)
	},
	heroButtons: {
		marginTop: theme.spacing(4)
	},
	cardGrid: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8)
	},
	card: {
		height: "100%",
		display: "flex",
		flexDirection: "column"
	},
	cardMedia: {
		paddingTop: "56.25%" // 16:9
	},
	cardContent: {
		flexGrow: 1
	}
}));

export default function PropertiesPage() {
	const classes = useStyles();
	const [isPropertySearch, setIsPropertySearch] = useState(true);
	const { properties, setProperties } = useContext(PropertyContext);
	const { user } = useContext(UserContext);

	// fetch properties everytime user is updated
	useEffect(() => {
		if (user.id) {
			PropertyApi.getAll()
				.then(res => {
					setProperties(res);
				})
				.catch(err => {
					console.log(err);
				});
		}
	}, [user]);

	const doSearch = () => {
		fetch("http://localhost:3030/whoami", {
			method: "GET",
			credentials: "include"
		})
			.then(res => {
				return res.json();
			})
			.then(json => {
				console.log(json);
			})
			.catch(err => {
				console.log(err);
			});
	};

	return (
		<React.Fragment>
			<main>
				<div className={classes.heroContent}>
					{user.id ? (
						<Container maxWidth="sm">
							<Typography
								component="h1"
								variant="h2"
								align="center"
								color="textPrimary"
								gutterBottom
							>
								Luxury awaits
							</Typography>
							<div>
								search bar here
								<Button onClick={doSearch}>Search</Button>
							</div>
							<div className={classes.heroButtons}>
								<Grid container spacing={2} justify="center">
									<Grid item>
										<Button
											variant={
												isPropertySearch
													? "contained"
													: "outlined"
											}
											color="primary"
											onClick={() =>
												setIsPropertySearch(true)
											}
										>
											Properties
										</Button>
									</Grid>
									<Grid item>
										<Button
											variant={
												!isPropertySearch
													? "contained"
													: "outlined"
											}
											color="primary"
											onClick={() =>
												setIsPropertySearch(false)
											}
										>
											Agents
										</Button>
									</Grid>
								</Grid>
							</div>
						</Container>
					) : (
						<Container maxWidth="sm">
							<Typography
								component="h1"
								variant="h2"
								align="center"
								color="textPrimary"
								gutterBottom
							>
								Almost there...
							</Typography>
							<Typography
								component="h1"
								variant="h5"
								align="center"
								color="textPrimary"
								gutterBottom
							>
								Login to view our listings
							</Typography>
							<div className={classes.heroButtons}>
								<Grid container spacing={2} justify="center">
									<Grid item>
										<Button
											variant="contained"
											color="primary"
											component={LinkBehavior}
											to={`/login`}
										>
											Login
										</Button>
									</Grid>
								</Grid>
							</div>
						</Container>
					)}
				</div>
				<Suspense>
					<Properties properties={properties} />
				</Suspense>
			</main>
		</React.Fragment>
	);
}
