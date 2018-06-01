// Let's build our first React app. Create the file /client/src/app.jsx
import React from 'react';
import ReactDom from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {browserHistory, BrowserRouter} from 'react-router-dom';
import routes from './routes.js';
import App from './components/App.jsx';
import Base from './components/Base.jsx';
import Header from './components/Header.jsx';

//remove tape delay, essentially for MaterialUI to work properly
injectTapEventPlugin();

ReactDom.render((
    <BrowserRouter>
      <App />
    </BrowserRouter>
), document.getElementById("react-app"));
//ReactDom.render(   <MuiThemeProvider muiTheme={getMuiTheme()}><HomePage/>   </MuiThemeProvider>, document.getElementById('react-app'));

//You're probably confused by the HTML tag passed as the function argument. Well it's not html
//, it's the JSX, a XML-like syntax extesioon to ECMAScript. JSX is not supported by any browsers
//, we have to transform it to plain javascript. For this task, we will use a Babel plugin
