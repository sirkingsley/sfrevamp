 import { OwlOptions } from "ngx-owl-carousel-o";
 //categories Carousel options
 export const customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,
  dots: false,
  autoplay:true,
  autoplayTimeout:10000,
  autoplayHoverPause:true,
  autoplaySpeed: 4000,
  navSpeed: 400,
  navText: [
    '<button type="button" class="left_arrow"><i class="fal fa-angle-left"></i></button>', '<button type="button" class="right_arrow"><i class="fal fa-angle-right"></i></button>'
  ],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 1
    },
    740: {
      items: 1
    },
    940: {
      items: 1
    }
  },
  nav: true
}

export const customOptionsHome: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,
  dots: false,
  autoplay:true,
  autoplayTimeout:10000,
  autoplayHoverPause:true,
  autoplaySpeed: 4000,
  navSpeed: 400,
  navText: ['<button type="button" class="left_arrow"><i class="fal fa-angle-left"></i></button>', '<button type="button" class="right_arrow"><i class="fal fa-angle-right"></i></button>'],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 1
    },
    740: {
      items: 1
    },
    940: {
      items: 1
    }
  },
  nav: false
}

export const customOptions1: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,
  dots: true,
  autoplay:false,
  autoplayTimeout:4000,
  autoplayHoverPause:true,
  autoplaySpeed: 2000,
  navSpeed: 800,
  navText: ['<i class="bi bi-chevron-left"></i>', '<i class="bi bi-chevron-right"></i>'],
  responsive: {
    0: {
      items: 2
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 3
    }
  },
  nav: true
}

//Landing page carousels option
export const customOptions2: OwlOptions = {
  loop: true,
  mouseDrag: false,
  touchDrag: false,
  pullDrag: false,
  dots: false,
  autoplay:true,
  autoplayTimeout:4000,
  autoplayHoverPause:true,
  autoplaySpeed: 2000,
  navSpeed: 800,
  slideTransition: '',
  rtl:false,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 1
    },
    740: {
      items: 1
    },
    940: {
      items: 1
    },

  },
  nav: false
}


export const customOptions3: OwlOptions = {
  loop: true,
  mouseDrag: false,
  touchDrag: false,
  pullDrag: false,
  dots: false,
  autoplay:true,
  autoplayTimeout:3000,
  autoplayHoverPause:true,
  autoplaySpeed: 1000,
  navSpeed: 800,
  slideTransition: '',
  rtl:true,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 1
    },
    740: {
      items: 1
    },
    940: {
      items: 1
    },

  },
  nav: false
}

export const slides1 = [
  {id: 1, img: "https://dummyimage.com/350x150/423b42/fff"},
  {id: 2, img: "https://dummyimage.com/350x150/2a2b7a/fff"},
  {id: 3, img: "https://dummyimage.com/350x150/1a2b7a/fff"},
  {id: 4, img: "https://dummyimage.com/350x150/7a2b7a/fff"},
  {id: 5, img: "https://dummyimage.com/350x150/9a2b7a/fff"},
  {id: 6, img: "https://dummyimage.com/350x150/5a2b7a/fff"},
  {id: 6, img: "https://dummyimage.com/350x150/4a2b7a/fff"}
];
