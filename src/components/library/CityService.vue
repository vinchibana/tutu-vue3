<!-- 城市选择菜单组件 -->
<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggle" :class="{ active: visible }">
      <!-- 占位文字与实际选择地址之间切换显示 -->
      <span class="placeholder" v-if="!location">请选择配送地址</span>
      <span class="value" v-else>{{ location }}</span>
    </div>

    <div class="option" v-if="visible">
      <template v-if="list">
        <!-- 点击行政区划名触发 selectCityData 进入下一级-->
        <span
          class="ellipsis"
          v-for="item in list"
          :key="item.code"
          @click="selectCityData(item)"
          >{{ item.name }}</span
        >
      </template>
      <template v-else>
        <div class="loading"></div>
      </template>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref } from "vue";
import axios from "axios";
import { onClickOutside } from "@vueuse/core";

export default {
  name: "CityService",
  props: {
    location: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    // 下拉菜单是否显示
    const visible = ref(false);
    // 下拉菜单元素，元素外点击隐藏菜单
    const target = ref(null);
    const cityData = ref(null);

    // 点开菜单时获取城市列表数据
    const show = async () => {
      cityData.value = await getCityData();
      visible.value = true;
    };
    const hide = () => {
      visible.value = false;
      for (const attr in selectedCityData) {
        selectedCityData[attr] = "";
      }
    };

    const toggle = () => {
      visible.value ? hide() : show();
    };

    // 点击城市选择菜单外的区域时将菜单隐藏
    onClickOutside(target, () => {
      hide();
    });

    // reactive 更适合定义复杂的数据类型（json/arr），可以深层解包
    // ref 适合定义基本数据类型（可接收基本数据类型和对象）
    const selectedCityData = reactive({
      provinceCode: "",
      cityCode: "",
      countyCode: "",
      provinceName: "",
      cityName: "",
      countyName: "",
      location: "",
    });

    const selectCityData = (data) => {
      // 将用户选择的结果赋值给此前定义的 reactive - selectedCityData
      // code 用于计算渲染下一级，name 用于拼接显示名称
      if (data.level === 0) {
        selectedCityData.provinceCode = data.code;
        selectedCityData.provinceName = data.name;
      } else if (data.level === 1) {
        selectedCityData.cityCode = data.code;
        selectedCityData.cityName = data.name;
      } else {
        selectedCityData.countyCode = data.code;
        selectedCityData.countyName = data.name;
        selectedCityData.location = `${selectedCityData.provinceName} ${selectedCityData.cityName} ${selectedCityData.countyName}`;
      }
    };

    // 循环展示三级列表
    // 计算属性 list 依赖响应式状态 cityData 和 selectedCityData
    const list = computed(() => {
      let list = cityData.value;
      if (selectedCityData.provinceCode) {
        list = list.find(
          (province) => province.code === selectedCityData.provinceCode
        ).areaList;
      }
      if (selectedCityData.cityCode) {
        list = list.find(
          (city) => city.code === selectedCityData.cityCode
        ).areaList;
      }
      if (selectedCityData.countyCode) {
        // 选择到最后一级，触发 onCityChanged 事件
        emit("onCityChanged", { ...selectedCityData });
        list = cityData.value;
        hide();
      }
      return list;
    });
    return { visible, target, selectedCityData, selectCityData, list, toggle };
  },
};
window.cityData = null;
async function getCityData() {
  if (window.cityData) return window.cityData;
  const res = await axios.get(
    "https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json"
  );
  return (window.cityData = res.data);
}
</script>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
    .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>
