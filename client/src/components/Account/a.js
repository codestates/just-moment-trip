<div id="googleMap" style="width: 100%; height: 700px"></div>;

function myMap() {
  var mapOptions = {
    center: new google.maps.LatLng(35.8467324, 127.1293672),
    zoom: 17,
  };

  var map = new google.maps.Map(
    document.getElementById('googleMap'),
    mapOptions,
  );
}

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDXOOVZFsJGQO2-sW8SmECiJQmIkyGzTIQ&callback=myMap"></script>;
