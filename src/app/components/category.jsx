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

class Category extends React.Component {

    constructor() {
        super();
        this._handleDialogCancel = this._handleDialogCancel.bind(this);
        this._handleDialogSubmit = this._handleDialogSubmit.bind(this);
        this.state = {
            status: "Loading...",
            category: null,
            num: 0
        };

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

    _onRankCategoryListClick(pcategory) {
        if (typeof (Storage) != "undefined") {
            localStorage.setItem("cid", pcategory);
            localStorage.setItem("score", 1);
            this.refs.rankCategoryDialog.show();
        }
    }

    _handleDialogCancel() {
        this.refs.rankCategoryDialog.dismiss();
    }

    _handleDialogSubmit() {


        if (typeof (Storage) != "undefined") {

            $.ajax({
                url: "http://capstonedd.cs.pdx.edu:8000/api/categories?id=" + localStorage.getItem("cid")
                + "&weight=" + localStorage.getItem("score"),
                type: "PUT",
                cache: false,
                headers: {
                    "Authorization":"JWT " + localStorage.getItem("token")
                },
                success: function(data) {
                    this.refs.rankCategoryDialog.dismiss();
                    this.render();
                }.bind(this),
                error: function(xhr, status, err) {
                    return 1;
                }.bind(this)
            });
        } else {
            this.context.router.transitionTo("login");
        }
    }

    _handleDropMenuChange(e, selectedIndex, menuItem) {
        if (typeof (Storage) != "undefined") {
            localStorage.setItem("score", selectedIndex+1);
        }
    }


    generateAvatar(letter) {
        let avatar = <Avatar style={{color:'red'}}>A</Avatar>;
        letter = letter.toUpperCase();
        letter = letter.charAt(0);
        switch (letter) {
            case 'A': avatar = <Avatar style={{backgroundColor:'pink', color:'white'}}>A</Avatar>; break;
            case 'B': avatar = <Avatar style={{backgroundColor:'yellow', color:'white'}}>B</Avatar>; break;
            case 'C': avatar = <Avatar style={{backgroundColor:'fuchsia', color:'white'}}>C</Avatar>; break;
            case 'D': avatar = <Avatar style={{backgroundColor:'coral', color:'white'}}>D</Avatar>; break;
            case 'E': avatar = <Avatar style={{backgroundColor:'chocolate', color:'white'}}>E</Avatar>; break;
            case 'F': avatar = <Avatar style={{backgroundColor:'darksalmon', color:'white'}}>F</Avatar>; break;
            case 'G': avatar = <Avatar style={{backgroundColor:'deeppink', color:'white'}}>G</Avatar>; break;
            case 'H': avatar = <Avatar style={{backgroundColor:'maroon', color:'white'}}>H</Avatar>; break;
            case 'I': avatar = <Avatar style={{backgroundColor:'orange', color:'white'}}>I</Avatar>; break;
            case 'J': avatar = <Avatar style={{backgroundColor:'black', color:'white'}}>J</Avatar>; break;
            case 'K': avatar = <Avatar style={{backgroundColor:'yellowgreen', color:'white'}}>K</Avatar>; break;
            case 'L': avatar = <Avatar style={{backgroundColor:'steelblue', color:'white'}}>L</Avatar>; break;
            case 'M': avatar = <Avatar style={{backgroundColor:'peru', color:'white'}}>M</Avatar>; break;
            case 'N': avatar = <Avatar style={{backgroundColor:'plum', color:'white'}}>N</Avatar>; break;
            case 'O': avatar = <Avatar style={{backgroundColor:'navy', color:'white'}}>O</Avatar>; break;
            case 'P': avatar = <Avatar style={{backgroundColor:'orangered', color:'white'}}>P</Avatar>; break;
            case 'Q': avatar = <Avatar style={{backgroundColor:'mediumorchid', color:'white'}}>Q</Avatar>; break;
            case 'R': avatar = <Avatar style={{backgroundColor:'gray', color:'white'}}>R</Avatar>; break;
            case 'S': avatar = <Avatar style={{backgroundColor:'goldenrod', color:'white'}}>S</Avatar>; break;
            case 'T': avatar = <Avatar style={{backgroundColor:'dodgerblue', color:'white'}}>T</Avatar>; break;
            case 'U': avatar = <Avatar style={{backgroundColor:'darkkhaki', color:'white'}}>U</Avatar>; break;
            case 'V': avatar = <Avatar style={{backgroundColor:'brown', color:'white'}}>V</Avatar>; break;
            case 'W': avatar = <Avatar style={{backgroundColor:'blueviolet', color:'white'}}>A</Avatar>; break;
            case 'X': avatar = <Avatar style={{backgroundColor:'forestgreen', color:'white'}}>A</Avatar>; break;
            case 'Y': avatar = <Avatar style={{backgroundColor:'MediumVioletRed', color:'white'}}>A</Avatar>; break;
            case 'Z': avatar = <Avatar style={{backgroundColor:'SandyBrown', color:'white'}}>A</Avatar>; break;
            case '1': avatar = <Avatar style={{backgroundColor:'gray', color:'white'}}>1</Avatar>; break;
            case '2': avatar = <Avatar style={{backgroundColor:'blue', color:'white'}}>2</Avatar>; break;
            case '3': avatar = <Avatar style={{backgroundColor:'brown', color:'white'}}>3</Avatar>; break;
            case '4': avatar = <Avatar style={{backgroundColor:'orange', color:'white'}}>4</Avatar>; break;
            case '5': avatar = <Avatar style={{backgroundColor:'red', color:'white'}}>5</Avatar>; break;
            default : avatar = <Avatar style={{backgroundColor:'PaleVioletRed', color:'white'}}>#</Avatar>;
        }

        return avatar;
    }

    render() {

        if (typeof (Storage) != "undefined") {

            $.ajax({
                url: "http://capstonedd.cs.pdx.edu:8000/api/categories/",
                type: "GET",
                cache: false,
                headers: {
                    "Authorization":"JWT " + localStorage.getItem("token")
                },
                success: function(data) {
                    this.setState({status: "Categories", category: data.category, num: data.category.length});
                }.bind(this),
                error: function(xhr, status, err) {
                    this.setState({category: xhr});
                }.bind(this)
            });
        } else {
            this.context.router.transitionTo("login");
        }


        let list = [];
        let category = this.state.category;
        for (let i = 0; i < this.state.num; i++) {
                list.push(
                    <ListItem
                        leftAvatar={this.generateAvatar(category[i].weight.toString())}
                        primaryText={category[i].summary}
                        secondaryText={category[i].description}
                        onTouchStart={this._onRankCategoryListClick.bind(this, category[i].id)}/>,
                    <ListDivider inset={true} />
                )
        }

        let menuItems = [
            { payload: 1, text: '1. Very Unimportant' },
            { payload: 2, text: '2. Unimportant' },
            { payload: 3, text: '3. Modest' },
            { payload: 4, text: '4. Important' },
            { payload: 5, text: '5. Very Important' }
        ];

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
                <Dialog title="Rank The Category" actions={customActions}
                        autoDetectWindowHeight={true}
                        autoScrollBodyContent={true}
                        ref="rankCategoryDialog">
                    <div>
                        <DropDownMenu
                            ref="score"
                            menuItems={menuItems}
                            onChange={this._handleDropMenuChange.bind(this)} />
                    </div>
                </Dialog>

                <List subheader={this.state.status}>
                    {list}
                </List>
            </MobileSheet>
        );
    }


}


Category.contextTypes = {
    router: React.PropTypes.func
};

Category.childContextTypes = {
    muiTheme: React.PropTypes.object
};

module.exports = Category;