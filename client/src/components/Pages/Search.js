import React, { Component } from "react";

import { Redirect } from 'react-router-dom';
import Input from "../Input";
import Button from "../Button";
import API from "../../utils/API";

import Footer from "../Footer"; 

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
        search_found: "", 
        show: true
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
    
        event.preventDefault();
    
        //this.state.locationsearch is the value you searching
        API.searchVenues(this.state.locationSearch).catch(err => console.log(err));
        setTimeout(() => API.getLocationsSearch().then(res => {this.setState({ venues: res.data });
   
          console.log('line 64')
          // get the last five vales of res.data
          var last_five =  res.data.slice(Math.max(res.data.length - 5, 1));   
          console.log(last_five);
          this.setState({search_found:last_five})
          this.setState({show:false})
     for (var i = 0; i<last_five.length; i++) {
            var search = last_five[i].name; 
            if (search === this.state.locationSearch.trim() && last_five[i].saved === false && last_five[i].address.includes("United States")=== true) 
                     {

                this.handleSaved(last_five[i]._id);   // now if algorithm works it will save into database!
                
                // changing the state to redirect to the map page
                this.setState ({toLink:true});
                break; 
                }
                             
            else {
              //  console.log('Could not find this location');
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


          
    ClickImage = (id) => {
 
          
        this.handleSaved(id);   // now if algorithm works it will save into database!
                
        // changing the state to redirect to the map page
        this.setState ({toLink:true});

   
    }
      

    render() {
        if (this.state.toLink === true) {
            return <Redirect to= "map.html"/>     /* 'x can be anything, will go to map.html page' */
         }

        return (
 
  
    <div>
            
            
        <div class='searchdiv'> 
                      <form class = 'form-search form-inline'>
                     
                    <div class='intro1'><strong>Find nearby bathrooms, water fountains & bike racks!</strong> </div>             
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
                   



{ this.state.show ? <div className="second">

    <div className='recent'> Recent Searches</div>  
    {(this.state.venues.filter(item =>  item.saved).slice(Math.max(this.state.venues.length - 10, 1)).map(item =>
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
       <p class='description'>{item.address}  </p>

                      </div>   
).reverse())}







</div>:

<div className="second">
  <div className='recent'> Oops! Nothing was found. Did you mean?....</div>  
{(this.state.search_found.map(item =>
         <div id='hello'>
                       <Map className='maps'  
                                style="mapbox://styles/mapbox/streets-v11"
                                zoom={[13]}
                                center={[item.longitude, item.latitude]}
                                   onClick={ ()=>this.ClickImage(item._id) }
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
       <p class='description'>{item.address}  </p>

                      </div>   
).reverse())}

</div>

 }

<Footer />
                    
</div>
        
        );
    }
}

export default Search;