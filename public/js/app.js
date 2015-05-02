var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

var App = require('./components/app'),
    Home = require('./components/home'),
    Signup = require('./components/signup'),
    Login = require('./components/login'),
    Logout = require('./components/logout'),
    Dashboard = require('./components/dashboard');

var routes = (
  <Route handler={App} path="/">
    <Route name="signup" handler={Signup}/>
    <Route name="login" handler={Login}/>
    <Route name="logout" handler={Logout}/>
    <Route name="dashboard" handler={Dashboard}/>
    <DefaultRoute handler={Home}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('lbsApp'));
});