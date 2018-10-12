import React from 'react';

const styles = {
    statementContainer: {
         marginTop: 15,
        backgroundColor: '#FCF4E7',
        //display: 'block',
        height: 50
    },
    statement: {
        color: '#666666',
        fontSize: 12,
        display: 'inline',
        cursor: 'pointer'
    }
};

export default class StatementBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <div style={styles.statementContainer}>
                <div style={styles.statement} onClick={() => this.props.statementClick('免責條款')}>
                    免責條款&nbsp;|&nbsp;
                        </div>
                <div style={styles.statement} onClick={() => this.props.statementClick('私隱條例')}>
                    私隱條例&nbsp;|&nbsp;
                        </div>
                <div style={styles.statement} onClick={() => this.props.statementClick('版權聲明')}>
                    版權聲明
                        </div>
                <br />
                <div style={styles.statement}>
                    版權所有©2018仁濟醫院董事局
                </div>
            </div>


        );
    }
}
