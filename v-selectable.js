import selectable from './selectable';

const vueSelectable = {
    twoWay: true,

    params: ['selecting', 'items', 'box', 'constraint'],

    bind() {
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
    },

    update(newValue, oldValue) {
        // do something based on the updated value
        // this will also be called for the initial value
    },

    unbind() {
        this.el.selectable.detach();
        this.el.selectable = null;
    }
};

export default vueSelectable;
