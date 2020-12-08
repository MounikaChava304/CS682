
import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import CountryList from './CountryList';
import { Container, Icon, Input,Image } from 'semantic-ui-react';
import { MDBCol, MDBFormInline, MDBIcon } from "mdbreact";
import PropTypes from "prop-types";
import { Redirect } from 'react-router-dom';
// import PropertiesList from '../properties';
import './SearchPage.css';
//import BackgroundImage from "";



class SearchPage extends React.Component {
    function(props) {
        const [input, setInput] = useState('');
        var sectionStyle = {
            width: "100px",
            height: "400px",
            backgroundImage: 'url(${BackgroundImage})'
        }
    }
    state = {
        redirect: false
    }
    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/properties'  />
        }
    }


    //const [countryListDefault, setCountryListDefault] = useState();
    //const [countryList, setCountryList] = useState();

    //   const fetchData = async () => {
    //     return await fetch('https://restcountries.eu/rest/v2/all')
    //       .then(response => response.json())
    //       .then(data => {
    //          setCountryList(data) 
    //          setCountryListDefault(data)
    //        });}

    //   const updateInput = async (input) => {
    //      const filtered = countryListDefault.filter(country => {
    //       return country.name.toLowerCase().includes(input.toLowerCase())
    //      })
    //      setInput(input);
    //      setCountryList(filtered);
    //   }

    //   useEffect( () => {fetchData()},[]);
    render() {
        var background = { backgroundSize: 'cover' };
        // var textStyle = {
        //     position: 'absolute',
        //     top: '50%',
        //     left: '50%'
        // };
        return (


            <Container>
                {/* <div style={{backgroundImage : "url(" +"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.tripadvisor.co.za%2FLocationPhotoDirectLink-g255122-d5532670-i106359736-Platinum_Queenstown_Villas-Queenstown_Otago_Region_South_Island.html&psig=AOvVaw3KGRlnaA0nHcOw7SNr2d9e&ust=1604028030572000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNC6_qXs2OwCFQAAAAAdAAAAABAO"}}>
                    
                </div> */}
                <div style={{width: 'auto'}}>
                <Image 
                  style={background} responsive 
                  src="/images/alpine-view-villa.png">
                </Image>
                <h3 >Play Smart in Searching Home</h3>

                <Input
                    icon={{ name: 'search', circular: true, link: true }}
                    placeholder='City, Address or Zip '
                />
                {/* <form onSubmit={this.onSubmit}> */}
                <div className="col s12" style={{ paddingLeft: "11.200px" }}>
                    {this.renderRedirect()}
                    <button onClick={this.setRedirect}
                        style={{
                            width: "100px",
                            borderRadius: "1px",
                            letterSpacing: "1.5px",
                            marginTop: "2rem"
                        }}
                        type="submit"
                        className="btn btn -large waves-effect waves-light hoverable blue accent-3">
                        Search
                                   </button>
                </div>
                </div>
                


                {/* </form> */}


            </Container>



        );

    }

}

export default SearchPage