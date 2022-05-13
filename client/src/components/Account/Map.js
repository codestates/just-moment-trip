import { Helmet } from 'react-helmet';
import React, { useRef, useState, useEffect } from 'react';
function Map(data) {
  return (
    <>
      <div id="googleMap" style={{ width: '100%', height: '100%' }}></div>
      <Helmet>
        <script>
          {`function myMap() {
        var mapOptions = {
          center: new google.maps.LatLng(
            ${data.gps}
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
