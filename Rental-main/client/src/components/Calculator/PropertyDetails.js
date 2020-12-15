import React, { Component } from 'react';

class PropertyDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
          err: null,
          isLoading: false,
          details:{},
        };
    }

     async componentDidMount() {
      var id = this.props.match.params.id
      //console.log(id);
        this.setState({loading: true})

        fetch("http://localhost:5000/api/rentals/rentalCalculator/"+id, {
          headers: {
            "Authorization" : localStorage.getItem("jwtToken")
          }
        })
        .then(response => response.json())        
        .then(details => {
              this.setState({
                loading: false,
                details
              })
            },
            err => {
              this.setState({
                err,
                isLoading: false
              })
            })
          await new Promise(r => setTimeout(r, 2000));
    }

    render () {
      let {details, err, isLoading} = this.state;
      console.log(details);
      if (err) {
        return (<div> { err.message } </div>)
      }
  
      if (isLoading) {
        return (<div> Loading.... </div>)
      }        
          return (<div>{JSON.stringify(details,null, '\t\n')}</div>)        
      
    }}

    export default PropertyDetails;