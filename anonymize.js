
//http://hacks.mozilla.org/2012/05/dom-mutationobserver-reacting-to-dom-changes-without-killing-browser-performance/
var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

var icon = chrome.extension.getURL('icon.png');

var observer = new MutationObserver(function(mutations){
	// DOM変化した
	mutations.forEach(function(mutation){
		if(mutation.type == 'childList'){
			anonymize();
		}
	});
});

observer.observe(document.querySelector('.stream-items'), {
  	attributes: false, 
  	childList: true,  // 要素の追加で発動したい
  	characterData: false
  });

// 名は体を表さない
function anonymize(){
	// avatarなclass属性がついたimg要素のsrc属性をiconに差し替える
	$('img.avatar').attr('src', icon);
}

anonymize();
