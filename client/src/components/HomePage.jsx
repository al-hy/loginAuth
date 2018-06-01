import React from 'react';
import {Card, CardTitle} from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Base from './Base.jsx';
import Header from './Header.jsx';

const HomePage = () => (

<div>

<MuiThemeProvider muiTheme={getMuiTheme()}>
  <Card className="container">
    <CardTitle  title="React Application" subtitle="This is the home page."/>
  </Card>
</MuiThemeProvider>
</div>

);

export default HomePage;
