import { SwiperOptions } from "swiper";

export const swiperConfig: SwiperOptions = {
  slidesPerView: 2,
  grid: {
    rows: 3,
    fill: 'row',
  },
  spaceBetween: 20,
  navigation: true,
  pagination: { clickable: true },
  scrollbar: { draggable: true },
};
