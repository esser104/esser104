import React, {Component} from "react";
import logo from "../imageUtils/sin-perfil.jpg";
import chevronBas from "../imageUtils/icons8_expand_arrow.svg";
import EditComment from "./EditComment";
import axios from "axios";

class CommetaireEspace extends Component {

    user = this.props.userC
    idImage = this.props.imageId


    constructor(props) {
        super(props);
        this.state = {
            active: !this.props.activation,
            comment: '',
            commentE: '',
            allComment: [],
            editComment: false,
            eId: ''
        }
    }
    addCommentaire = () => {
        {
            fetch("http://localhost:8080/api/comments",
                {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        idImage: this.idImage,
                        emailUser: this.user.email,
                        name: this.user.name,
                        postComment: this.state.comment
                    })
                })
                .then(response => {
                    this.takeData()
                }).catch((res) => {
            })

        }
    }

    takeData = () => {
        axios.get(`http://localhost:8080/api/comments/${this.user.email}`,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization' : `Bearer ${this.user.token}`
            },
        }).then(data => {

            this.setState({
                allComment: data.data
            })
        })
            .catch(function (res) {

            })
    }

    commentValue = (event) => {
        this.setState({
            comment: event.target.value
        })

    };

    componentWillMount() {
        this.takeData()
    }
    render() {

        const modal = this.state.editComment ? <EditComment onsubmitComs={this.submitCommnent}/> : null;
        return (
            <div className="container col-11">
                <table className="table">
                    <thead>
                    <tr className="text-center py-0" id="commetaireBoutton">
                        <th className="text-center py-0"><span className="border-bottom">Comments</span>
                            <div className="text-center py-0">
                                <img className="position-relative py-0" src={chevronBas} alt="fleche bas" width="30px"
                                     height="30px" id="chevronBas"/>
                            </div>

                        </th>
                    </tr>
                    </thead>
                    <tbody className="container" style={{display: this.state.active ? "block" : "none"}}>

                    {/*boucle*/}
                    {this.state.allComment.length !== 0 && this.state.allComment.map((e) => {
                        if (e.idImage === this.idImage) {
                            return (
                                <tr key={e.id}>
                                    <td>
                                        <div className="d-flex align-items-center"><img
                                            className="rounded-circle border" src={logo} width="50" height="50"
                                            alt={"utilisateur"}/>{e.name}
                                            {e.emailUser === this.user.id && (<div>
                                                <button className="btn btn-sm btn-danger ml-5"
                                                        onClick={() => this.removeComment(e.id)}>R
                                                </button>
                                                <button className="btn btn-sm btn-warning ml-1"
                                                        onClick={() => this.editComment(e.id)}>E
                                                </button>
                                            </div>)}  </div>
                                        <p className="text-break border rounded border-0 offset-1">{e.postComment}</p>
                                    </td>
                                    {modal}
                                </tr>
                            )
                        }
                    })
                    }

                    <tr>
                        <td>
                            <div>

                                <div><textarea className="rounded" placeholder={"Your comment..."}
                                               onChange={this.commentValue}/>
                                    <button className="btn btn-primary ml-3 mb-5"
                                            onClick={this.addCommentaire}>Comment
                                    </button>
                                </div>
                            </div>
                        </td>

                    </tr>

                    </tbody>
                </table>

            </div>
        )
    }


}

export default CommetaireEspace
