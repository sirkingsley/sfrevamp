import { SwiperOptions } from "swiper";

export const config: SwiperOptions = {
  slidesPerView: 1,
  //spaceBetween: 50,
  //navigation: true,
  pagination: { clickable: true },
  scrollbar: { draggable: true },
};

export const config2: SwiperOptions = {
  slidesPerView: 1,
  //spaceBetween: 100,
  // navigation: true,
  pagination: { clickable: true },
  scrollbar: { draggable: true },
};

export const config3: SwiperOptions = {
  slidesPerView: 1,
  //spaceBetween: 100,
  navigation: true,
  pagination: { clickable: true },
  scrollbar: { draggable: true },
};

export const config4: SwiperOptions = {
  slidesPerView: 1,
  //spaceBetween: 100,
  navigation: true,
  pagination: false,
  scrollbar: { draggable: true },
};

export const retlatedProductsConfig: SwiperOptions = {
  slidesPerView: 3,
  // spaceBetween: 5,
  //navigation: true,
  pagination: { clickable: true },
  scrollbar: { draggable: true },
  autoplay: {
    delay: 5000,
  },

};

