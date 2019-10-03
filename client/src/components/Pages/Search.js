import React, { Component } from "react";

import { Redirect } from 'react-router-dom';
import Jumbotron from "../Jumbotron";
import Input from "../Input";
import Button from "../Button";
import API from "../../utils/API";
import { List, ListItem } from "../ListItem";
import { Container, Row, Col } from "../Grid";
import Nav from "../Nav";


class Search extends Component {
    state = {
        venues: [],
        locationSearch: "",
        message:"", 
        toLink: false
    };

    componentDidMount() {
      //  this.loadSearch();    //this will load the previous search when you go on the homepage, now turned off 
    }

    loadSearch = () => {
        API.getLocationsSearch()
            .then(res => {
                this.setState({ venues: res.data })
            })
            .catch(err => console.log(err));
    };

    handleInputChange = event => {
        // Destructure the name and value properties off of event.target
        // Update the appropriate state
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };


    handleFormSubmit = event => {
        // When the form is submitted, prevent its default behavior, get update state
        event.preventDefault();

        API.searchVenues(this.state.locationSearch).catch(err => console.log(err))

       setTimeout(() =>
            API.getLocationsSearch()
                .then(res => {                 
                    this.setState({ venues: res.data })
                            // this search algorithm is not quit right, but it is good enough for now!
                            for (var i = 0; i<res.data.length; i++) {
                               
                                 var search = res.data[i].name; 
                       

                                 // put the below longgitude and latitude in setstate if you want to retrieve it later in componentditmount
                                 if (search === this.state.locationSearch.trim()) {
                                     console.log(this.state.locationSearch)
                                     console.log("longitude "  + " " + res.data[i].longitude); 
                                     console.log("latitude " + " " + res.data[i].latitude); 
                                   //  console.log(res.data[i]._id); 
                                  this.handleSaved(res.data[i]._id);   // now if algorithm works it will save into database!
                                 console.log(this.state.venues[this.state.venues.length-1]) 
                                       // changing the state to true see below if to redirect the route
            this.setState ({toLink:true});
                              break; 
                                 
                                 }
                                 else {
                                   console.log('Could not find this location');
                                 }
                                      
                                 
                            }

                       
                })
                .catch(err => console.log(err))
           , 10);

           
    
         
       

    };


    // when u click save
    handleSaved = id => {        
        //console.log(id)
        // alert("Saved venue!")
        this.loadSearch();
        API.savedVenue(id)
            .then(res => {
                // console.log(res)
            })
            .catch(err => console.log(err))
    };


          

      

    render() {
        if (this.state.toLink === true) {
        var x = this.state.locationSearch; 
            return <Redirect to='/x' />          /* 'x can be anything, will go to map.html page' */
          }

        return (
            <div>
                <Nav />
                <Jumbotron />
                <Container>
                    <Row>
                        <Col size="md-12">
                            <form>
                                <Container>
                                    <Row>
                                        <Col size="xs-9 sm-10">
                                            <Input
                                                name="locationSearch"
                                                value={this.state.locationSearch}
                                                onChange={this.handleInputChange}
                                                placeholder="Find nearby bicycle racks, bathrooms and water fountains"
                                            />
                                        </Col>
                                        <Col size="xs-3 sm-2">
                                            <Button
                                                onClick={ this.handleFormSubmit }
                                                type="success"
                                                className="input-lg"
                                            >
                                                Go
                                            </Button>
                                        </Col>
                                    </Row>
                                </Container>
                            </form>
                        </Col>
                    </Row>
                    <Row>
                        <Col size="xs-12">
                            {!this.state.venues.length ? (
                                <h1 className="text-center">  </h1>
                            ) : (
                                    <List>
                                        {this.state.venues.map(venue => {
                                            if (venue.saved ) {
                                                return (
                                                    < ListItem
                                                        key={venue._id}
                                                        name={venue.name}
                                                        address={venue.address}
                                                        category={venue.category}
                                                        longitude={venue.longitude}
                                                        latitude={venue.latitude}
                                                        onClick={() => this.handleSaved(venue._id)}
                                                    />
                                                )
                                            };
                                        })}
                                    </List>

                                )}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Search;
