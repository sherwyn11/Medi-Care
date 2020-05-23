import React, { Component } from 'react'
import axios from 'axios'

class Upload extends Component {

    constructor(props){
        super(props)
        this.state = {
            'fname': null,
            'buffer': null,
            'patient': this.props.patient,
            'account': this.props.account,
            'fhash': null,
            'selectedFile': null
        }
    }

    captureFile = (e) => {
        e.preventDefault()
        this.setState({
            selectedFile: e.target.files[0],
        })        
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    
    onSubmit = (e) => {
        console.log('here')
        var temp = this;
        e.preventDefault();
        const data = new FormData(); 
        data.append('file', this.state.selectedFile);
        axios.post("http://127.0.0.1:5000/upload", data, {
        }).then(function(response) { 
            console.log(response.data);
            temp.setState({'fhash': response.data});
            temp.addFileToPatient();
        })
    }
    
    addFileToPatient() {
        console.log(this.state);
        this.setState({ loading: true })
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); 
        var yyyy = today.getFullYear();
        today = dd + '/' + mm + '/' + yyyy;
        this.state.patient.methods.saveFile(this.state.fname, this.state.fhash, today).send({ from: this.state.account })
        .once('receipt', (receipt) => {
            console.log(receipt);
          this.setState({ loading: false })
        })
    }
    

    render(){
        return(
            <div className="container">
                <br></br>
                <br></br>
                <br></br>
                <form onSubmit={this.onSubmit} encType="multipart/form-data">
                    <input type="file" id="file" name="file" onChange={this.captureFile} required/>
                    <label htmlFor="file">Upload Medical Document</label><br></br>
                    <input type="text" id="fname" name="fname" onChange={this.handleInputChange} required/>
                    <label htmlFor="fname">Name</label><br></br><br></br>
                    <button className="btn blue darken-2" type="submit" name="action">Upload
                        <i className="material-icons right">arrow_upward</i>
                    </button>
                </form>
            </div>      
        )
    }
}

export default Upload;