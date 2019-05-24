webpackJsonp([8],{"./src/pages/Login.js":function(e,t,a){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),a.d(t,"default",function(){return h});var o,i,u=a("./node_modules/react/react.js"),l=a.n(u),c=a("./node_modules/mobx-react/index.module.js"),p=a("./node_modules/axios/index.js"),d=a.n(p),m=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),h=(o=Object(c.inject)("store"))(i=Object(c.observer)(i=function(e){function t(e){n(this,t);var a=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.handleUsernameChanged=function(e){a.setState({username:e.currentTarget.value,isLoginError:!1})},a.handlePasswordChaned=function(e){a.setState({password:e.currentTarget.value,isLoginError:!1})},a.state={username:"",password:"",isLoginError:!1,errorMessage:"Error"},a.handleKeyPress=a.handleKeyPress.bind(a),a}return s(t,e),m(t,[{key:"getTeamInfo",value:function(){var e=this;d.a.defaults.baseURL=location.protocol+"//"+location.hostname+":8000",d.a.defaults.withCredentials=!0;var t=this.queryTeam();d.a.post("/graphql/",{query:t,headers:{Accept:"application/json","Content-Type":"application/json"}}).then(function(t){e.props.store.appState.team=t.data.data.team})}},{key:"queryTeam",value:function(){return"query { team {id name token points users {id username}}}"}},{key:"onSubmit",value:function(){var e=this;if(""!==this.state.username&&""!==this.state.password){d.a.defaults.baseURL=location.protocol+"//"+location.hostname+":8000",d.a.defaults.withCredentials=!0;var t=this.postLogin();d.a.post("/graphql/",{query:t,headers:{Accept:"application/json","Content-Type":"application/json"}}).then(function(t){var a=t.data;null!==a.data.login?(e.props.store.appState.isSuperuser=a.data.login.isSuperuser,e.getTeamInfo(),e.props.store.appState.authenticate().then(function(){e.props.history.push("/")})):e.setState({isLoginError:!0,errorMessage:a.errors[0].message})})}}},{key:"postLogin",value:function(){return'mutation { login ( username: "'+this.state.username+'", password: "'+this.state.password+'") {id isSuperuser} }'}},{key:"handleKeyPress",value:function(e){"Enter"===e.key&&""!==this.state.username&&""!==this.state.password&&this.onSubmit()}},{key:"render",value:function(){var e=""!==this.state.username&&""!==this.state.password?"":"disabled";return l.a.createElement("div",{className:"page login"},l.a.createElement("form",{onKeyPress:this.handleKeyPress},l.a.createElement("div",{className:"login-window"},l.a.createElement("div",{className:"login-inputs"},l.a.createElement("input",{type:"text",className:"form-control",placeholder:"Username",onChange:this.handleUsernameChanged})),l.a.createElement("div",{className:"login-inputs"},l.a.createElement("input",{type:"password",className:"form-control",placeholder:"Password",onChange:this.handlePasswordChaned})),this.state.isLoginError&&l.a.createElement("div",{className:"error-message"},this.state.errorMessage),l.a.createElement("div",{className:"login-button-row"},l.a.createElement("button",{type:"button",className:"login-button "+e,onClick:this.onSubmit.bind(this)},"Login"),l.a.createElement("a",{href:"/register",className:"button"},l.a.createElement("button",{type:"button",className:"login-button"},"Register"))))))}}]),t}(u.Component))||i)||i}});