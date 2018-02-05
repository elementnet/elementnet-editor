/*
 * ElementNetwork Modal
 * Copyright (c) 2017-18 ElementNetwork
 * License: Apache 2.0
 */

/* global $ */

function idMethod() {
    return window.location.href.substring(
        window.location.href.lastIndexOf('#') + 1
    );
}
var projectId = idMethod();
if (projectId === window.location.href || projectId === '') {
    projectId = localStorage.length;
    window.location.replace('#' + projectId);
    localStorage[projectId] = { name: 'untitled' };
} else {
    if (!localStorage[projectId]) {
        window.location.replace('#');
        window.location.reload();
    }
}

var fileMenu = $('#file-options')
    .attr('style', 'list-style-type:none')
    .text('')
    .hide();
var editMenu = $('#edit-options')
    .attr('style', 'list-style-type:none')
    .text('')
    .hide();
var shareMenu = $('#share-options')
    .attr('style', 'list-style-type:none')
    .text('')
    .hide();
$(fileMenu).html(
    '<a class=\'menubtn\' href=javascript:void(0)><li class=\'menuitem\'>New...</li></a><a class=\'menubtn\' href=javascript:void(0)><li class=\'menuitem\' style=\'border-bottom: 1px solid black;border-collapse:collapse;cursor:not-allowed;color:grey\'>Save</li></a><a class=\'menubtn\' href=javascript:void(0)><li class=\'menuitem\' style=\'border-top: 1px solid black;border-collapse:collapse\'>Download</li></a><a class=\'menubtn\' href=javascript:void(0)><li class=\'menuitem\' style=\'border-bottom: 1px solid black;border-collapse:collapse\'>Upload</li></a><a class=\'menubtn\' href=javascript:void(0)><li class=\'menuitem\' style=\'border-top: 1px solid black;border-collapse:collapse\'>Compile...</li></a>'
);
$(editMenu).html(
    '<a class=\'menubtn\' href=\'javascript:void(0)\'><li class=\'menuitem\' id=\'toggle-update-edit\'>Disable auto-update...</li></a><a class=\'menubtn\' href=\'javascript:void(0)\'><li class=\'menuitem\' id=\'update-edit\' style=\'cursor:not-allowed;color:grey\'>Update</li></a>'
);
$('.menuitem')
    .hover(
        function(event) {
            $(event.currentTarget).css({
                'background-color': 'LightGrey'
            });
        },
        function(event) {
            $(event.currentTarget).css({
                'background-color': 'White'
            });
        }
    )
    .css({
        'background-color': 'White'
    });
$('.menuitem').click(function(event) {
    if ($(event.currentTarget).text() === 'New...') {
        window.location.replace('#');
        window.location.reload();
    }
});
var fileMenus = { file: {}, edit: {}, share: {} };
fileMenus.file.toggle = false;
fileMenus.edit.toggle = false;
fileMenus.share.toggle = false;
fileMenus.done = true;
$('#file-menu').click(function() {
    if (fileMenus.done) {
        fileMenus.done = false;
        if (!fileMenus.file.toggle) {
            fileMenus.file.toggle = true;
            if (fileMenus.edit.toggle) {
                $(editMenu).slideUp();
                setTimeout(function() {
                    $(fileMenu).slideDown();
                }, 400);
            } else if (fileMenus.share.toggle) {
                fileMenus.share.toggle = false;
                $(shareMenu).slideUp();
                setTimeout(function() {
                    $(fileMenu).slideDown();
                }, 400);
            } else {
                $(fileMenu).slideDown();
            }
        } else {
            fileMenus.file.toggle = false;
            $(fileMenu).slideUp();
        }
        fileMenus.done = true;
    }
});
$('#edit-menu').click(function() {
    if (fileMenus.done) {
        fileMenus.done = false;
        if (!fileMenus.edit.toggle) {
            fileMenus.edit.toggle = true;
            if (fileMenus.file.toggle) {
                fileMenus.file.toggle = false;
                $(fileMenu).slideUp();
                setTimeout(function() {
                    $(editMenu).slideDown();
                }, 400);
            } else if (fileMenus.share.toggle) {
                fileMenus.share.toggle = false;
                $(shareMenu).slideUp();
                setTimeout(function() {
                    $(editMenu).slideDown();
                }, 400);
            } else {
                $(editMenu).slideDown();
            }
        } else {
            fileMenus.edit.toggle = false;
            $(editMenu).slideUp();
        }
        fileMenus.done = true;
    }
});
