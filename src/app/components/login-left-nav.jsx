let React = require('react');
let Router = require('react-router');
let { MenuItem, LeftNav, Styles } = require('material-ui');
let { Colors, Spacing, Typography } = Styles;

let menuItems = [
    { route: 'login', text: 'Log in' },
    { type: MenuItem.Types.SUBHEADER, text: 'Useful Links' },
    { type: MenuItem.Types.LINK, payload: 'http://www.homezzo.com/about.html', text: 'About' },
    { type: MenuItem.Types.LINK, payload: 'http://www.homezzo.com/privacy.html', text: 'Privacy' },
    { type: MenuItem.Types.LINK, payload: 'http://www.homezzo.com/terms.html', text: 'Terms and Conditions' }
];


class LoginLeftNav extends React.Component {

    constructor() {
        super();
        this.toggle = this.toggle.bind(this);
        this._getSelectedIndex = this._getSelectedIndex.bind(this);
        this._onLeftNavChange = this._onLeftNavChange.bind(this);
        this._onHeaderClick = this._onHeaderClick.bind(this);
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
                HomeZZO
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
        this.context.router.transitionTo('login');
        this.refs.leftNav.close();
    }

}

LoginLeftNav.contextTypes = {
    router: React.PropTypes.func
};

module.exports = LoginLeftNav;