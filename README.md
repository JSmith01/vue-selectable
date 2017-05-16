# vue-selectable

## Overview

It's common task to make mouse selection of some objects on the page. This directive makes this task
extremely easy, all you need to implement object selection is few lines of code.
It was designed after jQuery Selectable interaction, with some details borrowed from `angular-multiple-selection`.
Now it supports plain mouse selection and adding to previously selected values with
`Ctrl` key pressed during selection.

## Requirements

* vue: ^1.0
* vue2: ^2.0
* Browsers - briefly tested on Chrome 58, IE 11, Firefox 53

## Install

From npm:
```
$ npm install vue-selectable  --save
```

## Usage

To use directive normally you'll need two arrays, one for selected items - with boolean values for 
every selectable item, another for items under selection box. By default elements identified by
`selectable` class will be considered as selectable items.
Another thing that you'll definitely need is a element that will be selection box. Directive
will change `height`, `width`, `top`, and `left` attributes of this element, and toggle its
visibility by changing `display` attribute from `block` to `none` and vise versa.

### Vue 1.x (ES6 syntax)

NB: for Vue 2.x all you need is to write `v-for` as `v-for="(item, i) in items"`

```html
<div v-selectable="{ 
         selectedGetter: selectedGetter, 
         selectedSetter: selectedSetter, 
         selectingSetter: selectingSetter
         }" id="app">
        <div class="selection"></div>
        <div v-for="(i, item) in items"
             :class="{ selected: !!selected[i], selecting: !!selecting[i] }"
         	 class="selectable" >{{ item }}</div>
</div>
```

```js
import selectable from 'vue-selectable';

new Vue({
	el: '#app',
    data: {
        selected: [],
        selecting: [],
        items: ['abc', 'bcd', 'cde']
    },
    directives: { selectable },
    methods: {
        selectedGetter() { return this.selected; },
        selectedSetter(v) { this.selected = v; },
        selectingSetter(v) { this.selecting = v; }
    }
});
```

Selection items list in directive can be updated by calling `setSelectableItems(el, itemSelector)`,
where `el` is element where directive applied. Optional argument `itemSelector` can be used to change
selectable items selector. Function returns number of selectable items added or -1 in case of error.

## Options

`v-selectable` requires one mandatory parameter - directive parameter - object with 3 functions,
`selectedGetter`, `selectedSetter`, and `selectingSetter`, to get/set arrays 'selected' (selection 
status - array of boolean), 'selecting' (array of items selection status during selection drag, 
array of boolean; must be used to display realtime selection visual feedback). 

If you have 5 selectable items, `selected` array will have 5 elements initially
set to `false`. When user selects some item(s), values change to `true` accordingly. The same applies
for `selecting` array.

Other parameters available:
* `data-items` - CSS selector to identify selectable items, by default it is set to `.selectable`
  (elements with CSS class "selectable")
* `data-box` - selection box element. By default it tries to use element with `selection` CSS class
* `data-constraint` - box that constrains selection area (selection box can be only inside area
  limited to this element), by default selection area limited to element with directive

## Examples

Example usages can be found in `examples` directory for Vue.js v1 and `examples2` for Vue.js v2.
Examples for v2 were tested against version 2.3.3.

## License

[MIT](http://opensource.org/licenses/MIT)