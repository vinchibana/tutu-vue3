import defaultImg from "@/assets/images/200.png";

const lazy = {
  mounted(el, binding) {
    const observer = new IntersectionObserver(
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          observer.unobserve(el);
          el.src = binding.value;
          el.onerror = () => {
            el.src = defaultImg;
          };
        }
      },
      {
        threshold: 0,
      }
    );
    observer.observe(el);
  },
};

export default function directiveLazy(app) {
  app.directive("lazy", lazy);
}
