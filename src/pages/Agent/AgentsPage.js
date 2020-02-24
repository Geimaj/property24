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
import { User } from "@geimaj/zaio-property24-api/api/User";
import Agents from "../../containers/Agents";
import LoginOrChildren from "../../hoc/LoginOrChildren";

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
		User.getAgents().then(res => {
			if (!res.error) {
				setAgents(res);
			}
		});
	}, [user]);

	return (
		<React.Fragment>
			<LoginOrChildren user={user}>
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
			</LoginOrChildren>
			<Suspense>
				<Agents agents={agents} />
			</Suspense>
		</React.Fragment>
	);
}
