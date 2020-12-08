import React, { Component } from 'react';
import axios from 'axios';

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:[],
        };
    }

     async componentDidMount() {
        this.setState({loading: true})
        fetch("http://localhost:5000/api/rentals/dashboard", {
          headers: {
            "Authorization" : localStorage.getItem("jwtToken")
          }
        })

          .then(data => {
            data.text().then(res => {
              this.setState({
                loading: true,
                data: data
              })
            });
          });
          await new Promise(r => setTimeout(r, 2000));
         console.log(this.state.data)
    }

    render () {
        if (!this.state.data) {
          return <p>No data</p>;
        }
    
        if (this.state.isLoading) {
          return <p>Loading data</p>;
        }
    
        if(this.state.data){
          return <ul>{this.statedata}</ul>
        }
      }
    }

    export default Dashboard;