import React from "react";
import { Link } from "react-router-dom";

const LinkBehavior = React.forwardRef((props, ref) => (
	<Link ref={ref} to={props.to} {...props} />
));

export { LinkBehavior };
