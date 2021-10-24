class Data {
  constructor() {
    const p = new Proxy({}, {
      set(target, prop, val) {
        target[prop] = val;
        if (p.listeners) {
          p.listeners.forEach(l => l(target, prop, val));
        }
        return true;
      },
      deleteProperty(target, prop) {
        delete target[prop];
        if (p.listeners) {
          p.listeners.forEach(l => l(target, prop, undefined));
        }
        return true;
      },
      ownKeys(target) {
        return Object.keys(target).filter(name => {
          name != "addListener" &&
          name != "listeners" &&
          name != "toString"
        });
      },
    });
    p.addListener = (l) => {
      if (!p.listeners) {
        p.listeners = [l];
      } else {
        p.listeners.push(l);
      }
    };
    /*
    p.toString = () => {
      const s = [];
      console.log("p", p);
      for (const name in p) {
        s.push(`${name}: ${p[name]}`);
      }
      return "{ " + s.join(", ") + "}";
    };
    */
    return p;
  }
}

export { Data };
