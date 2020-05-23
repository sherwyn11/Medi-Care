import React, { Component } from 'react'

class AddDoctor extends Component {

    constructor(props){
        super(props)
        this.state = {
            'patient': this.props.patient,
            'account': this.props.account,
            'loading': null,
            'docAccount': null,
            'name': null,
            'doctors': []
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.addDoctorToPatient();
    }
    
    addDoctorToPatient() {
        console.log('final', this.state);
        this.setState({ loading: true })
        this.state.patient.methods.saveDoctor(this.state.name, this.state.docAccount).send({ from: this.state.account })
        .once('receipt', (receipt) => {
            console.log(receipt);
          this.setState({ loading: false })
          window.location.assign("/doctors");
        })
    }

    async componentWillMount(){
        console.log('Inside com will mount', this.props);
        if(this.props.patient !== null){
            var patient = await this.state.patient.methods.patients(this.state.account).call();
            var count = patient.doctorCount;
            for (var i = 0; i < count; i++) {
                const doctor = await this.state.patient.methods.doctors(this.state.account, i).call()
                this.setState({
                    doctors: [...this.state.doctors, doctor]
                })
            }
            this.setState({
                loading: false
            })
            console.log(this.state);
        }else{
            this.setState({
                loading: true
            })
        }
    }
    

    render(){
        const docList = this.state.doctors.map(doctors => {
            return (
                <div className="contact" key={doctors.doctorAcc}>
                    <li className="collection-item avatar">
                        <i className="material-icons circle blue darken-2">local_hospital</i>
                        <p><b>{doctors.docName}</b></p>
                        <p><i>{doctors.doctorAcc}</i></p>
                        <a href="" className="secondary-content"><button id={doctors.doctorAcc} className="waves-effect waves-light btn blue darken-2">MORE INFO</button></a>
                    </li>
                </div>
            )
        }) 
        if(this.state.loading === false){
            return(
                <div className="container">
                <br></br>
                    <div className="container">
                        <ul className="collection">
                            <li className="collection-item avatar">
                                <h3>My Doctors</h3>
                            </li>
                                {docList}
                        </ul>
                    </div>  

                    <div className="container">
                        <br></br>
                        <br></br>
                        <br></br>
                    </div>

                    <div className="container">
                    <h3>Add a Trusted Doctor</h3>
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" id="name" name="name" onChange={this.handleInputChange} required/>
                            <label htmlFor="name">Name</label><br></br>
                            <input type="text" id="docAccount" name="docAccount" onChange={this.handleInputChange} required/>
                            <label htmlFor="name">Doctor's Account</label><br></br><br></br>
                            <button className="btn blue darken-2" type="submit" name="action">Add
                                <i className="material-icons right">person_add</i>
                            </button>
                        </form>
                    </div>
                </div>
            )
        }else{
            return (
                <div className="container center-align">
                    <div className="progress">
                        <div className="indeterminate"></div>
                    </div>
                </div>
            )
        }
    }
}

export default AddDoctor;