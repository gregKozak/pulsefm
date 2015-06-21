////
// Loads list of venues from JSON file
// and then renders them.
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
        data = {
            name:            venue.name,
            location:        venue.location,
            genres:          venue.genres,
            venue_el_id:     "#" + venue.id,
            bg_img_attr_val: "background-image:url('" + venue.images.homepageVenueBanner + "')"
        }

        $('#stations').loadTemplate("templates/homepage_venue_banner.html", data, { prepend: true });

        data = {
            venue_el_id: venue.id
        }
        $('#venue-pages').loadTemplate("templates/venue_page.html", data)
    });
}
