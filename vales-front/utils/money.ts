type Money = {
  number: number;
  value: number;
};

//Conversion function.
const toCents = (val: number) => val * 100;
const toNum = (val: number) => Math.round(val) / 100;

//Integer conversion.
const toInt = (a: any) => {
  const x = Number(a);
  return x < 0 ? Math.ceil(x) : Math.floor(x);
};

//Detector functions.
const isSafe = (n: any) =>
  typeof n === "number" &&
  Math.round(n) === n &&
  Number.MIN_SAFE_INTEGER <= n &&
  n <= Number.MAX_SAFE_INTEGER;

const isEqual = (a: Money, b: Money) =>
  Math.abs(a.number - b.number) < Number.EPSILON;

const isValNaN = (value: any) => typeof value === "number" && isNaN(value);

//Comparer functions.
const isLte = (a: Money, b: Money) => a.value <= b.value;
const isGte = (a: Money, b: Money) => a.value >= b.value;
const isLt = (a: Money, b: Money) => a.value < b.value;
const isGt = (a: Money, b: Money) => a.value > b.value;

//Money constructor.
const money = (number: number | null, value: number) => {
  const moneyResult = number
    ? { number, value: toCents(number) }
    : { number: toNum(value), value };

  if (!isSafe(moneyResult.value))
    throw new Error("Number exced integer SAFE range");

  return moneyResult;
};

//Arithmetic operators.
const add = (a: Money, b: Money) => money(null, a.value + b.value);
const sub = (a: Money, b: Money) => money(null, a.value - b.value);
const mul = (a: Money, b: Money) => money(null, a.value * b.value);
const div = (a: Money, b: Money) => money(null, a.value / b.value);

module.exports = {
  isSafe,
  isEqual,
  isValNaN,
  toInt,
  toCents,
  toNum,
  money,
  isLte,
  isGte,
  isLt,
  isGt,
  add,
  sub,
  mul,
  div,
};
