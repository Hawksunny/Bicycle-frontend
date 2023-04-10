/**
 * 防抖函数
 * @param  {Function} func
 * @param  {Number} delay
 * @return {Function}
 */
export function debounce(func, delay) {
  let timer = null;
  return function (...arg) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, arg);
    }, delay);
  };
}
