/** In this file, we create a React component which incorporates components provided by material-ui */

let React = require('react');
let mui = require('material-ui');
let Router = require('react-router');
let FullWidthSection = require('./full-width-section.jsx');
let AppLeftNav = require('./app-left-nav.jsx');
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
        this.state = {
            s: "sd",
            firstname: "lololo",
            lastname: "lololo"
        }

        if (typeof (Storage) != "undefined") {

            $.ajax({
                url: "http://capstonedd.cs.pdx.edu:8000/api/get-user/",
                type: "GET",
                cache: false,
                headers: {
                    "Authorization":"JWT " + localStorage.getItem("token")
                },
                success: function(data) {
                    this.setState({firstname: data.firstname, lastname: data.lastname})
                }.bind(this),
                statusCode: {
                    400: function() {
                        this.setState({s: "home buyer only"});
                    }.bind(this)
                },
                error: function(xhr, status, err) {
                    this.context.router.transitionTo("login");
                }.bind(this)
            });
        } else {
            this.context.router.transitionTo("login");
        }
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
            button: {
                marginTop: '20px',
                marginLeft: '100px'
            }
        }
    }

    render() {

        return (
            <AppCanvas>
                <AppBar
                    title="Real Estate App"
                    onLeftIconButtonTouchTap={this._onLeftIconButtonTouchTap}
                    zDepth={0}
                    />

                <AppLeftNav ref="leftNav" />

                <RouteHandler />

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
