/**
 * 封装全局信息提示 JS 组件
 * 创建容器并挂载至body —— Message 组件渲染成虚拟 DOM 对象并挂载至 container，在页面中渲染
 * 设定定时器，清空 container 中内容并移除子元素
 */

import Message from "@/components/library/Message";
import { createVNode, render } from "vue";

const container = document.createElement("div");
document.body.appendChild(container);

// 接收类型、文本两个参数（默认消失时长 3s）
export default function MsgService({ type, text, time = 3000 }) {
  let timer = null;
  const TIME = time; // 销毁时间
  const oDiv = document.createElement("div");
  // 将目标vue组件渲染成虚拟 DOM 对象
  const vnode = createVNode(Message, { type, text });
  container.appendChild(oDiv);
  render(vnode, oDiv);

  clearTimeout(timer);
  // setTimeout 返回一个 id，可供 clearTimeout 清理
  timer = setTimeout(() => {
    vnode.component.proxy.show = false;
    // 清空 div 内容，移除子元素
    render(null, container);
    setTimeout(() => container.removeChild(oDiv), 50);
  }, TIME);
}
