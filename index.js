/*
 * ElementNetwork API
 * Copyright (c) 2017-18 ElementNetwork
 * License: Apache 2.0
 */

/* global $ */ /* global projectId */

// Don't use this as the editor; use it only for interacting with it
// Browserify your code and add it to the end of the main file

function enableShare(postURL, callback) {
    if (!postURL) return;
    $('#share-menu').style({
        cursor: 'default'
    });
    $('#share-menu').click((data, textStatus, jqXHR) => {
        if (callback) callback(data, textStatus, jqXHR);
    });
}

function setPlayer(url) {
    $('#player-view').click(function() {
        window.location = `${url}#${projectId}`;
    });
}

module.exports = { enableShare, setPlayer };