var refreshButton = document.querySelector('.refresh');
var refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click');

var close1Button = document.querySelector('.close1');
var close1ClickStream = Rx.Observable.fromEvent(close1Button, 'click');
var close2Button = document.querySelector('.close2');
var close2ClickStream = Rx.Observable.fromEvent(close2Button, 'click');
var close3Button = document.querySelector('.close3');
var close3ClickStream = Rx.Observable.fromEvent(close3Button, 'click');

var requestStream = refreshClickStream
    .map(function() {
        var randomOffset = Math.floor(Math.random()*500);
        return 'https://api.github.com/users?since=' + randomOffset;
    })
    .startWith('https://api.github.com/users');

var responseStream = requestStream
    .flatMap(function(requestUrl) {
        return Rx.Observable.fromPromise($.ajax({
            dataType: "json",
            url: requestUrl,
            headers: {
                "Authorization": "Basic " + btoa("magelle" + ":" + "159630fdcd6ab45785d2e2e71c86c58c356c932a")
            }
        }));
    });


var suggestion1Stream = close1ClickStream.startWith('this is a virtual click')
    .combineLatest(responseStream,
        function(click, listUsers) {
            return listUsers[Math.floor(Math.random()*listUsers.length)];
        }
    ).merge(
        refreshClickStream.map(function(){ return null; })
    ).startWith(null);

var suggestion2Stream = close2ClickStream.startWith('this is a virtual click')
    .combineLatest(responseStream,
        function(click, listUsers) {
            return listUsers[Math.floor(Math.random()*listUsers.length)];
        }
    ).merge(
        refreshClickStream.map(function(){ return null; })
    ).startWith(null);

var suggestion3Stream = close3ClickStream.startWith('this is a virtual click')
    .combineLatest(responseStream,
        function(click, listUsers) {
            return listUsers[Math.floor(Math.random()*listUsers.length)];
        }
    ).merge(
        refreshClickStream.map(function(){ return null; })
    ).startWith(null);

suggestion1Stream.subscribe(function(suggestion) {
    renderSuggestion(suggestion, '.suggestion1');
});

suggestion2Stream.subscribe(function(suggestion) {
    renderSuggestion(suggestion, '.suggestion2');
});

suggestion3Stream.subscribe(function(suggestion) {
    renderSuggestion(suggestion, '.suggestion3');
});

// Rendering

function renderSuggestion(suggestedUser, selector) {
    if (suggestedUser == null) {
        hide(selector);
    }
    else {
        show(selector);
        var suggestionEl = document.querySelector(selector);
        suggestionEl.style.visibility = 'visible';
        var usernameEl = suggestionEl.querySelector('.username');
        usernameEl.href = suggestedUser.html_url;
        usernameEl.textContent = suggestedUser.login;
        var imgEl = suggestionEl.querySelector('img');
        imgEl.src = "";
        imgEl.src = suggestedUser.avatar_url;
    }
}

function hide(selector) {
    document.querySelector(selector).style.visibility = 'hidden';
}

function show(selector) {
    document.querySelector(selector).style.visibility = 'visible';
}