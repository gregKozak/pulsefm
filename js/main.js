$(document).ready(function() {

	var volume = 100; //Default volume setting.
	var tempVolume = volume; //Temporary volume, stores volume value for mute/unmute.
	var audioIsPlaying = false // False for pause/stop, True for playing
	var $audioEl = document.getElementById('radio-player');

	//HIDE VENUE PAGE
	$('#venue-pages').on('click', '.venue-top-bar', function(e){
		e.preventDefault();
		$("#main-page-wrapper").removeClass("scale-down-wrapper");
		$(this).parent().removeClass("venue-show").bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
			$(this).hide().unbind(); // HIDE and unbind previously binded transition-end callback
		});
		
	});

	//START STREAMING BUTTON CONTROL
	$("#stations").on('click', '.play-station-btn', function(e){
		e.preventDefault();
		var station = $(this).attr("href"); //Get station number
		showVenuePage(station); //shows venue page
		$("#radio").removeClass("radio-hide"); //Show radio

		playVenueRadioStation(station.substring(1));
	});

	// LISTEN FOR VOLUME SLIDER
	$('#volume-slider').on('input', function(e){
		newVolume = $(e.currentTarget).val();
		$audioEl.volume = newVolume;
		volume = newVolume;
		muteIconUpdate();
	});

	// RADIO CONTROLS
	$("#radio-play").click(playPause);
	$("#radio-volume-icon").click(audioMute);

	function playPause() {
		audioIsPlaying = !audioIsPlaying; //toggles between true/false state

		if (!audioIsPlaying) {
			$("#radio-play").removeClass().addClass("icon-pause");
			$audioEl.play();
		}
		else {
			$("#radio-play").removeClass().addClass("icon-play-arrow");
			$audioEl.pause();
		}
	}

	function audioMute() {
		if (volume == 0) volume = tempVolume; //restores previous volume setting
		else {
			tempVolume = volume; //store actual vol. setting
			volume = 0; //mutes volume
		}

		muteIconUpdate();
	}

	function muteIconUpdate() {
		if (volume == 0) {
			$("#radio-volume-icon").removeClass().addClass("icon-volume-mute");
		} else {
			$("#radio-volume-icon").removeClass().addClass("icon-volume-high");
		}
	}

	function playVenueRadioStation(venueId) {
		var venue = getVenueById(venueId);
		$('#radio-station-name').text(venue.name);
		$('#thumnail-venue-wrapper img').attr('src', venue.images.venueThumbnail);
		$('#radio-player').attr('src', venue.stationUrl);
		$audioEl.pause();
		$audioEl.play();
	}

	//VENUE DETAILS ANIMATION
	function showVenuePage(whichStation) {
		$(whichStation).show(0,function(){
			$(this).addClass("venue-show");  //Show venue info page
		})
		$("#main-page-wrapper").addClass("scale-down-wrapper"); //Animate main page scale down
	}

	requestVenueJSON()
});
