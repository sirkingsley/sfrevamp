// ==================================================
// Project Name  :  Neoncart
// File          :  JS Base
// Version       :  1.0.0
// Author        :  jthemes (https://themeforest.net/user/jthemes)
// ==================================================

function custom(){
  $('.user_thumbnail').on("click",function(){
    $('.user_content > h4').removeClass('active');
    //console.log('Click success');

  });
  // search box - start
  // --------------------------------------------------
  $('.search_btn').on('click', function() {
    $('.search_btn > .fa-search').toggleClass('fa-times');
  });
  // search box - end
  // --------------------------------------------------


  // background - start
  // --------------------------------------------------
  $("[data-text-color]").each(function () {
    $(this).css("color", $(this).attr("data-text-color"))
  });

  $("[data-bg-color]").each(function () {
    $(this).css("background", $(this).attr("data-bg-color"))
  });

  $('[data-background]').each(function() {
    $(this).css('background-image', 'url('+ $(this).attr('data-background') + ')');
  });
  // background - end
  // --------------------------------------------------


  // sticky header - start
  // --------------------------------------------------
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 120) {
      $('.sticky_header').addClass("stuck")
    } else {
      $('.sticky_header').removeClass("stuck")
    }
  });
  // sticky header - end
  // --------------------------------------------------


  // sidebar - start
  // --------------------------------------------------
  $(document).ready(function () {
    $('.close_btn, .overlay').on('click', function () {
      $('.sidebar_mobile_menu').removeClass('active');
      $('.overlay').removeClass('active');
    });

    $('.mobile_menu_btn').on('click', function () {
      $('.sidebar_mobile_menu').addClass('active');
      $('.overlay').addClass('active');
    });
  });

  // 3rd level dropdown menu
  $('.dropdown > a').addClass('dropdown-toggle');
  $('.dropdown-menu .dropdown > a').on('click', function(e) {
    if (!$(this).next().hasClass('show')) {
      $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
    }
    var $subMenu = $(this).next(".dropdown-menu");
    $subMenu.toggleClass('show');
    $(this).parents('li.dropdown.show').on('.dropdown', function(e) {
      $('.dropdown-menu > .dropdown .show').removeClass("show");
    });
    $('.dropdown-menu li a.dropdown-toggle').removeClass("show_dropdown");
    if ($(this).next().hasClass('show')) {
      $(this).addClass("show_dropdown");
    }
    return false;
  });

  $(document).ready(function () {
    $('.close_btn, .overlay').on('click', function () {
      $('.cart_sidebar').removeClass('active');
      $('.overlay').removeClass('active');
    });

    $('.cart_btn').on('click', function () {
      $('.cart_sidebar').addClass('active');
      $('.overlay').addClass('active');
    });
  });

  $(document).ready(function () {
    $('.close_btn, .overlay').on('click', function () {
      $('.filter_sidebar').removeClass('active');
      $('.overlay').removeClass('active');
    });

    $('.filter_sidebar_btn').on('click', function () {
      $('.filter_sidebar').addClass('active');
      $('.overlay').addClass('active');
    });
  });
  // sidebar - end
  // --------------------------------------------------



  // multy count down - start
  // --------------------------------------------------
  $('.countdown_timer').each(function(){
    $('[data-countdown]').each(function() {
      var $this = $(this), finalDate = $(this).data('countdown');
      $this.countdown(finalDate, function(event) {
        var $this = $(this).html(event.strftime(''
          + '<li class="days_count"><strong>%D</strong><span>Days</span></li>'
          + '<li class="hours_count"><strong>%H</strong><span>Hours</span></li>'
          + '<li class="minutes_count"><strong>%M</strong><span>Mins</span></li>'
          + '<li class="seconds_count"><strong>%S</strong><span>Secs</span></li>'));
      });
    });
  });
  // multy count down - end
  // --------------------------------------------------


  // wow animation - start
  // --------------------------------------------------
  function wowAnimation() {
    new WOW({
      offset: 100,
      mobile: true
    }).init()
  }
  //wowAnimation();
  // wow animation - end
  // --------------------------------------------------


  // masoney grid layout - start
  // --------------------------------------------------

  // masoney grid layout - end
  // --------------------------------------------------


  // isotope filtering - start
  // --------------------------------------------------
  function portfolioMasonry() {
    var portfolio = $(".element-grid");
    if (portfolio.length) {
      portfolio.imagesLoaded(function () {
        portfolio.isotope({
          itemSelector: ".element-item",
          layoutMode: 'masonry',
          filter: "*",
          animationOptions: {
            duration: 1000
          },
          transitionDuration: '0.5s',
          masonry: {

          }
        });

        $(".filters-button-group button").on('click', function () {
          $(".filters-button-group button").removeClass("active");
          $(this).addClass("active");

          var selector = $(this).attr("data-filter");
          portfolio.isotope({
            filter: selector,
            animationOptions: {
              animationDuration: 750,
              easing: 'linear',
              queue: false
            }
          })
          return false;
        })
      });
    }
  }
  portfolioMasonry();
  // isotope filtering - end
  // --------------------------------------------------


  // quantity - start
  // --------------------------------------------------

  function neoncart_quantity(){
    $(document).on('click', '.quantity_input .input_number_decrement, .quantity_input .input_number_increment', function (e) {
      var target = $(e.target),
      qty = target.closest('.quantity_input').find('input.input_number'),
      min, max, step, value;

      if (qty.length) {
        min = qty.attr('min') || 0;
        max = qty.attr('max') || 0;
        step = qty.attr('step') || 1;
        min = parseInt(min);
        max = parseInt(max);
        step = parseInt(step);
        value = parseInt(qty.val());

        if (target.is('.input_number_increment')) {
          value += step;
        } else {
          value -= step;
        }

        value = Math.max(min, value);
        if (max) {
          value = Math.min(max, value);
        }

        qty.val(value).change();
      }
    });
}
  neoncart_quantity();
  // quantity - end
  // --------------------------------------------------

  // zoom
  $('.zoom-image img').click(function (event) {
    var ix = $(this).offset().left;
    var iy = $(this).offset().top;
    //console.log(ix + '-' + iy);

    var mx = event.pageX;
    var my = event.pageY;
    //console.log(mx + '-' + my);
  })
  $('.zoom-image img').hover(function () {
    var img = $(this).attr('src');
    $(this).after("<div class='hover-image' style='background-image: url(" + img + "); background-size: 1200px;'></div>");
    $(this).mousemove(function (event) {

      // Mouse Position
      var mx = event.pageX;
      var my = event.pageY;

      // Image Position
      var ix = $(this).offset().left;
      var iy = $(this).offset().top;

      // Mouse Position Relavtive to Image
      var x = mx - (ix);
      var y = my - (iy);

      // Image Height and Width
      var w = $(this).width();
      var h = $(this).height();

      // Mouse Position Relative to Image, in %
      var xp = (-x / w) * -70;
      var yp = (-y / h) * -70;

      $(this).parent().find('.hover-image').attr('style',
        "background-image: url(" + img + "); background-size: 1200px; background-repeat: no-repeat; background-position: " + xp + "% " + yp + "%; top: " + y + "px; left: " + x + "px;");
    });

  }, function () {
    $(this).parent().find('.hover-image').remove();
  });
  // price range - start
  // --------------------------------------------------
  if($("#slider-range").length){
    $( "#slider-range" ).slider({
      range: true,
      min: 5,
      max: 1000,
      values: [ 30.00, 429.00 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );
  }

  $('.ar_top').on('click', function () {
    var getID = $(this).next().attr('id');
    var result = document.getElementById(getID);
    var qty = result.value;
    $('.proceed_to_checkout .update-cart').removeAttr('disabled');
    if( !isNaN( qty ) ) {
      result.value++;
    }else{
      return false;
    }
  });
  // price range - end
  // --------------------------------------------------


  // common carousel - start
  // --------------------------------------------------
 






  // common carousel - end
  // --------------------------------------------------



  // --------------------------------------------------
 
  // lookbook slide - start
  // --------------------------------------------------
  // debounce from underscore.js
  function debounce(func, wait, immediate) {
    var timeout;
    return function () {
      var context = this, args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  // use x and y mousewheel event data to navigate flickity
  function slick_handle_wheel_event(e, slick_instance, slick_is_animating) {
    // do not trigger a slide change if another is being animated
    if (!slick_is_animating) {
      // pick the larger of the two delta magnitudes (x or y) to determine nav direction
      var direction =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

      //console.log("wheel scroll ", e.deltaX, e.deltaY, direction);

      if (direction > 0) {
        // next slide
        slick_instance.slick("slickNext");
      } else {
        // prev slide
        slick_instance.slick("slickPrev");
      }
    }
  }

  // debounce the wheel event handling since trackpads can have a lot of inertia
  var slick_handle_wheel_event_debounced = debounce(
    slick_handle_wheel_event
    , 50, true
  );

  // google map - start
  // --------------------------------------------------
 
  // google map - end
  // --------------------------------------------------



}

//***---TEST FUNCTION END--------------- */


//test();
(function main($) {
  "use strict";
 

  // back to top - start
  // --------------------------------------------------
  $(window).scroll(function() {
    if ($(this).scrollTop() > 200) {
      $('.backtotop:hidden').stop(true, true).fadeIn();
    } else {
      $('.backtotop').stop(true, true).fadeOut();
    }
  });
  $(function() {
    $(".scroll").on('click', function() {
      $("html,body").animate({
        scrollTop: $("#thetop").offset().top
      }, "slow");
      return false
    })
  });
  // back to top - end
  // --------------------------------------------------


  // preloader - start
  // --------------------------------------------------
  // $(window).on('load', function(){
  //   $('#preloader').fadeOut('slow',function(){$(this).remove();});
  // });
  // preloader - end
  // --------------------------------------------------


  // search box - start
  // --------------------------------------------------
  $('.search_btn').on('click', function() {
    $('.search_btn > .fa-search').toggleClass('fa-times');
  });
  // search box - end
  // --------------------------------------------------


  // background - start
  // --------------------------------------------------
  $("[data-text-color]").each(function () {
    $(this).css("color", $(this).attr("data-text-color"))
  });

  $("[data-bg-color]").each(function () {
    $(this).css("background", $(this).attr("data-bg-color"))
  });

  $('[data-background]').each(function() {
    $(this).css('background-image', 'url('+ $(this).attr('data-background') + ')');
  });
  // background - end
  // --------------------------------------------------



  // tooltip - start
  // --------------------------------------------------
  // $('.tooltips').tooltip();
  // tooltip - end
  // --------------------------------------------------


  // sticky header - start
  // --------------------------------------------------
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 120) {
      $('.sticky_header').addClass("stuck")
    } else {
      $('.sticky_header').removeClass("stuck")
    }
  });
  // sticky header - end
  // --------------------------------------------------


  // sidebar - start
  // --------------------------------------------------
  $(document).ready(function () {
    $('.close_btn, .overlay').on('click', function () {
      $('.sidebar_mobile_menu').removeClass('active');
      $('.overlay').removeClass('active');
    });

    $('.mobile_menu_btn').on('click', function () {
      $('.sidebar_mobile_menu').addClass('active');
      $('.overlay').addClass('active');
    });
  });

  // 3rd level dropdown menu
  $('.dropdown > a').addClass('dropdown-toggle');
  $('.dropdown-menu .dropdown > a').on('click', function(e) {
    if (!$(this).next().hasClass('show')) {
      $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
    }
    var $subMenu = $(this).next(".dropdown-menu");
    $subMenu.toggleClass('show');
    $(this).parents('li.dropdown.show').on('.dropdown', function(e) {
      $('.dropdown-menu > .dropdown .show').removeClass("show");
    });
    $('.dropdown-menu li a.dropdown-toggle').removeClass("show_dropdown");
    if ($(this).next().hasClass('show')) {
      $(this).addClass("show_dropdown");
    }
    return false;
  });

  $(document).ready(function () {
    $('.close_btn, .overlay').on('click', function () {
      $('.cart_sidebar').removeClass('active');
      $('.overlay').removeClass('active');
    });

    $('.cart_btn').on('click', function () {
      $('.cart_sidebar').addClass('active');
      $('.overlay').addClass('active');
    });
  });

  $(document).ready(function () {
    $('.close_btn, .overlay').on('click', function () {
      $('.filter_sidebar').removeClass('active');
      $('.overlay').removeClass('active');
    });

    $('.filter_sidebar_btn').on('click', function () {
      $('.filter_sidebar').addClass('active');
      $('.overlay').addClass('active');
    });
  });
  // sidebar - end
  // --------------------------------------------------



  // multy count down - start
  // --------------------------------------------------
  $('.countdown_timer').each(function(){
    $('[data-countdown]').each(function() {
      var $this = $(this), finalDate = $(this).data('countdown');
      $this.countdown(finalDate, function(event) {
        var $this = $(this).html(event.strftime(''
          + '<li class="days_count"><strong>%D</strong><span>Days</span></li>'
          + '<li class="hours_count"><strong>%H</strong><span>Hours</span></li>'
          + '<li class="minutes_count"><strong>%M</strong><span>Mins</span></li>'
          + '<li class="seconds_count"><strong>%S</strong><span>Secs</span></li>'));
      });
    });
  });
  // multy count down - end
  // --------------------------------------------------




  // wow animation - start
  // --------------------------------------------------
  function wowAnimation() {
    new WOW({
      offset: 100,
      mobile: true
    }).init()
  }
  //wowAnimation();
  // wow animation - end
  // --------------------------------------------------


  // masoney grid layout - start
  // --------------------------------------------------
 
  // masoney grid layout - end
  // --------------------------------------------------


  // isotope filtering - start
  // --------------------------------------------------
  function portfolioMasonry() {
    var portfolio = $(".element-grid");
    if (portfolio.length) {
      portfolio.imagesLoaded(function () {
        portfolio.isotope({
          itemSelector: ".element-item",
          layoutMode: 'masonry',
          filter: "*",
          animationOptions: {
            duration: 1000
          },
          transitionDuration: '0.5s',
          masonry: {

          }
        });

        $(".filters-button-group button").on('click', function () {
          $(".filters-button-group button").removeClass("active");
          $(this).addClass("active");

          var selector = $(this).attr("data-filter");
          portfolio.isotope({
            filter: selector,
            animationOptions: {
              animationDuration: 750,
              easing: 'linear',
              queue: false
            }
          })
          return false;
        })
      });
    }
  }
  portfolioMasonry();
  // isotope filtering - end
  // --------------------------------------------------


  // quantity - start
  // --------------------------------------------------

  function neoncart_quantity(){
    $(document).on('click', '.quantity_input .input_number_decrement, .quantity_input .input_number_increment', function (e) {
      var target = $(e.target),
      qty = target.closest('.quantity_input').find('input.input_number'),
      min, max, step, value;

      if (qty.length) {
        min = qty.attr('min') || 0;
        max = qty.attr('max') || 0;
        step = qty.attr('step') || 1;
        min = parseInt(min);
        max = parseInt(max);
        step = parseInt(step);
        value = parseInt(qty.val());

        if (target.is('.input_number_increment')) {
          value += step;
        } else {
          value -= step;
        }

        value = Math.max(min, value);
        if (max) {
          value = Math.min(max, value);
        }

        qty.val(value).change();
      }
    });
}
  neoncart_quantity();
  // quantity - end
  // --------------------------------------------------

  // zoom
  $('.zoom-image img').click(function (event) {
    var ix = $(this).offset().left;
    var iy = $(this).offset().top;
    //console.log(ix + '-' + iy);

    var mx = event.pageX;
    var my = event.pageY;
    //console.log(mx + '-' + my);
  })
  $('.zoom-image img').hover(function () {
    var img = $(this).attr('src');
    $(this).after("<div class='hover-image' style='background-image: url(" + img + "); background-size: 1200px;'></div>");
    $(this).mousemove(function (event) {

      // Mouse Position
      var mx = event.pageX;
      var my = event.pageY;

      // Image Position
      var ix = $(this).offset().left;
      var iy = $(this).offset().top;

      // Mouse Position Relavtive to Image
      var x = mx - (ix);
      var y = my - (iy);

      // Image Height and Width
      var w = $(this).width();
      var h = $(this).height();

      // Mouse Position Relative to Image, in %
      var xp = (-x / w) * -70;
      var yp = (-y / h) * -70;

      $(this).parent().find('.hover-image').attr('style',
        "background-image: url(" + img + "); background-size: 1200px; background-repeat: no-repeat; background-position: " + xp + "% " + yp + "%; top: " + y + "px; left: " + x + "px;");
    });

  }, function () {
    $(this).parent().find('.hover-image').remove();
  });
  // price range - start
  // --------------------------------------------------
  if($("#slider-range").length){
    $( "#slider-range" ).slider({
      range: true,
      min: 5,
      max: 1000,
      values: [ 30.00, 429.00 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );
  }

  $('.ar_top').on('click', function () {
    var getID = $(this).next().attr('id');
    var result = document.getElementById(getID);
    var qty = result.value;
    $('.proceed_to_checkout .update-cart').removeAttr('disabled');
    if( !isNaN( qty ) ) {
      result.value++;
    }else{
      return false;
    }
  });
  // price range - end
  // --------------------------------------------------

 
  // lookbook slide - start
  // --------------------------------------------------
  // debounce from underscore.js
  function debounce(func, wait, immediate) {
    var timeout;
    return function () {
      var context = this, args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  // use x and y mousewheel event data to navigate flickity
  function slick_handle_wheel_event(e, slick_instance, slick_is_animating) {
    // do not trigger a slide change if another is being animated
    if (!slick_is_animating) {
      // pick the larger of the two delta magnitudes (x or y) to determine nav direction
      var direction =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

      //console.log("wheel scroll ", e.deltaX, e.deltaY, direction);

      if (direction > 0) {
        // next slide
        slick_instance.slick("slickNext");
      } else {
        // prev slide
        slick_instance.slick("slickPrev");
      }
    }
  }

  // debounce the wheel event handling since trackpads can have a lot of inertia
  var slick_handle_wheel_event_debounced = debounce(
    slick_handle_wheel_event
    , 50, true
  );



  // google map - start
  // --------------------------------------------------
  if ( $('#mapBox').length ){
    var $lat = $('#mapBox').data('lat');
    var $lon = $('#mapBox').data('lon');
    var $zoom = $('#mapBox').data('zoom');
    var $marker = $('#mapBox').data('marker');
    var $info = $('#mapBox').data('info');
    var $markerLat = $('#mapBox').data('mlat');
    var $markerLon = $('#mapBox').data('mlon');
    var map = new GMaps({
      el: '#mapBox',
      lat: $lat,
      lng: $lon,
      scrollwheel: false,
      scaleControl: true,
      streetViewControl: false,
      panControl: true,
      disableDoubleClickZoom: true,
      mapTypeControl: false,
      zoom: $zoom,
    });
    map.addMarker({
      lat: $markerLat,
      lng: $markerLon,
      icon: $marker,
      infoWindow: {
        content: $info
      }
    })
  }
  // google map - end
  // --------------------------------------------------


})(jQuery);


