import selectable from './selectable';

const vueSelectable = {
    twoWay: true,

    params: ['selecting', 'items', 'box', 'constraint'],

    bind(el, binding) {
        // Vue.js v2
        if (!!el && !!binding) {
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
        } else {
            // Vue.js v1
            let params = this.el.dataset;
            this.el.selectable = new selectable(
                !!this.params.constraint ? document.querySelector(params.constraint) : this.el,
                {
                    boundingBoxSelector: params.constraint,
                    selectBoxSelector: params.box || '.selection',
                    selectedSetter: v => this.vm.$set(this.expression, v),
                    selectedGetter: () => this.vm.$get(this.expression),
                    selectingSetter: (!!params && !!params.selecting) ?
                        v => this.vm.$set(params.selecting, v) : null
                }
            );
            this.el.selectable.setSelectables(Array.from(this.el.querySelectorAll(params.items || '.selectable')));
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
