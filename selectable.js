class selectable {
    /**
     *
     * @param {HTMLElement} boundingBox element that limits where selection can be made
     * @param {Object} options misc selection options
     */
    constructor(boundingBox = document, options = {}) {
        Object.assign(this, {
            selectBox: null,
            selectBoxSelector: '.selection',
            rootElement: document,
            boundingBox,
            boundingBoxSelector: null,
            dragging: false,
            startX: null,
            startY: null,
            endX: null,
            endY: null,
            selectables: [],
            selected: [],
            selectedSetter: null,
            selectedGetter: null,
            selectingSetter: null,
            selecting: [],
            addMode: false,
            handlers: {
                mousedown: this.mouseDown.bind(this),
                mouseup: this.mouseUp.bind(this),
                mousemove: this.mouseMove.bind(this),
            },
            renderSelected: false,
            renderSelecting: false,
            selectingClass: 'selecting',
            selectedClass: 'selected',
            firstRun: true
        }, options);

        Object.keys(this.handlers).forEach(event => this.rootElement.addEventListener(event, this.handlers[event]));
    }

    /**
     * Removes all registered event handlers and clears references to DOM nodes
     */
    detach() {
        Object.keys(this.handlers).forEach(event => this.rootElement.removeEventListener(event, this.handlers[event]));
        this.selectables = [];
        this.selectBox = null;
        this.boundingBox = null;
        this.rootElement = null;
    }

    /**
     * Updates list of selectable items
     * @param {Element[]} elements
     */
    setSelectables(elements) {
        this.selectables = elements;
        this.selected = elements.map(i => false);
        if (typeof this.selectedSetter === 'function') {
            this.selectedSetter(this.selected);
        }
    }

    /**
     * Mouse key down handler
     * @param {MouseEvent} e
     */
    mouseDown(e) {
        if (e.button !== 0) {
            return;
        }
        if (!!this.boundingBoxSelector) {
            this.boundingBox = document.querySelector(this.boundingBoxSelector);
        }
        let bb = selectable.absBox(this.boundingBox);
        if (e.pageX < bb.left || e.pageX > bb.width + bb.left ||
            e.pageY < bb.top || e.pageY > bb.height + bb.top) {
            return;
        }
        e.preventDefault();
        let [x, y] = this.bound(e);
        this.selectBox = document.querySelector(this.selectBoxSelector);
        this.startX = x;
        this.startY = y;
        this.endX = x;
        this.endY = y;
        this.dragging = true;
        this.selecting = this.selectables.map(i => false); // reset all selection
        if (typeof this.selectingSetter === 'function') {
            this.selectingSetter(this.selecting);
        }
        this.addMode = e.ctrlKey;
        if (!this.addMode) {
            this.selected = this.selecting;
            if (typeof this.selectedSetter === 'function') {
                this.selectedSetter(this.selected);
            }
        } else if (typeof this.selectedGetter === 'function') {
            let gotSelection = this.selectedGetter() || [];
            this.selected = this.selectables.map((v, i) => !!gotSelection[i]);
        }
        this.updateSelection();
        this.render();
    }

    /**
     * Mouse key up handler
     * @param {MouseEvent} e
     */
    mouseUp(e) {
        if (this.dragging) {
            if (e.button !== 0) {
                return;
            }
            e.preventDefault();
            let [x, y] = this.bound(e);
            this.endX = x;
            this.endY = y;
            this.dragging = false;
            this.updateSelection();
            if (typeof this.selectedGetter === 'function') {
                let gotSelection = this.selectedGetter() || [];
                this.selected = this.selectables.map((v, i) => !!gotSelection[i]);
            }
            this.selected = this.addMode ? this.selected.map((v, i) => v || this.selecting[i]) : this.selecting;
            if (typeof this.selectedSetter === 'function') {
                this.selectedSetter(this.selected);
            }
            this.selecting = [];
            if (this.selectingSetter) {
                this.selectingSetter(this.selecting);
            }
            this.render();
        }
    }

    /**
     * Mouse move handler
     * @param {MouseEvent} e
     */
    mouseMove(e) {
        if (this.dragging) {
            let [x, y] = this.bound(e);
            this.endX = x;
            this.endY = y;
            this.updateSelection();
            this.render();
        }
    }

    /**
     * Returns [x, y] coordinates from mouse event limited to selection area
     * @param {MouseEvent} e
     * @return {[int, int]}
     */
    bound(e) {
        let bb = selectable.absBox(this.boundingBox);
        return [
            Math.min(Math.max(bb.left, e.pageX), bb.width + bb.left),
            Math.min(Math.max(bb.top, e.pageY), bb.height + bb.top)
        ];
    }

    /**
     * Returns element's absolute position (on the page) and size
     * @param {Element} element
     * @return {{top: number, left: number, width: Number, height: Number}}
     */
    static absBox(element) {
        let box = element.getBoundingClientRect();

        return { top: box.top + window.scrollY, left: box.left + window.scrollX, width: box.width, height: box.height };
    }

    /**
     * Updates list of selected items (under current selection box)
     */
    updateSelection() {
        let s = this.getSelectionBox();
        this.selecting = this.selectables.map(selectable.absBox).map(b =>
            (Math.abs((s.left - b.left) * 2 + s.width - b.width) < (s.width + b.width)) &&
            (Math.abs((s.top - b.top) * 2 + s.height - b.height) < (s.height + b.height))
        );
        if (this.selectingSetter) {
            this.selectingSetter(this.selecting);
        }
    }

    /**
     * Gets size and relative position of selection box
     * @return {{left: number, top: number, width: number, height: number}}
     */
    getSelectionBox() {
        return {
            left: Math.min(this.startX, this.endX),
            top: Math.min(this.startY, this.endY),
            width: Math.abs(this.startX - this.endX),
            height: Math.abs(this.startY - this.endY)
        };
    }

    /**
     * Renders visible state for selectable items
     */
    renderSelection() {
        if (!this.renderSelected && !this.renderSelecting) {
            return;
        }
        this.selectables.forEach((e, i) => {
            if (this.renderSelecting) {
                if (this.dragging && !!this.selecting[i]) {
                    e.classList.add(this.selectingClass);
                } else {
                    e.classList.remove(this.selectingClass);
                }
            }
            if (this.renderSelected) {
                if (!this.selected[i]) {
                    e.classList.remove(this.selectedClass);
                } else {
                    e.classList.add(this.selectedClass);
                }
            }
        });
    }

    /**
     * Renders current selection state
     */
    render() {
        let elStyle = this.selectBox.style;
        if (this.dragging) {
            let box = this.getSelectionBox();
            let bb = selectable.absBox(this.boundingBox);
            elStyle.display = 'block';
            if (this.firstRun) {
                let selectBoxStart = selectable.absBox(this.selectBox);
                this.selectBoxStartX = bb.left - selectBoxStart.left;
                this.selectBoxStartY = bb.top - selectBoxStart.top;
                this.firstRun = false;
            }
            elStyle.left = (box.left - bb.left + this.selectBoxStartX) + 'px';
            elStyle.top = (box.top - bb.top + this.selectBoxStartY) + 'px';
            elStyle.width = box.width + 'px';
            elStyle.height = box.height + 'px';
        } else {
            elStyle.display = 'none';
        }
        this.renderSelection();
    }
}

export default selectable;
