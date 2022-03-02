import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Weather } from '../pages/Weather';
import './nav.css';

const routes = [
  {
    path: '/',
    exact: true,
    main: (props: {}) => <Home {...props} />,
  },
  {
    path: '/weather',
    main: (props: {}) => {
      return <Weather {...props} />;
    },
  },
];

export const Nav = () => {
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
            {routes.map(route => (
              <Route key={route.path} path={route.path} exact={route.exact}>
                {<route.main />}
              </Route>
            ))}
          </Switch>
        </div>
      </div>
    </Router>
  );
};
