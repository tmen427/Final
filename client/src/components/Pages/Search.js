import React, { Component } from "react";

import { Redirect } from 'react-router-dom';
import Jumbotron from "../Jumbotron";
import Input from "../Input";
import Button from "../Button";
import API from "../../utils/API";
import { List, ListItem } from "../ListItem";
import { Container, Row, Col } from "../Grid";
import Nav from "../Nav";

import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";

const Map = ReactMapboxGl({
    accessToken: "pk.eyJ1IjoiZGF2aWR2bzE5OTAiLCJhIjoiY2p4MmsyOXJsMDAxYTQ4cGg3cHMwcTZkMCJ9.mHHhKy1QIfmGF_TC88vSUg"
});


class Search extends Component {
    state = {
        venues: [],
        locationSearch: "",
        message:"", 
        toLink: false,
        showFound: false,
       
        addressDB: "",
        nameDB: "",
        longitudeDB: "",
        latitudeDB: "",
    };

    componentDidMount() {
       this.loadSearch();    //this will load the previous search when you go on the homepage, now turned off 
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

        API.searchVenues(this.state.locationSearch).catch(err => console.log(err));

       setTimeout(() => API.getLocationsSearch().then(res => {this.setState({ venues: res.data });
                         
                             // console.log(this.state.venues)
                            
                            for (var i = 0; i<res.data.length; i++) {
                                   //console.log(res.data[i].saved)
                                 var search = res.data[i].name; 
                                // alert(res.data[i].address.includes("United States"))
                                 if (search === this.state.locationSearch.trim() && res.data[i].saved === false && res.data[i].address.includes("United States")=== true) 
                                         
                                 // if the location is not saved (not in the database then do this..., alows same locations to be saved
                                 {

if (res.data[i].address.includes("United States")===true) {
                                         //    alert('ok');
                                         }

                                     console.log(this.state.locationSearch)
                                     console.log("yoyoyoyoyoyoyoy longitude "  + " " + res.data[i].longitude); 
                                     console.log("latitude " + " " + res.data[i].latitude); 
                                   //  alert(res.data[i].address);
                                   // alert(res.data[i].date);                                   //  console.log(res.data[i]._id); 
                                  this.handleSaved(res.data[i]._id);   // now if algorithm works it will save into database!
                               
                                       // changing the state to true see below if to redirect the route
                                 this.setState ({toLink:true});
                              break; 
                               
          
                                }
                                 /**
                                 else if (search === this.state.locationSearch.trim() && res.data[i].saved === false && res.data[i].address.includes("United States")=== false )  {
                                 this.handleSaved(res.data[i]._id);   // now if algorithm works it will save into database!
                                 this.setState ({toLink:true});
                                 break; 
                                }
                                **/
                                 else {
                                 console.log('Could not find this location');
                                  this.setState({showFound: true})
                                 }
                                      
                                 
                            }

                       
                })
                .catch(err => console.log(err))
           , 400);

           
    
         
       

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
      //  var x = this.state.locationSearch; 
 
            return <Redirect to= "map.html"/>          /* 'x can be anything, will go to map.html page' */
         
        //   return  <Redirect to={'${this.state.locationSearch}'} />
        }

        return (
 
  
    <div>
            

       
                
      
      
             <div class='container'> 
                    

                            <form class = 'form-search form-inline'>
                    <div class='intro1'><strong>Find bathrooms, water fountains & bike racks </strong> </div>             
                        
   
 
                                            <Input class='Searchterm'
                                                name="locationSearch"
                                                value={this.state.locationSearch}
                                                onChange={this.handleInputChange}
                                                placeholder="Search by Address, City or State"
                                            />
 
                  
                       
                                            <Button class='here'
                                                onClick={ this.handleFormSubmit }
                                                type="success"
                                                className="input-lg"
                                            >
                                             Search
                                            </Button>
                          
                       
                
                                
                            </form>

                            </div>
     
                  
                   
                   
                   
                 
                   <h2>
                   <b>{this.state.showFound? 'Cannot Find this Location...' : ''}</b> 
                          </h2>
{ (console.log(this.state.venues[0]))}

{(console.log(this.state.venues.slice(Math.max(this.state.venues.length - 5, 1))))}
{(console.log(this.state.venues.filter(item =>  item.saved )) )}
 {(console.log(this.state.venues.filter(item =>  item.saved).slice(Math.max(this.state.venues.length - 8, 1)).map(item =>  item.address )))}
<div className='holder'>
  <hr></hr>  
<div className='recent'>Recent Searches </div>


</div>


      {(this.state.venues.filter(item =>  item.saved).slice(Math.max(this.state.venues.length - 8, 1)).map(item =>
         <div id='hello'>
                       <Map className='maps'  
                                style="mapbox://styles/mapbox/streets-v11"
                                zoom={[13]}
                                center={[item.longitude, item.latitude]}
                                containerStyle={{
                                    width: '100%',
                                    height: '220px',
                                }}
                            
                            >   
                                <Marker
                                    coordinates={[item.longitude, item.latitude]}
                                    anchor="bottom">
                                    <img src={"./assets/img/marker.png"} />
                                </Marker>
                    
                                <Layer
                                    type="symbol"
                                    layout={{ "icon-image": "marker-15" }}>
                                    <Feature
                                        coordinates={[item.longitude, item.latitude]}
                                        
                                    />
                                </Layer>
                               
                            </Map>
<p><i>{item.address}</i></p>
                      </div>   
))}
                     
           
                
                        {/*
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
                                     comment this out for now       */}
        
</div>
    
        );
    }
}

export default Search;