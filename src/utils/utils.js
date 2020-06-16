import { Message } from "element-ui";

export let message = (message, type) => {
  Message({
    message: message,
    type: type,
    duration: 5 * 1000
  });
}

export let nowSize = (val, initWidth = 1920) => {
  let nowClientWidth = document.documentElement.clientWidth;
  return val * (nowClientWidth / initWidth);
}