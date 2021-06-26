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
};

observe(o);

console.log(o.a.m.n)
