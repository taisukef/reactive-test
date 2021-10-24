class ReactiveInput extends HTMLElement {
  constructor(data) {
    super();
    this.data = data;
    const inp = document.createElement("input");
    this.appendChild(inp);
    inp.value = data.value;

    const redraw = () => {
      inp.value = this.data.value;
    };
    data.addListener(() => {
      redraw();
    });
    redraw();
  }
}

customElements.define("reactive-input", ReactiveInput);

export { ReactiveInput };
