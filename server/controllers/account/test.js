const start = new Date("July 20, 2022 00:00:00 GMT+00:00");
const end = new Date("July 21, 2022 00:00:00 GMT+00:00");
const o = end.getTime() - start.getTime();
console.log(o / (3600 * 24 * 1000));
