/** In this file, we create a React component which incorporates components provided by material-ui */

let React = require('react');
let mui = require('material-ui');
let Router = require('react-router');
let FullWidthSection = require('./full-width-section.jsx');
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
        this._onAddHomeClick = this._onAddHomeClick.bind(this);
        this.state = {
            a: "a",
            b: "b"
        }

        //this is dictionary
        //address: "Something";
        //comment: "comment";
        //only for this class

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


    _onAddHomeClick() {
        let nickname = this.refs.nickname.getValue();
        let address = this.refs.address.getValue();

        if (typeof (Storage) != "undefined") {

            $.ajax({
                url: "http://capstonedd.cs.pdx.edu:8000/api/houses/",
                type: "POST",
                cache: false,
                headers: {
                    "Authorization":"JWT " + localStorage.getItem("token")
                },
                // Json to be uploaded
                data: {nickname: nickname, address: address},
                success: function(data) {
                    this.setState({a: "sss"});
                }.bind(this),
                error: function(xhr, status, err) {
                    this.setState({a: xhr});
                }.bind(this)
            });
            this.context.router.transitionTo("home");
        } else {
            this.context.router.transitionTo("login");
        }

    }


    render() {

        let styles = this.getStyles();

        return (
            <FullWidthSection style={styles.fullWidthSection}>
                <h2 style={styles.headline}>Add a home Yo! </h2>
                <TextField
                    ref="nickname"
                    hintText="nickname" />
                <TextField
                    ref="address"
                    hintText="Address" />
                <RaisedButton
                    onTouchTap={this._onAddHomeClick}
                    label="Add home" />
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
