$(document).ready(function() {

	var volume = 100; //Default volume setting.
	var tempVolume = volume; //Temporary volume, stores volume value for mute/unmute.
	var playState = false // False for pause/stop, True for playing
	var $audioEl = document.getElementById('radio-player');

	volumeUpdate(); //updates volume on start

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

	//RADIO CONTROLS
	$("#radio-play").click(playPause);
	$("#radio-volume-icon").click(audioMute);

	function playPause() {
		playState = !playState; //toggles between true/false state

		if (playState) {
			$("#radio-play").removeClass().addClass("icon-pause");
			$audioPlayer.play();
		}
		else {
			$("#radio-play").removeClass().addClass("icon-play-arrow");
			$audioPlayer.pause();
		}
	}

	/*	THIS IS FOR HOVERING ABOVE SPEAKER ICON

		$("#radio-volume-icon").mouseover(function(){
			$("#radio-volume").addClass("volume-extend");
		});
		$("#radio").mouseleave(function(){
			$("#radio-volume").removeClass("volume-extend");
		});
	*/

	function audioMute() {
		if (volume == 0) volume = tempVolume; //restores previous volume setting
		else {
			tempVolume = volume; //store actual vol. setting
			volume = 0; //mutes volume
		}
		volumeUpdate();
	}

	function volumeUpdate() {
		$(".volume-percent").css({"width":volume+"%"});
		$(".volume-handler").css({"left":(volume * 0.85 + 4)+"%"});
		volumeIconUpdate();
	}

	function volumeIconUpdate() {
		//Couldn't find any good switch/case solution, so I'm using ifs :-/

		if (volume == 0) {
			if ($("#radio-volume-icon").hasClass("icon-volume-mute")) return; //to avoid necessary adding/removing classes
			$("#radio-volume-icon").removeClass().addClass("icon-volume-mute");
		}
		if (volume > 0 && volume < 33) {
			if ($("#radio-volume-icon").hasClass("icon-volume-low")) return;
			$("#radio-volume-icon").removeClass().addClass("icon-volume-low");
		}
		if (volume > 33 && volume < 66) {
			if ($("#radio-volume-icon").hasClass("icon-volume-medium")) return;
			$("#radio-volume-icon").removeClass().addClass("icon-volume-medium");
		}
		if (volume > 66) {
			if ($("#radio-volume-icon").hasClass("icon-volume-high")) return;
			$("#radio-volume-icon").removeClass().addClass("icon-volume-high");
		}
	}

	function playVenueRadioStation(venueId) {
		var venue = getVenueById(venueId);
		$('#radio-station-name').text(venue.name);
		$('#thumnail-venue-wrapper img').attr('src', venue.images.venueThumbnail);
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
