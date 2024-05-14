
function videoAd(config){
	this.config = {
		AD_TIMEOUT: 180,
		AD_LIMIT: 3,
		AD_FIRST: 2,
		AD_FULLSCREEN: false,
	}

	for(name in config){
		var value = config[name];
		this.config[name] = value;
	}

	if(typeof aipPlayer != "undefined") {
		this.adplayer = new aipPlayer({
			AD_FULLSCREEN: false,
			AD_CENTERPLAYER: false,
			LOADING_TEXT: 'loading advertisement',
			PREROLL_ELEM: document.getElementById('preroll'),
			AIP_COMPLETE: function ()  {
				var iframe = $('#game-embed-iframe');
				iframe.attr('src',iframe.data('src'));
				$('.game-embed-controls').show();
			},
			AIP_REMOVE: function ()  {
				// Here it's save to remove the PREROLL_ELEM from the page
				// But it's not necessary
			}
		});
	} else {
		// Failed to load the adslib ads are probably blocked
		// don't call the startPreRoll function.
		// it will result in an error.
	}
}

videoAd.prototype.validate = function(){
	if(this.adplayer != undefined /*&& isGuest()*/){
		var timeout = false;
		var limit = false;
		var views = Cookies.get('gameViews');
		views = (views == undefined || isNaN(views)) ? 0 : parseInt(views);
		views -= this.config.AD_FIRST;

		var ts = Cookies.get('videoAdTs');
		if (ts == undefined){
			ts = 0;
		}

		if (Date.now() - ts >= this.config.AD_TIMEOUT*1000){
			var timeout = true;
		}
		if (views >= 0 && !(views % this.config.AD_LIMIT)){
			var limit = true;
		}
		return timeout && limit;

	}

	return false;
}

videoAd.prototype.prepare = function(){
	this.adplayer.aipConfig.AD_FULLSCREEN = isFullscreen();
	this.adplayer.aipConfig.AD_WIDTH = $('.game-embed').outerWidth();
	this.adplayer.aipConfig.AD_HEIGHT = $('.game-embed').outerHeight();

}

videoAd.prototype.start = function(){
	this.prepare();
	Cookies.set('videoAdTs', Date.now());

	$('#game-embed-iframe').attr('src','');
	$('.game-embed-controls').hide();

	this.adplayer.startPreRoll();
}


