webpackJsonp([7],{"./src/pages/Register.js":function(e,t,a){"use strict";function s(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),a.d(t,"default",function(){return p});var i,c,l=a("./node_modules/react/react.js"),u=a.n(l),m=a("./node_modules/mobx-react/index.module.js"),d=(a("./node_modules/react-router-dom/es/index.js"),a("./node_modules/axios/index.js")),h=a.n(d),g=function(){function e(e,t){for(var a=0;a<t.length;a++){var s=t[a];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(t,a,s){return a&&e(t.prototype,a),s&&e(t,s),t}}(),p=(i=Object(m.inject)("store"))(c=Object(m.observer)(c=function(e){function t(e){r(this,t);var a=n(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.handleTeamNameChanged=function(e){a.setState({team:e.currentTarget.value,reqTeam:!!e.currentTarget.value,isRegistrationError:!1})},a.handleUsernameChanged=function(e){a.setState({username:e.currentTarget.value,reqUsername:!!e.currentTarget.value,isRegistrationError:!1})},a.handleTeamIdChanged=function(e){a.setState({teamId:e.currentTarget.value,reqTeamId:!!e.currentTarget.value,isRegistrationError:!1})},a.handlePasswordChanged=function(e){a.setState({password:e.currentTarget.value,reqPassword:!!e.currentTarget.value,isRegistrationError:!1})},a.handlePasswordConfirmChanged=function(e){a.setState({passwordConfirmed:e.currentTarget.value,reqPasswordConf:!!e.currentTarget.value,isRegistrationError:!1})},a.handleEmailChanged=function(e){a.setState({email:e.currentTarget.value,reqEmail:!!e.currentTarget.value,isRegistrationError:!1})},a.state={regNewTeam:!1,regJoinTeam:!1,team:"",username:"",teamId:"",password:"",passwordConfirmed:"",email:"",isRegistrationError:!1,errorMessage:"Error",isRegistrationSuccess:!1,successMessage:"Success"},a}return o(t,e),g(t,[{key:"onSubmit",value:function(e){var t=this;h.a.defaults.baseURL=location.protocol+"//"+location.hostname+":8000";var a=this.registerUser();h.a.post("/graphql/",{query:a,headers:{Accept:"application/json","Content-Type":"application/json"}}).then(function(e){var a=e.data;null!==a.data.createUser?t.setState({isRegistrationSuccess:!0,successMessage:a.data.createUser.status},function(){setTimeout(function(){t.props.history.push("/login")},200)}):t.setState({isRegistrationError:!0,errorMessage:a.errors[0].message})})}},{key:"onBack",value:function(e){var t;this.setState((t={regNewTeam:!1,regJoinTeam:!1},s(t,"regNewTeam",!1),s(t,"regJoinTeam",!1),s(t,"team",""),s(t,"username",""),s(t,"teamId",""),s(t,"password",""),s(t,"passwordConfirmed",""),s(t,"email",""),s(t,"isRegistrationError",!1),s(t,"errorMessage","Error"),s(t,"isRegistrationSuccess",!1),s(t,"successMessage","Success"),t))}},{key:"onNewRegistration",value:function(e){this.setState({regNewTeam:!0})}},{key:"onJoinRegistration",value:function(e){this.setState({regJoinTeam:!0})}},{key:"onBackSubmit",value:function(e){var t;this.props.history.push("/login"),this.setState((t={regNewTeam:!1,regJoinTeam:!1},s(t,"regNewTeam",!1),s(t,"regJoinTeam",!1),s(t,"team",""),s(t,"username",""),s(t,"teamId",""),s(t,"password",""),s(t,"passwordConfirmed",""),s(t,"email",""),s(t,"isRegistrationError",!1),s(t,"errorMessage","Error"),s(t,"isRegistrationSuccess",!1),s(t,"successMessage","Success"),t))}},{key:"registerUser",value:function(){return'mutation { createUser ( username: "'+this.state.team+'", email: "'+this.state.email+'", password: "'+this.state.password+'", hidden: "false") { status } }'}},{key:"render",value:function(){var e=this.state.password===this.state.passwordConfirmed&&""!==this.state.password,t=!e||""===this.state.username||""===this.state.email||""===this.state.team&&""===this.state.teamId?"disabled":"";return u.a.createElement("div",{className:"page login"},u.a.createElement("main",null,(this.state.regNewTeam||this.state.regJoinTeam)&&u.a.createElement("div",{className:"login-window"},this.state.regNewTeam&&u.a.createElement("div",{className:"login-inputs"},u.a.createElement("input",{type:"text",className:"form-control input-req",placeholder:"Team Name",onChange:this.handleTeamNameChanged}),!this.state.team&&u.a.createElement("span",{className:"req-input"},"*")),u.a.createElement("div",{className:"login-inputs"},u.a.createElement("input",{type:"text",className:"form-control input-req",placeholder:"Username",onChange:this.handleUsernameChanged}),!this.state.username&&u.a.createElement("span",{className:"req-input"},"*")),this.state.regJoinTeam&&u.a.createElement("div",{className:"login-inputs"},u.a.createElement("input",{type:"text",className:"form-control input-req",placeholder:"Team ID",onChange:this.handleTeamIdChanged}),!this.state.teamId&&u.a.createElement("span",{className:"req-input"},"*")),u.a.createElement("div",{className:"login-inputs"},u.a.createElement("input",{type:"password",className:"form-control input-req",placeholder:"Password",onChange:this.handlePasswordChanged}),!this.state.password&&u.a.createElement("span",{className:"req-input"},"*")),u.a.createElement("div",{className:"login-inputs"},u.a.createElement("input",{type:"password",className:"form-control input-req",placeholder:"Confirm Password",onChange:this.handlePasswordConfirmChanged}),!this.state.passwordConfirmed&&u.a.createElement("span",{className:"req-input"},"*")),u.a.createElement("div",{className:"login-inputs"},u.a.createElement("input",{type:"text",className:"form-control input-req",placeholder:"Email Address",onChange:this.handleEmailChanged}),!this.state.email&&u.a.createElement("span",{className:"req-input"},"*")),u.a.createElement("div",null,u.a.createElement("span",{className:"req-text"},"* required")),this.state.isRegistrationError&&u.a.createElement("div",{className:"error-message"},this.state.errorMessage),this.state.isRegistrationSuccess&&u.a.createElement("div",{className:"success-message"},this.state.successMessage),u.a.createElement("div",{className:"login-button-row"},u.a.createElement("button",{type:"button",className:"back-button",onClick:this.onBack.bind(this)},"Back"),u.a.createElement("button",{type:"button",className:"login-button "+t,onClick:this.onSubmit.bind(this)},"Register"))),!this.state.regNewTeam&&!this.state.regJoinTeam&&u.a.createElement("div",{className:"choose-window"},u.a.createElement("button",{type:"button",className:"choose-button choose-new-team",onClick:this.onNewRegistration.bind(this)},"Register a New Team"),u.a.createElement("button",{type:"button",className:"choose-button choose-join-team",onClick:this.onJoinRegistration.bind(this)},"Register and Join Existing Team"),u.a.createElement("button",{type:"button",className:"choose-button choose-back",onClick:this.onBackSubmit.bind(this)},"Back to Login"))))}}]),t}(l.Component))||c)||c}});