import React, { lazy, Suspense } from "react";
import { Container } from "react-bootstrap";
import { Container } from "react-bootstrap";

const Home = lazy(() => import("./pages/Home"));
const Start = lazy(() => import("./pages/Start"));
const BusyIndicator = lazy(() => import("./components/shared/BusyIndicator"));

const ROUTES = [
    {
        path: "/",
        component: Start,
    },
    {
        path: "/home",
        component: Home,
    },
];

export const Routes = () => {
    return (
        <Suspense fallback={<BusyIndicator />}>
            <Container fluid>
                <Switch>
                    {ROUTES.map((route, index) => (
                        <Route key={index.toString()} exact {...route} />
                    ))}
                </Switch>
            </Container>
        </Suspense>
    );
};
