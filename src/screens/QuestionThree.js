import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import GoogleMapReact from "google-map-react";
import { Card, CardContent, IconButton } from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { useStyles } from "../theme/style";

const QuestionThree = () => {
  const [lat, setLat] = useState(6.619136);
  const [lng, setlng] = useState(3.3456128);
  const [address, setAddress] = useState("Afra road, Adeniyi Jones, Ikeja")
  const [markerDetails, setMarkerDetails] = useState(false);

  const classes = useStyles();

  const defaultProps = {
    center: { lat, lng },
    zoom: 11,
  };

  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const options = {
    componentRestrictions: { country: "ng" },
    fields: ["address_components", "geometry", "icon", "name"],
    types: ["address"],
  };

  useEffect(() => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );
    autoCompleteRef.current.addListener("place_changed", async function () {
      const place = await autoCompleteRef.current.getPlace();
      setLat(place.geometry.location.lat());
      setlng(place.geometry.location.lng());
      setAddress(`${place.address_components[0]?.long_name}, ${place.address_components[1]?.long_name}`)
    });
  }, []);

  const closeMarkerDetails = () => {
    setMarkerDetails(false);
  };

  const ref = useOutsideClick(closeMarkerDetails);

  const Marker = () => (
    <IconButton
      color="secondary"
      onClick={() => setMarkerDetails(true)}
      ref={ref}
    >
      <LocationOnIcon />
    </IconButton>
  );

  return (
    <Layout>
      <div className="searchContainer">
        <input
          ref={inputRef}
          style={{ width: "100%", padding: 12, borderRadius: 5 }}
        />
      </div>
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_GOOGLE_MAP_API_KEY }}
          center={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          {markerDetails && (
            <Card className={classes.mapCard}>
              <CardContent style={{padding:10}}>
              <h3 style={{color: "orange"}}>Location Details</h3>
              <p>Latitude: {lat}</p>
              <p>Longitude: {lng}</p>
              <p>Address: {address}</p>
              </CardContent>
            </Card>
          )}
          <Marker lat={lat} lng={lng} onClick={() => setMarkerDetails} />
        </GoogleMapReact>
      </div>
    </Layout>
  );
};

export default QuestionThree;
