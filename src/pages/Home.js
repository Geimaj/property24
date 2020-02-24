import React, { useState, Suspense, useContext, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, TextField, Container, Button } from "@material-ui/core";
import LoginOrChildren from "../hoc/LoginOrChildren";
import { Autocomplete } from "@material-ui/lab";
import Properties from "../containers/Properties";
import { PropertyContext } from "../context/PropertyContext";
import { UserContext } from "../context/UserContext";
import { Property as PropertyApi } from "@geimaj/zaio-property24-api/api/Property";
import Agents from "../containers/Agents";

const useStyles = makeStyles(theme => ({
	heroContent: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(8, 0, 6)
	},
	heroButtons: {
		marginTop: theme.spacing(4)
	},
	ctaButtons: {
		color: theme.palette.primary,
		textDecoration: "none"
	}
}));

const Home = props => {
	const classes = useStyles();
	const [isPropertySearch, setIsPropertySearch] = useState(true);
	const [displayProperties, setDisplayProperties] = useState([]);
	const [agents, setAgents] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const { properties, setProperties } = useContext(PropertyContext);

	const { user } = useContext(UserContext);
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

	useEffect(() => {
		console.log("set display properties");
		console.log(displayProperties);
		setDisplayProperties(properties);
	}, [properties]);

	const doSearch = search => {
		if (isPropertySearch) {
			console.log(search);

			setDisplayProperties(properties.filter(p => p.name === search));
		}
	};

	return (
		<>
			<LoginOrChildren user={user}>
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
						<Autocomplete
							freeSolo
							id="free-solo-2-demo"
							disableClearable
							options={properties.map(property => property.name)}
							renderInput={params => (
								<TextField
									{...params}
									label="Search input"
									margin="normal"
									variant="outlined"
									InputProps={{
										...params.InputProps,
										type: "search"
									}}
								/>
							)}
							value={searchTerm}
							onChange={(option, value) => {
								doSearch(value);
							}}
							onInput={() => {
								if (searchTerm === "") {
									setDisplayProperties(properties);
								}
							}}
						/>
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
									onClick={() => setIsPropertySearch(true)}
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
									onClick={() => setIsPropertySearch(false)}
								>
									Agents
								</Button>
							</Grid>
						</Grid>
					</div>
				</Container>
			</LoginOrChildren>
			{/* <div className={classes.heroContent}></div> */}

			<div>
				{searchTerm && (
					<Typography
						component="h1"
						variant="h4"
						align="center"
						color="textSecondary"
						gutterBottom
					>
						Search results for: {searchTerm} (
						{displayProperties.length})
					</Typography>
				)}
				<Suspense>
					{isPropertySearch ? (
						<Properties properties={displayProperties} />
					) : (
						<Agents agents={agents} />
					)}
				</Suspense>
			</div>
		</>
	);
};

export default Home;
