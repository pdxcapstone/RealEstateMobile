(function () {
  let React = require('react'),
      Router = require('react-router'),
      AppRoutes = require('./app-routes.jsx');
  let injectTapEventPlugin = require('react-tap-event-plugin');

  //Needed for React Developer Tools
  window.React = React;

  //Needed for onTouchTap
  //Can go away when react 1.0 release
  //Check this repo:
  //https://github.com/zilverline/react-tap-event-plugin
  injectTapEventPlugin();

  // Render the main app react component into the document body.
  // For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
  Router
    // Runs the router, similiar to the Router.run method. You can think of it as an
    // initializer/constructor method.
      .create({
        routes: AppRoutes,
        scrollBehavior: Router.ScrollToTopBehavior
      })
    // This is our callback function, whenever the url changes it will be called again.
    // Handler: The ReactComponent class that will be rendered
      .run(function (Handler) {
        React.render(<Handler/>, document.body);
      });

})();
