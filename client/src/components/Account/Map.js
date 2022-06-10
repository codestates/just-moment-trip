import { Helmet } from 'react-helmet';
import React from 'react';
function Map({ gps, data }) {
  const meyLatLng = gps.split(',').join(', ');
  const image =
    'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
  const stringifyData = JSON.stringify(data);

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

        const dataArr = ${stringifyData};
        var marker = dataArr.map((ele) => {
          const lat = Number(ele.gps.split(',')[0]);
          const lng = Number(ele.gps.split(',')[1]);

          return new google.maps.Marker({
            position: new google.maps.LatLng({lat, lng}), 
            map: map,
            label: ele.item_name,
          })
        })
      }`}
        </script>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDXOOVZFsJGQO2-sW8SmECiJQmIkyGzTIQ&callback=myMap"></script>
      </Helmet>
    </>
  );
}
export default Map;
