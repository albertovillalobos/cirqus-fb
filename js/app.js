var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var config = require('./config.js');

Parse.initialize(config.appkey, config.jskey);

var Index = require('./Index.react.js');
var NotFound = require('./NotFound.react.js');
var ChatBox = require('./ChatBox.react.js');
var NavBar = require('./NavBar.react.js');

// FB stuff
window.fbAsyncInit = function() {
  Parse.FacebookUtils.init({
    appId      : config.fbappkey,
    status     : true,
    cookie     : true,
    xfbml      : true,
    version    : 'v2.4'
  });
};

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

var RoutedApp = React.createClass({
  render(){
    return(
      <div>
      <NavBar/>
        <RouteHandler/>
      </div>
    )
  }
})

var routes = (
  <Route handler={RoutedApp}>
    <Route path="/" handler={Index}/>
    <Route path="/:id" handler={ChatBox}/>
    <Route path="/*" handler={NotFound}/>
  </Route>
);


Router.run(routes, function (Handler) {

  React.render(<Handler/>, document.getElementById('app'));

});
