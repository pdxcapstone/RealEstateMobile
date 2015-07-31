let React = require('react');
let Router = require('react-router');
let FullWidthSection = require('./full-width-section.jsx');
let { AppBar, AppCanvas, Styles } = require('material-ui');

let RouteHandler = Router.RouteHandler;
let { Colors, Typography } = Styles;
let ThemeManager = new Styles.ThemeManager();

class Master extends React.Component {

    constructor() {
        super();
    }

    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        }
    }

    render() {
        return (
            <RouteHandler />
        )
    }
}

Master.contextTypes = {
    router: React.PropTypes.func
};

Master.childContextTypes = {
    muiTheme: React.PropTypes.object
};

module.exports = Master;