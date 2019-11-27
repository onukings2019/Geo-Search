$(document).ready(function(){
	$('.toggle-nav').click(function(){
		$('.menu ul li').slideToggle(1000);

	});
});

function mapAutocomplete() {
// getElementById('map').style.backgroundColor = #ffffff;
        let map = new google.maps.Map(document.getElementById('map'), {
          //center: {lat: 8.9868, lng: 7.3626},
          zoom: 7,
          mapTypeId: 'roadmap',
          backgroundColor: 'none'
          
        });

        let input = document.getElementById('search');
        let searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        let markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          let places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          let bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            let icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });
      }


$(document).ready(function(){
	$('#search').blur(function(){
		let location = $('#search').val();
		if(location == ''){
			$('#error').html('');
		}else{
			$.ajax({
				url: 'https://api.openweathermap.org/data/2.5/weather?q=' + location + '&units=metric' + '&APPID=1a3d68088228d76d61fa392c2a9ade0a',	

				type: "GET",
				datatype: JSON,
				success: function(data){
					let display = displayData(data);
					$('#article').html(display);
					$('#search').val('');
				}
			});
		}
	});
});
function displayData(data){
	let location = $('#search').val();
return "<p style = 'padding: 5px;'> Current weather for "  + location + " : " + data.weather[0].main + "</p>" + 
"<p style = 'padding: 5px; marginTop:2px;'> Current Temperature for "  + location + " : " + data.main.temp + "&deg;C</p>" +
"<p style = 'padding: 5px; marginTop:2px;'> Current Pressure for "  + location + " : " + data.main.pressure + " hPa</p>"+ 
"<p style = 'padding: 5px; marginTop:2px;'> Current Humidity for "  + location + " : " + data.main.humidity + "%</p>";



}