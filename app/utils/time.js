import { curry } from 'lodash';
import moment from 'moment';
/**
 * 函数计算当前日前前后两周的所有日期
 * @param num 前后几周
 */
export function time(now, num = 1) {
  const day = now.getDay(); // 获取当前星期(0-6)
  const calDiff = curry(getDay)(now);
  const arr = [];
  for (let i = 0; i < 7; i++) {
    arr.push(calDiff(i - day));
  }
  const calDiff2 = curry(getDay)(arr[0]);
  const calDiff3 = curry(getDay)(arr[6]);
  for (let i = 1; i <= 7 * num; i++) {
    arr.unshift(calDiff2(-i));
    arr.push(calDiff3(i));
  }
  return {
    now: 7 * num + day,
    tabs: arr,
  };
}

function getDay(now, diff) {
  return moment(now).add(diff, 'day');
}
