function loadingScreen(){
	return `<li><i class="fa-li fa fa-spinner fa-pulse"></i></li>`;
}

var map;
var infowindow;
var pyrmont = {lat: 34.246074, lng: -118.537021};

var x = document.getElementById("demo");
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}


function showPosition(position) {
    /*x.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;*/
    var pyrmont = {lat: position.coords.latitude, lng: position.coords.longitude};
    $("#getLocation").hide("slow",function(){});
    initMap(pyrmont);
}

function initMap(pyrmont) {
	
	map = new google.maps.Map(document.getElementById('map'), {
	  center: pyrmont,
	  zoom: 13,
	  styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
	});


	infowindow = new google.maps.InfoWindow();
	var service = new google.maps.places.PlacesService(map);
	service.nearbySearch({
	  location: map.center,
	  radius: 8047,
	  type: ['gym'],
	  name: ['martialarts'],
	}, callback);
}

function callback(results, status) {
	if (status === google.maps.places.PlacesServiceStatus.OK) {
	  for (var i = 0; i < results.length; i++) {
	    createMarker(results[i]);
	  }
	}
}

function createMarker(place) {
	var placeLoc = place.geometry.location;
	var contentString =  place.name;
	var infowindow = new google.maps.InfoWindow({
          width: 200,
          content: contentString
        });

	var image = {
	      url: 'http://icons.iconarchive.com/icons/google/noto-emoji-activities/512/52746-boxing-glove-icon.png',
	      size: new google.maps.Size(71, 71),
	      origin: new google.maps.Point(0, 0),
	      anchor: new google.maps.Point(17, 34),
	      scaledSize: new google.maps.Size(50, 50)
	    };

	var marker = new google.maps.Marker({
	  map: map,
	  position: place.geometry.location,
	  icon: image,
	  title: name,

	});


	service = new google.maps.places.PlacesService(map);
	var request = { reference: place.reference };
 	service.getDetails(request, function(details, status) {
 		$('#sideBarTest').append(details.name + '<br />' + details.formatted_address +"<br />" + details.website + "<br />" 
       			+ details.rating + ' <img src="https://dimsumdaily.files.wordpress.com/2010/06/gold-star-25.jpg" width="10", height="10">'
       			+ "<br />" + details.formatted_phone_number + "<br />" 
       			+ details.opening_hours.weekday_text[0] + "<br />"  + details.opening_hours.weekday_text[1] + "<br />"
       			+ details.opening_hours.weekday_text[2] + "<br />" + details.opening_hours.weekday_text[3] + "<br />"
       			+ details.opening_hours.weekday_text[4] + "<br />" + details.opening_hours.weekday_text[5] + "<br />"
       			+ details.opening_hours.weekday_text[6] + "<br />" + "<hr>"); 
 		//infowindow.setContent(details.name);
    	google.maps.event.addListener(marker, 'click', function() {

	/*
       		infowindow.setContent(details.name + "<br />" + details.formatted_address +"<br />" + details.website + "<br />" 
       			+ details.rating + "<br />" + details.formatted_phone_number + "<br />" 
       			+ details.opening_hours.weekday_text[0] + "<br />"  + details.opening_hours.weekday_text[1] + "<br />"
       			+ details.opening_hours.weekday_text[2] + "<br />" + details.opening_hours.weekday_text[3] + "<br />"
       			+ details.opening_hours.weekday_text[4] + "<br />" + details.opening_hours.weekday_text[5] + "<br />"
       			+ details.opening_hours.weekday_text[6] + "<br />");
       			*/
        infowindow.open(map, this);
      });

    });

 /*


	google.maps.event.addListener(marker, 'click', function() {
	  //infowindow.setContent(place.name);
	  infowindow.open(map, this);
	}); */
}

