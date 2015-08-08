let React = require('react');
let Router = require('react-router');
let Route = Router.Route;
let Redirect = Router.Redirect;
let DefaultRoute = Router.DefaultRoute;


let Login = require('./components/main.jsx');
let Master = require('./components/master.jsx');
let Pages = require('./components/pages.jsx');
let AddHome = require('./components/add-home.jsx');
let Home = require('./components/home.jsx');

let AppRoutes = (
    <Route name="root" path="/" handler={Master}>
        <Route name="pages" handler={Pages}>
            <Route name="home" handler={Home} />
            <Route name="addhome" handler={AddHome}/>
        </Route>
        <Route name="login" handler={Login} />
        <DefaultRoute handler={Login}/>
    </Route>

);

module.exports = AppRoutes;