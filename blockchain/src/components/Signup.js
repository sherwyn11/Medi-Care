import React, { Component } from 'react';

class Signup extends Component {

    constructor(props){
        super(props)
        this.state = {
            'name': null,
            'contact': null,
            'email': null,
            'password': null,
            'patient': this.props.patient,
            'account': this.props.account,
            'loading': null,
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.addPatients();
    }
    
    addPatients() {
        console.log('final', this.state);
        this.setState({ loading: true })
        this.state.patient.methods.addPatient(this.state.account, this.state.name, this.state.contact, this.state.email).send({ from: this.state.account })
        .once('receipt', (receipt) => {
            console.log(receipt);
          this.setState({ loading: false })
          window.location.assign("/");
        })
    }
    

    render(){
        return(
            <div className="container">
                <h4>Please share a few details to get you started...</h4>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" id="name" name="name" onChange={this.handleInputChange} required/>
                    <label htmlFor="name">Name</label><br></br>
                    <input type="tel" id="contact" name="contact" onChange={this.handleInputChange} required/>
                    <label htmlFor="contact">Contact</label><br></br>
                    <input type="email" id="email" name="email" onChange={this.handleInputChange} required/>
                    <label htmlFor="email">Email</label><br></br>
                    <input type="password" id="password" name="password" onChange={this.handleInputChange} required/>
                    <label htmlFor="name">Password</label><br></br><br></br>
                    <button className="btn blue darken-2" type="submit" name="action">Create Account
                        <i className="material-icons right">person_add</i>
                    </button>
                </form>
            </div>      
        )
    }
}

export default Signup;