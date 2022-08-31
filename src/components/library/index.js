import Carousel from "@/components/library/Carousel";
import CheckMore from "@/components/library/CheckMore";
import directiveLazy from "@/components/directives/lazy";
import BreadCrumb from "@/components/library/BreadCrumb";
import BreadItem from "@/components/library/BreadItem";
import NumberBox from "@/components/library/NumberBox";
import CartButton from "@/components/library/CartButton";

export default {
  install(app) {
    app.component(Carousel.name, Carousel);
    app.component(CheckMore.name, CheckMore);
    app.component(BreadCrumb.name, BreadCrumb);
    app.component(BreadItem.name, BreadItem);
    app.component(NumberBox.name, NumberBox);
    app.component(CartButton.name, CartButton);
    directiveLazy(app);
  },
};
