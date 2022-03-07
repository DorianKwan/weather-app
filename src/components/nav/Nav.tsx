import React from 'react';
import styled from '@emotion/styled';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faHome, faCloudSun } from '@fortawesome/free-solid-svg-icons';
import { useTypedTheme, useGeolocation } from 'src/hooks';
import { Coordinates } from 'src/utils';
import { Home } from '../pages/Home';
import { Weather } from '../pages/Weather';
import WeatherAppLogo from '../../assets/images/weather-logo.png';
import { Loader } from '../utility';

const routes = [
  {
    path: '/',
    exact: true,
    main: (props: {}) => <Home {...props} />,
  },
  {
    path: '/weather',
    main: (props: { coordinates?: Coordinates }) => {
      return <Weather {...props} />;
    },
  },
];

export const Nav = () => {
  const theme = useTypedTheme();
  const { coordinates, isLoaded } = useGeolocation();

  return (
    <Router>
      <Container>
        <SidebarContainer background={theme.colors.ash}>
          <AppLogoWrapper>
            <img src={WeatherAppLogo} alt="app-logo" />
          </AppLogoWrapper>
          <nav>
            <SidebarList hoverColor={theme.colors.pink}>
              <li>
                <Link to="/">
                  <Icon icon={faHome} />
                </Link>
              </li>
              <li>
                <Link to="/weather">
                  <Icon icon={faCloudSun} />
                </Link>
              </li>
            </SidebarList>
          </nav>
        </SidebarContainer>
        <PageContainer>
          {isLoaded ? (
            <Switch>
              {routes.map(route => (
                <Route key={route.path} path={route.path} exact={route.exact}>
                  {<route.main coordinates={coordinates} />}
                </Route>
              ))}
              <Route path="*">
                <Redirect to="/home" />
              </Route>
            </Switch>
          ) : (
            <Loader />
          )}
        </PageContainer>
      </Container>
    </Router>
  );
};

const Container = styled.div`
  display: flex;
  height: 100%;
`;

const SidebarContainer = styled.nav<{ background: string }>`
  padding: 0 1rem;
  padding-top: 2rem;
  max-width: 4rem;
  height: 100%;
  background: ${({ background }) => background};
  color: white;

  @media only screen and (min-width: 640px) {
    max-width: 5.25rem;
  }
`;

const SidebarList = styled.ul<{ hoverColor: string }>`
  margin-top: 1.5rem;

  li {
    position: relative;
    padding: 1.1rem 0;

    &:not(:last-child)::after {
      content: '';
      position: absolute;
      left: 7.5%;
      bottom: 0;
      width: 85%;
      border: 1px solid rgba(255, 255, 255, 0.4);
    }

    a {
      color: white;
      text-decoration: none;

      &:hover {
        svg {
          color: ${({ hoverColor }) => hoverColor};
        }
      }

      svg {
        transition: color 0.3s linear;
        width: 1.6rem;
        height: 1.6rem;
      }
    }
  }
`;

const PageContainer = styled.main`
  flex: 1;
  display: grid;
`;

const AppLogoWrapper = styled.div`
  width: 100%;
  display: grid;
  place-items: center;

  img {
    width: 90%;
  }
`;
