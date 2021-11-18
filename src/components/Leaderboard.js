import React, { Component } from 'react';
import { connect } from 'react-redux';
import { prepareLeaderBoard } from '../utils/helpers';
import Nav from './Nav';
import LoginRedirect from './LoginRedirect';
import { withStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";


const LeaderTableCell = withStyles(theme => ({
  head: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 20,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

class Leaderboard extends Component {

  render() {

  
    if (this.props.loggedOut) {
      return <LoginRedirect afterLogin='/leaderboard'/>
    }

    const { leaderboard } = this.props;

    return (
      <div className='leaderboard'>
        <Nav />
        <div className='leaderboard-table'>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <LeaderTableCell>Leader</LeaderTableCell>
                  <LeaderTableCell numeric>Questions</LeaderTableCell>
                  <LeaderTableCell numeric>Answers</LeaderTableCell>
                  <LeaderTableCell numeric>Score</LeaderTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaderboard.map(leader => {
                  return (
                    <TableRow key={leader.id}>
                      <LeaderTableCell component="th" scope="row">
                        <img
                          alt='avatar'
                          src={require('../assets/' + leader.avatarURL)}
                          className='small-avatar'
                        />
                        <span className='leader-name'>{leader.name}</span>
                      </LeaderTableCell>
                      <LeaderTableCell numeric>{leader.questions.length}</LeaderTableCell>
                      <LeaderTableCell numeric>{Object.keys(leader.answers).length}</LeaderTableCell>
                      <LeaderTableCell numeric>{leader.score}</LeaderTableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users, authedUser }) => ({
    loggedOut: authedUser === null ,
    leaderboard : prepareLeaderBoard(users)
});

export default connect(mapStateToProps)(Leaderboard);
