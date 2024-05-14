 

// Initial latitude/longitude/zoom to map
var initLat;
var initLng;

// Show a bubble of the place and remove all other markers on map
var showBubbleOnMap = true;

// Holding ajax request to abort it whenever we need to.
var xhrRequest;

// Detect whether destination has been searched
var routeEndType = false;

// To be used when adding place info bubble
var placeLabel = '';
var placeThumb = '';

var isoCountries = {
    'AF': 'Afghanistan',
    'AX': 'Aland Islands',
    'AL': 'Albania',
    'DZ': 'Algeria',
    'AS': 'American Samoa',
    'AD': 'Andorra',
    'AO': 'Angola',
    'AI': 'Anguilla',
    'AQ': 'Antarctica',
    'AG': 'Antigua And Barbuda',
    'AR': 'Argentina',
    'AM': 'Armenia',
    'AW': 'Aruba',
    'AU': 'Australia',
    'AT': 'Austria',
    'AZ': 'Azerbaijan',
    'BS': 'Bahamas',
    'BH': 'Bahrain',
    'BD': 'Bangladesh',
    'BB': 'Barbados',
    'BY': 'Belarus',
    'BE': 'Belgium',
    'BZ': 'Belize',
    'BJ': 'Benin',
    'BM': 'Bermuda',
    'BT': 'Bhutan',
    'BO': 'Bolivia',
    'BA': 'Bosnia And Herzegovina',
    'BW': 'Botswana',
    'BV': 'Bouvet Island',
    'BR': 'Brazil',
    'IO': 'British Indian Ocean Territory',
    'BN': 'Brunei Darussalam',
    'BG': 'Bulgaria',
    'BF': 'Burkina Faso',
    'BI': 'Burundi',
    'KH': 'Cambodia',
    'CM': 'Cameroon',
    'CA': 'Canada',
    'CV': 'Cape Verde',
    'KY': 'Cayman Islands',
    'CF': 'Central African Republic',
    'TD': 'Chad',
    'CL': 'Chile',
    'CN': 'China',
    'CX': 'Christmas Island',
    'CC': 'Cocos (Keeling) Islands',
    'CO': 'Colombia',
    'KM': 'Comoros',
    'CG': 'Congo',
    'CD': 'Congo, Democratic Republic',
    'CK': 'Cook Islands',
    'CR': 'Costa Rica',
    'CI': 'Cote D\'Ivoire',
    'HR': 'Croatia',
    'CU': 'Cuba',
    'CY': 'Cyprus',
    'CZ': 'Czech Republic',
    'DK': 'Denmark',
    'DJ': 'Djibouti',
    'DM': 'Dominica',
    'DO': 'Dominican Republic',
    'EC': 'Ecuador',
    'EG': 'Egypt',
    'SV': 'El Salvador',
    'GQ': 'Equatorial Guinea',
    'ER': 'Eritrea',
    'EE': 'Estonia',
    'ET': 'Ethiopia',
    'FK': 'Falkland Islands (Malvinas)',
    'FO': 'Faroe Islands',
    'FJ': 'Fiji',
    'FI': 'Finland',
    'FR': 'France',
    'GF': 'French Guiana',
    'PF': 'French Polynesia',
    'TF': 'French Southern Territories',
    'GA': 'Gabon',
    'GM': 'Gambia',
    'GE': 'Georgia',
    'DE': 'Germany',
    'GH': 'Ghana',
    'GI': 'Gibraltar',
    'GR': 'Greece',
    'GL': 'Greenland',
    'GD': 'Grenada',
    'GP': 'Guadeloupe',
    'GU': 'Guam',
    'GT': 'Guatemala',
    'GG': 'Guernsey',
    'GN': 'Guinea',
    'GW': 'Guinea-Bissau',
    'GY': 'Guyana',
    'HT': 'Haiti',
    'HM': 'Heard Island & Mcdonald Islands',
    'VA': 'Holy See (Vatican City State)',
    'HN': 'Honduras',
    'HK': 'Hong Kong',
    'HU': 'Hungary',
    'IS': 'Iceland',
    'IN': 'India',
    'ID': 'Indonesia',
    'IR': 'Iran, Islamic Republic Of',
    'IQ': 'Iraq',
    'IE': 'Ireland',
    'IM': 'Isle Of Man',
    'IL': 'Israel',
    'IT': 'Italy',
    'JM': 'Jamaica',
    'JP': 'Japan',
    'JE': 'Jersey',
    'JO': 'Jordan',
    'KZ': 'Kazakhstan',
    'KE': 'Kenya',
    'KI': 'Kiribati',
    'KR': 'Korea',
    'KW': 'Kuwait',
    'KG': 'Kyrgyzstan',
    'LA': 'Lao People\'s Democratic Republic',
    'LV': 'Latvia',
    'LB': 'Lebanon',
    'LS': 'Lesotho',
    'LR': 'Liberia',
    'LY': 'Libyan Arab Jamahiriya',
    'LI': 'Liechtenstein',
    'LT': 'Lithuania',
    'LU': 'Luxembourg',
    'MO': 'Macao',
    'MK': 'Macedonia',
    'MG': 'Madagascar',
    'MW': 'Malawi',
    'MY': 'Malaysia',
    'MV': 'Maldives',
    'ML': 'Mali',
    'MT': 'Malta',
    'MH': 'Marshall Islands',
    'MQ': 'Martinique',
    'MR': 'Mauritania',
    'MU': 'Mauritius',
    'YT': 'Mayotte',
    'MX': 'Mexico',
    'FM': 'Micronesia, Federated States Of',
    'MD': 'Moldova',
    'MC': 'Monaco',
    'MN': 'Mongolia',
    'ME': 'Montenegro',
    'MS': 'Montserrat',
    'MA': 'Morocco',
    'MZ': 'Mozambique',
    'MM': 'Myanmar',
    'NA': 'Namibia',
    'NR': 'Nauru',
    'NP': 'Nepal',
    'NL': 'Netherlands',
    'AN': 'Netherlands Antilles',
    'NC': 'New Caledonia',
    'NZ': 'New Zealand',
    'NI': 'Nicaragua',
    'NE': 'Niger',
    'NG': 'Nigeria',
    'NU': 'Niue',
    'NF': 'Norfolk Island',
    'MP': 'Northern Mariana Islands',
    'NO': 'Norway',
    'OM': 'Oman',
    'PK': 'Pakistan',
    'PW': 'Palau',
    'PS': 'Palestinian Territory, Occupied',
    'PA': 'Panama',
    'PG': 'Papua New Guinea',
    'PY': 'Paraguay',
    'PE': 'Peru',
    'PH': 'Philippines',
    'PN': 'Pitcairn',
    'PL': 'Poland',
    'PT': 'Portugal',
    'PR': 'Puerto Rico',
    'QA': 'Qatar',
    'RE': 'Reunion',
    'RO': 'Romania',
    'RU': 'Russian Federation',
    'RW': 'Rwanda',
    'BL': 'Saint Barthelemy',
    'SH': 'Saint Helena',
    'KN': 'Saint Kitts And Nevis',
    'LC': 'Saint Lucia',
    'MF': 'Saint Martin',
    'PM': 'Saint Pierre And Miquelon',
    'VC': 'Saint Vincent And Grenadines',
    'WS': 'Samoa',
    'SM': 'San Marino',
    'ST': 'Sao Tome And Principe',
    'SA': 'Saudi Arabia',
    'SN': 'Senegal',
    'RS': 'Serbia',
    'SC': 'Seychelles',
    'SL': 'Sierra Leone',
    'SG': 'Singapore',
    'SK': 'Slovakia',
    'SI': 'Slovenia',
    'SB': 'Solomon Islands',
    'SO': 'Somalia',
    'ZA': 'South Africa',
    'GS': 'South Georgia And Sandwich Isl.',
    'ES': 'Spain',
    'LK': 'Sri Lanka',
    'SD': 'Sudan',
    'SR': 'Suriname',
    'SJ': 'Svalbard And Jan Mayen',
    'SZ': 'Swaziland',
    'SE': 'Sweden',
    'CH': 'Switzerland',
    'SY': 'Syrian Arab Republic',
    'TW': 'Taiwan',
    'TJ': 'Tajikistan',
    'TZ': 'Tanzania',
    'TH': 'Thailand',
    'TL': 'Timor-Leste',
    'TG': 'Togo',
    'TK': 'Tokelau',
    'TO': 'Tonga',
    'TT': 'Trinidad And Tobago',
    'TN': 'Tunisia',
    'TR': 'Turkey',
    'TM': 'Turkmenistan',
    'TC': 'Turks And Caicos Islands',
    'TV': 'Tuvalu',
    'UG': 'Uganda',
    'UA': 'Ukraine',
    'AE': 'United Arab Emirates',
    'GB': 'United Kingdom',
    'US': 'United States',
    'UM': 'United States Outlying Islands',
    'UY': 'Uruguay',
    'UZ': 'Uzbekistan',
    'VU': 'Vanuatu',
    'VE': 'Venezuela',
    'VN': 'Viet Nam',
    'VG': 'Virgin Islands, British',
    'VI': 'Virgin Islands, U.S.',
    'WF': 'Wallis And Futuna',
    'EH': 'Western Sahara',
    'YE': 'Yemen',
    'ZM': 'Zambia',
    'ZW': 'Zimbabwe'
};
	 
/****************************/
/** BEGIN functions **/

/****************************/

/**
 * Utility function to convert string to title case.
 *
 * @param str
 * @returns {string}
 */
function toTitleCase(str) {
    return str.replace(
            /\w\S*/g,
            function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
    );
}

function getCountryName(countryCode) {
    if (isoCountries.hasOwnProperty(countryCode)) {
        return isoCountries[countryCode];
    } else {
        return countryCode;
    }
}

/**
 * Utility function to extract parameter values from href
 * @param url
 * @param name
 * @returns {string}
 */
function getURLParameter(url, name) {
    return (RegExp(name + '=' + '(.+?)(&|$)').exec(url) || [, null])[1];
}

function isEmpty(val) {
    if (val == null || $.trim(val) == '' || val == false || $.trim(val) == '0' || val == 0 || val == 0.0 || val.length <= 0) {
        return true;
    }
    return false;
}

function convertKeysToLowerCase(obj) {
    var output = {};
    for (i in obj) {
        if (Object.prototype.toString.apply(obj[i]) === '[object Object]') {
            output[i.toLowerCase()] = convertKeysToLowerCase(obj[i]);
        } else if (Object.prototype.toString.apply(obj[i]) === '[object Array]') {
            output[i.toLowerCase()] = [];
            output[i.toLowerCase()].push(convertKeysToLowerCase(obj[i][0]));
        } else {
            output[i.toLowerCase()] = obj[i];
        }
    }
    return output;
}
;

/**
 * This is an important function decides which type of a given place should be, based on its categories.
 * This function should be updated frequently to be more accurately. After update, please change the version.
 *
 * @param categories
 * @version 1.0
 * @returns {string}
 */
function getBusinessRelevant(categories) {
    var categoriesStr = !isEmpty(categories) ? categories.join(',') : '';
    var bsType = 'localbusiness';
    if (categoriesStr.match(/restaurants|bars|subs & sandwiches|burgers/ig)) {
        bsType = 'food';
    } else if (categoriesStr.match(/hotels|motels/ig)) {
        bsType = 'hotel'
    } else if (categoriesStr.match(/convenience stores|grocery stores|food markets|retail shops|stores|markets|wholesale/ig)) {
        bsType = 'shopping';
    } else if (categoriesStr.match(/coffee shops|cafes|starbucks|coffee & tea/ig)) {
        bsType = 'coffee';
    } else if (categoriesStr.match(/gas stations|shell|oils\-fuel|diesel|electric charging station|alternative fuels|biodiesel|exxon/ig)) {
        bsType = 'gasstation';
    }
    return bsType;
}

/**
 * Add a custom DOM marker to map.
 *
 * @param map
 * @param lat                   latitude coordinates
 * @param lng                   longitude coordinates
 * @param className             custom CSS class was defined in style.css
 * @param noHover               disable hover
 * @param noDrag                disable draggable
 * @param returnObj             return object to add to a group instead of adding it to map directly
 * @param icon                  fontawesome's icon postfix, for example: fa-briefcase -> briefcase, fa-bed -> bed
 * @param placeObj              place details
 * @returns {H.map.DomMarker}   depend on returnObj
 */
function addDOMMarkerToMap(map, lat, lng, className, noHover, noDrag, returnObj, icon, placeObj) {
    var element = document.createElement('div');
    element.className = className;

    if (icon) {
        var markerIcon = document.createElement('i');
        markerIcon.className = 'fas fa-' + icon;
        element.appendChild(markerIcon);
    }

    if (placeObj) {
        element.id = placeObj._id;
        var placeObjSrc = placeObj._source;
        element.setAttribute("data-toggle", "tooltip");
        var placeCategoriesStr = !isEmpty(placeObjSrc.categories) ? placeObjSrc.categories.join(',') : '';
        var placeImgDefault = '<span class="marker-info-thumb default">';

        switch (getBusinessRelevant(placeObjSrc.categories)) {
            case 'food':
                placeImgDefault += '<img src="/themes/coolmaps/resources/images/place-restaurant.png"></span>';
                break
            case 'hotel':
                placeImgDefault += '<img src="/themes/coolmaps/resources/images/place-hotel.png"></span>';
                break
            case 'shopping':
                placeImgDefault += '<img src="/themes/coolmaps/resources/images/place-shopping.png"></span>';
                break
            case 'coffee':
                placeImgDefault += '<img src="/themes/coolmaps/resources/images/place-coffee.png"></span>';
                break
            case 'gasstation':
                placeImgDefault += '<img src="/themes/coolmaps/resources/images/place-gas-pump.png"></span>';
                break
            default:
                placeImgDefault += '<img src="/themes/coolmaps/resources/images/place-default.png"></span>';
                break
        }

        var placeImg = !isEmpty(placeObjSrc.images) ? '<span class="marker-info-thumb"><img src="' + placeObjSrc.images[0].url + '"></span>' : placeImgDefault;

        var placeAddr = '<span class="marker-info-content-tagline">';
        placeAddr += !isEmpty(placeObjSrc.address.address1) ? placeObjSrc.address.address1 + ', ' : '';
        placeAddr += !isEmpty(placeObjSrc.address.locality) ? placeObjSrc.address.locality : '';
        placeAddr += '</span>'

        var placeReviewCount = !isEmpty(placeObjSrc.reviewCount) ? placeObjSrc.reviewCount : 0;
        var placeAggregateRating = !isEmpty(placeObjSrc.aggregateRating) ? 0.5 * (1 + placeObjSrc.aggregateRating.value) : 0;
        element.setAttribute("data-rating", placeAggregateRating);
        var placeRecommendedMeal = !isEmpty(placeObjSrc.recommendedMeal) && placeObjSrc.recommendedMeal[0] != 'unknownattribute' ? 'Good for ' + placeObjSrc.recommendedMeal.join(", ") : '';
        element.title = '<div class="marker-info">' + placeImg +
                '<div class="marker-info-content">' +
                '<span class="marker-info-content-title">' + placeObjSrc.name + '</span>' + placeAddr +
                '<span class="marker-info-content-meta"><span class="marker-info-content-meta-rating"></span>' + placeReviewCount + ' reviews. ' + placeRecommendedMeal + '.</span>' +
                '</div></div>';
        var markerTitle = document.createElement('span');
        markerTitle.className = 'title';
        markerTitle.innerHTML = placeObjSrc.name;
        element.appendChild(markerTitle);
    }

    function changeOpacity(evt) {
        evt.target.style.opacity = 0.8;
    }
    ;

    function changeOpacityToOne(evt) {
        evt.target.style.opacity = 1;
    }
    ;

    //create dom icon and add/remove opacity listeners
    var domIcon = new H.map.DomIcon(element, {
        // the function is called every time marker enters the viewport
        onAttach: function (clonedElement, domIcon, domMarker) {
            if (!noHover) {
                clonedElement.addEventListener('mouseover', changeOpacity);
                clonedElement.addEventListener('mouseout', changeOpacityToOne);
            } else {
                $('.marker-local-business').tooltip({
                    html: true,
                    offset: '0,10',
                    template: '<div class="tooltip marker-tooltip" role="tooltip"><div class="tooltip-inner"></div></div>'
                });
                $('.marker-local-business').on('inserted.bs.tooltip', function () {
                    $('span.marker-info-content-meta-rating').raty({starType: 'i', half: true, readOnly: true, score: $(this).data('rating')});
                });
                $('.marker-local-business').on('click', function (idx, el) {
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                });
            }
        },
        // the function is called every time marker leaves the viewport
        onDetach: function (clonedElement, domIcon, domMarker) {
            if (!noHover) {
                clonedElement.removeEventListener('mouseover', changeOpacity);
                clonedElement.removeEventListener('mouseout', changeOpacityToOne);
            }
        }
    });

    var domMarker = new H.map.DomMarker({lat: lat, lng: lng}, {
        icon: domIcon,
        volatility: true
    });

    if (!noDrag) {
        domMarker.draggable = true;
        // disable the default draggability of the underlying map
        // and calculate the offset between mouse and target's position
        // when starting to drag a marker object:
        map.addEventListener('dragstart', function (ev) {
            var target = ev.target,
                    pointer = ev.currentPointer;
            if (target instanceof H.map.DomMarker) {
                var targetPosition = map.geoToScreen(target.getGeometry());
                target['offset'] = new H.math.Point(pointer.viewportX - targetPosition.x, pointer.viewportY - targetPosition.y);
                behavior.disable();
            }
        }, false);

        // re-enable the default draggability of the underlying map
        // when dragging has completed
        map.addEventListener('dragend', function (ev) {
            var target = ev.target,
                    pointer = ev.currentPointer;
            if (target instanceof H.map.DomMarker) {
                behavior.enable();
                var coord = map.screenToGeo(pointer.viewportX, pointer.viewportY);
                setWaypoint(coord, 'end');
            }
        }, false);

        // Listen to the drag event and move the position of the marker
        // as necessary
        map.addEventListener('drag', function (ev) {
            var target = ev.target,
                    pointer = ev.currentPointer;
            if (target instanceof H.map.DomMarker) {
                target.setGeometry(map.screenToGeo(pointer.viewportX - target['offset'].x, pointer.viewportY - target['offset'].y));
            }
        }, false);
    }

    if (placeObj) {
        // Tap/click on the marker to show the place details
        domMarker.addEventListener('tap', function (evt) {
            // Enable History
            renderPlaceDetails(null, placeObjSrc, false, placeObj._id);
        }, false);
    }

    // Return as an object to add to group or add it to map directly.
    if (!returnObj) {
        domMarker.id = "customMarker";
        map.addObject(domMarker);
    } else {
        return domMarker;
    }
}

/**
 * Adds markers to the map.
 *
 * @param   {H.Map} map     A HERE Map instance within the application
 * @param   {int} lat       Initial latitude value
 * @param   {int} lng       Initial longtitude value
 */
function addMarkerToMap(map, lat, lng) {
    if (!lat && !lng) {
        // Only add marker for the first time user enter to the site, mean no info bubble
        if (ui.getBubbles().length == 0) {
            // Try HTML5 geolocation.
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    initLat = position.coords.latitude;
                    initLng = position.coords.longitude;
                    // Remove all existing markers on the map before adding a new one
                    removeObjectById("customMarker");

                    // Define a marker
                    addDOMMarkerToMap(map, initLat, initLng, 'marker-user-location', true, true);
                    map.setCenter({lat: initLat, lng: initLng}, true);
                    map.setZoom(zoomHouseNumber);
                    $.ajax(
                            'https://reverse.geocoder.' + ROOT_API + '/6.2/reversegeocode.json',
                            {
                                data: {
                                    'mode': 'retrieveAddresses',
                                    'prox': initLat + ',' + initLng,
									'apikey': APP_KEY
                                }
                            }
                    ).done(function (res) {
                        var result = convertKeysToLowerCase(res.Response.View[0].Result[0]);
                        $('#inputLocationSearch').val(result.location.address.label);
                        $('#inputLocationSearch').data('lat', result.location.displayposition.latitude);
                        $('#inputLocationSearch').data('lng', result.location.displayposition.longitude);
                    });
                }, function () {
                    handleErrorMarker();
                });
            } else {
                handleErrorMarker();
            }
        }
    } else {
        var marker = new H.map.Marker({lat: lat, lng: lng});
        marker.id = "customMarker";
        map.addObject(marker);
        map.setCenter({lat: lat, lng: lng}, true);
    }
}

/**
 * Detects if two elements are colliding
 *
 * Credit goes to BC on Stack Overflow, cleaned up a little bit
 *
 * @link http://stackoverflow.com/questions/5419134/how-to-detect-if-two-divs-touch-with-jquery
 * @param $div1
 * @param $div2
 * @returns {boolean}
 */
var is_colliding = function ($div1, $div2) {
    // Div 1 data
    var d1_offset = $div1.offset();
    var d1_height = $div1.outerHeight(true);
    var d1_width = $div1.outerWidth(true);
    var d1_distance_from_top = d1_offset.top + d1_height;
    var d1_distance_from_left = d1_offset.left + d1_width;

    // Div 2 data
    var d2_offset = $div2.offset();
    var d2_height = $div2.outerHeight(true);
    var d2_width = $div2.outerWidth(true);
    var d2_distance_from_top = d2_offset.top + d2_height;
    var d2_distance_from_left = d2_offset.left + d2_width;

    var not_colliding = (d1_distance_from_top < d2_offset.top || d1_offset.top > d2_distance_from_top || d1_distance_from_left < d2_offset.left || d1_offset.left > d2_distance_from_left);

    // Return whether it IS colliding
    return !not_colliding;
};

/**
 * Add a group of DOM markers to map
 *
 * @param map
 * @param places
 */
function addDOMMarkersToMap(map, places) {
    var groupMarkers = new H.map.Group();
    var objects = [];
    var icon, className;
    for (var i = 0; i < places.length; i++) {
        switch (getBusinessRelevant(places[i]._source.categories)) {
            case 'food':
                icon = 'utensils';
                className = 'marker-local-business marker-local-business-food';
                break;
            case 'hotel':
                icon = 'bed';
                className = 'marker-local-business marker-local-business-hotel';
                break;
            case 'shopping':
                icon = 'tag';
                className = 'marker-local-business marker-local-business-shopping';
                break;
            case 'coffee':
                icon = 'coffee';
                className = 'marker-local-business marker-local-business-coffee';
                break;
            case 'gasstation':
                icon = 'gas-pump';
                className = 'marker-local-business marker-local-business-gasstation';
                break;
            default:
                icon = 'briefcase';
                className = 'marker-local-business';
                break;
        }

        groupMarkers.addObject(addDOMMarkerToMap(map, places[i]._source.latLng.lat, places[i]._source.latLng.lon, className, true, true, true, icon, places[i]));
    }
    groupMarkers.id = 'groupDOMMarker';
    groupMarkers.addObjects(objects);

    // Add group of markers to map
    map.addObject(groupMarkers);

    if (resetVb == 'yes') {
        // Get geo bounding box for the group and set it to the map
        map.setViewBounds(groupMarkers.getBounds(), true);
    }
}

/**
 * Handle error when getting current location of the visitor.
 * To display default location.
 */
function handleErrorMarker() {
    // Set default lat/lng is New York center
    initLat = (typeof (initLat) == "undefined") ? 40.706444 : initLat;
    initLng = (typeof (initLng) == "undefined") ? -74.009278 : initLng;
    map.setCenter({lat: initLat, lng: initLng}, true);
    map.setZoom(zoomCity);
    if ($('.route-panel').is(":visible")) {
        $('#inputRouteStart').focus();
    }
}

/**
 * Remove bubbles if existed on the map. Use if you do not want many bubbles on the map
 *
 * @param   {H.ui.UI} ui     A HERE Map UI instance within the application
 */
function removeBubblesOnMap(ui) {
    for (var i = 0; i < ui.getBubbles().length; i++) {
        ui.removeBubble(ui.getBubbles()[i]);
    }
}

/**
 * Because map.removeObjects didn't work properly, so we have to make some trick to delete existed polyline & group from the map
 *
 * @param   {String} id The ID of given polyline/group
 */
function removeObjectById(id) {
    for (object of map.getObjects()) {
        if (object.id === id) {
            map.removeObject(object);
        }
    }
}

/**
 * Get an object instance by its ID
 *
 * @param id The ID of given object
 * @returns {Array}
 */
function getObjectById(id) {
    var results = [];
    for (object of map.getObjects()) {
        if (object.id === id) {
            results.push(object);
        }
    }
    return results;
}

/**
 * Enable traffic info on maps
 */
function enableTrafficInfo(map) {
    // Show traffic tiles
    map.setBaseLayer(defaultLayers.normal.traffic);
    // Enable traffic incidents layer
    // map.addLayer(defaultLayers.incidents);
}

/**
 * Add a marker showing the position at the current pointer.
 * Clicking on a marker opens an infobubble which holds HTML content related to the marker.
 * @param  {H.Map} map      A HERE Map instance within the application
 * @param   {H.map.UI}
 * @param   targetLat
 * @param   targetLng
 * @param   targetLabel
 * @param   targetThumb
 */
function addInfoBubble(map, ui, targetLat, targetLng, targetLabel, targetThumb) {
    // Remove all existing bubbles on the map before adding a new one
    removeBubblesOnMap(ui);
    var targetName = targetLabel.substr(0, targetLabel.indexOf(', '));
    var targetAddr = targetLabel.substr(targetLabel.indexOf(', ') + 2, targetLabel.length - 1);
    var targetThumbEl = '<span class="marker-info-thumb"><img src="';
    targetThumbEl += (!isEmpty(targetThumb) ? targetThumb : '/themes/coolmaps/resources/images/place-default.png') + '"></span>';

    var targetHtml =
            '<div class="marker-info">' +
            targetThumbEl +
            '<div class="marker-info-content">' +
            '<span class="marker-info-content-title">' + targetName + '</span>' +
            '<span class="marker-info-content-addr" title="' + targetAddr + '">' + targetAddr + '</span>' +
            '<span class="marker-info-content-meta">' + Math.abs(targetLat.toFixed(4)) + ((targetLat > 0) ? 'N' : 'S') + ', ' +
            Math.abs(targetLng.toFixed(4)) + ((targetLng.lng > 0) ? 'E' : 'W') + '</span>' +
            '</div>' +
            '<div class="H_ib_custom_direction" title="Get direction">' +
            '<span class="icon"></span>' +
            '</div>' +
            '</div>';

    bubble = new H.ui.InfoBubble({lat: targetLat, lng: targetLng}, {
        content: targetHtml
    });

    // Close info bubble handler function
    bubble.addEventListener('statechange', function (evt) {
        if (evt.target.getState() == 'closed') {
            ui.removeBubble(evt.target);
            evt.target.dispose();
        }
    }, false);
    // show info bubble
    ui.addBubble(bubble);
}

/**
 * Calculates and displays a car route from the Brandenburg Gate in the centre of Berlin
 * to FriedrichstraÃŸe Railway Station.
 *
 * A full list of available request parameters can be found in the Routing API documentation.
 * see:  http://developer.here.com/rest-apis/documentation/routing/topics/resource-calculate-route.html
 *
 * @param   {H.service.Platform} platform    A stub class to access HERE services
 * @param   {Object}    waypoint0
 * @param   {Object}    waypoint1
 */
function calculateRoutes(platform, waypoint0, waypoint1) {
    var router = platform.getRoutingService(),
            routeRequestParams = {
                mode: 'fastest;car'  ,
                representation: 'display',
                routeattributes: 'waypoints,summary,shape,legs',
                maneuverattributes: 'direction,action',
                waypoint0: waypoint0.lat + ',' + waypoint0.lng,
                waypoint1: waypoint1.lat + ',' + waypoint1.lng
            };
    router.calculateRoute(
            routeRequestParams,
            onSuccess,
            onError
            );
    $(".btn-place-details-close").hide();
    toggleMainPanel(true);
}

/**
 * To remove all existing routes
 */
function removeExistingRoutes() {
    // Clean all previous created objects on the map before drawing new
    removeObjectById("mPolyline");
    removeObjectById("mGroup");
    // Clean route instructions panel before adding new
    $('.instructions-details .route-error').hide();
    $('.instructions-sumary .distance').text('');
    $('.instructions-sumary .time').text('');
    $('.instructions-sumary .addr-from').text('');
    $('.instructions-sumary .addr-to').text('');
}

/**
 * This function will be called once the Routing REST API provides a response
 * @param  {Object} result          A JSONP object representing the calculated route
 *
 * see: http://developer.here.com/rest-apis/documentation/routing/topics/resource-type-calculate-route.html
 */
function onSuccess(result) {
    if (result.type == 'ApplicationError' || result.subtype == 'NoRouteFound') {
        $('.instructions-details .route-error').show();
        $('.instructions-sumary').hide();
        $('.instructions-block').hide();
        $('#routeInstructionsPanel').width($('#routeInstructionsPanel').parent().width() - 20);
        $('#routeInstructionsPanel').show();
    } else {
        var route = result.response.route[0];

        // Remove all existing markers on the map before adding a new one
        removeObjectById("customMarker");
        removeObjectById("groupDOMMarker");
        removeBubblesOnMap(ui);

        // Add new appropriate markers for start-end waypoints
        addMarkerToMap(map, route.waypoint[0].mappedPosition.latitude, route.waypoint[0].mappedPosition.longitude);
        addDOMMarkerToMap(map, route.waypoint[1].mappedPosition.latitude, route.waypoint[1].mappedPosition.longitude, 'marker-destination');

        // Remove existing routes before adding a new one.
        removeExistingRoutes();

        // Draw polyline & points
        addRouteShapeToMap(route);
        addManeuversToMap(route);

        // Create detailed instructions for the route
        addWaypointsToPanel(route.waypoint);
        addManueversToPanel(route);
        addSummaryToPanel(route.summary);
    }
}

/**
 * This function will be called if a communication error occurs during the JSON-P request
 * @param  {Object} error  The error message received.
 */
function onError(error) {
    alert('Can\'t reach the remote server');
}

/**
 * Opens/Closes a infobubble
 * @param  {H.geo.Point} position     The location on the map.
 * @param  {String} text              The contents of the infobubble.
 */
function openBubble(position, text) {
    if (!bubble) {
        bubble = new H.ui.InfoBubble(
                position,
                // The FO property holds the province name.
                        {
                            content: text
                        });
                ui.addBubble(bubble);
            } else {
        bubble.setPosition(position);
        bubble.setContent(text);
        bubble.open();
    }
}

/**
 * Creates a H.map.Polyline from the shape of the route and adds it to the map.
 * @param {Object} route A route as received from the H.service.RoutingService
 */
function addRouteShapeToMap(route) {
    var lineString = new H.geo.LineString(),
            routeShape = route.shape,
            polyline;

    routeShape.forEach(function (point) {
        var parts = point.split(',');
        lineString.pushLatLngAlt(parts[0], parts[1]);
    });

    polyline = new H.map.Polyline(lineString, {
        style: {
            lineWidth: 4,
            strokeColor: 'rgba(0, 128, 255, 0.7)'
        }
    });
    // Assign a custom ID to remove it from the map later
    polyline.id = "mPolyline";
    // Add the polyline to the map
    map.addObject(polyline);
    // And zoom to its bounding rectangle
 //   map.setViewBounds(polyline.getBounds(), true);
}

/**
 * Creates a series of H.map.Marker points from the route and adds them to the map.
 * @param {Object} route  A route as received from the H.service.RoutingService
 */
function addManeuversToMap(route) {
    var svgMarkup = '<svg width="18" height="18" ' + 'xmlns="http://www.w3.org/2000/svg">' + '<circle cx="8" cy="8" r="8" ' + 'fill="#1b468d" stroke="white" stroke-width="1"  />' + '</svg>',
            dotIcon = new H.map.Icon(svgMarkup, {
                anchor: {
                    x: 8,
                    y: 8
                }
            }),
            group = new H.map.Group(),
            i,
            j;

    // Add a marker for each maneuver
    for (i = 0; i < route.leg.length; i += 1) {
        for (j = 0; j < route.leg[i].maneuver.length; j += 1) {
            // Get the next maneuver.
            maneuver = route.leg[i].maneuver[j];
            // Add a marker to the maneuvers group
            var marker = new H.map.Marker({
                lat: maneuver.position.latitude,
                lng: maneuver.position.longitude
            }, {
                icon: dotIcon
            });
            marker.instruction = maneuver.instruction;
            group.addObject(marker);
        }
    }

    group.addEventListener('tap', function (evt) {
        map.setCenter(evt.target.getPosition(), true);
        openBubble(
                evt.target.getPosition(), evt.target.instruction);
    }, false);

    // Assign a custom ID to remove it from the map later
    group.id = "mGroup";
    // Add the maneuvers group to the map
    map.addObject(group);
}

/**
 * Creates a series of H.map.Marker points from the route and adds them to the map.
 * @param {Object} route  A route as received from the H.service.RoutingService
 */
function addWaypointsToPanel(waypoints) {
    // var nodeH2 = document.createElement('h2'),
    //     waypointLabels = [],
    //     i;
    // for (i = 0; i < waypoints.length; i += 1) {
    //     waypointLabels.push(waypoints[i].label)
    // }
    $('.instructions-sumary .addr-from').text($('#inputRouteStart').val());
    $('.instructions-sumary .addr-to').text($('#inputRouteEnd').val());
    $('.instructions-sumary').show();
    $('#routeInstructionsPanel').width($('#routeInstructionsPanel').parent().width() - 20);
    $('#routeInstructionsPanel').show();
}

/**
 * Creates a series of H.map.Marker points from the route and adds them to the map.
 * @param {Object} route  A route as received from the H.service.RoutingService
 */
function addManueversToPanel(route) {
    var nodeOL = document.createElement('ol'),
            i,
            j;
    nodeOL.style.fontSize = 'small';
    nodeOL.className = 'directions';
    nodeOL.style.width = $('.instructions-block').width() + 'px';

    // Add a marker for each maneuver
    for (i = 0; i < route.leg.length; i += 1) {
        for (j = 0; j < route.leg[i].maneuver.length; j += 1) {
            // Get the next maneuver.
            maneuver = route.leg[i].maneuver[j];

            var li = document.createElement('li'),
                    spanArrow = document.createElement('span'),
                    spanInstruction = document.createElement('span');

            spanArrow.className = 'arrow ' + maneuver.action;
            spanInstruction.innerHTML = maneuver.instruction;
            li.appendChild(spanArrow);
            li.appendChild(spanInstruction);

            nodeOL.appendChild(li);
        }
    }
    // $('.instructions-block').css('maxHeight', ($(window).height() - 370) + 'px');
    $('.instructions-block').html(nodeOL);
    $('.instructions-block').show();
}

/**
 * Creates a series of H.map.Marker points from the route and adds them to the map.
 * @param {Object} route  A route as received from the H.service.RoutingService
 */
function addSummaryToPanel(summary) {
    $('.instructions-sumary .distance').text((Math.round((summary.distance / 1609.34) * 100) / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' miles');
    $('.instructions-sumary .time').text(summary.travelTime.toHM() + ' (with current traffic)');
}

Number.prototype.toHM = function () {
    var hrs = Math.floor(this / 3600);
    var min = Math.floor(this % 3600 / 60);

    if (hrs > 0 && min > 0) {
        return hrs + ' h ' + min + ' min.';
    } else if (hrs > 0) {
        return hrs + ' h.'
    } else {
        return min + ' min.';
    }
}

/**
 * Show detailed place when user click on title/icon in the map.
 * @param el Element inside the opened bubble.
 */
function showPlaceDetails(el) {
    $('.place-details-panel-content .title h2').text($(el).data('title'));
    $('.place-details-panel-content .address').text($(el).data('title') + ', ' + $(el).data('address'));
    $('.directions-cta .btn-directions-cta').data('lat', $(el).data('lat'));
    $('.directions-cta .btn-directions-cta').data('lng', $(el).data('lng'));
}

function resetRouteStart(focus) {
    $('#inputRouteStart').val('');
    $('#inputRouteStart').data('lat', null);
    $('#inputRouteStart').data('lng', null);
    if (focus)
        $('#inputRouteStart').focus();
}

function resetRouteEnd(focus) {
    $('#inputRouteEnd').val('');
    $('#inputRouteEnd').data('lat', null);
    $('#inputRouteEnd').data('lng', null);
    if (focus)
        $('#inputRouteEnd').focus();
}

/**
 * Start canculate ruotes and expand routing instructions panel.
 * @param el Element inside the opened bubble.
 */
function showRoutingPlaces(el) {
    var startRouteVal = typeof $('#inputRouteStart').val() !== "undefined" ? $.trim($('#inputRouteStart').val()) : "";
	console.log(startRouteVal);
	
    var endRouteVal = typeof $('#inputRouteEnd').val() !== "undefined" ? $.trim($('#inputRouteEnd').val()) : "";
	console.log(endRouteVal);
    var startLat = $('#inputRouteStart').data('lat'), startLng = $('#inputRouteStart').data('lng');
    var endLat = $('#inputRouteEnd').data('lat'), endLng = $('#inputRouteEnd').data('lng');
	 
    if (!isEmpty(startRouteVal) && !isEmpty(endRouteVal)) {
        if (startLat == endLat && startLng == endLng) {
            if (el && el.attr('id') == inputRouteStart) {
                resetRouteEnd(true);
            } else {
                resetRouteStart(true);
            }
        } else {
            var waypoint0 = {lat: startLat, lng: startLng};
            var waypoint1 = {lat: endLat, lng: endLng};
            calculateRoutes(platform, waypoint0, waypoint1);
        }
    } else if (isEmpty(startRouteVal)) {
        resetRouteStart(true);
    } else {
        resetRouteEnd(true);
    }
}

// Abort all suggestions if user terminated searching
function abortSuggestions() {
    $('.search-suggestions').autocomplete().disable();
    $('.search-loading').remove();
    $('#btnLocationSearch>i').removeClass('active');
    $('.search-suggestions').autocomplete().enable();
}

function setWaypoint(coord, where) {
    $.ajax(
            'https://reverse.geocoder.' + ROOT_API + '/6.2/reversegeocode.json',
            {
                data: {
                    'mode': 'retrieveAddresses',
                    'prox': coord.lat + ',' + coord.lng, 
                    'apikey': APP_KEY
                }
            }
    ).done(function (res) {
        var location = res.Response.View[0].Result[0].Location;
        var resLat = location.DisplayPosition.Latitude,
                resLng = location.DisplayPosition.Longitude;

        var countryName = location.Address.AdditionalData[0].key == 'CountryName' ? location.Address.AdditionalData[0].value : location.Address.Country;

        var regionNmCd = !isEmpty(location.Address.State) ? $.trim(location.Address.State) : '';
        regionNmCd = !isEmpty(location.Address.PostalCode) ? regionNmCd + ' ' + $.trim(location.Address.PostalCode) : regionNmCd;
        regionNmCd = !isEmpty(regionNmCd) ? regionNmCd + ', ' : '';

        var resLabel = (!isEmpty(location.Address.HouseNumber) ? location.Address.HouseNumber + ' ' : '')
                + (!isEmpty(location.Address.Street) ? location.Address.Street + ', ' : '')
                + (!isEmpty(location.Address.City) ? location.Address.City + ', ' : '')
                + (!isEmpty(location.Address.County) ? location.Address.County + ', ' : '')
                + (!isEmpty(location.Address.Subdistrict) ? location.Address.Subdistrict + ', ' : '')
                + (!isEmpty(location.Address.District) ? location.Address.District + ', ' : '')
                + regionNmCd + countryName;

        if (where == 'start') {
            $('#inputRouteStart').val(resLabel);
            $('#inputRouteStart').data('lat', resLat);
            $('#inputRouteStart').data('lng', resLng);

            if (isEmpty($('#inputRouteEnd').val()) && !isEmpty($('#inputLocationSearch').val())) {
                $('#inputRouteEnd').val($('#inputLocationSearch').val());
                $('#inputRouteEnd').data('lat', $('#inputLocationSearch').data('lat'));
                $('#inputRouteEnd').data('lng', $('#inputLocationSearch').data('lng'));
            } else if (isEmpty($('#inputRouteEnd').val()) && isEmpty($('#inputLocationSearch').val())) {
                addInfoBubble(map, ui, resLat, resLng, resLabel);
            }
        } else {
            $('#inputRouteEnd').val(resLabel);
            $('#inputRouteEnd').data('lat', resLat);
            $('#inputRouteEnd').data('lng', resLng);

            if (isEmpty($('#inputRouteStart').val()) && !isEmpty($('#inputLocationSearch').val())) {
                $('#inputRouteStart').val($('#inputLocationSearch').val());
                $('#inputRouteStart').data('lat', $('#inputLocationSearch').data('lat'));
                $('#inputRouteStart').data('lng', $('#inputLocationSearch').data('lng'));

            } else if (isEmpty($('#inputRouteStart').val()) && isEmpty($('#inputLocationSearch').val())) {
                addInfoBubble(map, ui, resLat, resLng, resLabel);
            }
        }
        $('.search-control').hide();
        $('.route-panel').show();
        $(".btn-place-details-close").hide();
        showRoutingPlaces();
    });
}

/**
 * Search for businesses around a given place or bounding box.
 * @param category          The business category name
 * @param currentLocation   Current location of the given place or current map's bounding box
 * @param page              Current page number (paging)
 * @param limit             Number of records should be returned
 * @param urlPath           An URL path to change current URL without reloading the page
 * @param reset             Use when dragging map
 */
function searchBusinessesAround(category, currentLocation, page, limit, urlPath, reset) {
    removeBubblesOnMap(ui);
    // Updating address bar with new URL without hash or reloading the page
    if (History.enabled) {
        // Getting place details by it's ID
        // Abort previous requests if user is dragging quickly
        if (typeof xhrRequest != "undefined") {
            xhrRequest.abort();
        }
        xhrRequest = $.ajax({
            url: '/place-nearby.xhr',
            type: 'POST',
            beforeSend: function () {
                $('div.loading-spinner').show();
                $('.no-results').hide();
                $("div.place-list-panel").hide();
            },
            complete: function () {
                $('div.loading-spinner').hide();
                $("div.place-list-panel").show();
            },
            data: {
                category: category,
                currentLocation: currentLocation,
                page: page,
                limit: limit
            },
            dataType: 'json',
            success: function (resp) {
                // Refresh new data
                $("div.place-list-panel").html(resp.htmlResponse);
                document.title = resp.title;

                // Store current page data into history
                var pushData = {
                    html: resp.htmlResponse,
                    urlPath: urlPath
                };
                History.pushState(pushData, document.title, urlPath);
                resetVb = reset ? reset : 'yes';
                $('#inputLocationSearch').val(toTitleCase(category));
                if ($('.route-panel').is(':visible')) {
                    $('.search-control').show();
                    $('.route-panel').hide();
                }
            },
            error: function (err) {
                console.error(err.statusText);
            }
        });
    } else { // For browsers that do not support pushstate
        document.location.href = urlPath;
    }
}

/**
 * Toggle show/hide main panel, you can also force it always showing by passing 'show = true'.
 * @param show
 */
function toggleMainPanel(show) {
    if (show) { // force showing
        if ($("div.main-panel").css('left') == '-284px' || $("div.main-panel").css('left') == '-400px') {
            $("div.main-panel").css('left', '0');
            $(this).children('i').removeClass('fa-bars');
            $(this).children('i').addClass('fa-angle-double-left');
        }
    } else { // toggle show/hide
        if ($("div.main-panel").css('left') == '-284px' || $("div.main-panel").css('left') == '-400px') {
            $("div.main-panel").css('left', '0');
            $(this).children('i').removeClass('fa-bars');
            $(this).children('i').addClass('fa-angle-double-left');
        } else {
            if ($("div.main-panel").css('max-width') == '400px') {
                $("div.main-panel").css('left', '-400px');
            }
            if ($("div.main-panel").css('max-width') == '284px') {
                $("div.main-panel").css('left', '-284px');
            }
            $(this).children('i').removeClass('fa-angle-double-left');
            $(this).children('i').addClass('fa-bars');
        }
    }
}

/**
 * Render place details.
 *
 * @param urlPath       Url path to store in history state
 * @param placeObj      Full detailed place object
 * @param isPlace       Detect whether or not it will redirect to place details page
 * @param placeId       Place ID
 * @param placeName     Place name
 * @param placeLat      Place latitude
 * @param placeLng      Place longitude
 * @param input         The input to set name/lat/lng
 */
function renderPlaceDetails(urlPath, placeObj, isPlace, placeId, placeName, placeLat, placeLng, input) {
    // Set name on suggestion textfield only
    input ? input.val(placeObj ? placeObj.name : placeName) : $('#inputLocationSearch').val(placeObj ? placeObj.name : placeName);
    input ? input.data('lat', placeObj ? placeObj.latLng.lat : placeLat) : $('#inputLocationSearch').data('lat', placeObj ? placeObj.latLng.lat : placeLat);
    input ? input.data('lng', placeObj ? placeObj.latLng.lon : placeLng) : $('#inputLocationSearch').data('lng', placeObj ? placeObj.latLng.lon : placeLng);

    if (isPlace && !History.enabled) {
        // For browsers that do not support pushstate
        document.location.href = urlPath ? urlPath : '/';
    }

    // Getting place details by it's ID
    $.ajax({
        url: '/place-details.xhr',
        type: 'POST',
        data: {
            id: placeId,
            place: placeObj ? JSON.stringify(placeObj) : null
        },
        dataType: 'json',
        success: function (resp) {
            showBubbleOnMap = isPlace;
            routeEndType = isPlace;

            // Refresh new data
            $("div.place-details-panel").html(resp.htmlResponse);

            // Updating address bar with new URL without hash or reloading the page
            if (urlPath && History.enabled) {
                document.title = resp.title;
                // Store current page data into history
                var pushData = {
                    html: resp.htmlResponse,
                    placeName: resp.data.name,
                    destination: resp.data.name,
                    destinationLat: resp.data.latLng.lat,
                    destinationLng: resp.data.latLng.lon,
                    urlPath: urlPath
                };
                History.pushState(pushData, document.title, urlPath);
            }
            $("div.place-list-panel-inner").hide();
            $("div.place-details-panel").fadeIn('fast');
            if (!isPlace) {
                $(".btn-place-details-close").fadeIn('fast');
            } else {
                if ($('.route-panel').is(":visible") && !isEmpty($('#inputRouteStart').val())) {
                    showRoutingPlaces(input);
                }
            }
            toggleMainPanel(true);
        },
        error: function (err) {
            console.error(err);
        }
    });
}

/****************************/
/** END functions **/
/****************************/

$(document).ready(function (e) {
    // Add event listener, right click (desktop) or long press (tablet/mobile)
    map.addEventListener('contextmenu', function (evt) {
        // we don't do anything if target is different than the map.
        if (evt.target !== map) {
            return;
        }

        // "contextmenu" event might be triggered not only by a pointer,
        // but a keyboard button as well. That's why ContextMenuEvent
        // doesn't have a "currentPointer" property.
        // Instead it has "viewportX" and "viewportY" properties
        // for the associates position.

        // Get geo coordinates from the screen coordinates.
        var coord = map.screenToGeo(evt.viewportX, evt.viewportY);

        // In order to add menu items, you have to push them to the "items"
        // property of the event object. That has to be done synchronously, otherwise
        // the ui component will not contain them. However you can change the menu entry
        // text asynchronously.
        evt.items.push(
                // Create an item, that enable user to set as starting point.
                new H.util.ContextItem({
                    label: 'Directions from here',
                    callback: setWaypoint.bind(map, coord, 'start')
                }),
                // Create an item, that enable user to set as destination.
                new H.util.ContextItem({
                    label: 'Directions to here',
                    callback: setWaypoint.bind(map, coord, 'end')
                })
                );
    });

    // Add event listener, dragend to trigger search for businesses around maps bounding box
    map.addEventListener('dragend', function (evt) {
        clearTimeout(dragingTimer);
        dragingTimer = setTimeout(doneDragging, doneDragingInterval);

        function doneDragging() {
            if (window.location.pathname == '/search/nearby' && $('.place-details-panel-inner').length == 0) {
                var currentLocation = evt.target.getViewBounds().getTopLeft().lat + ','
                        + evt.target.getViewBounds().getTopLeft().lng + ','
                        + evt.target.getViewBounds().getBottomRight().lat + ','
                        + evt.target.getViewBounds().getBottomRight().lng;
                var category = getURLParameter(window.location.href, 'category');
                var urlPath = window.location.pathname + '?category=' + category + '&currentLocation=' + currentLocation;
                searchBusinessesAround(category, currentLocation, 1, 10, urlPath, 'no');
            }
        }
    });

    // Managing the Position of UI Controls
//    var mapSettings = ui.getControl('mapsettings');
//    var zoom = ui.getControl('zoom');
//    var scalebar = ui.getControl('scalebar');
//    var panorama = ui.getControl('panorama');

 //   panorama.setAlignment('right-middle');
//    mapSettings.setAlignment('bottom-right');
//    scalebar.setAlignment('bottom-right');

    // Now use the map as required...
    // Run this at homepage to get user's current location
    if (window.location.pathname == '/') {
        addMarkerToMap(map);
    }

    // Enable traffic condition info
//    enableTrafficInfo(map);

    // Init History object
    var History = window.History;
    if (History.enabled) {
        State = History.getState();
        var html;
        // Set initial state to first page that was loaded
        if (window.location.pathname == '/search/nearby' && window.location.search != "") {
            html = $('.place-list-panel').html();
        } else if (window.location.pathname.indexOf() == '/place/' != -1) {
            html = $('.place-details-panel').html();
        }
        var initData = {
            html: html,
            placeName: $("#inputLocationSearch").val(),
            destination: $("#inputRouteEnd").val(),
            destinationLat: $("#inputRouteEnd").data('lat'),
            destinationLng: $("#inputRouteEnd").data('lng'),
            urlPath: window.location.pathname
        };
        History.pushState(initData, document.title, State.urlPath);
    }

    // Set data on window's statechange (back/forward button)
    History.Adapter.bind(window, 'statechange', function () {
        var State = History.getState();
        if (window.location.pathname == '/search/nearby' && window.location.search != "") {
            $(".place-list-panel").html(State.data.html);
            resetVb = 'yes'; // reset when back/forward
        } else if (window.location.pathname.indexOf('/place/') != -1) {
            $(".place-details-panel").html(State.data.html);
            $("div.place-list-panel-inner").hide();
            $("div.place-details-panel").fadeIn('fast');
        }
        $("#inputLocationSearch").val(State.data.placeName);
        $("#inputRouteEnd").val(State.data.destination);
        $("#inputRouteEnd").data('lat', State.data.destinationLat);
        $("#inputRouteEnd").data('lng', State.data.destinationLng);
    });

    // Enable auto complete suggestions on starting point search
    $('#inputRouteStart').autocomplete({
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
        //    if (isEmpty($('#inputRouteEnd').val()) || isEmpty($('#inputRouteEnd').data('lat')) || isEmpty($('#inputRouteEnd').data('lng'))) {
			if (false) {
                $('#inputRouteEnd').focus();
                $('#inputRouteEnd').select();
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
                    showRoutingPlaces(input);
                });
            }
        },
        beforeRender: function (container) {
            $.each(container.children(), function (index, value) {
                $(this).attr('title', value.innerText);
            });
        }
    });
	
	$('#inputRouteEnd').autocomplete({
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
                    showRoutingPlaces(input);
                });
            }
        },
        beforeRender: function (container) {
            $.each(container.children(), function (index, value) {
                $(this).attr('title', value.innerText);
            });
        }
    });

    // Enable auto complete suggestions on place search & destination direction


    // Try to fix "onSelect not working when tapping on touchpad" issue
    $(document).on('mousedown', '.autocomplete-suggestion', e => {
        $(e.target).click();
    });

    // Show place's details when user clicks on bubble title
    $(document).on('click', '.H_ib_custom_title', function () {
        showPlaceDetails(this);
    });

    // Show place's details then start getting directions right away when user clicks on bubble direction icon
    $(document).on('click', '.marker-info .H_ib_custom_direction, #btnDirections', function () {
        abortSuggestions();
        $('.search-control').hide();
        $('.route-panel').show();
        $(".btn-place-details-close").hide();

        if (!isEmpty($('#inputRouteStart').val()) || !isEmpty($('#inputRouteEnd').val())) {
            if (isEmpty($('#inputRouteStart').val())) {
                $('#inputRouteStart').focus();
            } else {
                $('#inputRouteEnd').focus();
            }
        } else {
            resetRouteStart(true);
            $('#inputRouteEnd').val($('#inputLocationSearch').val());
            $('#inputRouteEnd').data('lat', $('#inputLocationSearch').data('lat'));
            $('#inputRouteEnd').data('lng', $('#inputLocationSearch').data('lng'));
        }
    });

    // Close directions panel and show search place panel
    $('.btn-directions-close').click(function (e) {
        var reset = false;
        if ($('.instructions-details .route-error').is(':visible') && routeEndType) {
            History.back();
            History.back();
        } else if (!isEmpty(getObjectById('mPolyline'))) {
            removeExistingRoutes();
            removeObjectById("customMarker");
            reset = true;
        } else if (isEmpty(getObjectById("groupDOMMarker")) && ui.getBubbles().length == 0) {
            reset = true;
        }

        if (reset) {
            if (!isEmpty(placeLabel)) {
                addInfoBubble(map, ui, initLat, initLng, placeLabel, placeThumb);
                // Recalculate center view on map
                map.setCenter({lat: initLat, lng: initLng - 0.005}, true);
                map.setZoom(zoomStreet);
            }
            resetRouteStart();
            resetRouteEnd();
        }

        $('.search-control').show();
        $('.route-panel').hide();
        $('#routeInstructionsPanel').hide();
    });

    // Routing when users click on Get Directions buttons
    $(document).on('click', '.directions-cta .btn-directions-cta, div.btn-group-toggle', function () {
		console.log("click");  
        showRoutingPlaces();
    });

    // Reverse start point - destination point handling
    $('#btnRouteReverse').click(function () {
        var startAddr = $('#inputRouteStart').val();
        var startLat = $('#inputRouteStart').data('lat');
        var startLng = $('#inputRouteStart').data('lng');
        $('#inputRouteStart').val($('#inputRouteEnd').val());
        $('#inputRouteStart').data('lat', $('#inputRouteEnd').data('lat'));
        $('#inputRouteStart').data('lng', $('#inputRouteEnd').data('lng'));
        $('#inputRouteEnd').val(startAddr);
        $('#inputRouteEnd').data('lat', startLat);
        $('#inputRouteEnd').data('lng', startLng);
        showRoutingPlaces();
    });

    // Toggle show/hide main panel
   // $('button.hide-main-panel').click(toggleMainPanel);
	
	$('button.hide-main-panel').on('click', function (e) {
		var data_show = $(this).data('show');
		if (data_show === 0 || data_show === '0') {
			if ($("div.main-panel").css('max-width') == '400px') {
				$("div.main-panel").css('left', '-400px');
			}
			if ($("div.main-panel").css('max-width') == '284px') {
				$("div.main-panel").css('left', '-284px');
			}
			$(this).children('i').removeClass('fa-angle-double-left');
			$(this).children('i').addClass('fa-bars');
			$(this).data('show', '1');
		} else {
			$("div.main-panel").css('left', '0');
			$(this).children('i').removeClass('fa-bars');
			$(this).children('i').addClass('fa-angle-double-left');
			$(this).data('show', '0');
		}
	});

    // Install lightbox for place's photos (detailed place)
    if ($('div.place-details-panel-inner-photo a').length != 0) {
        $('div.place-details-panel-inner-photo a').simpleLightbox({
            'animationSpeed': 200
        });
    }

    // Search places around the current map view

});