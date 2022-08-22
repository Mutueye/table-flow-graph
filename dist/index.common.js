/**
 * table-flow-graph v0.2.4
 * Copyright 2022 Mutueye. Licensed under MIT
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var lodashEs = require('lodash-es');

/**
 * Create an element with designated tagName，and add a className to it,
 * then append to parentNode if has one.
 * @param tagName
 * @param className
 * @param parentNode
 * @returns
 */
function createClassElement(tagName, className, parentNode) {
    if (parentNode === void 0) { parentNode = null; }
    var el = document.createElement(tagName);
    el.className = className;
    if (parentNode)
        parentNode.appendChild(el);
    return el;
}
/**
 * Delete a dom element
 * @param {HTMLElement} element
 */
function removeElement(element) {
    if (element) {
        if (element.remove) {
            element.remove();
        }
        else {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        }
    }
}
function setStyles(element, obj) {
    for (var key in obj) {
        var val = obj[key];
        if (typeof val === 'number') {
            val = "".concat(val, "px");
        }
        element.style[key] = val;
    }
    return element;
}
var createElementFromHtmlString = function (htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    // Change this to div.childNodes to support multiple top-level nodes.
    return div.firstChild;
};

// eslint-disable-next-line @typescript-eslint/ban-types
function debounce(func, wait) {
    var timeoutID;
    if (!Number.isInteger(wait)) {
        console.warn('Call debounce without a valid number');
        wait = 300;
    }
    // conversion through any necessary as it wont satisfy criteria otherwise
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        clearTimeout(timeoutID);
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var context = this;
        timeoutID = window.setTimeout(function () {
            func.apply(context, args);
        }, wait);
    };
}
// check if last column/row deleteable by occupiedList
var setColumnAndRowDeletable = function (occupiedList, totalRows, totalColumns) {
    var canDeleteColumn = true;
    var canDeleteRow = true;
    for (var i = 0; i < totalRows - 1; i++) {
        if (occupiedList[i][totalColumns - 1] !== 0) {
            canDeleteColumn = false;
        }
    }
    for (var i = 0; i < totalColumns - 1; i++) {
        if (occupiedList[totalRows - 1][i] !== 0) {
            canDeleteRow = false;
        }
    }
    return { canDeleteRow: canDeleteRow, canDeleteColumn: canDeleteColumn };
};

var svgIconList = {
    edit: '<svg t="1657530672054" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8212" width="200" height="200"><path d="M712.96 268.373333l-128-128c-16.64-16.64-43.52-16.64-60.16 0l-384 384c-8.106667 8.106667-12.373333 18.773333-12.373333 30.293334v128c0 23.466667 19.2 42.666667 42.666666 42.666666h128c11.093333 0 22.186667-4.266667 30.293334-12.373333l264.106666-264.106667 22.186667-22.186666 97.706667-97.706667c16.213333-16.64 16.213333-43.946667-0.426667-60.586667zM281.173333 640H213.333333v-67.84l232.533334-232.533333 67.84 67.84L281.173333 640z m292.693334-292.693333l-67.84-67.84L554.666667 230.826667 622.506667 298.666667l-48.64 48.64zM853.333333 896H170.666667c-23.466667 0-42.666667-19.2-42.666667-42.666667s19.2-42.666667 42.666667-42.666666h682.666666c23.466667 0 42.666667 19.2 42.666667 42.666666s-19.2 42.666667-42.666667 42.666667z" p-id="8213"></path></svg>',
    plus: '<svg t="1657533725416" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4984" width="200" height="200"><path d="M512 85.333333C276.906667 85.333333 85.333333 276.906667 85.333333 512s191.573333 426.666667 426.666667 426.666667 426.666667-191.573333 426.666667-426.666667S747.093333 85.333333 512 85.333333z m0 768c-188.16 0-341.333333-153.173333-341.333333-341.333333s153.173333-341.333333 341.333333-341.333333 341.333333 153.173333 341.333333 341.333333-153.173333 341.333333-341.333333 341.333333z" p-id="4985"></path><path d="M725.333333 512c0 23.466667-19.2 42.666667-42.666666 42.666667h-128v128c0 23.466667-19.2 42.666667-42.666667 42.666666s-42.666667-19.2-42.666667-42.666666v-128H341.333333c-23.466667 0-42.666667-19.2-42.666666-42.666667s19.2-42.666667 42.666666-42.666667h128V341.333333c0-23.466667 19.2-42.666667 42.666667-42.666666s42.666667 19.2 42.666667 42.666666v128h128c23.466667 0 42.666667 19.2 42.666666 42.666667z" p-id="4986"></path></svg>',
    x: '<svg t="1657533744067" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5120" width="200" height="200"><path d="M512 85.333333C276.906667 85.333333 85.333333 276.906667 85.333333 512s191.573333 426.666667 426.666667 426.666667 426.666667-191.573333 426.666667-426.666667S747.093333 85.333333 512 85.333333z m0 768c-188.16 0-341.333333-153.173333-341.333333-341.333333s153.173333-341.333333 341.333333-341.333333 341.333333 153.173333 341.333333 341.333333-153.173333 341.333333-341.333333 341.333333z" p-id="5121"></path><path d="M663.04 602.453333c16.64 16.64 16.64 43.52 0 60.16-8.533333 8.533333-19.2 12.373333-30.293333 12.373334-11.093333 0-21.76-4.266667-30.293334-12.373334L512 572.16l-90.453333 90.453333c-8.533333 8.533333-19.2 12.373333-30.293334 12.373334-11.093333 0-21.76-4.266667-30.293333-12.373334-16.64-16.64-16.64-43.52 0-60.16l90.453333-90.453333-90.453333-90.453333c-16.64-16.64-16.64-43.52 0-60.16 16.64-16.64 43.52-16.64 60.16 0l90.453333 90.453333 90.453334-90.453333c16.64-16.64 43.52-16.64 60.16 0 16.64 16.64 16.64 43.52 0 60.16l-89.6 90.453333 90.453333 90.453333z" p-id="5122"></path></svg>',
    x2: '<svg t="1660284061189" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="59188" width="200" height="200"><path d="M755.626667 695.04c16.64 16.64 16.64 43.52 0 60.16-8.533333 8.533333-19.2 12.373333-30.293334 12.373333s-21.76-4.266667-30.293333-12.373333L512 572.16 328.96 755.2c-8.533333 8.533333-19.2 12.373333-30.293333 12.373333s-21.76-4.266667-30.293334-12.373333c-16.64-16.64-16.64-43.52 0-60.16l183.04-183.04-183.04-183.04C251.733333 312.32 251.733333 285.44 268.373333 268.8c16.64-16.64 43.52-16.64 60.16 0l183.04 183.04L694.613333 268.8c16.64-16.64 43.52-16.64 60.16 0 16.64 16.64 16.64 43.52 0 60.16L572.16 512l183.466667 183.04z" p-id="59189"></path></svg>',
    expand: '<svg t="1658744557448" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9385" width="200" height="200"><path d="M170.666667 394.24c-23.466667 0-42.666667-19.2-42.666667-42.666667V170.666667c0-23.466667 19.2-42.666667 42.666667-42.666667h180.906666c23.466667 0 42.666667 19.2 42.666667 42.666667s-19.2 42.666667-42.666667 42.666666H213.333333v138.24c0 23.466667-19.2 42.666667-42.666666 42.666667zM672.426667 896c-23.466667 0-42.666667-19.2-42.666667-42.666667s19.2-42.666667 42.666667-42.666666H810.666667v-138.24c0-23.466667 19.2-42.666667 42.666666-42.666667s42.666667 19.2 42.666667 42.666667V853.333333c0 23.466667-19.2 42.666667-42.666667 42.666667h-180.906666zM170.666667 896c-11.52 0-22.186667-4.693333-30.293334-12.373333-8.106667-8.106667-12.373333-18.773333-12.373333-30.293334v-180.906666c0-23.466667 19.2-42.666667 42.666667-42.666667s42.666667 19.2 42.666666 42.666667V810.666667h138.24c23.466667 0 42.666667 19.2 42.666667 42.666666s-19.2 42.666667-42.666667 42.666667H170.666667zM853.333333 394.24c-23.466667 0-42.666667-19.2-42.666666-42.666667V213.333333h-138.24c-23.466667 0-42.666667-19.2-42.666667-42.666666s19.2-42.666667 42.666667-42.666667H853.333333c11.52 0 22.186667 4.693333 30.293334 12.373333 8.106667 8.106667 12.373333 18.773333 12.373333 30.293334v180.906666c0 23.466667-19.2 42.666667-42.666667 42.666667z" p-id="9386"></path></svg>',
    move: '<svg t="1658744606420" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9520" width="200" height="200"><path d="M426.666667 512c0 23.466667-19.2 42.666667-42.666667 42.666667H230.826667L285.866667 609.706667c16.64 16.64 16.64 43.52 0 60.16-8.106667 8.533333-19.2 12.373333-30.293334 12.373333s-21.76-4.266667-30.293333-12.373333l-128-128c-16.64-16.64-16.64-43.52 0-60.16l128-128c16.64-16.64 43.52-16.64 60.16 0 16.64 16.64 16.64 43.52 0 60.16l-54.613333 55.466666H384c23.466667 0 42.666667 19.2 42.666667 42.666667zM926.293333 542.293333l-128 128c-8.106667 8.533333-19.2 12.373333-30.293333 12.373334s-21.76-4.266667-30.293333-12.373334c-16.64-16.64-16.64-43.52 0-60.16l55.04-55.04H640c-23.466667 0-42.666667-19.2-42.666667-42.666666s19.2-42.666667 42.666667-42.666667h153.173333L738.133333 414.72c-16.64-16.64-16.64-43.52 0-60.16 16.64-16.64 43.52-16.64 60.16 0l128 128c16.64 15.786667 16.64 43.093333 0 59.733333zM670.293333 798.293333l-128 128c-8.106667 8.106667-18.773333 12.373333-30.293333 12.373334s-22.186667-4.693333-30.293333-12.373334l-128-128c-16.64-16.64-16.64-43.52 0-60.16 16.64-16.64 43.52-16.64 60.16 0l55.04 55.04V640c0-23.466667 19.2-42.666667 42.666666-42.666667s42.666667 19.2 42.666667 42.666667v153.173333l55.04-55.04c16.64-16.64 43.52-16.64 60.16 0 17.493333 16.213333 17.493333 43.52 0.853333 60.16zM670.293333 286.293333c-16.64 16.64-43.52 16.64-60.16 0l-55.466666-55.466666V384c0 23.466667-19.2 42.666667-42.666667 42.666667s-42.666667-19.2-42.666667-42.666667V230.826667l-55.04 55.466666C405.76 294.4 395.093333 298.666667 384 298.666667s-21.76-4.266667-30.293333-12.373334C337.066667 269.653333 337.066667 242.773333 353.706667 226.133333l128-128c16.64-16.64 43.52-16.64 60.16 0l128 128c17.066667 16.213333 17.066667 43.52 0.426666 60.16z" p-id="9521"></path></svg>',
    remove: '<svg t="1658744626586" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9655" width="200" height="200"><path d="M405.333333 768c-23.466667 0-42.666667-19.2-42.666666-42.666667v-256c0-23.466667 19.2-42.666667 42.666666-42.666666s42.666667 19.2 42.666667 42.666666v256c0 23.466667-19.2 42.666667-42.666667 42.666667zM618.666667 768c-23.466667 0-42.666667-19.2-42.666667-42.666667v-256c0-23.466667 19.2-42.666667 42.666667-42.666666s42.666667 19.2 42.666666 42.666666v256c0 23.466667-19.2 42.666667-42.666666 42.666667z" p-id="9656"></path><path d="M896 256h-170.666667V128c0-23.466667-19.2-42.666667-42.666666-42.666667H341.333333c-23.466667 0-42.666667 19.2-42.666666 42.666667v128H128c-23.466667 0-42.666667 19.2-42.666667 42.666667s19.2 42.666667 42.666667 42.666666h42.666667v554.666667c0 23.466667 19.2 42.666667 42.666666 42.666667h597.333334c23.466667 0 42.666667-19.2 42.666666-42.666667V341.333333h42.666667c23.466667 0 42.666667-19.2 42.666667-42.666666s-19.2-42.666667-42.666667-42.666667zM384 170.666667h256v85.333333H384V170.666667z m384 682.666666H256V341.333333h512v512z" p-id="9657"></path></svg>',
    delete_row: '<svg t="1659516333894" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12036" width="200" height="200"><path d="M663.04 602.453333c16.64 16.64 16.64 43.52 0 60.16-8.533333 8.106667-19.2 12.373333-30.293333 12.373334-11.093333 0-21.76-4.266667-30.293334-12.373334L512 572.586667l-90.453333 90.453333c-8.106667 8.106667-19.2 12.373333-30.293334 12.373333-11.093333 0-21.76-4.266667-30.293333-12.373333-16.64-16.64-16.64-43.52 0-60.16l90.453333-90.453333-90.453333-90.88c-16.64-16.64-16.64-43.52 0-60.586667 16.64-16.64 43.52-16.64 60.16 0l90.453333 90.453333 90.453334-90.453333c16.64-16.64 43.52-16.64 60.16 0 16.64 16.64 16.64 43.52 0 60.586667L572.16 512l90.88 90.453333zM896 170.666667c0 23.466667-19.2 42.666667-42.666667 42.666666H170.666667c-23.466667 0-42.666667-19.2-42.666667-42.666666s19.2-42.666667 42.666667-42.666667h682.666666c23.466667 0 42.666667 19.2 42.666667 42.666667zM853.333333 896H170.666667c-23.466667 0-42.666667-19.2-42.666667-42.666667s19.2-42.666667 42.666667-42.666666h682.666666c23.466667 0 42.666667 19.2 42.666667 42.666666s-19.2 42.666667-42.666667 42.666667z" p-id="12037"></path></svg>',
    delete_col: '<svg t="1659516365239" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12171" width="200" height="200"><path d="M421.546667 663.04c-16.64 16.64-43.52 16.64-60.16 0-8.106667-8.533333-12.373333-19.2-12.373334-30.293333 0-11.093333 4.266667-21.76 12.373334-30.293334l90.453333-90.453333-90.88-90.453333c-8.106667-8.106667-12.373333-19.2-12.373333-30.293334 0-11.093333 4.266667-21.76 12.373333-30.293333 16.64-16.64 43.52-16.64 60.16 0l90.453333 90.453333 90.453334-90.453333c16.64-16.64 43.52-16.64 60.586666 0 16.64 16.64 16.64 43.52 0 60.16L572.16 512l90.453333 90.453333c16.64 16.64 16.64 43.52 0 60.16-16.64 16.64-43.52 16.64-60.586666 0L512 572.16l-90.453333 90.88zM853.333333 896c-23.466667 0-42.666667-19.2-42.666666-42.666667V170.666667c0-23.466667 19.2-42.666667 42.666666-42.666667s42.666667 19.2 42.666667 42.666667v682.666666c0 23.466667-19.2 42.666667-42.666667 42.666667zM128 853.333333V170.666667c0-23.466667 19.2-42.666667 42.666667-42.666667s42.666667 19.2 42.666666 42.666667v682.666666c0 23.466667-19.2 42.666667-42.666666 42.666667s-42.666667-19.2-42.666667-42.666667z" p-id="12172"></path></svg>',
};

// const svgIconList = {
//   edit: '<svg t="1657530672054" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8212" width="200" height="200"><path d="M712.96 268.373333l-128-128c-16.64-16.64-43.52-16.64-60.16 0l-384 384c-8.106667 8.106667-12.373333 18.773333-12.373333 30.293334v128c0 23.466667 19.2 42.666667 42.666666 42.666666h128c11.093333 0 22.186667-4.266667 30.293334-12.373333l264.106666-264.106667 22.186667-22.186666 97.706667-97.706667c16.213333-16.64 16.213333-43.946667-0.426667-60.586667zM281.173333 640H213.333333v-67.84l232.533334-232.533333 67.84 67.84L281.173333 640z m292.693334-292.693333l-67.84-67.84L554.666667 230.826667 622.506667 298.666667l-48.64 48.64zM853.333333 896H170.666667c-23.466667 0-42.666667-19.2-42.666667-42.666667s19.2-42.666667 42.666667-42.666666h682.666666c23.466667 0 42.666667 19.2 42.666667 42.666666s-19.2 42.666667-42.666667 42.666667z" p-id="8213"></path></svg>',
//   plus: '<svg t="1657533725416" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4984" width="200" height="200"><path d="M512 85.333333C276.906667 85.333333 85.333333 276.906667 85.333333 512s191.573333 426.666667 426.666667 426.666667 426.666667-191.573333 426.666667-426.666667S747.093333 85.333333 512 85.333333z m0 768c-188.16 0-341.333333-153.173333-341.333333-341.333333s153.173333-341.333333 341.333333-341.333333 341.333333 153.173333 341.333333 341.333333-153.173333 341.333333-341.333333 341.333333z" p-id="4985"></path><path d="M725.333333 512c0 23.466667-19.2 42.666667-42.666666 42.666667h-128v128c0 23.466667-19.2 42.666667-42.666667 42.666666s-42.666667-19.2-42.666667-42.666666v-128H341.333333c-23.466667 0-42.666667-19.2-42.666666-42.666667s19.2-42.666667 42.666666-42.666667h128V341.333333c0-23.466667 19.2-42.666667 42.666667-42.666666s42.666667 19.2 42.666667 42.666666v128h128c23.466667 0 42.666667 19.2 42.666666 42.666667z" p-id="4986"></path></svg>',
//   x: '<svg t="1657533744067" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5120" width="200" height="200"><path d="M512 85.333333C276.906667 85.333333 85.333333 276.906667 85.333333 512s191.573333 426.666667 426.666667 426.666667 426.666667-191.573333 426.666667-426.666667S747.093333 85.333333 512 85.333333z m0 768c-188.16 0-341.333333-153.173333-341.333333-341.333333s153.173333-341.333333 341.333333-341.333333 341.333333 153.173333 341.333333 341.333333-153.173333 341.333333-341.333333 341.333333z" p-id="5121"></path><path d="M663.04 602.453333c16.64 16.64 16.64 43.52 0 60.16-8.533333 8.533333-19.2 12.373333-30.293333 12.373334-11.093333 0-21.76-4.266667-30.293334-12.373334L512 572.16l-90.453333 90.453333c-8.533333 8.533333-19.2 12.373333-30.293334 12.373334-11.093333 0-21.76-4.266667-30.293333-12.373334-16.64-16.64-16.64-43.52 0-60.16l90.453333-90.453333-90.453333-90.453333c-16.64-16.64-16.64-43.52 0-60.16 16.64-16.64 43.52-16.64 60.16 0l90.453333 90.453333 90.453334-90.453333c16.64-16.64 43.52-16.64 60.16 0 16.64 16.64 16.64 43.52 0 60.16l-89.6 90.453333 90.453333 90.453333z" p-id="5122"></path></svg>',
//   expand:
//     '<svg t="1658744557448" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9385" width="200" height="200"><path d="M170.666667 394.24c-23.466667 0-42.666667-19.2-42.666667-42.666667V170.666667c0-23.466667 19.2-42.666667 42.666667-42.666667h180.906666c23.466667 0 42.666667 19.2 42.666667 42.666667s-19.2 42.666667-42.666667 42.666666H213.333333v138.24c0 23.466667-19.2 42.666667-42.666666 42.666667zM672.426667 896c-23.466667 0-42.666667-19.2-42.666667-42.666667s19.2-42.666667 42.666667-42.666666H810.666667v-138.24c0-23.466667 19.2-42.666667 42.666666-42.666667s42.666667 19.2 42.666667 42.666667V853.333333c0 23.466667-19.2 42.666667-42.666667 42.666667h-180.906666zM170.666667 896c-11.52 0-22.186667-4.693333-30.293334-12.373333-8.106667-8.106667-12.373333-18.773333-12.373333-30.293334v-180.906666c0-23.466667 19.2-42.666667 42.666667-42.666667s42.666667 19.2 42.666666 42.666667V810.666667h138.24c23.466667 0 42.666667 19.2 42.666667 42.666666s-19.2 42.666667-42.666667 42.666667H170.666667zM853.333333 394.24c-23.466667 0-42.666667-19.2-42.666666-42.666667V213.333333h-138.24c-23.466667 0-42.666667-19.2-42.666667-42.666666s19.2-42.666667 42.666667-42.666667H853.333333c11.52 0 22.186667 4.693333 30.293334 12.373333 8.106667 8.106667 12.373333 18.773333 12.373333 30.293334v180.906666c0 23.466667-19.2 42.666667-42.666667 42.666667z" p-id="9386"></path></svg>',
//   move: '<svg t="1658744606420" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9520" width="200" height="200"><path d="M426.666667 512c0 23.466667-19.2 42.666667-42.666667 42.666667H230.826667L285.866667 609.706667c16.64 16.64 16.64 43.52 0 60.16-8.106667 8.533333-19.2 12.373333-30.293334 12.373333s-21.76-4.266667-30.293333-12.373333l-128-128c-16.64-16.64-16.64-43.52 0-60.16l128-128c16.64-16.64 43.52-16.64 60.16 0 16.64 16.64 16.64 43.52 0 60.16l-54.613333 55.466666H384c23.466667 0 42.666667 19.2 42.666667 42.666667zM926.293333 542.293333l-128 128c-8.106667 8.533333-19.2 12.373333-30.293333 12.373334s-21.76-4.266667-30.293333-12.373334c-16.64-16.64-16.64-43.52 0-60.16l55.04-55.04H640c-23.466667 0-42.666667-19.2-42.666667-42.666666s19.2-42.666667 42.666667-42.666667h153.173333L738.133333 414.72c-16.64-16.64-16.64-43.52 0-60.16 16.64-16.64 43.52-16.64 60.16 0l128 128c16.64 15.786667 16.64 43.093333 0 59.733333zM670.293333 798.293333l-128 128c-8.106667 8.106667-18.773333 12.373333-30.293333 12.373334s-22.186667-4.693333-30.293333-12.373334l-128-128c-16.64-16.64-16.64-43.52 0-60.16 16.64-16.64 43.52-16.64 60.16 0l55.04 55.04V640c0-23.466667 19.2-42.666667 42.666666-42.666667s42.666667 19.2 42.666667 42.666667v153.173333l55.04-55.04c16.64-16.64 43.52-16.64 60.16 0 17.493333 16.213333 17.493333 43.52 0.853333 60.16zM670.293333 286.293333c-16.64 16.64-43.52 16.64-60.16 0l-55.466666-55.466666V384c0 23.466667-19.2 42.666667-42.666667 42.666667s-42.666667-19.2-42.666667-42.666667V230.826667l-55.04 55.466666C405.76 294.4 395.093333 298.666667 384 298.666667s-21.76-4.266667-30.293333-12.373334C337.066667 269.653333 337.066667 242.773333 353.706667 226.133333l128-128c16.64-16.64 43.52-16.64 60.16 0l128 128c17.066667 16.213333 17.066667 43.52 0.426666 60.16z" p-id="9521"></path></svg>',
//   remove:
//     '<svg t="1658744626586" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9655" width="200" height="200"><path d="M405.333333 768c-23.466667 0-42.666667-19.2-42.666666-42.666667v-256c0-23.466667 19.2-42.666667 42.666666-42.666666s42.666667 19.2 42.666667 42.666666v256c0 23.466667-19.2 42.666667-42.666667 42.666667zM618.666667 768c-23.466667 0-42.666667-19.2-42.666667-42.666667v-256c0-23.466667 19.2-42.666667 42.666667-42.666666s42.666667 19.2 42.666666 42.666666v256c0 23.466667-19.2 42.666667-42.666666 42.666667z" p-id="9656"></path><path d="M896 256h-170.666667V128c0-23.466667-19.2-42.666667-42.666666-42.666667H341.333333c-23.466667 0-42.666667 19.2-42.666666 42.666667v128H128c-23.466667 0-42.666667 19.2-42.666667 42.666667s19.2 42.666667 42.666667 42.666666h42.666667v554.666667c0 23.466667 19.2 42.666667 42.666666 42.666667h597.333334c23.466667 0 42.666667-19.2 42.666666-42.666667V341.333333h42.666667c23.466667 0 42.666667-19.2 42.666667-42.666666s-19.2-42.666667-42.666667-42.666667zM384 170.666667h256v85.333333H384V170.666667z m384 682.666666H256V341.333333h512v512z" p-id="9657"></path></svg>',
// };
var Icon = /** @class */ (function () {
    function Icon(parentElement, options) {
        var targetIcon = svgIconList[options.name];
        if (targetIcon) {
            this.element = createElementFromHtmlString(svgIconList[options.name]);
            var size = options.size ? options.size : 16;
            var color = options.color ? options.color : '#333333';
            var styleObj = {
                width: size + 'px',
                height: size + 'px',
            };
            if (options.color) {
                styleObj.fill = color;
                styleObj.color = color;
            }
            setStyles(this.element, styleObj);
            if (options.style) {
                setStyles(this.element, options.style);
            }
            if (options.className)
                this.element.setAttribute('class', options.className);
            this.element.classList.add('tfgraph-icon');
            parentElement.appendChild(this.element);
        }
    }
    return Icon;
}());

/**
 * table-flow-graph popup
 */
var Tooltip = /** @class */ (function () {
    function Tooltip(targetElement, options) {
        var _this = this;
        this.targetElement = targetElement;
        this.options = options;
        this.rendered = false;
        this.targetElement.addEventListener('mouseenter', function () { return _this.mouseEnter(); });
        this.targetElement.addEventListener('mouseleave', function () { return _this.mouseLeave(); });
    }
    Tooltip.prototype.render = function () {
        var _this = this;
        var _a = this.options, _b = _a.placement, placement = _b === void 0 ? 'top' : _b, label = _a.label;
        var targetRect = this.targetElement.getBoundingClientRect();
        this.element = createClassElement('div', 'tfgraph-tooltip tfgraph-wrapper', document.body);
        setStyles(this.element, {
            left: targetRect.left + 0.5 * targetRect.width + 'px',
            top: targetRect.top + 0.5 * targetRect.height + 'px',
        });
        this.areaElement = createClassElement('div', "tfgraph-tooltip-area ".concat(placement), this.element);
        this.boxElement = createClassElement('div', 'tfgraph-tooltip-box', this.areaElement);
        this.arrowElement = createClassElement('div', 'tfgraph-tooltip-arrow', this.areaElement);
        if (label)
            this.boxElement.innerHTML = label;
        var areaRect = this.areaElement.getBoundingClientRect();
        var arrowRect = this.arrowElement.getBoundingClientRect();
        var areaStyleObj = {};
        var arrowStyleObj = {};
        switch (placement) {
            case 'top':
                areaStyleObj.left = -0.5 * areaRect.width + 'px';
                areaStyleObj.bottom = 0.5 * targetRect.height + 10 + 'px';
                arrowStyleObj.left = 0.5 * (areaRect.width - arrowRect.width) + 'px';
                break;
            case 'right':
                areaStyleObj.left = 0.5 * targetRect.width + 'px';
                areaStyleObj.top = -0.5 * areaRect.height + 'px';
                arrowStyleObj.top = 0.5 * (areaRect.height - arrowRect.height) + 'px';
                break;
            case 'bottom':
                areaStyleObj.left = -0.5 * areaRect.width + 'px';
                areaStyleObj.top = 0.5 * targetRect.height + 'px';
                arrowStyleObj.left = 0.5 * (areaRect.width - arrowRect.width) + 'px';
                break;
            case 'left':
                areaStyleObj.right = 0.5 * targetRect.width + 'px';
                areaStyleObj.top = -0.5 * areaRect.height + 'px';
                arrowStyleObj.top = 0.5 * (areaRect.height - arrowRect.height) + 'px';
                break;
        }
        setStyles(this.areaElement, areaStyleObj);
        setStyles(this.arrowElement, arrowStyleObj);
        document.addEventListener('scroll', function () { return _this.updatePosition(); });
        this.rendered = true;
        if (this.showTimeoutId) {
            window.clearTimeout(this.showTimeoutId);
            this.showTimeoutId = null;
        }
    };
    Tooltip.prototype.updatePosition = function () {
        var targetRect = this.targetElement.getBoundingClientRect();
        setStyles(this.element, {
            left: targetRect.left + 0.5 * targetRect.width + 'px',
            top: targetRect.top + 0.5 * targetRect.height + 'px',
        });
    };
    Tooltip.prototype.dismiss = function () {
        var _this = this;
        this.rendered = false;
        this.targetElement.removeEventListener('mouseenter', function () { return _this.mouseEnter(); });
        this.targetElement.removeEventListener('mouseleave', function () { return _this.mouseLeave(); });
        document.removeEventListener('scroll', function () { return _this.updatePosition(); });
        if (this.element)
            removeElement(this.element);
    };
    Tooltip.prototype.mouseEnter = function () {
        var _this = this;
        if (!this.rendered && !this.showTimeoutId) {
            this.showTimeoutId = window.setTimeout(function () {
                _this.render();
            }, 500);
        }
        if (this.dismissTimeoutId) {
            window.clearTimeout(this.dismissTimeoutId);
        }
    };
    Tooltip.prototype.mouseLeave = function () {
        var _this = this;
        if (this.showTimeoutId) {
            window.clearTimeout(this.showTimeoutId);
            this.showTimeoutId = null;
        }
        this.dismissTimeoutId = window.setTimeout(function () {
            _this.dismiss();
        }, 50);
    };
    return Tooltip;
}());

/**
 * table-flow-graph button
 */
var Button = /** @class */ (function () {
    function Button(parentElement, options) {
        var _this = this;
        var label = options.label, type = options.type, onClick = options.onClick, icon = options.icon, tooltip = options.tooltip;
        var className = 'tfgraph-button is-hoverable';
        if (options.className)
            className += ' ' + options.className;
        className += ' ' + (type ? type : 'default');
        this.element = createClassElement('button', className, parentElement);
        if (icon)
            new Icon(this.element, { name: icon, size: 16, className: label ? 'mr-5' : '' });
        if (label) {
            createClassElement('span', '', this.element).innerHTML = label;
        }
        if (tooltip)
            this.btnToolTip = new Tooltip(this.element, { label: tooltip });
        this.element.addEventListener('click', function (e) {
            if (_this.btnToolTip)
                _this.btnToolTip.dismiss();
            if (_this.disabled)
                return;
            if (typeof onClick === 'function') {
                onClick(e);
            }
        });
    }
    Button.prototype.setDisabled = function () {
        this.disabled = true;
        this.element.classList.add('disabled');
    };
    Button.prototype.setEnabled = function () {
        this.disabled = false;
        this.element.classList.remove('disabled');
    };
    return Button;
}());

/**
 * table-flow-graph toggler btn group
 */
var Toggler = /** @class */ (function () {
    function Toggler(parentElement, options) {
        var _this = this;
        this.btnList = [];
        var items = options.items, initialActiveIndex = options.initialActiveIndex, onChange = options.onChange;
        this.element = createClassElement('div', 'tfgraph-toggler', parentElement);
        this.indicatorEl = createClassElement('div', 'tfgraph-toggler-indicator', this.element);
        this.btnContainerEl = createClassElement('div', 'flex flex-row items-center', this.element);
        items.forEach(function (item, index) {
            var el = createClassElement('button', 'tfgraph-toggler-btn', _this.btnContainerEl);
            el.innerHTML = item.label;
            _this.btnList.push({ itemData: item, el: el, index: index });
            el.addEventListener('click', function () {
                _this.setActive(index);
                if (typeof onChange === 'function')
                    onChange(item, index);
            });
        });
        this.setActive(typeof initialActiveIndex === 'number' ? initialActiveIndex : 0);
    }
    Toggler.prototype.setActive = function (index) {
        if (this.activeIndex !== index) {
            if (typeof this.activeIndex === 'number') {
                this.btnList[this.activeIndex].el.classList.remove('active');
            }
            this.activeIndex = index;
            this.btnList[index].el.classList.add('active');
            this.setActiveIndicator();
        }
    };
    Toggler.prototype.setActiveIndicator = function () {
        var containerRect = this.btnContainerEl.getBoundingClientRect();
        var rect = this.btnList[this.activeIndex].el.getBoundingClientRect();
        setStyles(this.indicatorEl, {
            width: rect.width + 'px',
            // this.activeIndex === 0 || this.activeIndex === this.btnList.length - 1
            //   ? rect.width - 2 + 'px'
            //   : rect.width + 4 + 'px',
            left: rect.left - containerRect.left + 4 + 'px',
            // this.activeIndex === 0
            //   ? rect.left - containerRect.left + 4 + 'px'
            //   : rect.left - containerRect.left - 2 + 'px',
        });
        // this.indicatorEl.style.width = rect.width + 2 + 'px';
    };
    Toggler.prototype.setDisabled = function () {
        this.disabled = true;
        this.element.classList.add('disabled');
    };
    Toggler.prototype.setEnabled = function () {
        this.disabled = false;
        this.element.classList.remove('disabled');
    };
    return Toggler;
}());

/**
 * table-flow-graph dialog
 */
var Dialog = /** @class */ (function () {
    function Dialog(options) {
        var _this = this;
        this.title = options.title;
        this.targetElement = options.targetElement
            ? options.targetElement
            : document.getElementsByTagName('body')[0];
        this.element = createClassElement('div', 'tfgraph-dialog tfgraph-wrapper', this.targetElement);
        this.maskElement = createClassElement('div', 'tfgraph-dialog-mask', this.element);
        this.boxElement = createClassElement('div', 'tfgraph-dialog-box', this.element);
        this.renderTitleBar();
        this.boxElement.appendChild(options.contentElement);
        this.targetElement.classList.add('overflow-hidden');
        this.maskElement.addEventListener('click', function () { return _this.close(); });
    }
    Dialog.prototype.renderTitleBar = function () {
        var _this = this;
        this.titleBarElement = createClassElement('div', 'tfgraph-dialog-bar', this.boxElement);
        var titleEl = createClassElement('div', 'tfgraph-dialog-bar-title', this.titleBarElement);
        titleEl.innerText = this.title;
        this.closeBtnElement = createClassElement('div', 'tfgraph-dialog-bar-btn', this.titleBarElement);
        new Icon(this.closeBtnElement, { name: 'x2', size: 18 });
        this.closeBtnElement.addEventListener('click', function () { return _this.close(); });
    };
    Dialog.prototype.close = function () {
        var _this = this;
        this.closeBtnElement.removeEventListener('click', function () { return _this.close(); });
        this.maskElement.removeEventListener('click', function () { return _this.close(); });
        removeElement(this.element);
        this.targetElement.classList.remove('overflow-hidden');
    };
    return Dialog;
}());

var EditColumnDialog = /** @class */ (function () {
    function EditColumnDialog(graphInstance, targetHeaderCell) {
        this.graphInstance = graphInstance;
        this.dialog = null;
        this.targetHeaderCell = targetHeaderCell;
        this.setIsEdit();
        this.renderContent();
    }
    EditColumnDialog.prototype.setIsEdit = function () {
        if (this.targetHeaderCell) {
            this.title = this.targetHeaderCell.columnData.title;
            this.isEdit = true;
        }
        else {
            this.title = '';
            this.isEdit = false;
        }
        if (this.inputEl)
            this.inputEl.value = this.title;
    };
    EditColumnDialog.prototype.renderContent = function () {
        var _this = this;
        this.contentElement = createClassElement('div', 'flex flex-col w-420 px-15 pb-15');
        this.inputEl = createClassElement('input', 'tfgraph-input', this.contentElement);
        this.inputEl.setAttribute('placeholder', this.graphInstance.options.labels.enterColumnName);
        var btnContainer = createClassElement('div', 'flex flex-row items-center justify-end mt-15', this.contentElement);
        this.btnCancel = new Button(btnContainer, {
            label: this.graphInstance.options.labels.cancel,
            type: 'default',
            className: 'mr-10',
            onClick: function () {
                _this.dialog.close();
            },
        });
        this.btnConfirm = new Button(btnContainer, {
            label: this.graphInstance.options.labels.confirm,
            type: 'primary',
            onClick: function () {
                if (_this.inputEl.value) {
                    if (_this.title !== _this.inputEl.value) {
                        if (_this.isEdit) {
                            _this.targetHeaderCell.columnData.title = _this.inputEl.value;
                            _this.dialog.close();
                            _this.graphInstance.refresh();
                            if (typeof _this.graphInstance.options.onEditColumn === 'function') {
                                _this.graphInstance.options.onEditColumn(_this.targetHeaderCell.columnData);
                            }
                        }
                        else {
                            var colData = {
                                id: "header_col_".concat(_this.graphInstance.options.totalColumns),
                                title: _this.inputEl.value,
                            };
                            _this.graphInstance.options.columns.push(colData);
                            _this.dialog.close();
                            _this.graphInstance.refresh();
                            if (typeof _this.graphInstance.options.onAddColumn === 'function') {
                                _this.graphInstance.options.onAddColumn(colData);
                            }
                        }
                    }
                    else {
                        _this.dialog.close();
                    }
                }
            },
        });
    };
    EditColumnDialog.prototype.show = function () {
        this.setIsEdit();
        this.dialog = new Dialog({
            title: this.isEdit
                ? this.graphInstance.options.labels.editColumn
                : this.graphInstance.options.labels.addColumn,
            contentElement: this.contentElement,
        });
    };
    return EditColumnDialog;
}());

var HintManager = /** @class */ (function () {
    function HintManager(targetEl, graphInstance) {
        this.targetEl = targetEl;
        this.graphInstance = graphInstance;
        this.currentHintState = 'idel';
        this.targetEl.innerText = '';
    }
    HintManager.prototype.setHint = function (hintState) {
        this.currentHintState = hintState;
        switch (this.currentHintState) {
            case 'idel':
                this.targetEl.innerText = '';
                break;
            case 'drawLine':
                this.targetEl.innerText = this.graphInstance.options.labels.hint_drawLine;
                break;
            case 'hoverLine':
                this.targetEl.innerText = this.graphInstance.options.labels.hint_hoverLine;
                break;
            case 'hoverAnchor':
                this.targetEl.innerText = this.graphInstance.options.labels.hint_hoverAnchor;
                break;
            case 'moveNode':
                this.targetEl.innerText = this.graphInstance.options.labels.hint_moveNode;
                break;
            case 'resizeNode':
                this.targetEl.innerText = this.graphInstance.options.labels.hint_resizeNode;
                break;
            default:
                this.targetEl.innerText = '';
                break;
        }
    };
    return HintManager;
}());

// import { Icon } from './ui/Icon';
/**
 * table-flow-graph toolbar
 */
var Toolbar = /** @class */ (function () {
    function Toolbar(parentElement, graphInstance) {
        var _this = this;
        this.graphInstance = graphInstance;
        this.element = createClassElement('div', 'tfgraph-toolbar', parentElement);
        this.modeToggler = new Toggler(this.element, {
            items: [
                { label: this.graphInstance.options.labels.editMode, id: 'edit' },
                { label: this.graphInstance.options.labels.previewMode, id: 'preview' },
            ],
            onChange: function (item) {
                graphInstance.changeMode(item.id);
                _this.setToolbarState();
            },
        });
        this.hintEl = createClassElement('div', 'tfgraph-toolbar-hint', this.element);
        this.hintMgr = new HintManager(this.hintEl, this.graphInstance);
        // new Icon(this.element, {
        //   name: 'plus',
        //   style: { width: '16px', height: '16px' },
        // });
        var rightBtns = createClassElement('div', 'flex-row items-center', this.element);
        this.newColumnBtn = new Button(rightBtns, {
            icon: 'plus',
            label: this.graphInstance.options.labels.addColumn,
            type: 'primary',
            onClick: function () { return _this.addColumn(); },
        });
        this.disabledMask = createClassElement('div', 'tfgraph-toolbar-mask hidden', this.element);
        // new Button(rightBtns, { label: '添加行', type: 'primary' });
        // new Button(this.element, { label: 'default' });
        // new Button(this.element, {
        //   label: 'clean',
        //   type: 'clean',
        //   onClick: () => {
        //     console.log('clean clicked');
        //   },
        // });
        // new Button(this.element, { label: 'primary', type: 'primary' });
        // new Button(this.element, { label: 'warning', type: 'warning' });
        // new Button(this.element, { label: 'danger', type: 'danger' });
        // new Button(this.element, { label: 'success', type: 'success' });
        // testBtn.setDisabled();
        this.setToolbarState();
        this.addColDialog = new EditColumnDialog(this.graphInstance);
    }
    Toolbar.prototype.addColumn = function () {
        if (typeof this.graphInstance.options.addColumn === 'function') {
            this.graphInstance.options.addColumn();
        }
        else {
            if (this.graphInstance.hasTableHeader) {
                // add column dialog
                this.addColDialog.show();
            }
            else {
                this.graphInstance.refresh(Object.assign({}, this.graphInstance.options, {
                    columns: null,
                    totalColumns: this.graphInstance.options.totalColumns + 1,
                }));
                if (typeof this.graphInstance.options.onAddColumn === 'function') {
                    this.graphInstance.options.onAddColumn();
                }
            }
        }
    };
    Toolbar.prototype.disable = function () {
        this.disabledMask.classList.remove('hidden');
    };
    Toolbar.prototype.enable = function () {
        this.disabledMask.classList.add('hidden');
    };
    Toolbar.prototype.setToolbarState = function () {
        if (this.graphInstance.options.totalColumns >= this.graphInstance.options.maxColumns ||
            this.graphInstance.mode === 'preview') {
            this.newColumnBtn.element.classList.add('hidden');
        }
        else {
            this.newColumnBtn.element.classList.remove('hidden');
        }
    };
    return Toolbar;
}());

/**
 * table-flow-graph popup
 */
var Popup = /** @class */ (function () {
    function Popup(targetElement, options) {
        var _this = this;
        this.targetElement = targetElement;
        this.options = options;
        this.rendered = false;
        this.targetElement.addEventListener('mouseenter', function () { return _this.mouseEnter(); });
        this.targetElement.addEventListener('mouseleave', function () { return _this.mouseLeave(); });
    }
    Popup.prototype.render = function () {
        var _this = this;
        var _a = this.options, _b = _a.placement, placement = _b === void 0 ? 'top' : _b, contentElement = _a.contentElement;
        var targetRect = this.targetElement.getBoundingClientRect();
        this.element = createClassElement('div', 'tfgraph-popup tfgraph-wrapper', document.body);
        setStyles(this.element, {
            left: targetRect.left + 0.5 * targetRect.width + 'px',
            top: targetRect.top + 0.5 * targetRect.height + 'px',
        });
        this.areaElement = createClassElement('div', "tfgraph-popup-area ".concat(placement), this.element);
        this.boxElement = createClassElement('div', 'tfgraph-popup-box', this.areaElement);
        this.arrowElement = createClassElement('div', 'tfgraph-popup-arrow', this.areaElement);
        if (contentElement)
            this.boxElement.appendChild(contentElement);
        var areaRect = this.areaElement.getBoundingClientRect();
        var arrowRect = this.arrowElement.getBoundingClientRect();
        var areaStyleObj = {};
        var arrowStyleObj = {};
        switch (placement) {
            case 'top':
                areaStyleObj.left = -0.5 * areaRect.width + 'px';
                areaStyleObj.bottom = 0.5 * targetRect.height + 10 + 'px';
                arrowStyleObj.left = 0.5 * (areaRect.width - arrowRect.width) + 'px';
                break;
            case 'right':
                areaStyleObj.left = 0.5 * targetRect.width + 10 + 'px';
                areaStyleObj.top = -0.5 * areaRect.height + 'px';
                arrowStyleObj.top = 0.5 * (areaRect.height - arrowRect.height) + 'px';
                break;
            case 'bottom':
                areaStyleObj.left = -0.5 * areaRect.width + 'px';
                areaStyleObj.top = 0.5 * targetRect.height + 10 + 'px';
                arrowStyleObj.left = 0.5 * (areaRect.width - arrowRect.width) + 'px';
                break;
            case 'left':
                areaStyleObj.right = 0.5 * targetRect.width + 10 + 'px';
                areaStyleObj.top = -0.5 * areaRect.height + 'px';
                arrowStyleObj.top = 0.5 * (areaRect.height - arrowRect.height) + 'px';
                break;
        }
        setStyles(this.areaElement, areaStyleObj);
        setStyles(this.arrowElement, arrowStyleObj);
        this.areaElement.addEventListener('mouseenter', function () { return _this.mouseEnter(); });
        this.areaElement.addEventListener('mouseleave', function () { return _this.mouseLeave(); });
        document.addEventListener('scroll', function () { return _this.updatePosition(); });
        this.rendered = true;
    };
    Popup.prototype.updatePosition = function () {
        var targetRect = this.targetElement.getBoundingClientRect();
        setStyles(this.element, {
            left: targetRect.left + 0.5 * targetRect.width + 'px',
            top: targetRect.top + 0.5 * targetRect.height + 'px',
        });
    };
    Popup.prototype.dismiss = function () {
        var _this = this;
        this.rendered = false;
        this.areaElement.removeEventListener('mouseenter', function () { return _this.mouseEnter(); });
        this.areaElement.removeEventListener('mouseleave', function () { return _this.mouseLeave(); });
        document.removeEventListener('scroll', function () { return _this.updatePosition(); });
        removeElement(this.element);
    };
    Popup.prototype.mouseEnter = function () {
        if (!this.rendered)
            this.render();
        if (this.timeoutId) {
            window.clearTimeout(this.timeoutId);
        }
    };
    Popup.prototype.mouseLeave = function () {
        var _this = this;
        this.timeoutId = window.setTimeout(function () {
            _this.dismiss();
        }, 200);
    };
    return Popup;
}());

var EditNodeDialog = /** @class */ (function () {
    function EditNodeDialog(graphInstance, targetCell) {
        this.graphInstance = graphInstance;
        this.targetCell = targetCell;
        this.dialog = null;
        if (targetCell.nodeData) {
            this.title = targetCell.nodeData.title;
            this.isEdit = true;
        }
        else {
            this.title = '';
            this.isEdit = false;
        }
        this.renderContent();
    }
    EditNodeDialog.prototype.setIsEdit = function () {
        if (this.targetCell.nodeData) {
            this.title = this.targetCell.nodeData.title;
            this.isEdit = true;
        }
        else {
            this.title = '';
            this.isEdit = false;
        }
        if (this.nodeNameInput)
            this.nodeNameInput.value = this.title;
    };
    EditNodeDialog.prototype.renderContent = function () {
        var _this = this;
        this.contentElement = createClassElement('div', 'flex flex-col w-420 px-15 pb-15');
        this.nodeNameInput = createClassElement('input', 'tfgraph-input', this.contentElement);
        this.nodeNameInput.setAttribute('placeholder', this.graphInstance.options.labels.enterNodeName);
        var btnContainer = createClassElement('div', 'flex flex-row items-center justify-end mt-15', this.contentElement);
        this.btnCancel = new Button(btnContainer, {
            label: this.graphInstance.options.labels.cancel,
            type: 'default',
            className: 'mr-10',
            onClick: function () {
                _this.dialog.close();
            },
        });
        this.btnConfirm = new Button(btnContainer, {
            label: this.graphInstance.options.labels.confirm,
            type: 'primary',
            onClick: function () {
                if (_this.nodeNameInput.value) {
                    if (_this.title !== _this.nodeNameInput.value) {
                        if (_this.isEdit) {
                            _this.targetCell.nodeData.title = _this.nodeNameInput.value;
                            _this.dialog.close();
                            _this.graphInstance.refresh();
                            if (typeof _this.graphInstance.options.onEditNode === 'function') {
                                _this.graphInstance.options.onEditNode(_this.targetCell.nodeData);
                            }
                        }
                        else {
                            var nodeData = {
                                id: "node_".concat(_this.targetCell.row, "_").concat(_this.targetCell.column),
                                row: _this.targetCell.row,
                                column: _this.targetCell.column,
                                rowSpan: 1,
                                colSpan: 1,
                                title: _this.nodeNameInput.value,
                            };
                            _this.graphInstance.options.nodes.push(nodeData);
                            _this.dialog.close();
                            _this.graphInstance.refresh();
                            if (typeof _this.graphInstance.options.onAddNode === 'function') {
                                _this.graphInstance.options.onAddNode(nodeData);
                            }
                        }
                    }
                    else {
                        _this.dialog.close();
                    }
                }
            },
        });
    };
    EditNodeDialog.prototype.show = function () {
        this.setIsEdit();
        this.dialog = new Dialog({
            title: this.isEdit
                ? this.graphInstance.options.labels.editNode
                : this.graphInstance.options.labels.addNode,
            contentElement: this.contentElement,
        });
    };
    return EditNodeDialog;
}());

// import Dialog from '../ui/dialog/Dialog';
/**
 * table-flow-graph tabel cell
 */
var TableCell = /** @class */ (function () {
    function TableCell(parentElement, data, row, column, graphInstance) {
        this.graphInstance = graphInstance;
        this.row = row;
        this.column = column;
        this.element = this.createTabelCell(data, row, column, this.graphInstance);
        parentElement.appendChild(this.element);
    }
    TableCell.prototype.createTabelCell = function (data, row, column, graphInstance) {
        var el = createClassElement('div', 'tfgraph-cell');
        el.setAttribute('id', "".concat(graphInstance.id, "_cell_").concat(row, "_").concat(column));
        if (data) {
            var node = createClassElement('div', 'tfgraph-node');
            node.classList.add(data.type ? data.type : 'default');
            if (data.isBtn && this.graphInstance.mode !== 'edit')
                node.classList.add('isBtn');
            if (typeof this.graphInstance.options.renderNode === 'function') {
                node.appendChild(this.graphInstance.options.renderNode(data));
            }
            else {
                node.innerText = data.title;
            }
            // node.innerText = data.id;
            el.appendChild(node);
            this.hasNode = true;
            this.nodeEl = node;
            this.nodeData = data;
            this.rowSpan = data.rowSpan;
            this.colSpan = data.colSpan;
        }
        else {
            this.rowSpan = 1;
            this.colSpan = 1;
            this.hasNode = false;
        }
        // set min height base on row span
        el.style.minHeight = 80 * this.rowSpan + 'px';
        return el;
    };
    // cell controls for edit mode
    TableCell.prototype.setEditControls = function () {
        var _this = this;
        this.controlLayer = createClassElement('div', 'tfgraph-cell-control-layer hidden', this.element);
        // const controlRowEl = createClassElement(
        //   'div',
        //   'flex flex-row items-center justify-center p-15 flex-wrap',
        //   this.controlLayer,
        // );
        this.editDialog = new EditNodeDialog(this.graphInstance, this);
        if (this.nodeData) {
            new Button(this.controlLayer, {
                icon: 'move',
                type: 'primary',
                tooltip: this.graphInstance.options.labels.moveNode,
                className: 'absolute left-6 top-6 p-0 sm w-28 btn-tl',
                onClick: function () {
                    _this.graphInstance.tableController.startMoving(_this);
                },
            });
            new Button(this.controlLayer, {
                icon: 'edit',
                type: 'primary',
                tooltip: this.graphInstance.options.labels.editNode,
                className: 'absolute left-6 bottom-6 p-0 sm w-28 btn-bl',
                onClick: function () {
                    if (typeof _this.graphInstance.options.editNode === 'function') {
                        _this.graphInstance.options.editNode(_this.nodeData);
                    }
                    else {
                        _this.editDialog.show();
                    }
                },
            });
            new Button(this.controlLayer, {
                icon: 'remove',
                type: 'danger',
                tooltip: this.graphInstance.options.labels.deleteNode,
                className: 'absolute right-6 top-6 p-0 sm w-28 btn-tr',
                onClick: function () {
                    if (typeof _this.graphInstance.options.deleteNode === 'function') {
                        _this.graphInstance.options.deleteNode(_this.nodeData);
                    }
                    else {
                        // TODO remove cell
                        lodashEs.remove(_this.graphInstance.options.nodes, function (item) {
                            return _this.nodeData.id === item.id;
                        });
                        _this.graphInstance.refresh();
                        if (typeof _this.graphInstance.options.onDeleteNode === 'function') {
                            _this.graphInstance.options.onDeleteNode(_this.nodeData);
                        }
                    }
                },
            });
            new Button(this.controlLayer, {
                icon: 'expand',
                type: 'primary',
                tooltip: this.graphInstance.options.labels.adjustNodeSize,
                className: 'absolute right-6 bottom-6 p-0 sm w-28 btn-br',
                onClick: function () {
                    _this.graphInstance.tableController.startResizing(_this);
                },
            });
        }
        else {
            new Button(this.controlLayer, {
                icon: 'plus',
                type: 'primary',
                className: 'absolute left-6 top-6 p-0 sm w-28 btn-tl',
                tooltip: this.graphInstance.options.labels.addNode,
                onClick: function () {
                    if (typeof _this.graphInstance.options.addNode === 'function') {
                        _this.graphInstance.options.addNode(_this.row, _this.column);
                    }
                    else {
                        _this.editDialog.show();
                    }
                },
            });
            if (this.graphInstance.options.totalRows > 1 &&
                this.row === this.graphInstance.options.totalRows - 1) {
                this.deleteRowBtn = new Button(this.controlLayer, {
                    icon: 'delete_row',
                    type: 'danger',
                    className: 'absolute right-6 top-6 p-0 sm w-28 btn-tr',
                    tooltip: this.graphInstance.options.labels.deleteRow,
                    onClick: function () {
                        if (typeof _this.graphInstance.options.deleteRow === 'function') {
                            _this.graphInstance.options.deleteRow();
                        }
                        else {
                            _this.graphInstance.refresh(Object.assign({}, _this.graphInstance.options, {
                                totalRows: _this.graphInstance.options.totalRows - 1,
                            }));
                            if (typeof _this.graphInstance.options.onDeleteRow === 'function') {
                                _this.graphInstance.options.onDeleteRow();
                            }
                        }
                    },
                });
            }
            if (this.graphInstance.options.totalColumns > 1 &&
                this.column === this.graphInstance.options.totalColumns - 1) {
                this.deleteColBtn = new Button(this.controlLayer, {
                    icon: 'delete_col',
                    type: 'danger',
                    className: 'absolute right-6 bottom-6 p-0 sm w-28 btn-br',
                    tooltip: this.graphInstance.options.labels.deleteColumn,
                    onClick: function () {
                        if (typeof _this.graphInstance.options.deleteColumn === 'function') {
                            // custom delete column method
                            var targetColumn = _this.graphInstance.options.columns[_this.graphInstance.options.totalColumns - 1];
                            _this.graphInstance.options.deleteColumn(targetColumn);
                        }
                        else {
                            // auto delete column
                            if (_this.graphInstance.hasTableHeader) {
                                // if has options.columns data (table header will be rendered)
                                if (typeof _this.graphInstance.options.onDeleteColumn === 'function') {
                                    var targetColumn = _this.graphInstance.options.columns[_this.graphInstance.options.totalColumns - 1];
                                    _this.graphInstance.options.onDeleteColumn(targetColumn);
                                }
                                _this.graphInstance.options.columns.pop();
                                _this.graphInstance.refresh(Object.assign({}, _this.graphInstance.options));
                            }
                            else {
                                // if options.columns data is null or empty
                                _this.graphInstance.refresh(Object.assign({}, _this.graphInstance.options, {
                                    columns: null,
                                    totalColumns: _this.graphInstance.options.totalColumns - 1,
                                }));
                                if (typeof _this.graphInstance.options.onDeleteColumn === 'function') {
                                    _this.graphInstance.options.onDeleteColumn();
                                }
                            }
                        }
                    },
                });
            }
        }
        this.element.addEventListener('mouseenter', function () { return _this.onMouseEnter(); });
        this.element.addEventListener('mouseleave', function () { return _this.onMouseLeave(); });
    };
    TableCell.prototype.setViewModeControls = function () {
        var _this = this;
        if (this.nodeData) {
            this.element.addEventListener('click', function () { return _this.onClickNode(); });
            if (this.nodeData.showPopup) {
                var contentEl = void 0;
                if (typeof this.graphInstance.options.renderNodeHoverPopup === 'function') {
                    contentEl = this.graphInstance.options.renderNodeHoverPopup(this.nodeData);
                }
                else {
                    contentEl = createClassElement('div', 'flex flex-col items-center p-30');
                    contentEl.innerHTML = this.nodeData.title;
                }
                this.popup = new Popup(this.nodeEl, {
                    placement: 'top',
                    contentElement: contentEl,
                });
            }
        }
    };
    TableCell.prototype.onMouseEnter = function () {
        this.controlLayer.classList.remove('hidden');
        if (this.deleteRowBtn) {
            if (this.graphInstance.tableController.canDeleteRow &&
                this.graphInstance.lineController.canDeleteRow) {
                this.deleteRowBtn.element.classList.remove('hidden');
            }
            else {
                this.deleteRowBtn.element.classList.add('hidden');
            }
        }
        if (this.deleteColBtn) {
            if (this.graphInstance.tableController.canDeleteColumn &&
                this.graphInstance.lineController.canDeleteColumn) {
                this.deleteColBtn.element.classList.remove('hidden');
            }
            else {
                this.deleteColBtn.element.classList.add('hidden');
            }
        }
    };
    TableCell.prototype.onMouseLeave = function () {
        this.controlLayer.classList.add('hidden');
    };
    TableCell.prototype.onClickNode = function () {
        if (typeof this.graphInstance.options.onClickNode === 'function') {
            this.graphInstance.options.onClickNode(this.nodeData, this.nodeEl);
        }
    };
    TableCell.prototype.setIsTarget = function (isTarget) {
        if (isTarget && !this.isTarget) {
            this.isTarget = true;
            this.element.style.opacity = '0.4';
        }
        else if (!isTarget && this.isTarget) {
            this.isTarget = false;
            this.element.style.opacity = '1';
        }
    };
    return TableCell;
}());

/**
 * table-flow-graph tabel header cell
 */
var TableHeaderCell = /** @class */ (function () {
    function TableHeaderCell(parentElement, columnData, columnIndex, graphInstance) {
        this.graphInstance = graphInstance;
        this.columnIndex = columnIndex;
        this.columnData = columnData;
        this.isLast = this.columnIndex === this.graphInstance.options.totalColumns - 1;
        this.element = this.createElement(parentElement);
    }
    TableHeaderCell.prototype.createElement = function (parentElement) {
        var el = createClassElement('th', 'tfgraph-th', parentElement);
        if (this.columnData.title) {
            el.innerHTML = this.columnData.title;
        }
        else {
            el.classList.add('empty');
        }
        if (this.columnData.width) {
            // TODO load width value from options
            var width = this.columnData.width;
            switch (this.columnData.width) {
                case 'large':
                    width = '200';
                    break;
                case 'md':
                    width = '170';
                    break;
                case 'sm':
                    width = '130';
                    break;
                case 'xs':
                    width = '105';
                    break;
                default:
                    width = this.columnData.width;
                    break;
            }
            el.setAttribute('width', width);
        }
        else {
            el.setAttribute('width', 'auto');
        }
        el.setAttribute('id', "".concat(this.graphInstance.id, "_col_").concat(this.columnIndex));
        return el;
    };
    // header cell controls for edit mode
    TableHeaderCell.prototype.setEditControls = function () {
        var _this = this;
        this.controlLayer = createClassElement('div', 'tfgraph-cell-control-layer hidden', this.element);
        this.editColDialog = new EditColumnDialog(this.graphInstance, this);
        new Button(this.controlLayer, {
            icon: 'edit',
            type: 'primary',
            className: 'absolute left-6 top-6 p-0 sm w-28 btn-tl',
            tooltip: this.graphInstance.options.labels.editColumn,
            onClick: function () {
                if (typeof _this.graphInstance.options.editColumn === 'function') {
                    _this.graphInstance.options.editColumn(_this.columnData);
                }
                else {
                    _this.editColDialog.show();
                }
            },
        });
        if (this.isLast && this.graphInstance.tableController.canDeleteColumn) {
            new Button(this.controlLayer, {
                icon: 'delete_col',
                type: 'danger',
                className: 'absolute right-6 top-6 p-0 sm w-28 btn-tr',
                tooltip: this.graphInstance.options.labels.deleteColumn,
                onClick: function () {
                    if (typeof _this.graphInstance.options.deleteColumn === 'function') {
                        // custom delete column method
                        _this.graphInstance.options.deleteColumn(_this.columnData);
                    }
                    else {
                        if (typeof _this.graphInstance.options.onDeleteColumn === 'function') {
                            // const targetColumn = this.graphInstance.options.columns[this.graphInstance.options.totalColumns - 1];
                            _this.graphInstance.options.onDeleteColumn(_this.columnData);
                        }
                        _this.graphInstance.options.columns.pop();
                        _this.graphInstance.refresh(Object.assign({}, _this.graphInstance.options));
                    }
                },
            });
        }
        this.element.addEventListener('mouseenter', function () { return _this.onMouseEnter(); });
        this.element.addEventListener('mouseleave', function () { return _this.onMouseLeave(); });
    };
    TableHeaderCell.prototype.onMouseEnter = function () {
        this.controlLayer.classList.remove('hidden');
    };
    TableHeaderCell.prototype.onMouseLeave = function () {
        this.controlLayer.classList.add('hidden');
    };
    return TableHeaderCell;
}());

/**
 * table-flow-graph anchor controller
 */
var TableMaskBox = /** @class */ (function () {
    function TableMaskBox(parentEl, targetCell, graphInstance) {
        var _this = this;
        this.graphInstance = graphInstance;
        this.disabled = false;
        this.element = createClassElement('div', 'tfgraph-table-mask-cell', parentEl);
        var nodeEl = createClassElement('div', 'tfgraph-table-mask-node', this.element);
        nodeEl.innerText = targetCell.nodeData.title;
        // setStyles(this.element, {
        //   top: top + 'px',
        //   left: left + 'px',
        //   width: width + 'px',
        //   height: height + 'px',
        // });
        this.element.addEventListener('click', function () {
            if (!_this.disabled)
                _this.graphInstance.tableController.submitCellChange();
        });
    }
    TableMaskBox.prototype.setPositinAndSize = function (pos_size) {
        setStyles(this.element, {
            top: pos_size.top + 'px',
            left: pos_size.left + 'px',
            width: pos_size.width + 'px',
            height: pos_size.height + 'px',
        });
    };
    TableMaskBox.prototype.disable = function () {
        // TODO
        if (!this.disabled) {
            this.disabled = true;
            this.element.classList.add('disabled');
        }
    };
    TableMaskBox.prototype.enable = function () {
        // TODO
        if (this.disabled) {
            this.disabled = false;
            this.element.classList.remove('disabled');
        }
    };
    return TableMaskBox;
}());

/**
 * table-flow-graph anchor controller
 */
var TableMask = /** @class */ (function () {
    function TableMask(tableGridRectList, graphInstance) {
        this.graphInstance = graphInstance;
        this.element = createClassElement('div', 'tfgraph-cell-mask-layer hidden', graphInstance.element);
        this.tableGridRectList = tableGridRectList;
    }
    TableMask.prototype.showMask = function (targetTableCell) {
        this.targetCell = targetTableCell;
        this.targetCell.setIsTarget(true);
        this.setFilteredOccupiedList();
        this.maskBox = new TableMaskBox(this.element, this.targetCell, this.graphInstance);
        this.mouseGridRect = this.getMouseRect();
        this.targetCellRect = this.getRectByRowAndColumn(this.targetCell.row, this.targetCell.column);
        this.setMaskBoxStatus();
    };
    // occupied list without target tabel cell
    TableMask.prototype.setFilteredOccupiedList = function () {
        this.filteredOccupiedList = lodashEs.cloneDeep(this.graphInstance.tableController.occupiedList);
        for (var i = this.targetCell.row; i < this.targetCell.row + this.targetCell.rowSpan; i++) {
            for (var j = this.targetCell.column; j < this.targetCell.column + this.targetCell.colSpan; j++) {
                this.filteredOccupiedList[i][j] = 0;
            }
        }
    };
    // set maskbox position/size/disabled etc.
    TableMask.prototype.setMaskBoxStatus = function () {
        if (this.graphInstance.tableController.isMovingCell) {
            this.resultCellPositionAndSize = {
                row: this.mouseGridRect.rowIndex + this.targetCell.rowSpan >
                    this.graphInstance.options.totalRows
                    ? this.graphInstance.options.totalRows - this.targetCell.rowSpan
                    : this.mouseGridRect.rowIndex,
                column: this.mouseGridRect.columnIndex + this.targetCell.colSpan >
                    this.graphInstance.options.totalColumns
                    ? this.graphInstance.options.totalColumns - this.targetCell.colSpan
                    : this.mouseGridRect.columnIndex,
                rowSpan: this.targetCell.rowSpan,
                colSpan: this.targetCell.colSpan,
            };
            this.maskBox.element.classList.add('moving');
        }
        else {
            this.resultCellPositionAndSize = {
                row: Math.min(this.targetCellRect.rowIndex, this.mouseGridRect.rowIndex),
                column: Math.min(this.targetCellRect.columnIndex, this.mouseGridRect.columnIndex),
                rowSpan: Math.abs(this.targetCellRect.rowIndex - this.mouseGridRect.rowIndex) + 1,
                colSpan: Math.abs(this.targetCellRect.columnIndex - this.mouseGridRect.columnIndex) + 1,
            };
            this.maskBox.element.classList.add('resizing');
        }
        var topLeftRect = this.getRectByRowAndColumn(this.resultCellPositionAndSize.row, this.resultCellPositionAndSize.column);
        var bottomRightRect = this.getRectByRowAndColumn(this.resultCellPositionAndSize.row + this.resultCellPositionAndSize.rowSpan - 1, this.resultCellPositionAndSize.column + this.resultCellPositionAndSize.colSpan - 1);
        if (bottomRightRect && topLeftRect) {
            this.maskBox.setPositinAndSize({
                left: topLeftRect.left,
                top: topLeftRect.top,
                width: bottomRightRect.left - topLeftRect.left + bottomRightRect.width + 1,
                height: bottomRightRect.top - topLeftRect.top + bottomRightRect.height + 1,
            });
        }
        // set maskbox disable/enable
        var doable = true;
        for (var i = this.resultCellPositionAndSize.row; i <
            Math.min(this.resultCellPositionAndSize.row + this.resultCellPositionAndSize.rowSpan, this.graphInstance.options.totalRows); i++) {
            for (var j = this.resultCellPositionAndSize.column; j <
                Math.min(this.resultCellPositionAndSize.column + this.resultCellPositionAndSize.colSpan, this.graphInstance.options.totalColumns); j++) {
                if (!this.filteredOccupiedList[i] || this.filteredOccupiedList[i][j] > 0) {
                    doable = false;
                }
            }
        }
        if (doable) {
            this.maskBox.enable();
        }
        else {
            this.maskBox.disable();
        }
    };
    TableMask.prototype.startMask = function (targetTableCell) {
        this.element.classList.remove('hidden');
        this.showMask(targetTableCell);
    };
    TableMask.prototype.stopMask = function () {
        this.element.classList.add('hidden');
        removeElement(this.maskBox.element);
        this.targetCell.setIsTarget(false);
        this.maskBox = null;
    };
    TableMask.prototype.submitChange = function () {
        this.stopMask();
        var targetCellPositionAndSize = {
            row: this.targetCell.row,
            column: this.targetCell.column,
            rowSpan: this.targetCell.rowSpan,
            colSpan: this.targetCell.colSpan,
        };
        if (!lodashEs.isEqual(this.resultCellPositionAndSize, targetCellPositionAndSize)) {
            // const oldNode = cloneDeep(this.targetCell.nodeData);
            this.targetCell.nodeData.row = this.resultCellPositionAndSize.row;
            this.targetCell.nodeData.column = this.resultCellPositionAndSize.column;
            this.targetCell.nodeData.rowSpan = this.resultCellPositionAndSize.rowSpan;
            this.targetCell.nodeData.colSpan = this.resultCellPositionAndSize.colSpan;
            // 提交变更
            if (typeof this.graphInstance.options.onEditNode === 'function') {
                this.graphInstance.options.onEditNode(this.targetCell.nodeData);
            }
            this.graphInstance.refresh();
        }
    };
    // get tableGridRect of current mouse position at
    TableMask.prototype.getMouseRect = function () {
        var mouseX = this.graphInstance.mousePosition.x;
        var mouseY = this.graphInstance.mousePosition.y;
        var targetGridRect;
        this.tableGridRectList.forEach(function (gridRect) {
            if (mouseY > gridRect.top &&
                mouseY < gridRect.top + gridRect.height &&
                mouseX > gridRect.left &&
                mouseX < gridRect.left + gridRect.width) {
                targetGridRect = gridRect;
            }
        });
        return targetGridRect;
    };
    TableMask.prototype.getRectByRowAndColumn = function (row, column) {
        // const targetCellRow = this.targetCell.row;
        // const targetCellColumn = this.targetCell.column;
        return this.tableGridRectList.find(function (gridRect) {
            return gridRect.rowIndex === row && gridRect.columnIndex === column;
        });
    };
    TableMask.prototype.onMouseMove = function () {
        var newRect = this.getMouseRect();
        if (!lodashEs.isEqual(newRect, this.mouseGridRect)) {
            if (newRect) {
                this.mouseGridRect = newRect;
                this.setMaskBoxStatus();
            }
        }
    };
    return TableMask;
}());

/**
 * table-flow-graph tabel
 */
var Table = /** @class */ (function () {
    function Table(graphInstance) {
        this.graphInstance = graphInstance;
        this.element = createClassElement('table', 'tfgraph-table', this.graphInstance.element);
        this.initTableStatus();
    }
    Table.prototype.initTableStatus = function () {
        this.headerCells = [];
        this.cells = [];
        this.canDeleteColumn = false;
        this.canDeleteRow = false;
        this.occupiedList = [];
        this.isMovingCell = false;
        this.isResizingCell = false;
    };
    // render table and set table controls
    Table.prototype.renderTable = function () {
        this.initTableStatus();
        this.element.innerHTML = '';
        this.createHeader();
        this.createTds();
        this.createCells();
        this.setControls();
    };
    Table.prototype.setControls = function () {
        var _this = this;
        var isEditMode = this.graphInstance.mode === 'edit';
        if (isEditMode) {
            var deleteableObj = setColumnAndRowDeletable(this.occupiedList, this.graphInstance.options.totalRows, this.graphInstance.options.totalColumns);
            this.canDeleteColumn = deleteableObj.canDeleteColumn;
            this.canDeleteRow = deleteableObj.canDeleteRow;
            this.cells.forEach(function (cell) {
                // set tabel cell controls
                cell.setEditControls();
            });
            // wait for table render ready
            setTimeout(function () {
                var columnSpecs = []; // [{left, width, columnIndex}]
                var rowSpecs = []; // [{ top, height, rowIndex}]
                _this.headerCells.forEach(function (headerCell) {
                    // set headerCell controls
                    headerCell.setEditControls();
                    // get columns's width and position
                    columnSpecs.push({
                        width: headerCell.element.getBoundingClientRect().width + 1,
                        left: headerCell.element.offsetLeft - 1,
                        columnIndex: headerCell.columnIndex,
                    });
                });
                // get rowSpects(row top position and height)
                for (var i = 0; i < _this.graphInstance.options.totalRows; i++) {
                    var targetCell = _this.getMinRowSpanCell(i, 1);
                    var targetCellHeight = targetCell.element.getBoundingClientRect().height;
                    var targetCellRowHeight = targetCellHeight / targetCell.rowSpan;
                    rowSpecs.push({
                        top: targetCell.element.offsetTop - 1 + (i - targetCell.row) * targetCellRowHeight,
                        height: targetCellRowHeight + 1,
                        rowIndex: i,
                    });
                }
                // each table grid's left, top, width, height without rowspan and colspan
                var tableGridRectList = [];
                rowSpecs.forEach(function (rowSpec) {
                    columnSpecs.forEach(function (columnSpec) {
                        tableGridRectList.push(Object.assign({}, rowSpec, columnSpec));
                    });
                });
                _this.tableMask = new TableMask(tableGridRectList, _this.graphInstance);
            }, 1);
        }
        else {
            // click node event
            this.cells.forEach(function (cell) {
                // set tabel cell controls
                cell.setViewModeControls();
            });
        }
        this.setBottomControl();
        // set table cell controls
        // 1. remove last row ✓
        // 2. empty cell: add node ✓
        // 3. node cell: edit node content ✓
        // 4. node cell: adjust node size ✓
        // 5. node cell: move node position ✓
    };
    //  recursively find min rowspan cell for targetRow
    Table.prototype.getMinRowSpanCell = function (row, minRowSpan) {
        if (minRowSpan === void 0) { minRowSpan = 1; }
        var targetRowCell = null;
        var rowCells = this.cells.filter(function (cell) { return cell.row === row; });
        if (rowCells.length === 0) {
            if (row > 0) {
                targetRowCell = this.getMinRowSpanCell(row - 1, minRowSpan + 1);
            }
        }
        else {
            var rowSpan_1 = 20;
            rowCells.forEach(function (cell) {
                if (cell.rowSpan < rowSpan_1 && cell.rowSpan >= minRowSpan) {
                    rowSpan_1 = cell.rowSpan;
                    targetRowCell = cell;
                }
            });
        }
        return targetRowCell;
    };
    Table.prototype.onMouseMove = function () {
        if (this.isMovingCell || this.isResizingCell) {
            this.tableMask.onMouseMove();
        }
    };
    Table.prototype.startMoving = function (targetCell) {
        this.isMovingCell = true;
        this.graphInstance.toolbar.hintMgr.setHint('moveNode');
        this.graphInstance.toolbar.disable();
        this.tableMask.startMask(targetCell);
    };
    Table.prototype.stopMoving = function () {
        this.isMovingCell = false;
        this.graphInstance.toolbar.hintMgr.setHint('idel');
        this.graphInstance.toolbar.enable();
        this.tableMask.stopMask();
    };
    Table.prototype.startResizing = function (targetCell) {
        this.isResizingCell = true;
        this.graphInstance.toolbar.hintMgr.setHint('resizeNode');
        this.graphInstance.toolbar.disable();
        this.tableMask.startMask(targetCell);
    };
    Table.prototype.stopResizing = function () {
        this.isResizingCell = false;
        this.graphInstance.toolbar.hintMgr.setHint('idel');
        this.graphInstance.toolbar.enable();
        this.tableMask.stopMask();
    };
    // sumit cell position / size change
    Table.prototype.submitCellChange = function () {
        this.isMovingCell = false;
        this.isResizingCell = false;
        this.graphInstance.toolbar.enable();
        this.tableMask.submitChange();
    };
    Table.prototype.setBottomControl = function () {
        var _this = this;
        if (this.graphInstance.mode === 'edit' &&
            !this.bottomControlEL &&
            this.graphInstance.options.totalRows < this.graphInstance.options.maxRows) {
            this.bottomControlEL = createClassElement('div', 'flex flex-row items-center justify-between mt-15', this.graphInstance.element);
            // add row btn
            new Button(this.bottomControlEL, {
                icon: 'plus',
                label: this.graphInstance.options.labels.addRow,
                className: 'flex-1',
                onClick: function () {
                    if (typeof _this.graphInstance.options.addRow === 'function') {
                        _this.graphInstance.options.addRow();
                    }
                    else {
                        _this.graphInstance.refresh(Object.assign({}, _this.graphInstance.options, {
                            totalRows: _this.graphInstance.options.totalRows + 1,
                        }));
                        if (typeof _this.graphInstance.options.onAddRow === 'function') {
                            _this.graphInstance.options.onAddRow();
                        }
                    }
                },
            });
        }
        else {
            if (this.bottomControlEL) {
                removeElement(this.bottomControlEL);
                this.bottomControlEL = null;
            }
        }
    };
    // render table header
    Table.prototype.createHeader = function () {
        var _this = this;
        if (this.graphInstance.options.tableLayoutFixed) {
            setStyles(this.element, { tableLayout: 'fixed' });
        }
        if (this.graphInstance.options.columns && this.graphInstance.options.columns.length > 0) {
            var tr_1 = createClassElement('tr', 'tfgraph-tr');
            this.graphInstance.options.columns.forEach(function (column, index) {
                var headerCell = new TableHeaderCell(tr_1, column, index, _this.graphInstance);
                _this.headerCells.push(headerCell);
            });
            this.element.appendChild(tr_1);
        }
    };
    // render table rows and tds
    Table.prototype.createTds = function () {
        for (var i = 0; i < this.graphInstance.options.totalRows; i++) {
            var tr = createClassElement('tr', 'tfgraph-tr');
            tr.setAttribute('id', "".concat(this.graphInstance.id, "_tr_").concat(i));
            var occupiedRow = [];
            this.occupiedList.push(occupiedRow);
            for (var j = 0; j < this.graphInstance.options.totalColumns; j++) {
                var td = createClassElement('td', 'tfgraph-td', tr);
                td.setAttribute('id', "".concat(this.graphInstance.id, "_td_").concat(i, "_").concat(j));
                occupiedRow.push(0);
            }
            this.element.appendChild(tr);
        }
    };
    // render tabel cells
    Table.prototype.createCells = function () {
        var _this = this;
        // spaned table cell id array
        var spanedTdIds = [];
        var nodes = this.graphInstance.options.nodes;
        if (nodes && nodes.length > 0) {
            nodes.forEach(function (node) {
                // set spanned tabel cell ids
                if (node.colSpan > 1 || node.rowSpan > 1) {
                    for (var i = node.column; i < node.column + node.colSpan; i++) {
                        for (var j = node.row; j < node.row + node.rowSpan; j++) {
                            if (!(i === node.column && j === node.row)) {
                                spanedTdIds.push("".concat(_this.graphInstance.id, "_td_").concat(j, "_").concat(i));
                                _this.occupiedList[j][i] = 1;
                            }
                        }
                    }
                }
            });
        }
        // remove spaned tabell cell element
        spanedTdIds.forEach(function (id) { return removeElement(document.getElementById(id)); });
        var _loop_1 = function (i) {
            var _loop_2 = function (j) {
                if (!spanedTdIds.includes("".concat(this_1.graphInstance.id, "_td_").concat(i, "_").concat(j))) {
                    var targetNode = nodes && nodes.length > 0
                        ? nodes.find(function (node) { return node.row === i && node.column === j; })
                        : null;
                    var targetTd = document.getElementById("".concat(this_1.graphInstance.id, "_td_").concat(i, "_").concat(j));
                    if (targetNode) {
                        targetTd.setAttribute('colSpan', targetNode.colSpan.toString());
                        targetTd.setAttribute('rowSpan', targetNode.rowSpan.toString());
                        this_1.occupiedList[i][j] = 1;
                    }
                    this_1.cells.push(new TableCell(targetTd, targetNode, i, j, this_1.graphInstance));
                }
            };
            for (var j = 0; j < this_1.graphInstance.options.totalColumns; j++) {
                _loop_2(j);
            }
        };
        var this_1 = this;
        // create table cells
        for (var i = 0; i < this.graphInstance.options.totalRows; i++) {
            _loop_1(i);
        }
    };
    return Table;
}());

// import { TableFlowGraph } from '../index';
/**
 * table-flow-graph line
 */
var LineSegment = /** @class */ (function () {
    function LineSegment(parent, options) {
        this.element = createClassElement('div', 'tfgraph-line', parent.element);
        var positionA = options.positionA, positionB = options.positionB, _a = options.thickness, thickness = _a === void 0 ? 2 : _a, _b = options.isStart, isStart = _b === void 0 ? true : _b, _c = options.isEnd, isEnd = _c === void 0 ? true : _c;
        this.thickness = thickness;
        if (isStart)
            this.toggleStartPoint();
        if (isEnd)
            this.toggleEndArrow();
        this.drawLine(positionA, positionB);
        this.element.addEventListener('mouseenter', function () { return parent.setHovered(true); });
        this.element.addEventListener('mouseleave', function () { return parent.setHovered(false); });
        this.element.addEventListener('dblclick', function () { return parent.onDoubleClick(); });
    }
    LineSegment.prototype.setHoverd = function (hovered) {
        if (hovered === void 0) { hovered = true; }
        if (hovered) {
            this.element.classList.add('hovered');
        }
        else {
            this.element.classList.remove('hovered');
        }
    };
    LineSegment.prototype.drawLine = function (positionA, positionB) {
        // start point
        var x1 = positionA.x;
        var y1 = positionA.y;
        // end point
        var x2 = positionB.x;
        var y2 = positionB.y;
        // distance
        var length = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
        // center
        var cx = (x1 + x2) / 2 - length / 2;
        var cy = (y1 + y2) / 2 - this.thickness / 2;
        // angle
        var angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
        this.element.style.width = length + this.thickness + 'px';
        this.element.style.height = this.thickness + 'px';
        this.element.style.left = cx - 0.5 * this.thickness + 'px';
        this.element.style.top = cy + 'px';
        this.element.style.borderRadius = this.thickness + 'px';
        this.element.style.transform = "rotate(".concat(angle, "deg)");
    };
    LineSegment.prototype.toggleStartPoint = function () {
        if (this.startPointEl) {
            removeElement(this.startPointEl);
        }
        else {
            this.startPointEl = createClassElement('div', 'start-point', this.element);
        }
    };
    LineSegment.prototype.toggleEndArrow = function () {
        if (this.endArrowEl) {
            removeElement(this.endArrowEl);
        }
        else {
            this.endArrowEl = createClassElement('div', 'arrow', this.element);
        }
    };
    return LineSegment;
}());

/**
 * table-flow-graph line group
 */
var LineGroup = /** @class */ (function () {
    function LineGroup(parentElement, options, graphInstance) {
        this.element = createClassElement('div', 'tfgraph-line-group', parentElement);
        this.isDrawingActive = options.isDrawingActive;
        this.anchorIds = options.anchorIds;
        this.graphInstance = graphInstance;
        this.drawLines();
    }
    LineGroup.prototype.addLineSegment = function (anchorId) {
        if (!this.anchorIds.includes(anchorId)) {
            this.anchorIds.push(anchorId);
            this.drawLines();
        }
    };
    LineGroup.prototype.onDoubleClick = function () {
        if (this.hovered) {
            if (this.isDrawingActive) {
                this.graphInstance.lineController.endDrawLine();
            }
            else {
                this.graphInstance.lineController.removeLineGroup(this);
            }
        }
    };
    LineGroup.prototype.drawLines = function () {
        var _this = this;
        this.anchors = [];
        this.lines = [];
        if (this.anchorIds.length === 0)
            return;
        this.anchorIds.forEach(function (anchorId) {
            var targetAnchor = _this.graphInstance.anchorController.anchors.find(function (anchor) { return anchor.id === anchorId; });
            if (targetAnchor) {
                _this.anchors.push(targetAnchor);
            }
        });
        this.element.innerHTML = '';
        var pointList = this.anchors.map(function (anchor) { return ({
            x: anchor.posX,
            y: anchor.posY,
        }); });
        if (pointList.length > 1) {
            for (var i = 0; i < pointList.length - 1; i++) {
                var line = new LineSegment(this, {
                    positionA: pointList[i],
                    positionB: pointList[i + 1],
                    thickness: 2,
                    isStart: i === 0,
                    isEnd: i === pointList.length - 2 && !this.isDrawingActive,
                });
                this.lines.push(line);
            }
        }
        // add line between last anchor position and mouse position when drawing
        if (this.isDrawingActive) {
            this.cursorLineStartPosition = pointList[pointList.length - 1];
            // draw cursor line
            this.cursorLine = new LineSegment(this, {
                positionA: this.cursorLineStartPosition,
                positionB: this.graphInstance.mousePosition,
                thickness: 2,
                isStart: pointList.length === 0,
                isEnd: true,
            });
            this.lines.push(this.cursorLine);
        }
    };
    LineGroup.prototype.setHovered = function (hovered) {
        if (hovered === void 0) { hovered = true; }
        if (this.graphInstance.mode === 'edit') {
            this.hovered = hovered;
            this.lines.forEach(function (line) {
                line.setHoverd(hovered);
            });
            if (!this.isDrawingActive) {
                this.graphInstance.toolbar.hintMgr.setHint(hovered ? 'hoverLine' : 'idel');
            }
        }
    };
    LineGroup.prototype.endDrawing = function () {
        // removeElement(this.cursorLine.element);
        this.isDrawingActive = false;
        this.drawLines();
    };
    LineGroup.prototype.escapeDrawing = function () {
        if (this.cursorLine) {
            if (this.anchorIds.length > 0) {
                this.anchorIds.pop();
                if (this.anchorIds.length === 0) {
                    removeElement(this.element);
                    // remove the last anchor id in this line group
                    this.graphInstance.lineController.lineAnchorIds =
                        this.graphInstance.lineController.lineAnchorIds.filter(function (lineArray) { return lineArray.length > 1; });
                    this.graphInstance.lineController.endDrawLine();
                }
                else {
                    this.drawLines();
                }
            }
        }
    };
    LineGroup.prototype.onMouseMove = function (graphInstance) {
        if (this.cursorLine) {
            var targetPosition = graphInstance.mousePosition;
            // snap to hovered anchor
            if (graphInstance.anchorController.hoveredAnchor &&
                !this.anchorIds.includes(graphInstance.anchorController.hoveredAnchor.id)) {
                targetPosition = {
                    x: graphInstance.anchorController.hoveredAnchor.posX,
                    y: graphInstance.anchorController.hoveredAnchor.posY,
                };
            }
            this.cursorLine.drawLine(this.cursorLineStartPosition, targetPosition);
        }
    };
    return LineGroup;
}());

/**
 * table-flow-graph lines controller
 */
var LineController = /** @class */ (function () {
    function LineController(graphInstance) {
        this.graphInstance = graphInstance;
        this.element = createClassElement('div', 'tfgraph-line-layer', this.graphInstance.element);
        var options = this.graphInstance.options;
        // this.options.mode = options.mode ? options.mode : 'view';
        if (options.lines && Array.isArray(options.lines)) {
            this.lineAnchorIds = options.lines;
        }
        else {
            this.lineAnchorIds = [];
        }
        this.originLineAnchorIds = lodashEs.cloneDeep(this.lineAnchorIds);
    }
    LineController.prototype.renderLines = function () {
        var _this = this;
        this.element.innerHTML = '';
        this.lineAnchorIds.forEach(function (lineGroup) {
            new LineGroup(_this.element, { anchorIds: lineGroup, isDrawingActive: false }, _this.graphInstance);
        });
        this.setColAndRowDeletable();
    };
    LineController.prototype.startDrawLine = function () {
        this.isDrawingLine = true;
        this.graphInstance.toolbar.disable();
        this.graphInstance.toolbar.hintMgr.setHint('drawLine');
        // set lines layer below anchors layer when draing line
        setStyles(this.element, { zIndex: '1' });
        setStyles(this.graphInstance.anchorController.element, { zIndex: '2' });
        this.originLineAnchorIds = lodashEs.cloneDeep(this.lineAnchorIds);
    };
    LineController.prototype.endDrawLine = function () {
        this.isDrawingLine = false;
        this.graphInstance.toolbar.enable();
        // set lines layer above anchors layer when draing line
        setStyles(this.element, { zIndex: '2' });
        setStyles(this.graphInstance.anchorController.element, { zIndex: '1' });
        if (this.currentDrawingLine) {
            this.currentDrawingLine.endDrawing();
            if (this.currentDrawingLine.anchorIds.length <= 1) {
                this.removeLineGroup(this.currentDrawingLine);
            }
            this.currentDrawingLine = undefined;
        }
        if (!lodashEs.isEqual(this.originLineAnchorIds, this.lineAnchorIds)) {
            this.originLineAnchorIds = lodashEs.cloneDeep(this.lineAnchorIds);
            // trigger event: linesChanged
            this.onChangeLines();
        }
    };
    LineController.prototype.setColAndRowDeletable = function () {
        var _this = this;
        var totalRows = this.graphInstance.options.totalRows;
        var totalColumns = this.graphInstance.options.totalColumns;
        this.canDeleteColumn = true;
        this.canDeleteRow = true;
        this.lineAnchorIds.forEach(function (line) {
            line.forEach(function (id) {
                var idArray = id.split('_');
                var row = idArray[1];
                var col = idArray[2];
                if (parseInt(col) === totalColumns - 1) {
                    _this.canDeleteColumn = false;
                }
                if (parseInt(row) === totalRows - 1) {
                    _this.canDeleteRow = false;
                }
            });
        });
    };
    LineController.prototype.onChangeLines = function () {
        this.setColAndRowDeletable();
        this.graphInstance.options = Object.assign({}, this.graphInstance.options, {
            lines: this.lineAnchorIds,
        });
        this.graphInstance.toolbar.hintMgr.setHint('idel');
        if (typeof this.graphInstance.options.onChangeLines === 'function') {
            this.graphInstance.options.onChangeLines(this.lineAnchorIds);
        }
    };
    LineController.prototype.removeLineGroup = function (line) {
        removeElement(line.element);
        this.lineAnchorIds = this.lineAnchorIds.filter(function (lines) { return !lodashEs.isEqual(lines, line.anchorIds); });
        if (!lodashEs.isEqual(this.lineAnchorIds, this.originLineAnchorIds)) {
            this.originLineAnchorIds = lodashEs.cloneDeep(this.lineAnchorIds);
            // trigger event: linesChanged
            this.onChangeLines();
        }
    };
    LineController.prototype.createLineGroup = function (anchorId) {
        this.startDrawLine();
        this.lineAnchorIds.push([anchorId]);
        this.currentDrawingLine = new LineGroup(this.element, { anchorIds: this.lineAnchorIds[this.lineAnchorIds.length - 1], isDrawingActive: true }, this.graphInstance);
    };
    LineController.prototype.addLineSegment = function (anchorId) {
        if (this.isDrawingLine && this.currentDrawingLine) {
            this.currentDrawingLine.addLineSegment(anchorId);
        }
    };
    LineController.prototype.onMouseMove = function () {
        if (this.isDrawingLine && this.currentDrawingLine) {
            this.currentDrawingLine.onMouseMove(this.graphInstance);
        }
    };
    return LineController;
}());

// | 'topleft'
// | 'top'
// | 'topright'
// | 'left'
// | 'center'
// | 'right'
// | 'bottomleft'
// | 'bottom'
// | 'bottomright';
var getBearingShort = function (bearing) {
    var shortBearing = 't';
    switch (bearing) {
        case 'topleft':
            shortBearing = 'tl';
            break;
        case 'top':
            shortBearing = 't';
            break;
        case 'topright':
            shortBearing = 'tr';
            break;
        case 'left':
            shortBearing = 'l';
            break;
        case 'center':
            shortBearing = 'c';
            break;
        case 'right':
            shortBearing = 'r';
            break;
        case 'bottomleft':
            shortBearing = 'bl';
            break;
        case 'bottom':
            shortBearing = 'b';
            break;
        case 'bottomright':
            shortBearing = 'br';
            break;
    }
    return shortBearing;
};
/**
 * Anchor point for drawing lines
 */
var Anchor = /** @class */ (function () {
    function Anchor(bearing, row, column, graphInstance, isOffsetX, isOffsetY) {
        if (isOffsetX === void 0) { isOffsetX = false; }
        if (isOffsetY === void 0) { isOffsetY = false; }
        var _this = this;
        // id for this Anchor class
        this.id = '';
        // x position relative to table area
        this.posX = 0;
        // y position relative to table area
        this.posY = 0;
        this.hidden = false;
        this.bearing = bearing;
        this.isOffsetX = isOffsetX;
        this.isOffsetY = isOffsetY;
        this.row = row;
        this.column = column;
        this.elementTr = document.getElementById("".concat(graphInstance.id, "_tr_").concat(row));
        this.elementCol = document.getElementById("".concat(graphInstance.id, "_col_").concat(column));
        if (this.elementTr && this.elementCol) {
            // create dom elements
            this.element = createClassElement('div', 'tfgraph-anchor', graphInstance.anchorController.element);
            createClassElement('div', 'tfgraph-anchor-point', this.element);
            var area = createClassElement('div', 'tfgraph-anchor-area', this.element);
            createClassElement('div', 'tfgraph-anchor-circle', area);
            // set Anchor instance id; 'ox' meaning offsetX, 'nx' meaning normalX
            this.id = "a_".concat(row, "_").concat(column, "_").concat(getBearingShort(bearing), "_").concat(isOffsetX ? 'ox' : 'nx', "_").concat(isOffsetY ? 'oy' : 'ny');
            // set dom id
            this.element.setAttribute('id', "".concat(graphInstance.id, "_").concat(this.id));
            graphInstance.anchorController.anchors.push(this);
            this.setVisible(graphInstance.mode === 'edit');
            // setTimeout(() => this.setPosition(), 1);
            this.setPosition();
            this.element.addEventListener('click', function () {
                if (!graphInstance.lineController.isDrawingLine) {
                    graphInstance.lineController.createLineGroup(_this.id);
                }
                else {
                    graphInstance.lineController.addLineSegment(_this.id);
                }
            });
            this.element.addEventListener('mouseenter', function () {
                graphInstance.anchorController.setHoveredAnchor(_this);
            });
            this.element.addEventListener('mouseleave', function () {
                if (graphInstance.anchorController.hoveredAnchor.id === _this.id) {
                    graphInstance.anchorController.setHoveredAnchor(null);
                }
            });
            // dblclick to finish drawing lines
            this.element.addEventListener('dblclick', function () {
                if (graphInstance.lineController.isDrawingLine) {
                    graphInstance.lineController.endDrawLine();
                }
            });
        }
    }
    Anchor.prototype.setOnePosition = function (x, y) {
        this.posX = x;
        this.posY = y;
        this.element.style.left = x + 'px';
        this.element.style.top = y + 'px';
        this.element.setAttribute('title', "xpos & ypos=".concat(x, ",").concat(y));
    };
    Anchor.prototype.setVisible = function (visible) {
        if (visible) {
            this.element.classList.remove('hidden');
        }
        else {
            this.element.classList.add('hidden');
        }
    };
    Anchor.prototype.setPosition = function () {
        var x_left = this.elementCol.offsetLeft + (this.isOffsetX ? 15 : 0);
        var x_center = this.elementCol.offsetLeft + 0.5 * this.elementCol.offsetWidth;
        var x_right = this.elementCol.offsetLeft + this.elementCol.offsetWidth - (this.isOffsetX ? 15 : 0);
        var y_top = this.elementTr.offsetTop + (this.isOffsetY ? 15 : 0);
        var y_center = this.elementTr.offsetTop + 0.5 * this.elementTr.offsetHeight;
        var y_bottom = this.elementTr.offsetTop + this.elementTr.offsetHeight - (this.isOffsetY ? 15 : 0);
        switch (this.bearing) {
            case 'topleft':
                this.setOnePosition(x_left, y_top);
                break;
            case 'top':
                this.setOnePosition(x_center, y_top);
                break;
            case 'topright':
                this.setOnePosition(x_right, y_top);
                break;
            case 'right':
                this.setOnePosition(x_right, y_center);
                break;
            case 'bottomright':
                this.setOnePosition(x_right, y_bottom);
                break;
            case 'bottom':
                this.setOnePosition(x_center, y_bottom);
                break;
            case 'bottomleft':
                this.setOnePosition(x_left, y_bottom);
                break;
            case 'left':
                this.setOnePosition(x_left, y_center);
                break;
            case 'center':
                this.setOnePosition(x_center, y_center);
                break;
        }
    };
    return Anchor;
}());

/**
 * table-flow-graph anchor controller
 */
var AnchorController = /** @class */ (function () {
    function AnchorController(graphInstance) {
        this.graphInstance = graphInstance;
        this.anchors = [];
        this.element = createClassElement('div', 'tfgraph-anchor-layer', graphInstance.element);
    }
    AnchorController.prototype.renderAnchors = function () {
        var _this = this;
        this.element.innerHTML = '';
        this.anchors = [];
        this.graphInstance.tableController.cells.forEach(function (cell) {
            // console.log('cell:::::::::::', cell);
            _this.createAnchors(cell);
        });
    };
    AnchorController.prototype.setHoveredAnchor = function (anchor) {
        this.hoveredAnchor = anchor;
        if (!this.graphInstance.lineController.isDrawingLine) {
            if (anchor) {
                this.graphInstance.toolbar.hintMgr.setHint('hoverAnchor');
            }
            else {
                this.graphInstance.toolbar.hintMgr.setHint('idel');
            }
        }
    };
    AnchorController.prototype.resetPosition = function () {
        if (this.anchors && this.anchors.length > 0) {
            this.anchors.forEach(function (anchor) {
                anchor.setPosition();
            });
        }
    };
    AnchorController.prototype.setAnchorsVisible = function (visible) {
        if (this.anchors && this.anchors.length > 0) {
            this.anchors.forEach(function (anchor) {
                anchor.setVisible(visible);
            });
        }
    };
    // create anchors for one cell
    AnchorController.prototype.createAnchors = function (cell) {
        for (var row = cell.row; row < cell.row + cell.rowSpan; row++) {
            for (var col = cell.column; col < cell.column + cell.colSpan; col++) {
                if (row === 0) {
                    new Anchor('top', row, col, this.graphInstance);
                    new Anchor('topright', row, col, this.graphInstance);
                    if (cell.column === 0) {
                        new Anchor('topleft', row, col, this.graphInstance);
                    }
                }
                if (col === 0) {
                    new Anchor('left', row, col, this.graphInstance);
                    new Anchor('bottomleft', row, col, this.graphInstance);
                }
                if (col === cell.column + cell.colSpan - 1) {
                    new Anchor('right', row, col, this.graphInstance);
                }
                if (row === cell.row + cell.rowSpan - 1) {
                    new Anchor('bottom', row, col, this.graphInstance);
                }
                if (col === cell.column + cell.colSpan - 1 || row === cell.row + cell.rowSpan - 1) {
                    new Anchor('bottomright', row, col, this.graphInstance);
                }
                if (cell.hasNode) {
                    if (col === cell.column) {
                        new Anchor('left', row, col, this.graphInstance, true, false);
                        if (row < cell.row + cell.rowSpan - 1) {
                            new Anchor('bottomleft', row, col, this.graphInstance, true, false);
                        }
                    }
                    if (col === cell.column + cell.colSpan - 1) {
                        new Anchor('right', row, col, this.graphInstance, true, false);
                        if (row < cell.row + cell.rowSpan - 1) {
                            new Anchor('bottomright', row, col, this.graphInstance, true, false);
                        }
                    }
                    if (row === cell.row) {
                        new Anchor('top', row, col, this.graphInstance, false, true);
                        if (col < cell.column + cell.colSpan - 1) {
                            new Anchor('topright', row, col, this.graphInstance, false, true);
                        }
                    }
                    if (row === cell.row + cell.rowSpan - 1) {
                        new Anchor('bottom', row, col, this.graphInstance, false, true);
                        if (col < cell.column + cell.colSpan - 1) {
                            new Anchor('bottomright', row, col, this.graphInstance, false, true);
                        }
                    }
                }
            }
        }
        if (!cell.hasNode) {
            new Anchor('center', cell.row, cell.column, this.graphInstance);
        }
    };
    return AnchorController;
}());

// default options
var defaultOptions = {
    totalColumns: 8,
    totalRows: 8,
    maxColumns: 12,
    maxRows: 30,
    labels: {
        editMode: 'Edit Mode',
        previewMode: 'Preview Mode',
        editColumn: 'Edit Column',
        addColumn: 'Add Column',
        deleteColumn: 'Delete Column',
        addRow: 'Add Row',
        deleteRow: 'Delete Row',
        editNode: 'Edit Node',
        addNode: 'Add Node',
        deleteNode: 'Delete Node',
        adjustNodeSize: 'Adjust Node Size',
        moveNode: 'Move Node',
        newNode: 'New Node',
        enterNodeName: 'Enter node name',
        enterColumnName: 'Enter column name',
        confirm: 'Confirm',
        cancel: 'Cancel',
        hint_drawLine: 'Click another anchor to draw new line segment; press [ESC] to undo prev line segment; press [ENTER] or double click left mouse to finish drawing',
        hint_hoverLine: 'Double click to delete this line',
        hint_hoverAnchor: 'Click to start drawing lines',
        hint_moveNode: 'Move cursor to move this node, click left mouse to confrim moving',
        hint_resizeNode: 'Move cursor to resize this node, click left mouse to confrim resizing',
    },
};
var TableFlowGraph = /** @class */ (function () {
    function TableFlowGraph(el, options) {
        var _this = this;
        this.handleResize = function () {
            // TODO detailed resize management
            // this.anchorController.resetPosition();
            _this.refresh();
        };
        this.debouncedHandleResize = debounce(this.handleResize, 500);
        this.onKeydown = function (e) {
            if (e.code === 'Enter') {
                // press enter to finish drawing line
                if (_this.lineController.isDrawingLine) {
                    _this.lineController.endDrawLine();
                }
            }
            else if (e.code === 'Escape') {
                // press esc to cancel last anchor point when drawing line
                if (_this.lineController.isDrawingLine) {
                    _this.lineController.currentDrawingLine.escapeDrawing();
                }
                if (_this.tableController.isMovingCell) {
                    _this.tableController.stopMoving();
                }
                if (_this.tableController.isResizingCell) {
                    _this.tableController.stopResizing();
                }
            }
        };
        if (!el) {
            throw new Error('no element is specified to initialize TableFlowGraph');
        }
        else {
            this.baseElement = el;
            this.baseElement.classList.add('tfgraph-wrapper');
        }
        // use id as unique key, to support multiple table-flow-graph instances in one page.
        if (this.baseElement.getAttribute('id')) {
            this.id = this.baseElement.getAttribute('id');
        }
        else {
            this.id = 'id' + (Math.random() * 100000).toFixed(0);
        }
        this.init(options);
        window.addEventListener('resize', this, false);
        window.addEventListener('keydown', this, false);
        window.addEventListener('mousemove', this, false);
        this.isAlive = true;
    }
    TableFlowGraph.prototype.init = function (options) {
        var _this = this;
        this.baseElement.innerHTML = '';
        this.options = Object.assign({}, defaultOptions, options);
        if (options.labels) {
            this.options.labels = Object.assign({}, defaultOptions.labels, options.labels);
        }
        // set totalRows
        // if (typeof this.options.rows !== 'undefined') {
        //   this.options.totalRows = this.options.rows.length;
        // }
        // set totalColumns and hasTableHeader
        if (this.options.columns && this.options.columns.length > 0) {
            this.options.totalColumns = this.options.columns.length;
            this.hasTableHeader = true;
        }
        else {
            this.options.columns = [];
            this.hasTableHeader = false;
            for (var i = 0; i < this.options.totalColumns; i++) {
                this.options.columns.push({
                    width: 'auto',
                });
            }
        }
        // restrain totalRows and totalColumns
        if (this.options.totalRows > this.options.maxRows) {
            this.options.totalRows = this.options.maxRows;
        }
        if (this.options.totalColumns > this.options.maxColumns) {
            this.options.totalColumns = this.options.maxColumns;
        }
        // filter nodes that exceeds totalRows and totalColumns
        if (this.options.nodes && this.options.nodes.length > 0) {
            this.options.nodes = this.options.nodes.filter(function (node) {
                return node.row + node.rowSpan - 1 <= _this.options.totalRows &&
                    node.column + node.colSpan - 1 <= _this.options.totalColumns;
            });
        }
        // create toolbar and edit state
        if (this.options.isEditor) {
            this.mode = 'edit';
            this.toolbar = new Toolbar(this.baseElement, this);
        }
        else {
            this.mode = 'preview';
        }
        // create root dom elements and controllers
        this.element = createClassElement('div', 'tfgraph', this.baseElement);
        if (this.mode === 'edit')
            this.element.classList.add('edit');
        this.lineController = new LineController(this);
        this.anchorController = new AnchorController(this);
        this.tableController = new Table(this);
        this.render();
    };
    TableFlowGraph.prototype.render = function () {
        var _this = this;
        // render table
        this.tableController.renderTable();
        // wait for table render ready; TODO set anchor position relative to table cells
        setTimeout(function () {
            // render anchors
            _this.anchorController.renderAnchors();
            // render lines
            _this.lineController.renderLines();
        }, 1);
    };
    // handle addEventListener events
    TableFlowGraph.prototype.handleEvent = function (event) {
        switch (event.type) {
            case 'resize':
                this.debouncedHandleResize();
                break;
            case 'mousemove':
                this.onMourseMove(event);
                break;
            case 'keydown':
                this.onKeydown(event);
                break;
        }
    };
    TableFlowGraph.prototype.onMourseMove = function (event) {
        var rect = this.element.getBoundingClientRect();
        var offsetX = event.clientX - rect.left;
        var offsetY = event.clientY - rect.top;
        this.mousePosition = { x: offsetX, y: offsetY };
        this.lineController.onMouseMove();
        this.tableController.onMouseMove();
    };
    TableFlowGraph.prototype.refresh = function (options) {
        var _this = this;
        if (!this.isAlive) {
            return;
        }
        else {
            setTimeout(function () {
                var height = _this.baseElement.getBoundingClientRect().height;
                // maintain consistent height when rerendering dom elements
                setStyles(_this.baseElement, { height: height + 'px' });
                _this.init(options ? options : _this.options);
                setStyles(_this.baseElement, { height: 'auto' });
            });
        }
    };
    TableFlowGraph.prototype.destroy = function () {
        if (!this.isAlive) {
            return;
        }
        window.removeEventListener('resize', this, false);
        window.removeEventListener('keydown', this, false);
        window.removeEventListener('mousemove', this, false);
        this.isAlive = false;
    };
    TableFlowGraph.prototype.changeMode = function (mode) {
        if (this.mode !== mode) {
            this.mode = mode;
            if (mode === 'edit') {
                this.element.classList.add('edit');
            }
            else {
                this.element.classList.remove('edit');
            }
            this.anchorController.setAnchorsVisible(mode === 'edit');
            this.tableController.renderTable();
        }
    };
    return TableFlowGraph;
}());

exports.TableFlowGraph = TableFlowGraph;
//# sourceMappingURL=index.common.js.map
