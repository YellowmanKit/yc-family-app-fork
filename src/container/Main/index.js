import React from 'react';
import axios from 'axios';
import StatementBar from './../../component/StatementBar';
import HeaderBar from './../../component/HeaderBar';
import Page from './../../component/Page';

export default class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errorMsg: '',
            loginFailed: false,
            isLogin: false,
            trace: [],
            currentPage: {
                login: true,
                title: '仁濟心連心',
                titleBarBackgroundColor: '#FFF6ED',
                titleBarTextColor: '#666666',
            },
            profile: {},
            dimemsion: {
                width: window.innerWidth,
                height: window.innerHeight
            },
        };
        this.autoLogin();
    }

    autoLogin() {
        const id = localStorage.getItem('id');
        const pw = localStorage.getItem('pw');
        if (id && pw) { this.login(id, pw); }
    }

    componentDidMount() {
        //this.updateWindowDimensions();
       // window.addEventListener('resize', this.updateWindowDimensions.bind(this));
        window.addEventListener('orientationchange', this.updateWindowDimensions2.bind(this));
    }

    componentWillUnmount() {
       // window.removeEventListener('resize', this.updateWindowDimensions.bind(this));
        window.removeEventListener('orientationchange', this.updateWindowDimensions2.bind(this));
    }

    updateWindowDimensions2() {
        let width = this.state.dimemsion.width;
        let height = this.state.dimemsion.height;

        // let width = window.innerWidth;
        // let height = window.innerHeight;
        // let isPortrait = true;
        // if(width > height){
        //     this.setState({
        //         dimemsion: {
        //             width: document.body.offsetHeight,
        //             height: document.body.offsetWidth
        //         }
        //     });
        // }else{
        //     this.setState({
        //         dimemsion: {
        //             width: document.body.offsetWidth,
        //             height: document.body.offsetHeight
        //         }
        //     });
        // }

        this.setState({
            dimemsion: {
                width: height,
                height: width
            }
        });

    }

    updateWindowDimensions() {
       // const width = this.state.dimemsion.width;
        this.setState({
            dimemsion: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        });
        // console.log(width);
        // console.log(window.innerWidth);
        // if (width - window.innerWidth > 1) {
        //     window.location.reload();
        // }
        //window.location.reload();
    }

    logout() {
        this.setState({
            isLogin: false,
            currentPage: {
                login: true,
                title: '仁濟心連心',
                titleBarBackgroundColor: '#FFF6ED',
                titleBarTextColor: '#666666',
            }
        })
    }

    statementClick = async (statementProps) => {
        let currentPage = {
            title: statementProps,
            statement: true,
            content: statementProps,
            backBtn: true,
            titleBarBackgroundColor: '#FFF6ED',
            titleBarTextColor: '#666666',
            titleBackImage: 'FAC012_b.png'
        };
        await this.setState({
            currentPage
        });
        this.state.trace.splice(0, 0, currentPage);
    }
    // componentWillReceiveProps() {
    //     window.location.reload(true);
    // }

    login = async (id, pw) => {

        //const userid = "alex3288@gmail.com"
        //const password = "asdf2013"

        /*let _currentPage = {
            title: '仁濟心連心',
            mainmenu: true,
            logoutBtn: true,
            titleBarBackgroundColor: '#FFF6ED',
            titleBarTextColor: '#666666',
            titleBackImage: 'FAC012_b.png'
        }
        this.setState({
            currentPage: _currentPage,
            profile: {}
        });
        return;*/

        axios.post(process.env.REACT_APP_LOGIN,JSON.stringify({}),{
            headers: {
              'userid': id,
              'password': pw
            }
          }
        )
        .then(async (res)=>{

          localStorage.setItem('id', id);
          localStorage.setItem('pw', pw);

          console.log(res);
          if(!res.data.status){
            this.setState({ loginFailed: true });
            return;
          }

          let _currentPage = {
              title: '仁濟心連心',
              mainmenu: true,
              logoutBtn: true,
              titleBarBackgroundColor: '#FFF6ED',
              titleBarTextColor: '#666666',
              titleBackImage: 'FAC012_b.png'
          }
          this.setState({
            currentPage: _currentPage,
            profile: res.data
          });

          this.state.trace.splice(0, 0, _currentPage);
        }).catch(err=>{
          this.setState({ loginFailed: true });
          console.log(err);
        });


    }

    goTo = async (pageProps) => {
        let currentPage = {
            logoutBtn: true,
            backBtn: true,
            titleBarBackgroundColor: '#FFF6ED',
            titleBarTextColor: '#FFF7EE',
            titleBackImage: 'FAC012_w.png'
        };
        if (pageProps === 'photo') {
            currentPage.title = '相簿';
            currentPage.photo = true;
            currentPage.titleBarBackgroundColor = '#AD1F25';
        } else if (pageProps === 'activityList') {
            currentPage.title = '活動消息';
            currentPage.activityList = true;
            /*currentPage.activities = [
                '太極深造班 第一期',
                '瑜伽入門班 第三期',
                '太極入門班 第二期',
                '瑜伽深造班 第二期',
                '速成入門班 第二期',
                '速成入門班 第十期',
                '速成入深造班 第二期',
                '速成入深造班 第十期',
            ];*/
            currentPage.titleBarBackgroundColor = '#E9AE2D';
        } else if (pageProps === 'meal') {
            currentPage.title = '每日餐單';
            currentPage.meal = true;
            currentPage.mealMenu = {
                /**breakfast: '麥皮',
                lunch: '炸醬面',
                tea: '曲奇',
                dinner: '粥',*/
            };
            currentPage.titleBarBackgroundColor = '#046786';
        }
        await this.setState({
            currentPage
        });
        this.state.trace.splice(0, 0, currentPage);
    }
    activitySelected = async (activityProps) => {
        // alert("activitySelected:::" + JSON.stringify(activityProps));
        //console.log(activityProps);
        let currentPage = {
            activityBooking: true,
            logoutBtn: true,
            title: '活動消息',
            activity: activityProps,
            backBtn: true,
            titleBarBackgroundColor: '#E9AE2D',
            titleBarTextColor: '#FFF7EE',
            titleBackImage: 'FAC012_w.png'
        };
        await this.setState({
            currentPage
        });
        this.state.trace.splice(0, 0, currentPage);
    }

    backToPreviousPage() {
        //alert('backToPreviousPage:::' + JSON.stringify(this.state.trace[0]));
        this.state.trace.splice(0, 1);
        if (this.state.trace.length === 0) {
            this.setState({
                currentPage: {
                    login: true
                }
            });
        } else {
            this.setState({
                currentPage: this.state.trace[0]
            });
        }
    }

    render() {
        let curPage = this.state.currentPage;

        let container = {
            width: '100%',//this.state.dimemsion.width,
            height: this.state.dimemsion.height,
            minHeight: '720px',
            backgroundColor: '#FCF4E7',
            textAlign: 'center',
            display: 'flex',
            flexFlow: 'column nowrap',
            position: 'relative',
           // orient: 'portrait',
            //transform: 'scale(1, 1)',
           // zoom:1
        }
        return (
            <div style={container}>
                <HeaderBar
                    title={curPage.title}
                    logoutBtn={curPage.logoutBtn}
                    backBtn={curPage.backBtn}
                    backToPreviousPage={this.backToPreviousPage.bind(this)}
                    titleBarBackgroundColor={this.state.currentPage.titleBarBackgroundColor}
                    titleBarTextColor={this.state.currentPage.titleBarTextColor}
                    titleBackImage={this.state.currentPage.titleBackImage}
                    dimemsion={this.state.dimemsion}
                    logout={this.logout.bind(this)} />
                <Page currentPage={curPage}
                    mainState={this.state}
                    login={this.login.bind(this)}
                    goTo={this.goTo.bind(this)}
                    activitySelected={this.activitySelected.bind(this)}
                    profile={this.state.profile}
                    innerHeight={this.state.dimemsion.height}
                    innerWidth={this.state.dimemsion.width} />
                <StatementBar statementClick={this.statementClick.bind(this)} />
            </div>
        );
    }
}
