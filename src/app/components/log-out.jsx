/** In this file, we create a React component which incorporates components provided by material-ui */

let React = require('react');
let mui = require('material-ui');
let Router = require('react-router');
let FullWidthSection = require('./full-width-section.jsx');
let LoginLeftNav = require('./login-left-nav.jsx');
let AppCanvas = mui.AppCanvas;
let TextField = mui.TextField;
let RaisedButton = mui.RaisedButton;
let Styles = mui.Styles;
let ThemeManager = new mui.Styles.ThemeManager();
let { Spacing, Typography } = Styles;
let Colors = mui.Styles.Colors;

let RouteHandler = Router.RouteHandler;

class AddHome extends React.Component {

    constructor() {
        super();
    }

    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    }

    componentWillMount() {
        ThemeManager.setPalette({
            accent1Color: Colors.deepOrange500
        });
    }

    getStyles() {
        return {
            root: {
                paddingTop: Spacing.desktopKeylineIncrement
            },
            fullWidthSection: {
                maxWidth: '320px',
                margin: '0 auto'
            },
            headline: {
                fontSize: '24px',
                lineHeight: '32px',
                paddingTop: '40px',
                marginBottom: '12px',
                letterSpacing: '0',
                fontWeight: Typography.fontWeightNormal,
                color: Typography.textDarkBlack
            },
            textField: {
                paddingLeft: '8px'
            },
            button: {
                marginTop: '20px',
                marginLeft: '100px'
            }
        }
    }

//ajax call






    render() {

        let styles = this.getStyles();

        return (

            <FullWidthSection style={styles.fullWidthSection}>
                <p><b>Thank you for using the mobile app.</b></p>
            </FullWidthSection>

        );
    }
}



AddHome.contextTypes = {
    router: React.PropTypes.func
};

AddHome.childContextTypes = {
    muiTheme: React.PropTypes.object
};

module.exports = AddHome;