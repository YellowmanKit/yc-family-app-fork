import React from 'react';
import Login from './Login';
import Statement from './Statement';
import MainMenu from './MainMenu';
import Photo from './Photo';
import Meal from './Meal';
import Activity from './Activity';
import ActivityBooking from './ActivityBooking';

export default class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: props.currentPage
        };
    }

    componentWillReceiveProps(nextProps){
        this.setState({currentPage: nextProps.currentPage});
       // alert("componentWillReceiveProps:::"+ JSON.stringify(nextProps));
    }

    render() {
        let curp = this.state.currentPage;

        return (
            <div style = {{ minHeight: '565px',  display: 'block',}}>
                {curp.login && <Login mainState={this.props.mainState} login={this.props.login.bind(this)} innerHeight = {this.props.innerHeight} innerWidth = {this.props.innerWidth}/>}
                {curp.statement && <Statement content={curp.title} innerHeight = {this.props.innerHeight}/>}
                {curp.mainmenu && <MainMenu goTo = {this.props.goTo.bind(this)} innerHeight = {this.props.innerHeight}/>}
                {curp.photo && <Photo innerHeight = {this.props.innerHeight}/>}
                {curp.meal && <Meal mealMenu={curp.mealMenu} innerHeight = {this.props.innerHeight}/>}
                {curp.activityList && <Activity activities={curp.activities} activitySelected = {this.props.activitySelected.bind(this)} innerHeight = {this.props.innerHeight}/>}
                {curp.activityBooking && <ActivityBooking activity={curp.activity} profile={this.props.profile} innerHeight = {this.props.innerHeight}/>}
            </div>
        );
    }
}
