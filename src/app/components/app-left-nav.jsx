
let React = require('react');
let Router = require('react-router');
let { MenuItem, LeftNav, Styles } = require('material-ui');
let { Colors, Spacing, Typography } = Styles;

let menuItems = [
    { route: 'home', text: 'Home'},
    { route: 'houses', text: 'Houses' },
    { route: 'categories', text: 'Categories' },
    { route: 'logout', text: 'Log out' },
    { type: MenuItem.Types.SUBHEADER, text: 'Useful Links' },
    { type: MenuItem.Types.LINK, payload: 'http://capstonedd.cs.pdx.edu/', text: 'About' },
    { type: MenuItem.Types.LINK, payload: 'http://capstonedd.cs.pdx.edu/', text: 'Privacy' },
    { type: MenuItem.Types.LINK, payload: 'http://capstonedd.cs.pdx.edu/', text: 'Terms and Conditions' }
];


class AppLeftNav extends React.Component {

    constructor() {
        super();
        this.toggle = this.toggle.bind(this);
        this._getSelectedIndex = this._getSelectedIndex.bind(this);
        this._onLeftNavChange = this._onLeftNavChange.bind(this);
        this._onHeaderClick = this._onHeaderClick.bind(this);

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
                    // Redirect to login if not logged in
                    this.context.router.transitionTo("login");
                }.bind(this)
            });
        } else {
            this.context.router.transitionTo("login");
        }
    }

    getStyles() {
        return {
            cursor: 'pointer',
            //.mui-font-style-headline
            fontSize: '24px',
            color: Typography.textFullWhite,
            lineHeight: Spacing.desktopKeylineIncrement + 'px',
            fontWeight: Typography.fontWeightLight,
            backgroundColor: Colors.cyan500,
            paddingLeft: Spacing.desktopGutter,
            paddingTop: '0px',
            marginBottom: '8px'
        };
    }

    render() {
        let header = (
            <div style={this.getStyles()} onTouchTap={this._onHeaderClick}>
                Hi, {this.state.firstname} {this.state.lastname}
            </div>
        );

        return (
            <LeftNav
                ref="leftNav"
                docked={false}
                isInitiallyOpen={false}
                header={header}
                menuItems={menuItems}
                selectedIndex={this._getSelectedIndex()}
                onChange={this._onLeftNavChange} />
        );
    }

    toggle() {
        this.refs.leftNav.toggle();
    }

    _getSelectedIndex() {
        let currentItem;

        for (let i = menuItems.length - 1; i >= 0; i--) {
            currentItem = menuItems[i];
            if (currentItem.route && this.context.router.isActive(currentItem.route)) return i;
        }
    }

    _onLeftNavChange(e, key, payload) {
        this.context.router.transitionTo(payload.route);
    }

    _onHeaderClick() {
        this.context.router.transitionTo('home');
        this.refs.leftNav.close();
    }

}

AppLeftNav.contextTypes = {
    router: React.PropTypes.func
};

module.exports = AppLeftNav;