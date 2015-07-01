$(document).ready(function() {
	var audioIsPlaying = false // False for pause/stop, True for playing
	var $audioEl = document.getElementById('radio-player');
	var tempVolume = null;
	var activeVenue = null;

	// SHOW HOMEPAGE, HIDE VENUE PAGE
	$('#venue-pages').on('click', '.venue-top-bar', function(e){
		e.preventDefault();
		$("#main-page-wrapper").removeClass("scale-down-wrapper");
		$(this).parent().removeClass("venue-show").bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
			$(this).hide().unbind(); // HIDE and unbind previously binded transition-end callback
		});
		
	});

	// HOMEPAGE VENUE BANNER PLAY BUTTON CLICK
	$("#stations").on('click', '.play-station-btn', function(e){
		e.preventDefault();
		var station = $(this).attr("href"); //Get station number
		showVenuePage(station); //shows venue page
		$("#radio").removeClass("radio-hide"); //Show radio
		$("body").css('margin-bottom', '50px');
		$radioPlayButtonEl = $('#radio-play');
		if($radioPlayButtonEl.hasClass('icon-play-arrow')){
			$radioPlayButtonEl.removeClass('icon-play-arrow').addClass('icon-pause')
		}
		playVenueRadioStation(station.substring(1));
	});

	// LISTEN FOR VOLUME SLIDER
	$('#volume-slider').on('input', function(e){
		newVolume = $(e.currentTarget).val();
		$audioEl.volume = newVolume;
		$muteIconEl = $("#radio-volume-icon");
		if(newVolume == 0) {
			$muteIconEl.removeClass('icon-volume-high').addClass('icon-volume-mute');
			audioIsPlaying = false;
		} else if (!audioIsPlaying && newVolume > 0) {
			audioIsPlaying = true
			$muteIconEl.removeClass('icon-volume-mute').addClass('icon-volume-high');
		}
	});

	// AUDIO CONTROLS
	$("#radio-play").click(playPause);
	$("#radio-volume-icon").click(handleMuteIconClick);
	$('.icon-fast-rewind').click(handleRewindClick);
	$('.icon-fast-forward').click(handleFastForwardClick);

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

	function handleFastForwardClick() {
		var nextStationId;
		if (window.venues.length == 1) {
			alert('Sorry, no other stations to play.');
			return;
		} else if (activeVenue.id == window.venues.length - 1) {
			nextStationId = 0;
		} else {
			nextStationId = activeVenue.id + 1
		}
		$("#radio-play").removeClass().addClass("icon-pause");
		playVenueRadioStation(nextStationId);
		$('.venue-page-wrapper').removeClass('venue-show').css('display', 'none')
		$('#' + nextStationId).addClass('venue-show').css('display', 'inline')
	}

	function handleRewindClick() {
		var nextStationId;
		if (window.venues.length == 1) {
			alert('Sorry, no other stations to play.');
			return;
		} else if (activeVenue.id == 0) {
			nextStationId = window.venues.length - 1;
		} else {
			nextStationId = activeVenue.id - 1
		}
		$("#radio-play").removeClass().addClass("icon-pause");
		playVenueRadioStation(nextStationId)

		playVenueRadioStation(nextStationId);
		$('.venue-page-wrapper').removeClass('venue-show').css('display', 'none')
		$('#' + nextStationId).addClass('venue-show').css('display', 'inline')
	}

	function handleMuteIconClick(e) {
		$volumeSlider =  $('#volume-slider');
		$muteIconEl = $(e.currentTarget);
		if ($muteIconEl.hasClass('icon-volume-mute')) {
			$muteIconEl.removeClass('icon-volume-mute').addClass('icon-volume-high');
			$audioEl.play()
			$volumeSlider.val(tempVolume);
		} else {
			$muteIconEl.removeClass('icon-volume-high').addClass('icon-volume-mute');
			tempVolume = $volumeSlider.val();
			$volumeSlider.val(0);
			$audioEl.pause();
		}
	}

	function playVenueRadioStation(venueId) {
		activeVenue = getVenueById(venueId);
		$('#radio-station-name').text(activeVenue.name);
		$('#thumnail-venue-wrapper img').attr('src', activeVenue.images.venueThumbnail);
		$('#radio-player').attr('src', activeVenue.stationUrl);
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
