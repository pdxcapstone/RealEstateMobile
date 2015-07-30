let React = require('react');
let Router = require('react-router');
let Route = Router.Route;
let Redirect = Router.Redirect;
let DefaultRoute = Router.DefaultRoute;


let Login = require('./components/main.jsx');

let AppRoutes = (
    <Route name="login" path="/" handler={Login}>
        <DefaultRoute handler={Login}/>
    </Route>
);

module.exports = AppRoutes;