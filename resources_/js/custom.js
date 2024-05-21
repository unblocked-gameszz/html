var currentLocation = {
	latitude: 40.7128,
	longitude: -74.0060,
	range: 0
}
var options = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 0
};

var zoomHouseNumber = 18;
var zoomIntersection = 16;
var zoomStreet = 15;
var zoomPostalCode = 15;
var zoomDistrict = 14;
var zoomCity = 13;
var zoomCounty = 12;
var zoomState = 10;
var zoomCountry = 8;

var zoom_value = zoomStreet;
var platform = new H.service.Platform({
  'apikey': API_KEY
});

var pixelRatio = window.devicePixelRatio || 1;
var defaultLayers = platform.createDefaultLayers({
	tileSize: pixelRatio === 1 ? 256 : 512,
	ppi: pixelRatio === 1 ? undefined : 320
});

// Initialize a map - this map is centered over New York
var mapContainer = document.getElementById('coolmap');

var map = new H.Map(mapContainer,
		defaultLayers.vector.normal.map, {
			zoom: zoom_value,
			center: {lat: currentLocation.latitude, lng: currentLocation.longitude}
		});
// add a resize listener to make sure that the map occupies the whole container
window.addEventListener('resize', () => map.getViewPort().resize());

// Enable the event system on the map instance
var mapEvents = new H.mapevents.MapEvents(map);

// Make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(mapEvents);

// Set multi-language supports to the map
var mapTileService = platform.getMapTileService({
	type: 'base'
}),
		multiMapLayer = mapTileService.createTileLayer(
				'maptile',
				'normal.day',
				pixelRatio === 1 ? 256 : 512,
				'png8',
				{lg: 'mul', ppi: pixelRatio === 1 ? undefined : 320}
		);
map.setBaseLayer(multiMapLayer);

// Create the default UI components
var ui = H.ui.UI.createDefault(map, defaultLayers);

// Hold a reference to any infobubble opened
var bubble;

// Track user's drag time on map to detect when she finished dragging to search for businesses around.
var dragingTimer;
var doneDragingInterval = 1000;   //time in ms

// Reset map's viewbounds after added markers (search nearby).
var resetVb = 'yes';


$(document).ready(function (e) { 

	function success(pos) {
		var crd = pos.coords;
		console.log(crd);
		currentLocation.latitude = crd.latitude;
		currentLocation.longitude = crd.longitude;
		currentLocation.range = crd.accuracy; 
		do_get_store(currentLocation,DEF_TYPE);
	}  

	function error(err) {
		console.warn(`ERROR(${err.code}): ${err.message}`);
		do_get_store(currentLocation,DEF_TYPE);
	}

	navigator.geolocation.getCurrentPosition(success, error, options);
	
	

	
});

function do_get_store(currentLocation,type){
	map.setCenter({lat:currentLocation.latitude, lng:currentLocation.longitude});
	map.setZoom(zoom_value);		
	removeObjectById("customMarker");
	var url = '/store.ajax';
 
	var data_param = {lat:currentLocation.latitude,lon:currentLocation.longitude,type:type};
	$.ajax({
		url: url,
		data: data_param,
		type: 'POST',
		success: function (data) {
			var data_obj = JSON.parse(data);
			if(data_obj!=null){
				$("#store_list").html(data_obj.html);
				if(data_obj.stores.length>0){
					set_center(data_obj.stores[0].lat,data_obj.stores[0].lon);
					data_obj.stores.forEach(drawcircle);
				}
			}
			
		}
	});
}

function drawcircle(data,index){
		 
	var lat = data.lat;
	var lng = data.lon;
	var radius = 60 ;
	var type = data.type;
	var outerElement = document.createElement('div');
	var innerElement = document.createElement('div');
	var icon = document.createElement('img');
	outerElement.style.userSelect = 'none';
	outerElement.style.webkitUserSelect = 'none';
	outerElement.style.msUserSelect = 'none';
	outerElement.style.mozUserSelect = 'none';
	outerElement.style.cursor = 'default';

	
	innerElement.style.color = 'red';
	var $icon = '/' + DIR_THEME + 'resources/images/places.png';;
	if(type==='walmart'){
	//	innerElement.style.backgroundColor = '#FFC220';
		$icon =  '/' +DIR_THEME + 'resources/images/w.png';
	}else if(type==='sony'){
	//	innerElement.style.backgroundColor = '#0070D1';
		$icon =  '/' +DIR_THEME + 'resources/images/ps.png';
	}else if(type==='bestbuy'){
	//	innerElement.style.backgroundColor = '#FDEE15';	
		$icon =  '/' +DIR_THEME + 'resources/images/bb.png';
	}else if(type==='target'){
	//	innerElement.style.backgroundColor = '#CC0000';
		$icon =  '/' +DIR_THEME + 'resources/images/t.png';
	}else if(type==='gamestop'){
	//	innerElement.style.backgroundColor = 'red';
		$icon =  '/' +DIR_THEME + 'resources/images/gs.png';
	}else if(type==='bars'){
	//	innerElement.style.backgroundColor = '#FFC220';
		$icon =  '/' +DIR_THEME + 'resources/images/bars.png';
	}else if(type==='restaurants'){
	//	innerElement.style.backgroundColor = '#0070D1';
		$icon =  '/' +DIR_THEME + 'resources/images/foods.png';
	}else if(type==='chinese'){
	//	innerElement.style.backgroundColor = '#FDEE15';	
		$icon =  '/' +DIR_THEME + 'resources/images/chinese.png';
	}else if(type==='tesla'){
	//	innerElement.style.backgroundColor = '#CC0000';
		$icon =  '/' +DIR_THEME + 'resources/images/tesla.png';
	}else if(type==='apple'){
	//	innerElement.style.backgroundColor = 'red';
		$icon =  '/' +DIR_THEME + 'resources/images/apple.png';
	}else if(type==='barber'){
	//	innerElement.style.backgroundColor = 'red';
		$icon =  '/' +DIR_THEME + 'resources/images/barber.png';
	}else if(type==='gas'){
	//	innerElement.style.backgroundColor = 'red';
		$icon =  '/' +DIR_THEME + 'resources/images/gas.png';
	}else if(type==='pizza'){
	//	innerElement.style.backgroundColor = 'red';
		$icon =  '/' +DIR_THEME + 'resources/images/pizza.png';
	} else if(type==='coffee'){
	//	innerElement.style.backgroundColor = 'red';
		$icon =  '/' +DIR_THEME + 'resources/images/coffee.png';
	}else if(type==='barber'){
	//	innerElement.style.backgroundColor = 'red';
		$icon =  '/' +DIR_THEME + 'resources/images/barber.png';
	}else if(type==='coffee'){
	//	innerElement.style.backgroundColor = 'red';
		$icon =  '/' +DIR_THEME + 'resources/images/coffee.png';
	}
//	innerElement.style.border = '2px solid #000';
	innerElement.style.font = 'normal 12px arial';
	innerElement.style.lineHeight = '12px'

	innerElement.style.paddingTop = '2px';
	innerElement.style.paddingLeft = '2px';
	innerElement.style.width = '25px';
	innerElement.style.height = '25px';
	innerElement.style.background = '#efefef';

	// add negative margin to inner element
	// to move the anchor to center of the div
	innerElement.style.marginTop = '0px';
	innerElement.style.marginLeft = '0px';

	innerElement.style.cursor = 'pointer';
	
	icon.setAttribute('src',$icon);
	icon.setAttribute('width','20');
	icon.setAttribute('height','20');
	icon.style.border= '1px solid #000';
	icon.style.borderRadius= '50%';
	icon.style.paddingTop = '2px';
	icon.style.paddingRight = '2px';
	icon.style.paddingLeft = '2px';
	icon.style.paddingLeft = '2px';	
	innerElement.appendChild(icon);
	outerElement.appendChild(innerElement);

	// Add text to the DOM element
//	innerElement.innerHTML = type.substring(0,1);

	function changeOpacity(evt) {
		evt.target.setAttribute("title",data.name +"\n"+data.address);
	};

	function changeOpacityToOne(evt) {
	
		evt.target.setAttribute("title","");
	};
	
	

	//create dom icon and add/remove opacity listeners
	var domIcon = new H.map.DomIcon(outerElement, {
	// the function is called every time marker enters the viewport
	onAttach: function(clonedElement, domIcon, domMarker) {
	   clonedElement.addEventListener('mouseover', changeOpacity);
	   clonedElement.addEventListener('mouseout', changeOpacityToOne);
	//  clonedElement.addEventListener('click', find_direction(lat,lng));
	},
	// the function is called every time marker leaves the viewport
	onDetach: function(clonedElement, domIcon, domMarker) {
	   clonedElement.removeEventListener('mouseover', changeOpacity);
	   clonedElement.removeEventListener('mouseout', changeOpacityToOne);
	//   clonedElement.addEventListener('click', find_direction(lat,lng));
	}
	});

	// Marker for Chicago Bears home
	var bearsMarker = new H.map.DomMarker({lat: lat, lng: lng}, {
	icon: domIcon
	});
	bearsMarker.id = 'customMarker';
	map.addObject(bearsMarker);
}

function find_direction(lat,lon){
	do_routing(lat,lon);
}

function do_routing(endLat,endLng) {
	 
	var startLat =  currentLocation.latitude;
	var startLng = currentLocation.longitude; 
	console.log(startLat);
	console.log(startLng);		 
	console.log(endLat);
	console.log(endLng);
	 
	if (startLat == endLat && startLng == endLng) {
		 
	} else {
		var waypoint0 = {lat: startLat, lng: startLng};
		var waypoint1 = {lat: endLat, lng: endLng};
		calculateRoutes(platform, waypoint0, waypoint1);
	}
	   
}

function set_center(lat,lon){
	map.setCenter({lat: lat, lng: lon});
	map.setZoom(zoom_value);
}

$('.place-search-box-item').click(function (evt) {
	evt.preventDefault();
	reset_action_box_item();
	var type = $(this).data('category');
	$(this).addClass('active');
	do_get_store(currentLocation,type);
});

function reset_action_box_item(){
	$('.place-search-box-item').each(function(i){
		$(this).removeClass('active');
	});
}

$('#inputLocationSearch').autocomplete({
	serviceUrl: 'https://autocomplete.geocoder.' + ROOT_API + '/6.2/suggest.json',
	dataType: 'json',
	onSearchStart: function (params) {
		$(this).after('<span class="search-loading"></span>');
	},
	onSearchComplete: function (query, suggestions) {
		$('.search-loading').remove();
		// Fix issue "still display suggestions after focus on another element"
		if ($(this).attr('id') != document.activeElement.id) {
			$(this).autocomplete('hide');
		}
	},
	width: $('.search-form').width(),
	deferRequestBy: 300,
	autoSelectFirst: false,
	params: { 
		'maxresults': 5, 
		'apiKey': APP_KEY,
	},
	minChars: 3,
	transformResult: function (response, originalQuery) {
		return {
			suggestions: $.map(response.suggestions, function (item) {
				var regionNmCd = !isEmpty(item.address.state) ? $.trim(item.address.state) : '';
				regionNmCd = !isEmpty(item.address.postalCode) ? regionNmCd + ' ' + $.trim(item.address.postalCode) : regionNmCd;
				regionNmCd = !isEmpty(regionNmCd) ? regionNmCd + ', ' : '';

				var resultText = (!isEmpty(item.address.houseNumber) ? item.address.houseNumber + ' ' : '')
						+ (!isEmpty(item.address.street) ? item.address.street + ', ' : '')
						+ (!isEmpty(item.address.city) ? item.address.city + ', ' : (!isEmpty(item.address.county) ? item.address.county + ', ' : ''))
						+ regionNmCd + (!isEmpty(item.address.country) ? item.address.country : '');
				return {value: resultText, data: item};
			})
		};
	},
	onSelect: function (suggestion) {
		console.log(suggestion);
		var input = $(this);
		//if (isEmpty($('#inputRouteStart').val()) || isEmpty($('#inputRouteStart').data('lat')) || isEmpty($('#inputRouteStart').data('lng'))) {
		if(false){
			$('#inputRouteStart').focus();
			$('#inputRouteStart').select();
		} else {
			$.ajax(
					'https://geocoder.' + ROOT_API + '/6.2/geocode.json',
					{
						data: {
							'locationid': suggestion.data.locationId,
							'jsonattributes': 1,
							'gen': 9, 
							'apiKey': APP_KEY,
						}
					}
			).done(function (res) {
				
				var result = res.response.view[0].result[0].location;
				console.log(result);
				input.data('lat', result.displayPosition.latitude);
				input.data('lng', result.displayPosition.longitude);
				routeEndType = false;
			//    showRoutingPlaces(input);
				currentLocation.latitude = result.displayPosition.latitude;
				currentLocation.longitude = result.displayPosition.longitude;

				do_get_store(currentLocation,'');
			});
		}
	},
	beforeRender: function (container) {
		$.each(container.children(), function (index, value) {
			$(this).attr('title', value.innerText);
		});
	}         
});	 