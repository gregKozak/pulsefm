////
// Loads venues from JSON file and then renders them.
//
function requestVenueJSON() {
    $.getJSON( "/venues.json", function(data) {
        window.venues = [];
        $.each(data.stations, function(key, station) {
            station.id = key;
            window.venues.push(station);
        });

        renderHomepageVenueBanners(venues);
    });
}

function renderHomepageVenueBanners(venues) {
    $.each(venues, function(index, venue) {
        var venueHoursForToday = venue.hoursOfOperation[(new Date()).getDay()];
        for(var key in venueHoursForToday) {
            if(venueHoursForToday.hasOwnProperty(key)) {
                venueHoursForToday = venueHoursForToday[key];
                break;
            }
        }

        var dataForHomepage = {
            name:            venue.name,
            location:        venue.location,
            genres:          venue.genres,
            venue_el_id:     "#" + venue.id,
            live_banner_css_class: venueIsOpen(venueHoursForToday) ? "live-tag" : "",
            bg_img_attr_val: "background-image:url('" + venue.images.homepageVenueBanner + "')"
        }
        $('#stations').loadTemplate("templates/homepage_venue_banner.html", dataForHomepage, { prepend: true });

        var dataForVenuePage = {
            venue_el_id: venue.id,
            name:        venue.name,
            location:    venue.location,
            genres:      venue.genres,
            description: venue.description,
            main_banner_bg_img_attr_val: "background-image:url('" + venue.images.venuePageLargeBanner + "')",
            lower_banner_bg_img_attr_val:  venue.images.venuePageRightColumnBanner,
            recommendations_title: venue.name + " recommends...",
            recommendation_1_name: venue.recommendations[0].name,
            recommendation_1_url: venue.recommendations[0].url,
            recommendation_1_thumbnail: venue.recommendations[0].thumbnail,
            recommendation_2_name: venue.recommendations[1].name,
            recommendation_2_url: venue.recommendations[1].url,
            recommendation_2_thumbnail: venue.recommendations[1].thumbnail,
            recommendation_3_name: venue.recommendations[2].name,
            recommendation_3_url: venue.recommendations[2].url,
            recommendation_3_thumbnail: venue.recommendations[2].thumbnail,
            recommendation_4_name: venue.recommendations[3].name,
            recommendation_4_url: venue.recommendations[3].url,
            recommendation_4_thumbnail: venue.recommendations[3].thumbnail
        }
        $('#venue-pages').loadTemplate("templates/venue_page.html", dataForVenuePage, { prepend: true });
    });
}

function venueIsOpen(hoursOfOperation) {
    var openTime = hoursOfOperation[0];
    var closeTime = hoursOfOperation[1];

    var d = new Date()
    var currMilitaryTime =  "" +  d.getHours() + d.getMinutes();
    currMilitaryTime = parseInt(currMilitaryTime);

    var isAfterOpenTime = currMilitaryTime > openTime ? true : false;
    var isBeforeCloseTime = currMilitaryTime < closeTime ? true : false;

    var isOpen = isAfterOpenTime && isBeforeCloseTime;

    return isOpen;
}

function getVenueById(id) {
    venue = null;
    $.each(window.venues, function(index, v) {
        if(v.id == parseInt(id)) {
            venue = v;
        }
    })

    return venue;
}