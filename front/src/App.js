import React, {Component} from 'react';
import Home from "./composants/Navigation/Home";
import SignIn from "./composants/Navigation/SignIn";
import LogIn from "./composants/Navigation/LogIn";
import Header from "./composants/HeadNav";
import {BrowserRouter, Redirect, Route} from "react-router-dom";
import "./css/main.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min"
import "jquery/dist/jquery.min.js"
import "popper.js/dist/popper.min.js"

class App extends Component{



    constructor(props) {
        super(props);
        this.state={
            email:"",
            password:"",
            connect:true,
            name:'',
            token:''
        }
    }
    nandActive=()=>{
        this.setState({
            connect:!this.state.connect
        })
    }
    nandName=({name, password, email, token})=>{
        this.setState({
            name:name,
            password:password,
            email:email,
            token:token
        })
    }

    render() {
        return (
            <BrowserRouter>
                    <Header func={this.nandActive} valState={this.state.connect} valName={this.state.name} />
                    <Redirect  to={"/Home"}/>
                    <Route  exact={true}  path="/Home" component={()=>(<Home activationPros={this.state.connect} valName={this.state.name}
                                                                             stateVal={this.state}/>)}/>
                    <Route strict={true} path="/SignIn" component={SignIn}/>
                    <Route strict={true} path="/LogIn" component={() => (<LogIn func={this.nandActive} func1={this.nandName} />)}/>
            </BrowserRouter>

        );
    }


}

export default App;
