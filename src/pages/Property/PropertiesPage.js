import React, { useContext, useEffect, Suspense } from "react";
import { PropertyContext } from "../../context/PropertyContext";
import { UserContext } from "../../context/UserContext";
import Properties from "../../containers/Properties";
import { Property as PropertyApi } from "@geimaj/zaio-property24-api/api/Property";
import LoginOrChildren from "../../hoc/LoginOrChildren";

export default function PropertiesPage() {
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
