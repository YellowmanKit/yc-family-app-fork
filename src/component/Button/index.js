import React from 'react';

const styles = {
    homeBtn: {
      width: '50%',
      backgroundColor: '#53C2BB',
      fontSize: 20,
      padding: 10,
      color: "#FFF7EE",
      borderRadius: 5,
      marginTop: 20
    }
};

export default class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
          <div onClick={this.props.onClick} style={styles.homeBtn} >{this.props.text}</div>
        );
    }
}
