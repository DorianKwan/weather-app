import React from "react";
import "./nav.css";
import { Home } from "../pages/home";
import { Weather } from "../pages/weather";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const routes = [
  {
    path: "/",
    exact: true,
    main: (props) => <Home {...props} />,
  },
  {
    path: "/weather",
    main: (props) => {
      return <Weather {...props} />;
    },
  },
];

export class Nav extends React.Component {
  render() {
    return (
      <Router>
        <div className="container">
          <div className="sidebar_container">
            <ul className="sidebar">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/weather">Weather</Link>
              </li>
            </ul>
          </div>
          <div className="page_container">
            <Switch>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  children={<route.main apiKey={this.props.apiKey} />}
                />
              ))}
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
