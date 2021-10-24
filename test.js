// class Data extends Proxy ... can't
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

const d = new Data();
console.log(d);
d.addListener((target, prop, val) => {
  console.log("set", target, prop, val);
});
d.addListener((target, prop, val) => {
  console.log("set2", target, prop, val);
});
d.name = "abc";
d.count = 10;
d.count++;
d.map = { a: 1, b: "abc" };
d.ar = [1, 2, 3, 4];
console.log(d.count);
for (const name in d) {
  console.log(name, d[name]);
}
delete d.map;
for (const name in d) {
  console.log(name, d[name]);
}
console.log(d.toString());
