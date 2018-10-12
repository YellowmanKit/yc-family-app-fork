import React from 'react';
import Content from './content.json';
const styles = {
    statementContent: {
        color: '#666666',
        fontSize: 15,
        //marginBottom: 10,
        textAlign: 'left',
        padding: 10,

    },
    statementSubTitle: {
        color: '#1A1A1A',
        fontSize: 15,
        textAlign: 'left',
        paddingLeft: 10,
        paddingRight: 10
    },
};
class Statement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contentType: props.content,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ contentType: nextProps.content });

    }


    _renderContent = () => {
        let contents = [];
        if (this.state.contentType === "私隱條例") {
            contents = Content.privacy;
        } else if (this.state.contentType === "版權聲明") {
            contents = Content.copyright;
        } else {
            contents = Content.disclaimer;
        }

        return contents.map((content, index) => {
            let style = styles.statementContent;
            if (content.startsWith("ST")) {
                content = content.substring(2, content.length);
                style = styles.statementSubTitle;
            }
            return (
                <div key={index} style={style}>
                    {content}
                </div>
            );

        });
    }

    render() {
      let detailContainer =  {
          color: '#666666',
          fontSize: 12,
          //marginTop: 80,
          paddingTop:90,
          height: this.props.innerHeight - 280,
          minHeight: '525px',
          width:'100%',
          backgroundColor: '#FCF4E7',
          overflowY: 'scroll'
      };

        return (
                <div style={detailContainer}>
                    {this._renderContent()}

                </div>
        );
    }
}


export default Statement;
