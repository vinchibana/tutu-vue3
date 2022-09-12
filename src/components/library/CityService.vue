<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggle" :class="{ active: visible }">
      <span class="placeholder" v-if="!location">请选择配送地址</span>
      <span class="value" v-else>{{ location }}</span>
    </div>

    <div class="option" v-if="visible">
      <template v-if="list">
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
    // 下拉元素
    const target = ref(null);

    const cityData = ref(null);
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

    onClickOutside(target, () => {
      hide();
    });

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
        emit("onCityChanged", { ...selectedCityData });
        list = cityData.value;
        hide();
      }
      return list;
    });
    return { visible, target, selectedCityData, selectCityData, list,toggle };
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
