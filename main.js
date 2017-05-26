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