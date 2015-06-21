////
// Loads venues from JSON file and then renders them.
//
function requestVenueJSON() {
    $.getJSON( "/venues.json", function(data) {
        venues = [];
        $.each(data.stations, function(key, station) {
            venues.push(station);
        });

        renderHomepageVenueBanners(venues);
    });
}

function renderHomepageVenueBanners(venues) {
    $.each(venues, function(index, venue) {
        var venueHoursForToday = venue.hoursOfOperation[(new Date()).getDay()]
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
            recommendations_title: venue.name + " recommends...",
            recommendation_1_name: venue.recommendations[0].name,
            recommendation_1_url: venue.recommendations[0].url,
            recommendation_1_thumbnail: venue.recommendations[0].thumbnail,
            main_banner_bg_img_attr_val: "background-image:url('" + venue.images.venuePageLargeBanner + "')",
            lower_banner_bg_img_attr_val:  venue.images.venuePageRightColumnBanner
        }
        $('#venue-pages').loadTemplate("templates/venue_page.html", dataForVenuePage);
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