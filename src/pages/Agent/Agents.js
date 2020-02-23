import React, { useContext, Suspense, useEffect, useState } from "react";
import {
	makeStyles,
	Container,
	Typography,
	Button,
	Grid
} from "@material-ui/core";
import { UserContext } from "../../context/UserContext";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
	root: {
		color: "red"
	}
}));

export default function AgentsPage(props) {
	const classes = useStyles();
	const { user } = useContext(UserContext);
	const history = useHistory();

	const [agents, setAgents] = useState([]);

	useEffect(() => {
		console.log("should fetch info about the agents");
	}, [user]);

	return (
		<React.Fragment>
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
							Find the right agent for you
						</Typography>
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
										onClick={() => history.push("/login")}
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
				{/* <Agents agents={agents} /> */}
				agents here...
			</Suspense>
		</React.Fragment>
	);
}
