let React = require('react');
let mui = require('material-ui');
let Router = require('react-router');
let MobileSheet = require('./mobile-sheet.jsx');
let MoreVertIcon = require('./MoreVertIcon.jsx');
let Avatar = mui.Avatar;
let List = mui.List;
let ListDivider = mui.ListDivider;
let ListItem = mui.ListItem;
let IconButton = mui.IconButton;
let RaisedButton = mui.RaisedButton;
let Styles = mui.Styles;
let ThemeManager = new mui.Styles.ThemeManager();
let { Spacing, Typography } = Styles;
let Colors = mui.Styles.Colors;
let IconMenu = mui.IconMenu;
let MenuItem = mui.MenuItem;

let RouteHandler = Router.RouteHandler;

class Home extends React.Component {

    constructor() {
        super();
        this._onAddHomeButtonClick = this._onAddHomeButtonClick.bind(this);
        this.state = {
            house: null,
            num: 0
        }

        if (typeof (Storage) != "undefined") {

            $.ajax({
                url: "http://capstonedd.cs.pdx.edu:8000/api/houses/",
                type: "GET",
                cache: false,
                headers: {
                    "Authorization":"JWT " + localStorage.getItem("token")
                },
                success: function(data) {
                    this.setState({house: data.house, num: data.house.length});
                }.bind(this),
                error: function(xhr, status, err) {
                    this.setState({house: xhr});
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

    _onAddHomeButtonClick() {
        this.context.router.transitionTo("addhome");
    }

    render() {

        let iconButtonElement = (
            <IconButton
                touch={true}
                tooltip="more"
                tooltipPosition="bottom-left">
                <MoreVertIcon color={Colors.grey400} />
            </IconButton>
        );
        let rightIconMenu = (
            <IconMenu iconButtonElement={iconButtonElement}>
                <MenuItem>Position</MenuItem>
                <MenuItem>Share</MenuItem>
                <MenuItem>Details</MenuItem>
            </IconMenu>
        );

        let list = [];
        let house = this.state.house;
        for (var i = 0; i < this.state.num; i++) {
            list.push(
                <ListItem
                    leftAvatar={<Avatar src="images/ok-128.jpg" />}
                    rightIconButton={rightIconMenu}
                    primaryText={house[i].nickname}
                    secondaryText={house[i].address}
                    secondaryTextLines={1} />,
                <ListDivider inset={true} />
            )
        }

        let buttonStyle = {marginTop:'20px',marginLeft: '100px'};

        return (
            <MobileSheet>
                <List subheader="Houses">
                    {list}
                </List>
                <RaisedButton
                    onTouchTap={this._onAddHomeButtonClick}
                    style= {buttonStyle}
                    secondary={true}
                    label="AddHome" />
            </MobileSheet>
        );
    }


}


Home.contextTypes = {
    router: React.PropTypes.func
};

Home.childContextTypes = {
    muiTheme: React.PropTypes.object
};

module.exports = Home;