import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class View extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: null,
            account: this.props.account,
            patient: this.props.patient,
            files: [],
            selectedId: null,
            loading: true,
        }
    }

    handleInputChange = (e) => {
        this.setState({
            selectedId: e.target.id,
        });
        window.open('http://localhost:8080/ipfs/' + e.target.id);
    }

    async componentWillMount(){
       if(this.props.patient !== null){
            var patient = await this.state.patient.methods.patients(this.state.account).call();
            var count = patient.fileCount;
            for (var i = 0; i < count; i++) {
                const file = await this.state.patient.methods.files(this.state.account, i).call()
                this.setState({
                    files: [...this.state.files, file]
                })
            }
            this.setState({
                loading: false
            })
       }else{
           this.setState({
               loading: true
           })
       }
    }

    render(){
        const fileList = this.state.files.map(files => {
            return (
                <div className="contact" key={files.fileHash}>
                    <li className="collection-item avatar">
                        <i className="material-icons circle blue darken-2">insert_drive_file</i>
                        <p><b>{files.fileName}</b></p>
                        <p><i>Uploaded on: {files.datetime}</i></p>
                        <a href="" className="secondary-content"><button id={files.fileHash} onClick={this.handleInputChange} className="waves-effect waves-light btn blue darken-2">View</button></a>
                        &nbsp;&nbsp;&nbsp;
                        <Link to={"/view/" + files.fileHash} className="secondary-content" style={{marginRight: 80}}><button id={files.fileHash} className="waves-effect waves-light btn orange darken-3">Analyze</button></Link>
                    </li>
                </div>
            )
        }) 
        if(this.state.loading === false){
            return(
                <div className="container">
                    <br></br>
                    <br></br>
                    <ul className="collection">
                        <li className="collection-item avatar">
                            <h3>Uploaded Medical Documents</h3>
                        </li>
                            {fileList}
                    </ul>
                </div>
            )
        }else{
            return (
                <div className="container center-align" style={{marginTop: 100}}>
                    <div className="progress">
                        <div className="indeterminate"></div>
                    </div>
                </div>
            )
        }
    }
}

export default View;