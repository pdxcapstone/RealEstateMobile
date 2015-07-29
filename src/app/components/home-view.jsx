/** In this file, we create a React component which incorporates components provided by material-ui */

let React = require('react');
let mui = require('material-ui');
let Router = require('react-router');
let FullWidthSection = require('./full-width-section.jsx');
let LoginLeftNav = require('./login-left-nav.jsx')
let AppCanvas = mui.AppCanvas;
let AppBar = mui.AppBar;
let TextField = mui.TextField;
let RaisedButton = mui.RaisedButton;
let Dialog = mui.Dialog;
let Styles = mui.Styles;
let ThemeManager = new mui.Styles.ThemeManager();
let { Spacing, Typography } = Styles;
let Colors = mui.Styles.Colors;

let RouteHandler = Router.RouteHandler;

class Main extends React.Component {

    constructor() {
        super();
        this._onLeftIconButtonTouchTap = this._onLeftIconButtonTouchTap.bind(this);
        this._onLoginButtonClick = this._onLoginButtonClick.bind(this);
        this.state = {
            errorInfo: "lololo"
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

    _onLeftIconButtonTouchTap() {
        this.refs.leftNav.toggle();
    }

    _onLoginButtonClick() {
        let address = this.refs.address.getValue();
        var comment = this.refs.comment.getValue();
    }

    render() {

        let styles = this.getStyles();

        let standardActions = [
            { text: 'OK' }
        ]

        return (
            <AppCanvas>
                <AppBar
                    title="Real Estate App"
                    onLeftIconButtonTouchTap={this._onLeftIconButtonTouchTap}
                    zDepth={0}
                    />

                <LoginLeftNav ref="leftNav" />

                <FullWidthSection style={styles.fullWidthSection}>
                    <Dialog
                        title="Error logging in"
                        actions={standardActions}
                        ref="LoginErrorDialog">
                        {this.state.errorInfo}
                    </Dialog>
                    <h2 style={styles.headline}>Add a house here </h2>
                    <TextField
                        ref="address"
                        style={styles.textField}
                        hintText="Address" />
                    <TextField
                        ref="comment"
                        style={styles.textField}
                        hintText="Comment"
                        type="comment" />
                    <RaisedButton
                        onTouchTap={this._onLoginButtonClick}
                        style={styles.button}
                        secondary={true}
                        label="Add home" />
                </FullWidthSection>

            </AppCanvas>
        );
    }
}

Main.contextTypes = {
    router: React.PropTypes.func
};

Main.childContextTypes = {
    muiTheme: React.PropTypes.object
};

module.exports = Main;
