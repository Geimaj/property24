import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import useStyles from "./style";
import { UserContext } from "../../context/UserContext";
import { User } from "@geimaj/zaio-property24-api/api/User";
import { Avatar } from "@material-ui/core";

export default function Navbar() {
	const classes = useStyles();
	const { user, setUser } = useContext(UserContext);
	const history = useHistory();
	return (
		<>
			<AppBar position="relative">
				<Toolbar>
					<Link to="/">
						<Typography variant="h6" color="inherit" noWrap>
							Property1024
						</Typography>
					</Link>
					<Container className={classes.linkContainer}>
						{user.id ? (
							<Link
								to="/logout"
								onClick={e => {
									e.preventDefault();
									User.logout().then(res => {
										setUser({ id: null });
										history.push("/login");
									});
								}}
								className={classes.links}
							>
								logout
							</Link>
						) : (
							<>
								<Link to="/login" className={classes.links}>
									login
								</Link>
								<Link
									to="/login#signup"
									className={classes.links}
								>
									signup
								</Link>
							</>
						)}

						<Link to="/" className={classes.links}>
							Home
						</Link>
						<Link to="/properties" className={classes.links}>
							Properties
						</Link>
						<Link to="/agents" className={classes.links}>
							Agents
						</Link>
					</Container>
					<Avatar>{user.username}</Avatar>
				</Toolbar>
			</AppBar>
		</>
	);
}
