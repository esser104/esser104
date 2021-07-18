import React, {Component} from "react";
import ReactDOM from 'react-dom';

class NouveauxCommentaire extends Component {
    constructor(props) {
        super(props);
        this.state={
            comment:''
        }
        this.nouvComs = document.createElement('div')
        document.body.appendChild(this.nouvComs)
    }
    componentWillUnmount() {
        document.body.removeChild(this.nouvComs)
    }
    commentValue=(event)=>{
        this.setState({
            comment:event.target.value
        })
    };

    render() {
        return ReactDOM.createPortal(
                <div style={{paddingLeft:'25%',paddingTop:'25%'}} id="modal">
                    <div className="w-50 p-3"><textarea className="rounded" placeholder={"Your comment..."} onChange={this.commentValue}/>
                        <button className="btn btn-primary ml-3 mb-5" onClick={()=>this.props.onsubmitComs(this.state.comment)} >Comment</button></div>


                </div>,this.nouvComs

        )
    }
}

export default NouveauxCommentaire
