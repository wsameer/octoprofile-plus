import React, { lazy, Suspense } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Route, Switch } from 'react-router';

const Home = lazy(() => import('../pages/Home'));
const Profile = lazy(() => import('../pages/Profile'));
const BusyIndicator = lazy(() => import('./shared/BusyIndicator'));

const ROUTES = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/:slug',
        component: Profile
    }
];

export const Routes = () => {
    return (
        <Suspense fallback={<BusyIndicator />}>
            <Container fluid>
                <Row>
                    <Switch>
                        {ROUTES.map((route, index) => (
                            <Route key={index.toString()} exact {...route} />
                        ))}
                    </Switch>
                </Row>
            </Container>
        </Suspense>
    );
};
