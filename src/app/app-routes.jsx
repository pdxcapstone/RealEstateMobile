let React = require('react');
let Router = require('react-router');
let Route = Router.Route;
let Redirect = Router.Redirect;
let DefaultRoute = Router.DefaultRoute;


let Login = require('./components/main.jsx');
let AddHome = require('./components/add-home.jsx');

let AppRoutes = (
    <Route name="login" path="/" handler={AddHome}>
        <DefaultRoute handler={AddHome}/>
    </Route>

);

module.exports = AppRoutes;