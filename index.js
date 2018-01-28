/*
ElementNet Block Engine
Copyright (c) 2017 ElementNetwork
License: Apache 2.0
*/

/*
HOW TO CREATE BLOCKS
********************
Example code: (new Block('', 'embedJavaScript', 'JavaScript from url: %s', 'Code', {
    code: "<script src=~$0~><\/script>",
    hidden: false,
    movable: true,
})).render();
METHOD CHAINING *IS* ALLOWED
Block types:
(none/other) - stack
r - returns value
b - returns true/false/null/undefined (or equivalents in other languages - such as None in Python)
c - C-shaped block, containing others inside (input accessable by $c in code)
s - start block, such as <!DOCTYPE HTML5>
Input types:
%c - color
%s - string
%b - true/false/null/undefined
%n - number
%m.<menu name in menus var> - dropdown
%t.<menu name in menus var> - dropdown/string
%d.<menu name in menus var> - dropdown/number
To create variating code, there is a small subset of JavaScript available (surrounded by ~ symbols)
The bool?ifTrue/bool?iftrue:ifFalse operators
The +, -, *, and / operators
Parens: ()
The > and < operators
The !, &&, and || operators (|| and && are replaced with | and &)
The == and != operators (== is called as =, != is called as %)
Math.PI, and Math.E, written as P, and E
Math.pow, written as a ^ operator (i.e. 5^2 means Math.pow(5, 2)
Inputs (via $[number of input], max # of inputs is 10)
Escape this character via using @. Example (in PHP):
(new Block('r', 'setVarToRandom', 'set variable %s to ~@~@~', 'Data', {
    code: "$~$0~ = '~@~@~@~@~@~'",
    hidden: false,
    movable: true,
})).render();
Usage of this block:
{set variable [lol] to ~@~@~} --> `$lol = '~@~@~'`
*/

/* global $ */

$('#player-view').click(function() {
    window.location = '/projects/player/#' + projectId;
});

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
var menus = { file: {}, edit: {}, share: {} };
menus.file.toggle = false;
menus.edit.toggle = false;
menus.share.toggle = false;
menus.done = true;
$('#file-menu').click(function() {
    if (menus.done) {
        menus.done = false;
        if (!menus.file.toggle) {
            menus.file.toggle = true;
            if (menus.edit.toggle) {
                $(editMenu).slideUp();
                setTimeout(function() {
                    $(fileMenu).slideDown();
                }, 400);
            } else if (menus.share.toggle) {
                menus.share.toggle = false;
                $(shareMenu).slideUp();
                setTimeout(function() {
                    $(fileMenu).slideDown();
                }, 400);
            } else {
                $(fileMenu).slideDown();
            }
        } else {
            menus.file.toggle = false;
            $(fileMenu).slideUp();
        }
        menus.done = true;
    }
});
$('#edit-menu').click(function() {
    if (menus.done) {
        menus.done = false;
        if (!menus.edit.toggle) {
            menus.edit.toggle = true;
            if (menus.file.toggle) {
                menus.file.toggle = false;
                $(fileMenu).slideUp();
                setTimeout(function() {
                    $(editMenu).slideDown();
                }, 400);
            } else if (menus.share.toggle) {
                menus.share.toggle = false;
                $(shareMenu).slideUp();
                setTimeout(function() {
                    $(editMenu).slideDown();
                }, 400);
            } else {
                $(editMenu).slideDown();
            }
        } else {
            menus.edit.toggle = false;
            $(editMenu).slideUp();
        }
        menus.done = true;
    }
});
function updatePreview(html) {
    $('#preview-iframe')
        .contents()
        .find('html')
        .html(html);
}

('use strict');
var categories = {},
    menus = {};
function Block(type, spec, text, category, descriptor) {
    this.code = descriptor.code;
    this.type = type;
    this.spec = spec;
    this.text = text;
    this.category = category;
    if (descriptor.parameterNameDefaults) {
        this.paramaterNameDefaults = descriptor.parameterNameDefaults;
    }
    if (descriptor.buttonLeft) {
        this.buttonLeft = descriptor.buttonLeft;
    }
    if (descriptor.buttonRight) {
        this.buttonRight = descriptor.buttonRight;
    }
    this.desc = descriptor;
    this.element = document.createElement('canvas');
    $(this.element)
        .data('spec', spec)
        .addClass('block');
}
Block.prototype.render = function() {
    return this;
};
Block.prototype.execute = function(whenDone) {
    var bunch = [],
        codeLength = this.descriptor.code.length,
        currentBunch = '',
        currentChar = '',
        i = 0,
        inBunch = false,
        j = null,
        k = 0,
        parsed = '',
        tempBunch = [],
        tempBunchCurrent = '',
        unparsed = this.descriptor.code;
    for (; i < codeLength; i++) {
        j = unparsed[i];
        currentChar = j;
        if (inBunch && currentChar === '~') {
            inBunch = false;
            for (; k < currentBunch.length; k++) {
                // Left empty for later use
            }
        } else if (currentChar === '~') {
            inBunch = true;
            bunch.append(currentBunch);
            currentBunch = '';
        } else {
            currentBunch += currentChar;
        }
    }
    whenDone(parsed);

    return this;
};
window.htmlScript = function() {
    // Basic mods should modify code starting here
    categories = { '': [] };
    menus = {};
    new Block('h', 'doctype', 'document type: HTML 5.0', '', {
        code: '<!DOCTYPE html>',
        hidden: 'true',
        moveable: 'false'
    }).render();
};
