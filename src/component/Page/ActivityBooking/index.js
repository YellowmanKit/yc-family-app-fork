import React from 'react';
import axios from 'axios';

class ActivityBooking extends React.Component {
    constructor(props) {
        super(props);
        const reservedArray = this.getReservedArray(props.activity.ErlStsDes);
        this.state = {
            routeState: props.routeState ? props.routeState : 'activityDetail',
            title: props.activity.EvtNam,
            reserved: reservedArray.includes(props.profile.nfcId.toUpperCase())
        };
    }

    _renderDetail = (detailObj) => {
        let activity = this.props.activity;
        //console.log(activity)
        detailObj = {
            sdate: activity.EvtFrDat,
            edate: activity.EvtToDat,
            duriation: activity.EvtStaTim + ' - ' + activity.EvtEndTim,
            weekDate: this.GetWeekDayString(activity.EvtWkDay),
            location: activity.Vnu,
            fee: this.getFeeDescription(activity.EvtCosDes),
            deadline: activity.ErlEndDay
        };

        return (
            <div style={{ textAlign: 'center', paddingRight: 5 }}>
                <div style={{ marginTop: 30, verticalAlign: 'text-top' }}>
                    <div style={styles.detailCol1}>日期 ：</div>
                    <div style={styles.detailCol2}>{detailObj.sdate}{detailObj.sdate !== detailObj.edate? ' 至 ' + detailObj.edate:''}</div>
                </div>
                <div style={{ marginTop: 5, verticalAlign: 'text-top' }}>
                    <div style={styles.detailCol1}>時間 ：</div>
                    <div style={styles.detailCol2}>{detailObj.duriation}</div>
                </div>
                <div style={{ marginTop: 5, verticalAlign: 'text-top' }}>
                    <div style={styles.detailCol1}>星期 ：</div>
                    <div style={styles.detailCol2}>{detailObj.weekDate}</div>
                </div>
                <div style={{ marginTop: 5, verticalAlign: 'text-top' }}>
                    <div style={styles.detailCol1}>地點 ：</div>
                    <div style={styles.detailCol2}>{detailObj.location}</div>
                </div>
                <div style={{ marginTop: 5, verticalAlign: 'text-top' }}>
                    <div style={styles.detailCol1}>費用 ：</div>
                    <div style={styles.detailCol2}>{detailObj.fee}</div>
                </div>
                <div style={{ marginTop: 5, verticalAlign: 'text-top' }}>
                    <div style={styles.detailCol1}>截止日期 ：</div>
                    <div style={styles.detailCol2}>{detailObj.deadline}</div>
                </div>
                <div style={styles.checkBookingBtn} onClick={() => this.btnClick('activityDetail')}>留位狀況</div>
            </div>
        );
    }
    _renderBookRequest = () => {

        return (
            <div>
                <div style={this.styles.text2}>確定留位 ?</div>
                <div style={{ width: '100%', textAlign: 'center', marginTop: this.props.innerHeight * 0.2 }}>
                    <div style={styles.sureBtn} onClick={() => this.btnClick('bookRequest_ok')}>確定留位</div>
                    <div style={styles.cancelBtn} onClick={() => this.btnClick('bookRequest_cancel')}>取消留位</div>
                </div>
            </div>);

    }

    _renderBookingSuccess = () => {

        return (
            <div style={{ maxheight: 50 }}>
                <div style={this.styles.text}>你已成功留位！ <br />有關同事將會與你接洽。</div>
                <div style={styles.textContact}>如有問題請致電 24086639 聯絡我們。</div>
                <div style={{ width: '100%', textAlign: 'center', marginTop:this.props.innerHeight * 0.1 }}>
                    <div style={styles.sureBtn} onClick={() => this.btnClick('bookingSuccess_ok')}>確定</div>
                </div>
            </div>);

    }

    _renderBookedStatus = () => {
        return (
            <div style={{ maxheight: 50 }}>
                <div style={this.styles.text2}>您已留位，<br />需要<span style={{ color: '#E75125' }}>取消</span>留位嗎？</div>
                <div style={{ width: '100%', textAlign: 'center', marginTop: this.props.innerHeight * 0.2 }}>
                    <div style={styles.sureBtn} onClick={() => this.btnClick('bookedStatus_cancel')}>確定取消</div>
                    <div style={styles.cancelBtn} onClick={() => this.btnClick('bookedStatus_keep')}>保留留位</div>
                </div>
            </div>);
    }

    _renderCancelConfirm = () => {
        return (
            <div style={{ maxheight: 50 }}>
                <div style={this.styles.text}>你已成功取消留位！</div>
                <div style={styles.textContact}>如有問題請致電 24086639 聯絡我們。</div>
                <div style={{ width: '100%', textAlign: 'center', marginTop: this.props.innerHeight * 0.1 }}>
                    <div style={styles.sureBtn} onClick={() => this.btnClick('cancelConfirm_ok')}>確定</div>
                </div>
            </div>);
    }

    btnClick = async (btnId) => {
        if (btnId === 'activityDetail') {
          /*const nfcId = this.props.profile.nfcId.toUpperCase();
          const reservedArray = this.state.reservedArray;
          console.log(nfcId);
          console.log(reservedArray);*/
          let isBooked = this.state.reserved;
          //console.log(isBooked);

          if (isBooked) {
              await this.setState({ routeState: 'bookedStatus' });
          } else {
              await this.setState({ routeState: 'bookRequest' });
          }
        } else if (btnId === 'bookedStatus_cancel') {
          this.UpdateEventStatus(false);
            //await this.setState({ routeState: 'cancelConfirm' });
        } else if (btnId === 'bookedStatus_keep') {
            await this.setState({ routeState: 'activityDetail' });
        } else if (btnId === 'cancelConfirm_ok') {
            await this.setState({ routeState: 'activityDetail' });
        } else if (btnId === 'bookRequest_ok') {
            this.UpdateEventStatus(true);
            //await this.setState({ routeState: 'bookingSuccess' });
        } else if (btnId === 'bookRequest_cancel') {
            await this.setState({ routeState: 'activityDetail' });
        } else if (btnId === 'bookingSuccess_ok') {
            await this.setState({ routeState: 'activityDetail' });
        }

    }

    _renderContent = () => {
        let contentType = this.state.routeState;
        if (contentType === 'activityDetail') {
            return (
                <div style={styles.detailContainer}>
                    {this._renderDetail()}
                </div>
            );
        } else if (contentType === 'bookRequest') {
            return (
                <div style={styles.detailContainer}>
                    {this._renderBookRequest()}
                </div>
            );
        } else if (contentType === 'bookingSuccess') {
            return (
                <div style={styles.detailContainer}>
                    {this._renderBookingSuccess()}
                </div>
            );

        } else if (contentType === 'bookedStatus') {
            return (
                <div style={styles.detailContainer}>
                    {this._renderBookedStatus()}
                </div>
            );

        } else if (contentType === 'cancelConfirm') {
            return (
                <div style={styles.detailContainer}>
                    {this._renderCancelConfirm()}
                </div>);
        }
    }

    render() {
      let  contentMainContainer = {
            minHeight: this.props.innerHeight - 200,
            paddingTop: 100
        };

         this.styles = {
            text: {
                fontSize: 24,
                color: '#1A1A1A',
                marginTop: this.props.innerHeight * 0.1
            },
            text2: {
                fontSize: 24,
                color: '#1A1A1A',
                marginTop: this.props.innerHeight * 0.15
            },
        
        };

        return (
            <div style={contentMainContainer}>
                <div style={styles.contentContainer}>
                    <div style={styles.contentBar}>{this.state.title}</div>
                    {this._renderContent()}
                </div>
            </div>
        );
    }

    getDateString() {
      let date = new Date();
      let year = date.getFullYear();
      let monthIndex = date.getMonth() + 1;
      let day = date.getDate();

      let dateStr = year + '-' + this.addZeroIfSingle(monthIndex) + '-' + this.addZeroIfSingle(day);
      //console.log(dateStr);
      //return '2018-02-08';
      return dateStr;
    }

    addZeroIfSingle(num){
      if(num < 10){
        return '0' + String(num);
      }else{
        return '' + String(num);
      }
    }

    GetWeekDayString(weekDay){
      //console.log(weekDay);
      let toReturn = '';
      for (var i = 0;i < 7; i++) {
        if(weekDay.charAt(i) === '1'){
          toReturn += this.GetWeekDay(i) + '、';
        }
      }
      return(toReturn.substring(0,toReturn.length - 1));
    }

    GetWeekDay(index){
      let toReturn =
        index === '0'? '日':
        index === '1'? '一':
        index === '2'? '二':
        index === '3'? '三':
        index === '4'? '四':
        index === '5'? '五':
        index === '6'? '六':
        '日';
      return(toReturn);
    }

    getFeeDescription(feeStr){
      if(feeStr === null){
        return '';
      }
      var feeDesc = feeStr.split(';');
      var returnStr='';
      for(var i=0;i<feeDesc.length;i++){
        var fee = feeDesc[i].split(',');
        var feeValue = fee[1].split('.');
        returnStr += fee[0] + '：$' + feeValue[0] + '  ';
      }
      return returnStr;
    }

    getRegisteredArray(ErlStsDes){
      if(ErlStsDes === null){
        return [];
      }
      let reservedArray = ErlStsDes.split(';');
      for(var i = 0;i<reservedArray.length;i++){
        let array = reservedArray[i].split(',');
        if(array.length === 3 && array[2] === "報名"){
          reservedArray[i] = array[1];
        }else{
          reservedArray[i] = "";
        }
      }
      //console.log(reservedArray);
      return(reservedArray);
    }

    getReservedArray(ErlStsDes){
      if(ErlStsDes === null){
        return [];
      }
      //console.log(ErlStsDes);
      let reservedArray = ErlStsDes.split(';');
      for(var i = 0;i<reservedArray.length;i++){
        let array = reservedArray[i].split(',');
        if(array.length === 3 && array[2] === "留位"){
          reservedArray[i] = array[1];
        }else{
          reservedArray[i] = "";
        }
      }
      //console.log(reservedArray);
      return(reservedArray);
    }

    UpdateEventStatus(reserve){
      //console.log("UpdateEventStatus");
      const prfl = this.props.profile;
      const activity = this.props.activity;
      //console.log(prfl);
      //console.log(activity);
      //console.log(prfl);
      const data = {
        MEMID: prfl.residentId,
        CTRID: 'JCH',
        EvtCod: activity.EvtCod,
        ErlName: prfl.residentName,
        ErlDat: this.getDateString(),
        IsMbr: '1',
        ErlPhone: '12345678',
        EvtCosID: '1',
        EvtAct: reserve? 'RSVD':'CANN'
      }
      /*const data = {
        MEMID:"JCH2018024",
        CTRID:"JCH",
        EvtCod:"JCH/2018-2019/05",
        ErlName:"許少珍",
        ErlDat:"2018-08-24",
        IsMbr:"1",
        ErlPhone:"12345678",
        EvtCosID:"1",
        EvtAct:"CANN"
      }*/

      console.log(data);
      axios({
      	method: 'post',
      	url: process.env.REACT_APP_EHMS_API + 'updEvtErl',
      	data: data,
      	headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      .then(res=>{
        console.log(res);
        this.setState({
          routeState: !reserve? 'cancelConfirm': 'bookingSuccess',
          reserved: reserve
        });
      }).catch(err=>{
        console.log(err);
        this.setState({
          routeState: 'activityDetail'
        });
      })
    }
}


const styles = {

    contentContainer: {
        width: '85%',
        paddingBottom: 40,
        height: '85%',
        backgroundColor: '#FFF6ED',
        margin: 'auto',
        boxShadow: '0px 1px 15px #E1D2CF',
        //marginTop: 100,
        borderRadius: 15,
    },

    detailContainer: {
        textAlign: 'center',
        width: '100%',
        paddingRight: 10,
        paddingLeft: 10,
    },
    checkBookingBtn: {
        backgroundColor: '#EAAF2D',
        color: '#FFF8EE',
        fontSize: 20,
        width: '50%',
        borderRadius: 5,
        padding: 8,
        boxShadow: '0px 1px 15px #E1D2CF',
        margin: 'auto',
        marginTop: 30
    },
    detailCol1: {
        fontSize: 16,
        color: '#1A1A1A',
        textAlign: 'right',
        marginTop: 5,
        width: 90,
        display: 'inline-block',
    },

    detailCol2: {
        fontSize: 16,
        color: '#1A1A1A',
        textAlign: 'left',
        marginTop: 5,
        width: '60%',
        display: 'inline-block',
        verticalAlign: 'top'

    },

    contentBar: {
        backgroundColor: '#E9AE2D',
        padding: 10,
        fontSize: 18,
        color: '#FFF7EE',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingTop: 15,
        paddingBottom: 15
    },
    sureBtn: {
        backgroundColor: '#EAAF2D',
        color: '#FFF8EE',
        minWidth: 100,
        fontSize: 18,
        width: '30%',
        borderRadius: 3,
        padding: 8,
        boxShadow: '0px 1px 15px #E1D2CF',
        margin: 'auto',
        display: 'inline-block',
    },
    cancelBtn: {
        backgroundColor: '#FFF8EE',
        color: '#EAAF2D',
        fontSize: 18,
        minWidth: 100,
        width: '30%',
        borderRadius: 3,
        padding: 8,
        boxShadow: '0px 1px 15px #E1D2CF',
        margin: 'auto',
        display: 'inline-block',
        marginLeft: 30
    },

    // text: {
    //     fontSize: 24,
    //     color: '#1A1A1A',
    //     marginTop: window.innerHeight * 0.1
    // },
    // text2: {
    //     fontSize: 24,
    //     color: '#1A1A1A',
    //     marginTop: window.innerHeight * 0.15
    // },
    textContact: {
        fontSize: 16,
        color: '#1A1A1A',
        marginTop: 20
    },



};

export default ActivityBooking;
