import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import Identicon from './identicon';


class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            location: "",
            identicon: null,
            loading: true, 
            account: this.props.account
        }
        
    }

    render(){
        if(this.props.location.pathname === "/" || this.props.location.pathname === "/signup" || this.props.location.pathname === "/login"){
            return ( 
                <nav className="nav-wrapper red darken-3">
                    <div className="container">
                        <a href="#" className="brand-logo center"><i style={{marginTop: 5}} className="material-icons">local_hospital</i>Medi-Care</a>
                        <ul className="right hide-on-med-and-down">
                            <li>
                            { this.props.account
                                ? <img
                                    style={{marginTop: 15, marginLeft: 15}}
                                    className='v-align center'
                                    id="icon"
                                    width='30'
                                    height='30'
                                    src={`data:image/png;base64,${new Identicon(this.state.account, 30).toString()}`}
                                />
                                : <span></span>
                                }
                            </li>
                        </ul>
                    </div>
                </nav>
            )
        }else{
            return(
                <nav className="nav-wrapper red darken-3">
                    <div className="container">
                    <a href="#" className="brand-logo"><i style={{marginTop: 5}} className="material-icons">local_hospital</i>Medi-Care</a>
                        <ul className="right hide-on-med-and-down">
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/upload">Upload</NavLink></li>
                            <li><NavLink to="/view">View</NavLink></li>
                            <li><NavLink to="/doctors">Doctors</NavLink></li>
                            <li>
                            { this.props.account
                                ? <img
                                    style={{marginTop: 15, marginLeft: 15}}
                                    className='v-align center'
                                    id="icon"
                                    width='30'
                                    height='30'
                                    src={`data:image/png;base64,${new Identicon(this.state.account, 30).toString()}`}
                                />
                                : <span></span>
                                }
                            </li>
                        </ul>
                    </div>
                </nav>
            )
        }
    }
}

export default withRouter(Navbar)