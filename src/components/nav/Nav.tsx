import React from 'react';
import styled from '@emotion/styled';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Weather } from '../pages/Weather';

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
      <Container>
        <SidebarContainer>
          <nav>
            <SidebarList>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/weather">Weather</Link>
              </li>
            </SidebarList>
          </nav>
        </SidebarContainer>
        <PageContainer>
          <Switch>
            {routes.map(route => (
              <Route key={route.path} path={route.path} exact={route.exact}>
                {<route.main />}
              </Route>
            ))}
          </Switch>
        </PageContainer>
      </Container>
    </Router>
  );
};

const Container = styled.div`
  display: flex;
  height: 100%;
`;

const SidebarContainer = styled.nav`
  padding: 0.75rem;
  min-width: 12.5rem;
  height: 100%;
  background-color: #282c34;
  color: white;
`;

const SidebarList = styled.ul`
  li {
    margin-bottom: 0.75rem;

    a {
      color: white;
      text-decoration: none;
    }
  }
`;

const PageContainer = styled.main`
  flex: 1;
  padding: 10px;
`;
