let React = require('react');


let MobileSheet = React.createClass({

    propTypes: {
        height: React.PropTypes.number
    },

    getDefaultProps() {
        return {
            height: 500
        };
    },

    render() {

        let styles = {
            root: {
                float: 'left',
                marginBottom: 24,
                marginRight: 24,
                width: screen.width

            },

            container: {
                border: 'solid 1px #d9d9d9',
                borderBottom: 'none',
                height: this.props.height,
                overflow: 'scroll'
            },

            bottomTear: {
                display: 'block',
                position: 'relative',
                marginTop: -10,
                width: 360
            }
        };

        return (
            <div style={styles.root}>
                <div style={styles.container}>
                    {this.props.children}
                </div>
            </div>
        );
    }

});

module.exports = MobileSheet;