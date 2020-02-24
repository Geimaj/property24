import React, { useContext, useEffect, Suspense } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { PropertyContext } from "../../context/PropertyContext";
import { UserContext } from "../../context/UserContext";
import Properties from "../../containers/Properties";
import { Property as PropertyApi } from "@geimaj/zaio-property24-api/api/Property";
import LoginOrChildren from "../../hoc/LoginOrChildren";

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

	return (
		<React.Fragment>
			<main>
				<LoginOrChildren user={user} />

				<Suspense>
					<Properties properties={properties} />
				</Suspense>
			</main>
		</React.Fragment>
	);
}
