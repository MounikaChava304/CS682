import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {            
            properties:[],
            err: null,
            isLoading: false
        };
    }

     async componentDidMount() {
        this.setState({ isLoading: true })
        fetch("http://localhost:5000/api/rentals/dashboard", {
          headers: {
            "Authorization" : localStorage.getItem("jwtToken")
          }
        })
        .then(response => {
          return response.json();
        })
        .then(properties => {
              this.setState({                
                properties,
                isLoading: false
              })
              console.log(properties);
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
      let {properties, err, isLoading} = this.state;
        if (err) {
          return (<div> { err.message } </div>)
        }
    
        if (isLoading) {
          return (<div> Loading.... </div>)
        }
        return(
          <div>
            {properties.length > 0 ?
            <ul>
              {properties.map(property => (                
                <li key = {property._id}>
                  <div>
                  <br></br>
                  <p><b>{ "Address:  " +property.Address }</b></p> 
                  <p>{ "User Email: " +property.UserEmail }</p>
                  <p>{ "Real Purchase Price: " +property.RealPurchasePrice }</p>
                  <p>{ "Mortgage Monthly Payment: " +property.MortgageMonthlyPayment }</p>
                  <p>{ "Cash Required to Close: " +property.CashRequiredToCloseAfterFinancing }</p>                 
                  <p>{ "NetOperatingIncome: " +property.NetOperatingIncome }</p> 
                  <p>{ "TotalOperatingExpenses: " +property.TotalOperatingExpenses }</p>
                  <p>{ "TotalROI: " +property.TotalROIAfterOneYear }</p> 
                  <p>{ "AnnualProfitOrLoss: " +property.AnnualProfitOrLoss }</p> 
                  <Link to= {"/propertyDetails/"+property._id}>{"View More Details "}</Link>
                  <br></br>   
                  </div>
                  
                </li>
              ))}
            </ul>
            :<div> No Properties Found!!!! </div>
              }
          </div>
        )
      }}
      export default Dashboard;