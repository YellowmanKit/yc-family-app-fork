import React from 'react';
import axios from 'axios';
import Button from '../../Button';


class ActivityPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        list: []
    };
  }

  componentDidMount(){
    this.fetchData();
  }

  async fetchData(){
    var activities = await axios.get(process.env.REACT_APP_API + 'activities')
    console.log(activities.data.activities)
    this.setState({
      list: activities.data.activities
    });
  }

  _renderActivities = () => {
    const activityContainer = {
        width: '80%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: this.props.innerHeight * 0.075,
        fontSize: 20,
        color: '#1A1A1A',
        textAlign: 'center',
        backgroundColor: "#FFF8EE",
        verticalAlign: 'middle',
        marginTop: 25,
        padding: 25,
        borderRadius: 10,
        boxShadow: '0px 5px 20px #CCBFBD',
        isOpenDialog: false,
        cursor: 'pointer'
    }
    return this.state.list.map((activity, index) => {
        return (
          <div key={index} style={activityContainer} onClick={() => this.props.activitySelected(activity)}>
            {activity.EvtNam}
          </div>
        )
      }
    );
  }

  render() {
    let activityListContainer = {
        // height: this.props.innerHeight - 150,
        // minHeight: '505px',
        display: 'flex',
        width: '100%',
        textAlign: 'center',
        height: this.props.innerHeight - 150,
        minHeight: '525px',
        backgroundColor: '#FCF4E7',
        overflowY: 'scroll'
    };
    const subContainer = {
        width: '100%',
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'center',
        justifyContent: 'flex-start',
    }
    return (
      <div id='content' style={activityListContainer}>
        <div style={subContainer}>
          {this._renderActivities()}
          <Button text='回到頂部' onClick={()=>{ document.getElementById('content').scrollTop = 0; }}/>
        </div>
      </div>
    );
  }
}

export default ActivityPage;
