import { Helmet } from 'react-helmet';
import React, { useRef, useState, useEffect } from 'react';
function Map({ gps, item_name }) {
  const gpsArray = gps.split(',');
  const meyLatLng = `${gpsArray[0]}, ${gpsArray[1]}`;
  const image =
    'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
  return (
    <>
      <div id="googleMap" style={{ width: '100%', height: '40vw' }}></div>
      <Helmet>
        <script>
          {`function myMap() {
        var mapOptions = {
          center: new google.maps.LatLng(
            ${meyLatLng}
          ),
          zoom: 17,
        };

        var map = new google.maps.Map(
          document.getElementById('googleMap'),
          mapOptions,
        );
        var marker = new google.maps.Marker({position:  new google.maps.LatLng(
            ${meyLatLng}
          ), map: map, 
          label:'${item_name}',
       //  icon : '${image}'
        },
          );
      }`}
        </script>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDXOOVZFsJGQO2-sW8SmECiJQmIkyGzTIQ&callback=myMap"></script>
      </Helmet>
    </>
  );
}
export default Map;
