import React, { Component } from "react";
import Jumbotron from "../Jumbotron";
import API from "../../utils/API";
import { Input, TextArea, FormBtn, SelectTag } from "../Form";
import { Container, Row, Col } from "../Grid";
import { List, ListItem } from "../List";
import DeleteBtn from "../DeleteBtn";
import "./style.css";
import { Button, Modal } from 'react-bootstrap';
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";
import Nav from "../Nav";

// import dotenv from 'dotenv'
import Footer from "../Footer"; 



const Map = ReactMapboxGl({
    accessToken: "pk.eyJ1IjoiZGF2aWR2bzE5OTAiLCJhIjoiY2p4MmsyOXJsMDAxYTQ4cGg3cHMwcTZkMCJ9.mHHhKy1QIfmGF_TC88vSUg"
});

class Inputdata extends Component {
    state = {
        locations: [],
        locationSearch: "",
        name: "",
        message: "",
        feature: "",
        show: false,
        addressDB: "",
        nameDB: "",
        longitudeDB: "",
        latitudeDB: "",
    };


    handleShow = this.handleShow.bind(this);
    handleClose = this.handleClose.bind(this);

    handleClose() {
        this.setState({ show: false });
    }

    handleShow(address, name, longitude, latitude) {
        this.setState({ show: true, addressDB: address, nameDB: name, longitudeDB: longitude, latitudeDB: latitude });
    }


    componentDidMount() {
        this.loadLocation();
    }

    loadLocation = () => {
        API.getLocations()
            .then(res =>
                // console.log(res.data)
                this.setState({ locations: res.data, name: "", locationSearch: "", message: "", feature: "" })
            )
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
        //console.log(this.state.feature)
        //console.log(this.state.name)
        setTimeout(() =>
            this.loadLocation()
            , 3000);
        if (this.state.name && this.state.locationSearch) {
            API.searchLocations(
                this.state.locationSearch, {
                    name: this.state.name,
                    message: this.state.message,
                    feature: this.state.feature
                })
                .then(res => {
                    this.loadLocation();
                })
                .catch(err => console.log(err))
        }
        this.loadLocation();
    };

    deleteLocation = id => {
        API.deleteLocation(id)
            .then(res => this.loadLocation())
            .catch(err => console.log(err));
    };

    render() {
        var x = this.state.locations.length; 
        return (
            <div>
        
                <Jumbotron />
                <Container>
                    <Row>
                       

                        <Col size="xs-12">
                            <h2>User Posts-
        {this.state.locations.length>0 ? x : 0} And Counting!</h2>
                            {this.state.locations.length ? (
                                <List >
                                    {this.state.locations.map(location => (
                                        <ListItem key={location._id}>
                                            <div>
                                                <DeleteBtn onClick={() => this.deleteLocation(location._id)} />
                                                <h3 className="showMap"
                                                onClick={() => this.handleShow(location.address, location.name, location.longitude, location.latitude)}
                                                >Type: {location.feature === "water" ? "Water Fountain" : location.feature === "bathroom" ? "Bathroom" : "Bicycle Rack"}</h3>
                                               
                                              <p>
                                                    <span>
                                                        <strong>Address:</strong>  {location.address}
                                                       
                                                    </span>
                                               
                                               
                                                </p>   
                                            
                                     {location.message ? (<p><strong>Message: </strong>{location.message} </p>) : (<p> </p>) }  
                                            
                                                <p><span><strong>Longitude:</strong> {location.longitude} and  <strong>Latitude:</strong> {location.latitude}</span></p>
                                               
                                                {location.name==='Anonymous Person' ? (<p> <b>Posted </b>by an {location.name}</p> ) : (<p> <b>Posted</b> by {location.name}</p>) }
                                                       
                                            </div>
                                        </ListItem>


                                    ))}
                                </List>
                            ) : (
                                    <h3>No Results to Display</h3>
                                )}
                        </Col>

               {/*
                        <Col size="md-12">
                            <h3>Add a Location Manually</h3>
                            <form>

                                <Input
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleInputChange}
                                    placeholder="Name"
                                />
                                <Input
                                    name="locationSearch"
                                    value={this.state.locationSearch}
                                    onChange={this.handleInputChange}
                                    placeholder="Input Location"
                                />
                                <TextArea
                                    name="message"
                                    value={this.state.message}
                                    onChange={this.handleInputChange}
                                    placeholder="Message"
                                />

                                <SelectTag
                                    name="feature"
                                    value={this.state.feature}
                                    onChange={this.handleInputChange}
                                />

                                <FormBtn
                                    disabled={!(this.state.name && this.state.locationSearch)}
                                    onClick={this.handleFormSubmit}
                                >
                                    Post
                                </FormBtn>

                            </form>
                        </Col>
               */} 
                    </Row>


                    <Modal
                        show={this.state.show}
                        onHide={this.handleClose}
                        dialogClassName="modal-90w"
                        aria-labelledby="modal-styling-title"
                        size="lg"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="modal-styling-title">
                                {this.state.addressDB}  <span id="notbold">by  </span>{this.state.nameDB}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            
                            <Map
                                style="mapbox://styles/mapbox/streets-v11"
                                zoom={[13]}
                                center={[this.state.longitudeDB, this.state.latitudeDB]}
                                containerStyle={{
                                    width: '100%',
                                    height: '500px',
                                }}
                            >
                                <Marker
                                    coordinates={[this.state.longitudeDB, this.state.latitudeDB]}
                                    anchor="bottom">
                                    <img src={"./assets/img/marker.png"} />
                                </Marker>
                                <Layer
                                    type="symbol"
                                    layout={{ "icon-image": "marker-15" }}>
                                    <Feature
                                        coordinates={[this.state.longitudeDB, this.state.latitudeDB]}
                                    />
                                </Layer>
                            </Map>
                            
  
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                                </Button>

                        </Modal.Footer>
                    </Modal>
                   
                </Container>
                <div><Footer /></div>
           
            </div>
        );
    }
}


export default Inputdata;