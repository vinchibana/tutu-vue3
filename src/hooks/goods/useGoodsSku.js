import powerSet from "@/utils/powerSet";
import { computed } from "vue";

export default function useGoodsSku(props, emit) {
  const updateSpecSelected = (spec, value) => {
    if (value.disabled) return;
    if (value.selected) {
      value.selected = false;
    } else {
      spec.values.forEach((item) => {
        item.selected = false;
      });
      value.selected = true;
    }
    updateDisabled(props.specs, pathMap);
    sendDataToParent(props.specs, pathMap, props.skus, emit);
  };

  const createPathMap = (skus) => {
    const pathMap = {};
    skus.forEach((sku) => {
      if (sku.inventory > 0) {
        const valueNames = sku.specs.map((item) => item.valueName);
        const maxLength = valueNames.length;
        const sets = powerSet(valueNames).filter((item) => item.length);
        sets.forEach((item) => {
          const key = item.join("_");
          const isCompleteSku = item.length === maxLength;
          if (key && !pathMap[key]) {
            if (isCompleteSku) {
              pathMap[key] = sku.id;
            } else {
              pathMap[key] = null;
            }
          }
        });
      }
    });
    return pathMap;
  };
  const pathMap = createPathMap(props.skus);
  const initDisabled = (specs, pathMap) => {
    specs.forEach((spec) => {
      spec.values.forEach((value) => {
        value.disabled = !(value.name in pathMap);
      });
    });
  };

  const updateDisabled = (specs, pathMap) => {
    specs.forEach((spec, index) => {
      const selected = JSON.parse(JSON.stringify(userSelected.value));
      specs.forEach((value) => {
        if (value.selected) return;
        selected[index] = value.name;
        const key = selected.filter((item) => item).join("_");
        value.disabled = !(key in pathMap);
      });
    });
  };

  const userSelected = computed(() => {
    const result = [];
    props.specs.forEach((spec, index) => {
      const selected = spec.values.find((item) => item.selected);
      if (selected) {
        result[index] = selected.name;
      } else {
        result[index] = undefined;
      }
    });
    return result;
  });

  const setDefaultSelected = (skuId, skus, specs) => {
    if (!skuId) return;
    const defaultSelected = skus.find((sku) => sku.id === skuId);
    specs.forEach((spec, index) => {
      spec.values.forEach((value) => {
        if (value.name === defaultSelected[index]) value.selected = true;
      });
    });
  };

  const sendDataToParent = (specs, pathMap, skus, emit) => {
    const selected = userSelected.value.filter((item) => item);
    if (selected.length === specs.length) {
      const skuId = pathMap[selected.join("_")];
      const target = skus.find((sku) => sku.id === skuId);
      emit("onSpecChange", {
        skuId,
        price: target.price,
        oldPrice: target.oldPrice,
        inventory: target.inventory,
        specsText: target.specs
          .map((spec) => `${spec.name}:${spec.valueName}`)
          .join(" "),
      });
    }
  };
  initDisabled(props.specs, pathMap);
  setDefaultSelected(props.skuId, props.skus, props.specs);

  return { updateSpecSelected, createPathMap, updateDisabled };
}
