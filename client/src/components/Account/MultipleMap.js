import { Helmet } from 'react-helmet';
import React from 'react';
function MultipleMap({ gps, item_name }) {
  const meyLatLng = gps[0].split(',').join(', ');
  const image =
    'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
  const stringifyGps = JSON.stringify(gps);
  const stringifyName = JSON.stringify(item_name);
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
          zoom: 14,
        };

        var map = new google.maps.Map(
          document.getElementById('googleMap'),
          mapOptions,
        );

        const gpsArr = ${stringifyGps};
        const itemArr = ${stringifyName};

        var marker = gpsArr.map((gps,idx) => {
          const lat = Number(gps.split(',')[0]);
          const lng = Number(gps.split(',')[1]);

          return new google.maps.Marker({
            position: new google.maps.LatLng({lat, lng}), 
            map: map,
            label: itemArr[idx],
          })
        })
      }`}
        </script>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDXOOVZFsJGQO2-sW8SmECiJQmIkyGzTIQ&callback=myMap"></script>
      </Helmet>
    </>
  );
}
export default MultipleMap;
