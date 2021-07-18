import React, {Component} from "react";
import PiedNav from "../PiedNav";


class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            psw: ""
        }
    }

    submitSign = () => {
        fetch("http://localhost:8080/api/users",
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.psw,
                    token : this.state.email+this.state.psw
                })
            })
            .then(response => {

            })

        this.props.history.push("./LogIn")
    }

    onChangeName = (event) => {
        this.setState({name: event.target.value})
    }
    onChangeMail = (event) => {
        this.setState({email: event.target.value})
    }
    onChangePsw = (event) => {
        this.setState({psw: event.target.value})
    }

    render() {
        return (
            <div className="contact-clean">
                <form>
                    <h2 className="text-center">SignIn !</h2>
                    <div className="form-group"><input className="form-control" type="text" name="name"
                                                       placeholder="Name" onChange={this.onChangeName}/></div>
                    <div className="form-group"><input className="form-control" type="email" name="email"
                                                       placeholder="Email" onChange={this.onChangeMail}/></div>
                    <div className="form-group"><input className="form-control" type="password" name="password"
                                                       placeholder="password" onChange={this.onChangePsw}/></div>
                    <div className="form-group col d-flex justify-content-center">
                        <button className="btn btn-primary text-center" type="button" onClick={this.submitSign}>send
                        </button>
                    </div>
                </form>
                <PiedNav/>
            </div>
        )
    }
}

export default SignIn;
