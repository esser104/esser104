import React,{Component} from "react";
import {NavLink} from "react-router-dom";
import {ReactSession} from 'react-client-session'

class headNav extends Component{

    constructor(props) {
        super(props);
    }

    state={
        navigationActive:"",
        classNameH:""
    }




render() {

    return (
            <nav className="navbar navbar-light navbar-expand-md navigation-clean">
                <div className="container">
                    <span className="navbar-text">Images View</span>
                    <button data-toggle="collapse" data-target="#navcol-1" className="navbar-toggler">
                        <span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end"

                         id="navcol-1">
                        <ul className="nav navbar-nav d-md-flex align-items-center">
                            <li role="presentation"  className="nav-item pr-md-2" ><NavLink className="nav-link  d-md-flex align-items-center"  to={"./Home"}><span>Home</span></NavLink></li>
                            {this.props.valState ? <li role="presentation" className="nav-item pr-md-2">
                                <NavLink className="nav-link  d-md-flex align-items-center" to={"./SignIn"}>
                                    <span>SignIn</span></NavLink></li>:(<><span className="navbar-text mx-3">{this.props.valName.name}</span><li role="presentation" className="nav-item pr-md-2">
                                <button className="nav-link d-md-flex align-items-center active"  onClick={this.props.func}>
                                    <span>Disconnect</span></button></li></>)
                            }
                        </ul>
                        <div className="d-flex justify-content-center">
                            {this.props.valState && <NavLink to={"/LogIn"} className="nav-link pr-md-2" id="bouttonHeader" onClick={this.bottonContact}><span>LogIN</span></NavLink>}

                        </div>

                    </div>
                </div>
            </nav>

    )
}

    bottonContact() {


    }




}
export default headNav
