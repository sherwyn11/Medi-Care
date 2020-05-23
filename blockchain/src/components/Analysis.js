import React, { Component } from 'react';
import axios from 'axios';

class Analysis extends Component {

    constructor(props){
        super(props)
        this.state = {
            loading: true,
            drugs: null,
            diseases: null,
        }
    }

    componentDidMount(){
        console.log(this.props)
        var hash = this.props.match.params.id
        var temp = this
        axios.post("http://127.0.0.1:5000/analyze", {
            hash: hash
        })
        .then(function(response){
            console.log(response)
            temp.setState({
                loading: false,
                drugs: response.data.Drugs,
                diseases: response.data.Diseases
            })
        })
        .catch(function(err){
            console.log(err)
        })
    }

    handleSubmit = (e) => {
        var data = e.target.name;
        window.open('https://www.merriam-webster.com/dictionary/' + data);
    }

    render(){
        if(this.state.loading === false){
            const buttonList1 = this.state.drugs.map(drugs => {
                return (
                    <button name={drugs[0]} onClick={this.handleSubmit} className="waves-effect waves-light btn blue darken-2" style={{margin: 15}} key={this.state.drugs.indexOf(drugs)}>
                        {drugs[0]}
                    </button>
                ) 
            }) 
            const buttonList2 = this.state.diseases.map(diseases => {
                return (
                    <button name={diseases[0]} onClick={this.handleSubmit} className="waves-effect waves-light btn red darken-2" style={{margin: 15}} key={100 + this.state.diseases.indexOf(diseases)}>
                        {diseases[0]}
                    </button>
                ) 
            })
            return(
                <div className="container">
                    <br></br>
                    <h3>Keywords found</h3>
                    <br></br>
                    <div className="container">
                        <h4>Drugs</h4>
                        {buttonList1}
                    </div>
                    <div className="container">
                        <h4>Diseases</h4>
                        {buttonList2}
                    </div>
                </div>
            );
        }else{
            return(
                <div className="container center-align" style={{marginTop: 100}}>
                    <div className="progress">
                        <div className="indeterminate"></div>
                    </div>
                </div>
            )
        }
    }
}

export default Analysis