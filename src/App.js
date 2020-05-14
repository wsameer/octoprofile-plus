import React, { lazy, Suspense } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import './App.scss';

const Home = (lazy(() => import('./pages/Home')));
const Start = (lazy(() => import('./pages/Start')));
const BusyIndicator = (lazy(() => import('./components/shared/BusyIndicator')));

const routes = [{
  path: '/',
  component: Start
}, {
  path: '/home',
  component: Home
}];

const App = () => {
  const switchRoute = (
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          exact
          {...route}
        />
      ))}
    </Switch>
  );

  return (
    <div className="App">
      <Router>
        <Suspense fallback={<BusyIndicator />}>
          <Container fluid>
            <Row>
              {switchRoute}
            </Row>
          </Container>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
