import React, { Component } from 'react'
import Web3 from 'web3';
import Patient from '../../build/Patient.json'

class Login extends Component {

    constructor(props){
        super(props)
        this.state = {
            'name': null,
            'contact': null,
            'email': null,
            'password': null,
            'patient': null,
            'account': null,
        }
    }

    async componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockChain()
    }
    
    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }
    

    handleInputChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    }

    async loadBlockChain(){
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
        const networkId = await web3.eth.net.getId()
        const networkData = Patient.networks[networkId]
        if(networkData) {
            const patient = new web3.eth.Contract(Patient.abi, networkData.address)
            this.setState({ patient })
        } else {
            window.alert('Patient contract not deployed to detected network.')
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        for await (const file of ipfs.add(globSource('./uploads/' + fileName))) {
            console.log(file)
        }
        this.addCandidates();
    }
    
    addCandidates() {
        console.log(this.state);
        this.setState({ loading: true })
        this.state.patient.methods.addCandidate(this.state.candidate_name, this.state.candidate_details, this.state.id).send({ from: this.state.account })
        .once('receipt', (receipt) => {
            console.log(receipt);
          this.setState({ loading: false })
          window.location.assign("/");
        })
    }
    

    render(){
        return(
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" id="username" name="username" onChange={this.handleInputChange} required/>
                    <label htmlFor="name">Username</label><br></br>
                    <input type="password" id="password" name="password" onChange={this.handleInputChange} required/>
                    <label htmlFor="name">Password</label><br></br><br></br>
                    <button className="btn blue darken-2" type="submit" name="action">Submit
                        <i className="material-icons right">send</i>
                    </button>
                </form>
            </div>      
        )
    }
}

export default Login;