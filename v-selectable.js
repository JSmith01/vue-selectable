import selectable, { objectAssignSimple } from './selectable';

const objectAssign = Object.assign || objectAssignSimple;

function initSelectable(el, params, arg) {
    el.selectable = new selectable(objectAssign({
        boundingBox: !!params.constraint ? document.querySelector(params.constraint) : el,
        selectBoxSelector: params.box || '.selection',
        boundingBoxSelector: params.constraint
    }, arg));
    el.selectable.setSelectables(Array.prototype.slice.call(el.querySelectorAll(params.items || '.selectable')));
}

const vueSelectable = {
    twoWay: false,

    params: ['items', 'box', 'constraint'],

    bind(el, binding) {
        let arg, params;
        if (!!el && !!binding) {
            // Vue.js v2
            arg = binding.value;
            params = el.dataset;
            initSelectable(el, params, arg);
        }
    },

    update(value) {
        if (!!this && !!this.el && !this.el.selectable) {
            // Vue.js v1 - init selectable
            initSelectable(this.el, this.el.dataset, value);
        }
    },

    unbind(el) {
        if (!el) {
            el = this.el;
        }
        el.selectable.detach();
        el.selectable = null;
    }
};

export default vueSelectable;

/**
 * Allows to change internal selectable items list
 * @param {HTMLElement} el Element where v-selectable directive applied
 * @param {string} itemSelector (optional) CSS selector of elements to be used as selectable items
 * @return {number} number of selectable items or -1 if no selectable component found
 */
export function setSelectableItems(el, itemSelector) {
    if (!!el && !!el.selectable && typeof el.selectable.setSelectables === 'function') {
        let items = Array.prototype.slice.call(el.querySelectorAll(itemSelector || el.dataset.items || '.selectable'));
        el.selectable.setSelectables(items);
        return items.length;
    } else {
        return -1;
    }
}
