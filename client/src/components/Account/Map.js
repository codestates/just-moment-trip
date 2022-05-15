import { Helmet } from 'react-helmet';
import React, { useRef, useState, useEffect } from 'react';
function Map({ gps }) {
  const gpsArray = gps.split(',');
  const latitude = gpsArray[0];
  const longitude = gpsArray[1];
  return (
    <>
      <div id="googleMap" style={{ width: '50vw', height: '25vw' }}></div>
      <Helmet>
        <script>
          {`function myMap() {
        var mapOptions = {
          center: new google.maps.LatLng(
            ${latitude},
            ${longitude},
          ),
          zoom: 17,
        };

        var map = new google.maps.Map(
          document.getElementById('googleMap'),
          mapOptions,
        );
      }`}
        </script>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDXOOVZFsJGQO2-sW8SmECiJQmIkyGzTIQ&callback=myMap"></script>
      </Helmet>
    </>
  );
}
export default Map;
