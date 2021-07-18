import React,{Component,Fragment} from "react";
import PiedNav from "../PiedNav";
import CommetaireEspace from "../CommentaireEspace";
import axios from "axios";

class Home extends Component{
    constructor(props) {
        super(props);
        this.state={
            allCars:[],
        }
    }
    data=[{
        identity:'voiture1',
        imageURL:"https://www.challenges.fr/assets/img/2019/10/11/cover-r4x3w1000-5f11c167bf15e-toyota-mirai-concept-6-jpeg.jpg",
        text: "voiture 1"
        },
        {
            identity:'voiture2',
            imageURL:"https://images.caradisiac.com/logos/0/1/4/4/260144/S7-nouvelles-aides-a-l-achat-d-une-voiture-pas-avant-la-rentree-182926.jpg",
            text: "voiture 2, nouvelle voiture sportage"
        }]


    takeData=()=>{
        this.setState({
            allCars: this.data
        })
    }

    componentWillMount() {
        this.takeData()
    }



    render() {


        return(
            <Fragment>
                <div className="col-10 offset-1 container">
                    <ul className="list-group">
                        {this.state.allCars.length !== 0 && this.state.allCars.map((e) => {

                            return (
                                <li key={e.identity} className="list-group-item pt-md-5 mb-5 border-top border-dark">

                                    <div className="col mx-0">
                                        <div className="d-flex align-items-center">
                                            <div className="card">
                                                <div className="card-header">
                                                    <h5 className="mb-0">{e.text}</h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col text-center d-flex flex-column align-items-center"><img className="w-50"
                                                                                                                    src={e.imageURL} alt={"logo"}/>
                                        </div>
                                    </div>
                                    <CommetaireEspace userC={this.props.stateVal} activation={this.props.activationPros} imageId={e.identity}/>
                                </li>
                            )


                        })
                        }

                    </ul>
                </div>
                <PiedNav/>
            </Fragment>

            )
    }
}
export default Home
