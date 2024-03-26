export function deBounce(func, wait) {
  let timeOut = null;
  return function (...args) {
    clearTimeout(timeOut); //一定要清除定时器
    timeOut = setTimeout(() => {
      func(...args);
    }, wait);
  };
}
