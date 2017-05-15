import selectable from './selectable';

const vueSelectable = {
    twoWay: true,

    params: ['selecting', 'items', 'box', 'constraint'],

    /**
     * Init directive
     * @param {HTMLElement} el
     * @param binding
     */
    bind(el, binding) {
        let arg = binding.value;
        el.selectable = new selectable(
            !!el.dataset.constraint ? document.querySelector(el.dataset.constraint) : el,
            {
                selectBoxSelector: el.dataset.box || '.selection',
                boundingBoxSelector: el.dataset.constraint,
                selectedSetter: arg.selectedSetter,
                selectedGetter: arg.selectedGetter,
                selectingSetter: arg.selectingSetter
            }
        );
        el.selectable.setSelectables(Array.from(el.querySelectorAll(el.dataset.items || '.selectable')));
    },

    update(newValue, oldValue) {
        // do something based on the updated value
        // this will also be called for the initial value
    },

    unbind(el) {
        el.selectable.detach();
        el.selectable = null;
    }
};

export default vueSelectable;
