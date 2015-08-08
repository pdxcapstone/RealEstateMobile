let React = require('react');
let mui = require('material-ui');
let Router = require('react-router');
let MobileSheet = require('./mobile-sheet.jsx');
let List = mui.List;
let ListDivider = mui.ListDivider;
let ListItem = mui.ListItem;
let IconButton = mui.IconButton;
let RaisedButton = mui.RaisedButton;
let Styles = mui.Styles;
let ThemeManager = new mui.Styles.ThemeManager();
let { Spacing, Typography } = Styles;
let Colors = mui.Styles.Colors;

let {
    Avatar,
        Card,
        CardActions,
        CardExpandable,
        CardHeader,
        CardMedia,
        CardText,
        CardTitle,
        FlatButton,
        Dialog,
    DropDownMenu
} = mui;

let RouteHandler = Router.RouteHandler;

class Home extends React.Component {

    constructor() {
        super();
        this._onAddHomeButtonClick = this._onAddHomeButtonClick.bind(this);
        this._handleDialogCancel = this._handleDialogCancel.bind(this);
        this._handleDialogSubmit = this._handleDialogSubmit.bind(this);
        this.state = {
            house: null,
            num: 0,
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

    _onRateHouseListClick(pi, pj) {
        this.refs.rateHouseDialog.show();
    }

    _handleDialogCancel() {
        this.refs.rateHouseDialog.dismiss();
    }

    _handleDialogSubmit() {

    }

    setItem(value) {
        return rhs;
    }

    render() {


        let list = [];
        let house = this.state.house;
        for (let i = 0; i < this.state.num; i++) {
            let hid = house[i].id;
            let json = null;

            // Get categories
            if (typeof (Storage) != "undefined") {

                $.ajax({
                    url: "http://capstonedd.cs.pdx.edu:8000/api/houses?id=" + hid,
                    type: "GET",
                    async: false,
                    cache: false,
                    headers: {
                        "Authorization":"JWT " + localStorage.getItem("token")
                    },
                    success: function(data) {
                        json = data;
                    }.bind(this),
                    error: function(xhr, status, err) {
                        return 0;
                    }.bind(this)
                });
            } else {
                this.context.router.transitionTo("login");
            }

            let category = json.category;
            let clist = [];
            for (let j = 0; j < category.length; j++) {
                clist.push(
                    <ListItem
                        leftAvatar={<Avatar style={{color:'red'}}>B</Avatar>}
                        primaryText={category[j].summary}
                        secondaryText={"Score: " + category[j].score}
                        onTouchStart={this._onRateHouseListClick.bind(this, hid, category[j].id)}/>,
                    <ListDivider inset={true} />
                )
            }

            list.push(
                <Card initiallyExpanded={false}>
                    <CardHeader
                        title={house[i].nickname}
                        subtitle={house[i].address}
                        avatar={<Avatar style={{color:'red'}}>A</Avatar>}
                        showExpandableButton={true}>
                    </CardHeader>
                    <CardText expandable={true}>
                        {clist}
                    </CardText>
                    <CardActions expandable={true}>
                        <FlatButton label="Show in Maps"/>
                    </CardActions>
                </Card>
            )
        }

        let menuItems = [
            { payload: 1, text: '1. Poor' },
            { payload: 2, text: '2. Below Average' },
            { payload: 3, text: '3. Average' },
            { payload: 4, text: '4. Good' },
            { payload: 5, text: '5. Excellent' }
        ];

        let buttonStyle = {marginTop:'20px',marginLeft: '100px'};

        let customActions = [
            <FlatButton
                key={1}
                label="Cancel"
                secondary={true}
                onTouchTap={this._handleDialogCancel} />,
            <FlatButton
                key={2}
                label="Submit"
                primary={true}
                onTouchTap={this._handleDialogSubmit} />
        ];

        return (
            <MobileSheet>
                <Dialog title="Rate Your House" actions={customActions}
                        autoDetectWindowHeight={true}
                        autoScrollBodyContent={true}
                        ref="rateHouseDialog">
                    <div>
                        <DropDownMenu
                            ref="score"
                            menuItems={menuItems}/>
                    </div>
                </Dialog>

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