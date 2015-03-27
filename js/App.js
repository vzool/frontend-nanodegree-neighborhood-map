"use strict"; // RUN Javascript in strict mode

// ViewModel object
var ViewModel = function(){

	// pointer for this, becuase this sometimes goes out of predict.
	var self = this;

	// filter word in Neighbors list
	this.word = ko.observable("");

	this.gps_x = ko.observable();
	this.gps_y = ko.observable();

	// Neighbors Data
	this.neighbor = ko.observableArray([
		new Neighbor('Riyadh', 'Capital of Saudi Arabia', {x: 24.714400477165395, y: 46.731719970703125}),
		new Neighbor('Jeddah', 'Western Coast Of Saudi Arabia', {x: 21.55017532555692, y: 39.16900634765625}),
		new Neighbor('Makkah', 'The Muslims Praying Direction', {x: 21.41407997342895, y: 39.81651306152344}),
		new Neighbor('Dammam', 'Eastern Coast Of Saudi Arabia', {x: 26.396790205102665, y: 50.03997802734375}),
		new Neighbor('Luxor', 'A lot of Humans History resides there', {x: 25.6949411, y: 32.6594669})
	]);

	// filter neighbor list by name or desc
	this.filteredNeighbor = ko.computed(function() {
		
		if(self.word()){

			return ko.utils.arrayFilter(self.neighbor(), function(item) {
				
				// knockoutjs string comparison util
				return ko.utils.stringStartsWith(
					
					// knockoutjs string trim util
					ko.utils.stringTrim(item.getName().toLowerCase()),

					// knockoutjs string trim util
					ko.utils.stringTrim(self.word().toLowerCase())
				);
			});

		} else {
			return self.neighbor();//unwrap the observable to return an array
		}
	});

	// Change Neighbor location on map
	this.ChangeNeiborhood = function(){

		var wiki_element = $("#wiki-data");
		var photoshot_element = $("#photoshot");

		var item; // current neighbor pointer

		// check if ChangeNeiborhood called from ModelView Engine or from Visible
		if(this.location && this.location.x && this.location.y && this.getDesc){
			item = this;
		}else{
			item = self.neighbor()[0];
		}

		// Wikipedia URL API which attached with city name
		var WikipediaURL = "http://en.wikipedia.org/w/api.php?action=opensearch&callback=wikiCallback&format=json&search=" + item.getName();
		
		// Google Street View URL API which attached with city name
		var GoogleStreetViewURL = "https://maps.googleapis.com/maps/api/streetview?key=AIzaSyANpS9SfKEON6xP3VEO82mEYHm2xRNCctQ&size=200x200&location=" + item.getName();

		// Clear Marker if exists
		if(ko.Marker){
			ko.Marker.setMap(null);
		}

		// Set Corrdinates on UI
		self.gps_x(Number((item.location.x).toFixed(2)));
		self.gps_y(Number((item.location.y).toFixed(2)));

		console.log(self, this);

		// set Place Corrdinates
		var LatLng = new google.maps.LatLng(item.location.x, item.location.y);

		// map opetions
		var mapOptions = {
			center: LatLng,
			zoom: 5, 
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		// create new map
		ko.Map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

		var marker, i;

		// Make Multiple Marker
		for (i = 0; i < self.neighbor().length; i++){ 

			var pos = self.neighbor()[i].location;

			// create Marker
			marker = new google.maps.Marker({
				position: new google.maps.LatLng(pos.x, pos.y),
				map: ko.Map
			});

			// create Info Window
			var infowindow = new google.maps.InfoWindow();

			// bind marker click event with open info window about neighbor
			google.maps.event.addListener(marker, 'click', (function(marker, i) {

				return function(){
					infowindow.setContent(self.neighbor()[i].name);
					infowindow.open(ko.Map, marker);
				};

			})(marker, i));
		}

		// Loading wiki about city
		wiki_element.html("<p>Loading...</p>");

		// Timeout for 10 secs to show, if network connection failed.
		var wikiTimeout = setTimeout(function(){
			wiki_element.html("<p>Failed to get WikiPedia resources.</p>");
		}, 10000);

		// JSONP request send it to Wikipedia API Servers
			$.ajax( {
				url: WikipediaURL,
				dataType:'jsonp',
				error : function(jqXHR, textStatus, errorThrown){
					clearTimeout(wikiTimeout);
					wiki_element.text("We can't fetch Wikipedia now, try again later.");
				},
				success : function(data){

					clearTimeout(wikiTimeout);
					wiki_element.text("");
					var title = data[1];
					var link = data[3];

					// check if no data then tell the user: No Data about XXX place
					if(title.length === 0){
						wiki_element.html('<p>No Data about ' + data[0] + '</p>');
					}

					for(var i = 0; i < title.length; i++){
						wiki_element.append("<li><a target='_blank' href='"+link[i]+"'>" + title[i] + "</a></li>");   
					}
				}
		});
	
		// Waiting message for loading google image
		photoshot_element.html("<p>Loading...</p>");

		// loading image from Google Street View if exists after 1 second.
		setTimeout(function(){
			$.ajax({
				url: GoogleStreetViewURL,
				error : function(jqXHR, textStatus, errorThrown){
					photoshot_element.html("No Connection");
				},
				success : function(data){
					photoshot_element.html("<img src='"+GoogleStreetViewURL+"'/>");
				}
			});
		}, 1000);
	};

	// startup script
	this.init = function(){
		this.ChangeNeiborhood();
	};
};

// Fire Knockout.js
ko.applyBindings(new ViewModel());
