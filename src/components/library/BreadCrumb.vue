<script>
import { h } from "vue";
export default {
  name: "BreadCrumb",
  render() {
    const slots = this.$slots.default && this.$slots.default();
    let children = [];
    slots.forEach((item, index) => {
      children.push(item);
      if (index < slots.length - 1) {
        children.push(h("i", { class: "iconfont icon-angle-right" }));
      }
    });
    return h("div", { class: "xtx-bread" }, children);
  },
};
</script>

<style scoped lang="less">
.xtx-bread {
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      transition: all 0.4s;
      &:hover {
        color: @xtxColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
