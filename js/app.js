
var React = require('react');

var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

var App = require('./components/App');
var Signup = require('./components/Signup');
var Login = require('./components/Login');
var Logout = require('./components/Logout');
var Dashboard = require('./components/Dashboard');
var Home = require('./components/Home');


var routes = (
  <Route handler={App} path="/">
  	<Route name="signup" handler={Signup}/>
  	<Route name="login" handler={Login}/>
    <Route name="logout" handler={Logout}/>
    <Route name="dashboard" handler={Dashboard}/>
    <DefaultRoute handler={Home}/>
  </Route>
);


/* Router.HistoryLocation got some bugs
	https://github.com/rackt/react-router/issues/1026
*/
Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('lbsApp'));
});
