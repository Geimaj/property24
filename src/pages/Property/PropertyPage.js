import React, { useState, useContext, useEffect, Suspense } from "react";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Container";
import { useLocation } from "react-router-dom";

import { Property as PropertyApi } from "@geimaj/zaio-property24-api/api/Property";
import { UserContext } from "../../context/UserContext";
import {
	CardActionArea,
	CardMedia,
	CardContent,
	CardActions
} from "@material-ui/core";
import { LinkBehavior } from "../../util";

const useSytles = makeStyles(theme => ({
	media: {
		height: 400
	},
	thumbnail: {
		width: 80
	}
}));

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

export default function PropertyPage() {
	const query = useQuery();
	const id = query.get("id");
	const classes = useSytles();
	const { user } = useContext(UserContext);

	const [property, setProperty] = useState({
		id: 0,
		name: "5 ocean view",
		street: "ocean view",
		number: "5",
		beds: 4,
		baths: 4,
		price: 200000,
		city: "Cape Town",
		images: [
			"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.telegraph.co.uk%2Fcontent%2Fdam%2FTravel%2Fhotels%2Fafrica%2Fsouth-africa%2Fcape-town%2Fone-and-only-cape-town-p.jpg&f=1&nofb=1"
		],
		postedBy: 0
	});

	useEffect(() => {
		//TODO: get property  from API by id rather than flitering context
		if (user.id) {
			PropertyApi.getById(id).then(property => {
				if (!property.error) {
					setProperty(property);
				}
			});
		}
	}, [user]);

	console.log(property);

	return property ? (
		<React.Fragment>
			<div>
				<Card>
					<CardActionArea>
						<CardMedia
							className={classes.media}
							title={`${property.street}`}
							image={
								property.images.length > 0
									? property.images[0]
									: ""
							}
						/>
						<CardContent>
							<Typography variant="h5" component="h2">
								{property.street}
							</Typography>
							<Typography
								variant="h5"
								component="h3"
								color="textSecondary"
							>
								{property.city}
							</Typography>
							<div>
								{property.images.map(image => {
									return (
										<div key={image}>
											<img
												src={image}
												className={classes.thumbnail}
												alt="thumbnail"
											/>
										</div>
									);
								})}
							</div>
							<Typography variant="h6" component="h2">
								R {property.price}
							</Typography>
							<Typography
								variant="body2"
								color="textSecondary"
								component="p"
							>
								Beds: {property.beds}
							</Typography>
							<Typography
								variant="body2"
								color="textSecondary"
								component="p"
							>
								Baths: {property.baths}
							</Typography>
							<Typography variant="body1" component="p">
								{property.name}
							</Typography>
						</CardContent>
					</CardActionArea>
					<CardActions>
						<Button
							size="medium"
							color="primary"
							component={LinkBehavior}
							to={`/agent?id=${property.postedBy}`}
						>
							View seller
						</Button>
					</CardActions>
				</Card>
			</div>
		</React.Fragment>
	) : (
		<>Not a property...</>
	);
}
