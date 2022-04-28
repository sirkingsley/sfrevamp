import { OwlOptions } from 'ngx-owl-carousel-o';

export const owlCustomOptions: OwlOptions = {
  loop: true,
  margin: 10,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,
  dots: false,
  autoplay: true,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 4
    }
  },
  nav: true
};

export const owlExtraProductImagesOptions: OwlOptions = {
  loop: true,
  margin: 10,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,
  dots: false,
  autoplay: false,
  autoWidth: false,
  navSpeed: 700,
  navText: ['', ''],
  items: 6,
  nav: true
};

export const servicesCarouselConfig: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,
  autoplay: false,
  dots: false,
  animateOut: 'fadeOut',
  animateIn: 'fadeIn',
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 1
    },
    740: {
      items: 3
    },
    940: {
      items: 3
    }
  },
  nav: false
};
