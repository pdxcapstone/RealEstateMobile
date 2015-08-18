/** In this file, we create a React component which incorporates components provided by material-ui */

let React = require('react');
let mui = require('material-ui');
let Router = require('react-router');
let FullWidthSection = require('./full-width-section.jsx');
let AppLeftNav = require('./app-left-nav.jsx');
let AppBar = mui.AppBar;
let AppCanvas = mui.AppCanvas;
let TextField = mui.TextField;
let Styles = mui.Styles;
let ThemeManager = new mui.Styles.ThemeManager();
let { Spacing, Typography } = Styles;
let Colors = mui.Styles.Colors;

let RouteHandler = Router.RouteHandler;

class Pages extends React.Component {

    constructor() {
        super();
        this._onLeftIconButtonTouchTap = this._onLeftIconButtonTouchTap.bind(this);
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

    _onLeftIconButtonTouchTap() {
        this.refs.leftNav.toggle();
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
            content: {
                paddingTop: Spacing.desktopKeylineIncrement + 'px'
            },
            button: {
                marginTop: '20px',
                marginLeft: '100px'
            }
        }
    }

    render() {
        let styles = this.getStyles();

        return (
            <AppCanvas>
                <AppBar
                    title="HomeZZO"
                    onLeftIconButtonTouchTap={this._onLeftIconButtonTouchTap}
                    zDepth={0}
                    />

                <AppLeftNav ref="leftNav" />

                <div style={styles.content}>
                    <RouteHandler />
                </div>

            </AppCanvas>
        );
    }
}

Pages.contextTypes = {
    router: React.PropTypes.func
};

Pages.childContextTypes = {
    muiTheme: React.PropTypes.object
};

module.exports = Pages;
