class BitCheckboxes extends HTMLElement {
  constructor(data, bits = 8) {
    super();
    this.data = data;
    for (let i = 0; i < bits; i++) {
      const div = document.createElement("div");
      const span = document.createElement("span");
      span.textContent = 1 << (bits - i - 1);
      const inp = document.createElement("input");
      inp.type = "checkbox";
      div.appendChild(span);
      div.appendChild(inp);
      this.appendChild(div);
    }
    const redraw = () => {
      const inps = this.querySelectorAll("input");
      let i = 0;
      const v = data.value;
      for (const inp of inps) {
        inp.checked = (v & (1 << bits - i - 1)) != 0;
        i++;
      }
    };
    data.addListener(() => {
      redraw();
    });
    redraw();
  }
}

customElements.define("bit-checkboxes", BitCheckboxes);

export { BitCheckboxes };
