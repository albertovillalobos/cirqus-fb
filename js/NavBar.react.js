var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

var NavBar = React.createClass({
  mixins: [ParseReact.Mixin ],

  observe() {
    return {
			user: ParseReact.currentUser
		};
  },

  getInitialState() {
    return {
      userData: null,
      loggedIn: false,
    };
  },

  componentWillUpdate(){
    if (this.data.user) {
      console.log('componentWillUpdate', this.data.user.authData.facebook);
    }
  },

  _logOut: function(e) {
    e.preventDefault();
		Parse.User.logOut();
	},

  _facebookLogin: function(e) {
    e.preventDefault();
    Parse.FacebookUtils.logIn('public_profile', {});
	},

  _fetchUserData: function(facebookData) {
    var apiCall = `https://graph.facebook.com/v2.3/${facebookData.id}?fields=name,email&access_token=${facebookData.access_token}`;
    var _this = this;
    if (this.state.loggedIn) {
      $.get(api, function(result) {
        _this.setState({
          userData: {
            name: result.name,
            email: result.email
          }
        })
      });
    }
  },

  _submit(e) {
    console.log(e, 'submit');
    e.preventDefault();
  },

  _keyDown(e) {
    var target = e.target.value;
    if (e.keyCode === 13) {
      // e.preventDefault();
      if (target.length > 30) {
        alert('tag to long!');
        target = '';
      }
      else {
        console.log('transitionTo',target);
        this.transitionTo('/'+target,{channel: target});
      }
    }
  },

  render: function() {
    console.log(this.data);
    var  _this = this;
    var _userData = this.state.userData;
    var _loggedIn = this.state.loggedIn;
    var logButtons = {};

    if (this.data.user) {
      logButtons = (<li><a href="/#/logout" onClick={this._logOut}><span className="glyphicon glyphicon-log-out" aria-hidden="true"></span> Log Out</a></li>);
    }
    else {
      logButtons = (
          <li><a href="/#/login" onClick={this._facebookLogin}><span className="glyphicon glyphicon-log-in" aria-hidden="true"></span> Log In</a></li>
      );
    }

    return(

      <div className="theNavbar header">
        <div className="navbar navbar-inverse" role="navigation">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#js-navbar-collapse">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="/#/">Cirqus</a>
            </div>
            <div className="collapse navbar-collapse" id="js-navbar-collapse">
              <ul className="nav navbar-nav navbar-right">
                {_userData ? <li><p className='navbar-text'>Welcome {_userData.name}</p></li> : <li></li> }
                {logButtons}
              </ul>
              <form className="navbar-form navbar-right" role="search">
                <div className="form-group">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Channel Name"
                      refs="search"
                      submit={this._submit}
                      onChange={this._change}
                      onKeyDown={this._keyDown}
                      maxLength="30"
                      />
                    <span className="input-group-addon" id="basic-addon1">
                      <span className="glyphicon glyphicon-search" aria-hidden="true"/>
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  },
});
module.exports = NavBar;
