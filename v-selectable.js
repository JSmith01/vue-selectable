import selectable from './selectable';

const vueSelectable = {
    twoWay: false,

    params: ['items', 'box', 'constraint'],

    bind(el, binding) {
        // Vue.js v2
        if (!!el && !!binding) {
            let arg = binding.value;
            el.selectable = new selectable(
                {
                    boundingBox: !!el.dataset.constraint ? document.querySelector(el.dataset.constraint) : el,
                    selectBoxSelector: el.dataset.box || '.selection',
                    boundingBoxSelector: el.dataset.constraint,
                    selectedSetter: arg.selectedSetter,
                    selectedGetter: arg.selectedGetter,
                    selectingSetter: arg.selectingSetter
                }
            );
            el.selectable.setSelectables(Array.prototype.slice.call(el.querySelectorAll(el.dataset.items || '.selectable')));
        } else {
            // Vue.js v1
            let params = this.el.dataset;
            this.el.selectable = new selectable(
                {
                    boundingBox: !!this.params.constraint ? document.querySelector(params.constraint) : this.el,
                    boundingBoxSelector: params.constraint,
                    selectBoxSelector: params.box || '.selection'
                }
            );
            this.el.selectable.setSelectables(Array.prototype.slice.call(this.el.querySelectorAll(params.items || '.selectable')));
        }
    },

    update(value) {
        if (!!this && !!this.el && !this.el.selectable.selectedSetter) {
            // Vue.js v1 - init setters/getters
            this.el.selectable.selectedSetter = value.selectedSetter;
            this.el.selectable.selectedGetter = value.selectedGetter;
            this.el.selectable.selectingSetter = value.selectingSetter;
        }
    },

    unbind(el) {
        if (el) {
            // Vue.js v2
            el.selectable.detach();
            el.selectable = null;
        } else {
            // Vue.js v1
            this.el.selectable.detach();
            this.el.selectable = null;
        }
    }
};

export default vueSelectable;

/**
 *
 * @param {HTMLElement} el Element where v-selectable directive applied
 * @param {string} itemSelector CSS selector of elements to be used as selectable items
 * @return {number} number of selectable items or -1 if
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
