import React from "react";
import {
	Container,
	Typography,
	Grid,
	makeStyles,
	Button
} from "@material-ui/core";
import { LinkBehavior } from "../util";

const useStyles = makeStyles(theme => ({
	heroContent: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(8, 0, 6)
	},
	heroButtons: {
		marginTop: theme.spacing(4)
	}
}));

export default function LoginOrChildren({ children, user }) {
	const classes = useStyles();
	if (!user.id) {
		return (
			<div className={classes.heroContent}>
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
			</div>
		);
	} else if (children) {
		console.log("rending child");
		console.log(children);
		return children;
	}
	return null;
}
