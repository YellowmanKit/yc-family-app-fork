import React from 'react';
import axios from 'axios';
import Button from '../../Button'

export default class Photo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          imageCells: []
        };
    }

    componentDidMount(){
      this.fetchData();
    }

    async fetchData(){
      var bedside = await axios.get(process.env.REACT_APP_API + 'download/memories.json')
      //console.log(_bedside.data)
      this.setState({
        imageCells: bedside.data.Folders[4].imageCells
      });
    }

    _renderImages = () => {
        return (
            this.state.imageCells.map((cell, index) => {
              const url = process.env.REACT_APP_API + 'download/' + cell.name;
                return <img key={index} style={styles.image} src={url} alt=''/>
            })
        );
    }

    render() {
      let imageContainer = {
        //minHeight: this.props.innerHeight - 150,
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
        <div id='content' style={imageContainer}>
          <div style={subContainer}>
            {this._renderImages()}
            <Button text='回到頂部' onClick={()=>{ document.getElementById('content').scrollTop = 0; }}/>
          </div>
        </div>
      );
    }
}

const styles = {
    image: {
      width:'100%',
      marginTop: 20,
      maxWidth: 800
      //height: '20%'
    },

};
