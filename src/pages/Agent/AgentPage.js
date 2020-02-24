import React, { useContext, useEffect, useState } from "react";
import { makeStyles, Container, Typography, Avatar } from "@material-ui/core";
import { UserContext } from "../../context/UserContext";
import { useLocation } from "react-router-dom";
import { User } from "@geimaj/zaio-property24-api/api/User";
import Properties from "../../containers/Properties";
import { Property } from "@geimaj/zaio-property24-api/api/Property";

const useStyles = makeStyles(theme => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center"
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	}
}));

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

export default function AgentPage(props) {
	const classes = useStyles();
	const { user } = useContext(UserContext);
	const query = useQuery();
	const agentId = query.get("id");

	const [agent, setAgent] = useState([]);
	const [properties, setProperties] = useState([]);

	useEffect(() => {
		User.getById(agentId).then(a => {
			setAgent(a);

			Property.getAllForUser(agentId).then(prop => setProperties(prop));
		});
	}, [user]);

	return (
		<Container component="main" maxWidth="lg">
			<div className={classes.paper}>
				<Avatar className={classes.avatar}></Avatar>
				<Typography component="p" color="textSecondary" variant="h5">
					{agent.username}
				</Typography>
				<Typography component="h1" variant="h5">
					{agent.fullname}
				</Typography>
				<Typography component="h1" variant="h5">
					{agent.email}
				</Typography>
			</div>
			<div>
				<Properties properties={properties} />
			</div>
		</Container>
	);
}
