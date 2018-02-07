/*
 * ElementNetwork API
 * Copyright (c) 2017-18 ElementNetwork
 * License: Apache 2.0
 */

// Don't use this as the editor; use it only for interacting with it
// Browserify your code and add it to the end of the main file

function enableShare(postURL, button, callback) {
    if (!postURL || !button) return;
    button.style({
        cursor: 'default'
    });
    button.click((data, textStatus, jqXHR) => {
        if (callback) callback(data, textStatus, jqXHR);
    });
}

function setPlayer(url, projectId, button) {
    button.click(function() {
        window.location = `${url}#${projectId}`;
    });
}

module.exports = { enableShare, setPlayer };
