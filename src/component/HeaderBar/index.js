import React from 'react';
import Dialog from 'material-ui/Dialog';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  backImg: {
    marginTop: 16,
    paddingLeft: 20,
    height: 40,
    width: 40,
    position: 'absolute',
    left: 0,
    top: 0,
    cursor: 'pointer'
  }
};

export default class HeaderBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            isLogoutBtnShow: props.logoutBtn,
            isBackBtnShow: props.backBtn,
            isOpenDialog: false,
            titleBarBackgroundColor: props.titleBarBackgroundColor,
            titleBarTextColor: props.titleBarTextColor,
            titleBackImage: props.titleBackImage
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            title: nextProps.title,
            isLogoutBtnShow: nextProps.logoutBtn,
            isBackBtnShow: nextProps.backBtn,
            titleBarBackgroundColor: nextProps.titleBarBackgroundColor,
            titleBarTextColor: nextProps.titleBarTextColor,
            titleBackImage: nextProps.titleBackImage
        });
        //alert('componentWillReceiveProps'+ JSON.stringify(nextProps));
    }

    handleClose = () => {
        this.setState({ isOpenDialog: false });
    }

    handleOk = () => {
        this.setState({ isOpenDialog: false });
        this.props.logout();
    }

    logout = () => {
        this.setState({ isOpenDialog: true });
    }

    renderDialog = () => {
        const actions = [
            <FlatButton
                label="取消"
                onClick={this.handleClose}
                style={{ boxShadow: '0px 1px 15px #E1D2CF', backgroundColor: '#FFF7EE', color: '#6D6B6A', fontSize: 16 }}
            />,
            <FlatButton
                label="確定"
                onClick={this.handleOk}
                style={{ marginRight: 10, marginLeft: 20, boxShadow: '0px 1px 15px #E1D2CF', backgroundColor: '#E55125', color: '#FFF7EE', fontSize: 16 }}
            />,
        ];
        return (
            <div>
                <MuiThemeProvider>
                    <Dialog
                        bodyStyle={{ backgroundColor: '#FFF7EE' }}
                        contentStyle={{ backgroundColor: '#FFF7EE' }}
                        titleStyle={{ backgroundColor: '#FFF7EE' }}
                        actions={actions}
                        modal={false}
                        open={this.state.isOpenDialog}
                        onRequestClose={this.handleClose}>
                        <div style={{ color: '#6D6B6A', backgroundColor: '#FFF7EE', fontSize: 16 }}>你確定要登出 仁濟心連心網站 嗎?</div>
                    </Dialog>
                </MuiThemeProvider>
            </div >
        );
    }

    render() {
        let titleBarStyle = {
          //flex: 1,
          //width: this.props.dimemsion.width,
          width: '100%',
          //height: window.innerHeight,
          backgroundColor: this.state.titleBarBackgroundColor,
          textAlign: 'center',
          height: 75,
          alignItems: 'center',
          boxShadow: '0px 1px 15px #E1D2CF',
          verticalAlign: 'middle',
          display: 'flex',
          justifyContent: 'center'
        };
        let titleStyle = {
          fontSize: 24,
          fontWeight: 'bold',
          //fontFamily: 'source-han-sans-traditional',
          verticalAlign: 'middle',
          color: this.state.titleBarTextColor,
          //height: 75
        };

        let logoutStyle = {
          fontSize: 30,
          //fontFamily: 'source-han-sans-traditional',
          color: this.state.titleBarTextColor,
          //height: 75,
          display: 'inline-block',
          position: 'absolute',
          right: 25,
          top: 15,
          cursor: 'pointer'
        }

        return (
          <div style={titleBarStyle}>
            {this.state.isBackBtnShow && <img style={styles.backImg} src={require('../../images/' + this.state.titleBackImage)} onClick={() => this.props.backToPreviousPage()} alt=''/>}
            <div style={titleStyle}>{this.state.title}</div>
            {this.state.isLogoutBtnShow && <div style={logoutStyle} onClick={this.logout}>登出</div>}
            {this.renderDialog()}
          </div>
        );
    }
}
