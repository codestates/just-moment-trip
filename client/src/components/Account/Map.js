import { Helmet } from 'react-helmet';
import React, { useRef, useState, useEffect } from 'react';
function Map() {
  return (
    <>
      <div id="googleMap" style={{ width: '1000%', height: '350px' }}></div>
      <Helmet>
        <script>
          {`function myMap() {
        var mapOptions = {
          center: new google.maps.LatLng(
            ${sessionStorage.getItem('latitude')},
            ${sessionStorage.getItem('longitude')}
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
