/*
	icon: .avatar
	user name: .username
	screen name: .fullname
*/

var icon = chrome.extension.getURL('icon.png');

//http://hacks.mozilla.org/2012/05/dom-mutationobserver-reacting-to-dom-changes-without-killing-browser-performance/
var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

var observer = new MutationObserver(function(mutations){
	// DOM変化した
	mutations.forEach(function(mutation){
		console.log('observe');
		if(mutation.type == 'childList' || true){
			anonymize();
		}
	});
});

observer.observe(document.querySelector('.stream-items'), {
	attributes: true, 
  	childList: true,
  	characterData: true
  });

var anonymize = function(){
	console.log('anonymize');
	// avatarなclass属性がついたimg要素のsrc属性をiconに差し替える
	$('img.avatar').attr('src', icon);
}

// 無駄が多いけど
var intervals = [0, 1000, 3000]
$('body').live('mouseup', function(){
	_.each(intervals, function(interval){
		_.delay(function(){
			console.log('live: ' + interval);
			anonymize();
		}, interval);
	});
});

anonymize();
