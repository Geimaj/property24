import React from "react";
import { Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
// import Login from "./components/LoginRegister/LoginRegister";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import PropertiesPage from "./pages/Property/PropertiesPage";
import PropertyPage from "./pages/Property/PropertyPage";
import AgentsPage from "./pages/Agent/AgentsPage";
import AgentPage from "./pages/Agent/AgentPage";

import UserProvider from "./context/UserContext";

import CssBaseline from "@material-ui/core/CssBaseline";
import PropertyProvider from "./context/PropertyContext";
import { AutoLogin } from "./hoc/AutoLogin";

function App() {
	return (
		<UserProvider>
			<CssBaseline />
			<AutoLogin />
			<Navbar />
			<main>
				<Switch>
					<Route path="/login" component={LoginPage} />
					<PropertyProvider>
						<PropertyProvider>
							<Route exact path="/" component={HomePage} />
						</PropertyProvider>

						<PropertyProvider>
							<Route path="/agents" component={AgentsPage} />
							<Route path="/agent" component={AgentPage} />
						</PropertyProvider>

						<Route path="/properties" component={PropertiesPage} />
						<Route path="/property" component={PropertyPage} />
					</PropertyProvider>

					<Route component={ErrorPage} />
				</Switch>
			</main>
			<Footer />
		</UserProvider>
	);
}

export default App;
