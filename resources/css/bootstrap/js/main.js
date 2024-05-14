
function isGuest(){
	return $('.navbar .login-link').length ? true : false;
}

function forceAuth(){
	if (isGuest()){
		$('.navbar .login-link').click();
		return true;
	}
	return false;
}

function isFullscreen(){
	return $('body.fullscreen').length ? true : false;
}

Placeholder = {
	totalItems: 10,
	minItems: 5,
	items: [],
	usedItems: [],
	load: function(num,callback){
		if (Placeholder.totalItems > 0){
			var post_vars = {
				num: num == undefined ? Placeholder.totalItems : num,
				usedItems: Placeholder.usedItems
			}

			$.post('/comment/placeholder', post_vars, function( data ) {
				if (data.status && data.data.length > 0){
					for(i=0;i<data.data.length;i++){
						Placeholder.items.push([
							data.data[i].id,data.data[i].text
						]);
						Placeholder.usedItems.push(data.data[i].id);
					}
					if (callback != undefined){
						callback();
					}
				} else{
					Placeholder.totalItems = 0; //reset to avoid useless load requests
				}
			}, "json");
		}
	},
	get: function(){
		if (Placeholder.items.length){
			var item = Placeholder.items.shift();
			if (Placeholder.items.length <= Placeholder.minItems){
				Placeholder.load(Placeholder.totalItems - Placeholder.minItems);
			}
			return item[1];
		} else{
			return '';
		}
	}	
}

function modalAlert(title,message){
	$('#modal-alert h3').html(title);
	$('#modal-alert .modal-body').html(message);
	$('#modal-alert').modal('show');
	return false;
}

function modalConfirm(title,message,confirmCaption,callback){
	$('#modal-confirm h3').html(title);
	$('#modal-confirm .modal-body').html(message);
	$('#modal-confirm .btn-confirm')
		.html(confirmCaption)
		.on('click', function(e) {
			callback();				
			$('#modal-confirm .btn-cancel').click();
	});
	$('#modal-confirm').modal('show');

	return false;
}

function getScript (src, callback) {
	var headElm = document.head || document.getElementsByTagName('head')[0];
	var script = document.createElement("script");
	var once = true;
	script.async = "async";
	script.type = "text/javascript";
	script.charset = "UTF-8";
	script.src = src;
	script.onload = script.onreadystatechange = function () {
		if (once && (!script.readyState || /loaded|complete/.test(script.readyState))) {
			once = false;
			callback();
			script.onload = script.onreadystatechange = null;
		}
	};

	headElm.appendChild(script);
}

