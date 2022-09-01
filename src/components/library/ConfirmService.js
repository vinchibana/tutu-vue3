import Confirm from "@/components/library/Confirm";
import { createVNode, render } from "vue";

const container = document.createElement("div");
document.body.appendChild(container);

export default function ConfirmService({ title, content }) {
  return new Promise((resolve, reject) => {
    const onConfirmHandler = () => {
      resolve();
      onRemoveFade();
    };

    const onCancelHandler = () => {
      reject();
      onRemoveFade();
    };
    const vnode = createVNode(Confirm, {
      title,
      content,
      onConfirm: onConfirmHandler,
      onCancel: onCancelHandler,
    });
    render(vnode, container);
    const onRemoveFade = () => {
      vnode.el.classList.remove("fade");
      vnode.el.children[0].classList.remove("fade");
      setTimeout(() => {
        render(null, container);
      }, 400);
    };

    setTimeout(() => {
      vnode.el.classList.add("fade");
      vnode.el.children[0].classList.add("fade");
    });
  });
}
