

// export let supportsPassive = false;

// export function on(
//   target,
//   event,
//   handler,
//   passive = false
// ) {
//   if (!isServer) {
//     target.addEventListener(
//       event,
//       handler,
//       supportsPassive ? { capture: false, passive } : false
//     );
//   }
// }

// export function off(target, event, handler) {
//   if (!isServer) {
//     target.removeEventListener(event, handler);
//   }
// }

// export function stopPropagation(event) {
//   event.stopPropagation();
// }

// export function preventDefault(event, isStopPropagation) {
//   /* istanbul ignore else */
//   if (typeof event.cancelable !== 'boolean' || event.cancelable) {
//     event.preventDefault();
//   }

//   if (isStopPropagation) {
//     stopPropagation(event);
//   }
// }

const overflowScrollReg = /scroll|auto/i;

export function getScroller(el, root = window) {
  let node = el;

  while (
    node &&
    node.tagName !== 'HTML' &&
    node.nodeType === 1 &&
    node !== root
  ) {
    const { overflowY } = window.getComputedStyle(node);

    if (overflowScrollReg.test(overflowY)) {
      if (node.tagName !== 'BODY') {
        return node;
      }

      const { overflowY: htmlOverflowY } = window.getComputedStyle(
        node.parentNode
      );

      if (overflowScrollReg.test(htmlOverflowY)) {
        return node;
      }
    }
    node = node.parentNode;
  }

  return root;
}




export function getQueryString(key) {
var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
var r = window.location.search.substr(1).match(reg);
if (r != null) return unescape(r[2]);
return null;
}

export function dateFormat(date,format = 'yyyy-MM-dd HH:mm:ss') {
  let o = {
      'M+' : date.getMonth() + 1,                 //月份
      'd+' : date.getDate(),                    //日
      'H+' : date.getHours(),                   //小时
      'h+' : date.getHours(),                   //小时
      'm+' : date.getMinutes(),                 //分
      's+' : date.getSeconds(),                 //秒
      'q+' : Math.floor((date.getMonth() + 3) / 3), //季度
      'S'  : date.getMilliseconds()             //毫秒
  };
  if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
          format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
      }
  }
  return format;
}


/**
 * @method divideArr
 * @description 根据属性将数组分组
 * @param {arr: object[], attribute: string, list: string}
 * @return {newArr: obejct[]} 
 * @author qian.wan
 * 
 */
export function  divideArr( {arr = [], attribute = 'name', list = 'list'} ={}) {
  const map = new Map();
  return arr.reduce( (pre, cur) => {
    const index = map.get(cur[attribute]);
    if (index !== undefined) {
      pre[index][list].push(cur);
    } else {
      pre.push({
        [attribute]: cur[attribute],
        [list]: [cur]
      });
      map.set(cur[attribute], pre.length - 1);
    }
    return pre;
}, []);
}

