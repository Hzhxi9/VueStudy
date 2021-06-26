import defineReactive from "./defineReactive";
import observe from "./observe";
import Observer from "./Observer";

const o = {
  a: {
    m: {
      n: 66,
    },
  },
  b: 10,
  g: [1, 2],
};

observe(o);

console.log(o.a.m.n);

o.g.push(3);

console.log(o.g)
