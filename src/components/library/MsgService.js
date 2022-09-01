import Message from "@/components/library/Message";
import { createVNode, render } from "vue";

const container = document.createElement("div");
document.body.appendChild(container);

export default function MsgService({ type, text, time = 3000 }) {
  let timer = null;
  const TIME = time;
  const oDiv = document.createElement("div");
  const vnode = createVNode(Message, { type, text });
  container.appendChild(oDiv);
  render(vnode, oDiv);

  clearTimeout(timer);
  timer = setTimeout(() => {
    vnode.component.proxy.show = false;
    render(null, container);
    setTimeout(() => {
      container.removeChild(oDiv);
    }, TIME);
  });
}
