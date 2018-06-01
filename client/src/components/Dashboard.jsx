import React from 'react';
import {PropTypes} from 'prop-types';
import {Card, CardTitle, CardText } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const Dashboard = ({secretData}) => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
  <Card className="container">
    <CardTitle title="S2 Lab" subtitle="You should only get access to this page after authentication"></CardTitle>
    {secretData && <CardText style={{ fontSize: '16px', color: 'green' }}>{secretData}</CardText>}
  </Card>
  </MuiThemeProvider>
);

Dashboard.propTypes = {
  secretData: PropTypes.string.isRequired
};

export default Dashboard;
