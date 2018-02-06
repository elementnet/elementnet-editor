/*
 * ElementNet Block Engine
 * Copyright (c) 2017-18 ElementNetwork
 * License: Apache 2.0
 */

/*
HOW TO CREATE BLOCKS
====================
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
%m.<menu name in fileMenus var> - dropdown
%t.<menu name in fileMenus var> - dropdown/string
%d.<menu name in fileMenus var> - dropdown/number
To create variating code, you can use JavaScript (surrounded by ~ symbols)
Here are some other things you can do using this:
nbTilde - Returns a non-breaking tilde
$inputs - An array of inputs

Note how these don't return values to your code. For example, you would have to do this:

(new Block('', 'setVarToTilde', 'set variable %s to tilde', 'Data' {
    code: '~$inputs[0]~ = "~nbTilde~"', // Notice the quotes
    hidden: false,
    movable: true
}).render();
*/

/* global $ */

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
Block.prototype.execute = function(whenDone, ...inputs) {
    var bunch = [],
        codeLength = this.descriptor.code.length,
        currentBunch = '',
        currentChar = '',
        i = 0,
        inBunch = false,
        j = null,
        k = 0,
        parsed = '',
        unparsed = this.descriptor.code;
    for (; i < codeLength; i++) {
        j = unparsed[i];
        currentChar = j;
        if (inBunch && currentChar === '~') {
            inBunch = false;
            bunch.append((currentBunch) => {
                let modBunch = currentBunch.replace(/nbTilde/g, '~');
                // Unfinished
            })
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
module.exports.runScript = function() {
    // Basic mods should modify code starting here
    categories = { '': [] };
    menus = {};
    new Block('h', 'doctype', 'document type: HTML 5.0', '', {
        code: '<!DOCTYPE html>',
        hidden: 'true',
        moveable: 'false'
    }).render();
};
