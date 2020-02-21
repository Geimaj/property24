import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	links: {
		...theme.typography.button,
		color: theme.palette.background.paper,
		padding: theme.spacing(1),
		textDecoration: "none"
	},
	linkContainer: {
		// display: "flex"
	},
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
export default useStyles;
