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
        dataForHomepage = {
            name:            venue.name,
            location:        venue.location,
            genres:          venue.genres,
            venue_el_id:     "#" + venue.id,
            bg_img_attr_val: "background-image:url('" + venue.images.homepageVenueBanner + "')"
        }
        $('#stations').loadTemplate("templates/homepage_venue_banner.html", dataForHomepage, { prepend: true });

        dataForVenuePage = {
            venue_el_id: venue.id,
            name:        venue.name,
            location:    venue.location,
            genres:      venue.genres,
            description: venue.description,
            main_banner_bg_img_attr_val: "background-image:url('" + venue.images.venuePageLargeBanner + "')",
            lower_banner_bg_img_attr_val:  "background-image:url('" + venue.images.venuePageRightColumnBanner + "')"
        }
        $('#venue-pages').loadTemplate("templates/venue_page.html", dataForVenuePage);
    });
}
