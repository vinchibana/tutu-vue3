<template>
  <div></div>
</template>

<script>
import { useVModel } from "@vueuse/core";

export default {
  name: "Tabs",
  props: {
    active: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { slots, emit }) {
    const defaults = slots.default && slots.default();
    const titles = [];
    const contents = [];
    defaults.forEach((item) => {
      if (typeof item.type === "symbol") {
        item.children.forEach((child) => {
          if (child.type.name === "TabTitle") {
            titles.push(child);
          } else {
            contents.push(child);
          }
        });
      } else {
        if (item.type.name === "TabTitle") {
          titles.push(item);
        } else {
          contents.push(item);
        }
      }
    });
    const index = useVModel(props, "active", emit);
    const onTabTitleClick = (value) => {
      index.value = value;
    };

    return () => (
      <div className="xtx-tabs">
        <nav>
          {titles.map((title, i) => (
            <a
              href="javascript:"
              onClick={() => onTabTitleClick(i)}
              className={i === index.value ? "active" : ""}
            >
              {title}
            </a>
          ))}
        </nav>
        {contents.map((item, i) => (
          <div className={i === index.value ? "active" : ""}>{{ item }}</div>
        ))}
      </div>
    );
  },
};
</script>

<style lang="less" scoped>
.xtx-tabs {
  background: #fff;
  > nav {
    height: 60px;
    line-height: 60px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    > a {
      width: 110px;
      border-right: 1px solid #f5f5f5;
      text-align: center;
      font-size: 16px;
      &.active {
        border-top: 2px solid @xtxColor;
        height: 60px;
        background: #fff;
        line-height: 56px;
      }
    }
  }
  > div {
    display: none;
    &.active {
      display: block;
    }
  }
}

.order-list {
  background: #fff;
  padding: 20px;
  position: relative;
}
.order-item {
  margin-bottom: 20px;
  border: 1px solid #f5f5f5;
  .head {
    height: 50px;
    line-height: 50px;
    background: #f5f5f5;
    padding: 0 20px;
    overflow: hidden;
    span {
      margin-right: 20px;
      &.down-time {
        margin-right: 0;
        float: right;
        i {
          vertical-align: middle;
          margin-right: 3px;
        }
        b {
          vertical-align: middle;
          font-weight: normal;
        }
      }
    }
    .del {
      margin-right: 0;
      float: right;
      color: #999;
    }
  }
  .body {
    display: flex;
    align-items: stretch;
    .column {
      border-left: 1px solid #f5f5f5;
      text-align: center;
      padding: 20px;
      > p {
        padding-top: 10px;
      }
      &:first-child {
        border-left: none;
      }
      &.goods {
        flex: 1;
        padding: 0;
        align-self: center;
        ul {
          li {
            border-bottom: 1px solid #f5f5f5;
            padding: 10px;
            display: flex;
            &:last-child {
              border-bottom: none;
            }
            .image {
              width: 70px;
              height: 70px;
              border: 1px solid #f5f5f5;
            }
            .info {
              width: 220px;
              text-align: left;
              padding: 0 10px;
              p {
                margin-bottom: 5px;
                &.name {
                  height: 38px;
                }
                &.attr {
                  color: #999;
                  font-size: 12px;
                  span {
                    margin-right: 5px;
                  }
                }
              }
            }
            .price {
              width: 100px;
            }
            .count {
              width: 80px;
            }
          }
        }
      }
      &.state {
        width: 120px;
        .green {
          color: @xtxColor;
        }
      }
      &.amount {
        width: 200px;
        .red {
          color: @priceColor;
        }
      }
      &.action {
        width: 140px;
        a {
          display: block;
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}
</style>
