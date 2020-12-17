$(document).ready(function(){
  initPageScroller();
  initSliders();
  initPopup();
});
jQuery(window).on('load',function($){
  handleContactForm();
});
/**
 * scroll event tofrom top to footer
 */
function initPageScroller(){
  $(".text-to-scroll").click(function() {
    $('html, body').animate({
      scrollTop: $(".footer").offset().top
    }, 1000);
  });
}
/*autoplay gallery*/
function initSliders(){
  $('.slick-wrapper-gallery').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3500,
      arrows: false,
      dots: false,
      pauseOnHover: false,
      responsive: [{
          breakpoint: 768,
          settings: {
              slidesToShow: 4
          }
      }, {
          breakpoint: 520,
          settings: {
              slidesToShow: 2
          }
      }]
  });

  /*arrow gallery*/
  $('.slick-art-gallery').slick({
    dots: false,
    prevArrow: $('.prev'),
    nextArrow: $('.next'),
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
}
/*popup*/
/**
 * @param jQuery_DOM_Element
 * 
 */
function initPopup(){
  var popupBlock = jQuery("#popup-block");

  popupBlock.fadeOut(0);

  jQuery(".inner-content .popup-button").click(function(){
    const $thisBlockContent = jQuery(this).parents('.image-wrapper');
    const $sectionPopupWrapper = jQuery(".modal-wrapper");
    if( $sectionPopupWrapper.find('.contant-form').length <= 0 ){
      const $sectionFormWrapper = jQuery('.contant-form').clone();
      $sectionPopupWrapper.find('.content').append($sectionFormWrapper);
    }

    // Replace Dynamic Text
    renderDynamicPopupContent($thisBlockContent);
    

    popupBlock.fadeIn(400);
  
    jQuery("html").css("overflow-y","hidden");
    popupBlock.css("overflow-y","auto");
  });

  jQuery("#popup-block .close-button").click(function(){
      popupBlock.fadeOut(400);
      popupBlock.scrollTop(0);
      
      jQuery("html").css("overflow-y","auto");
      popupBlock.css("overflow-y","hidden");   
  });

}

/**
 * this function render the current data to popup
 * @param jQuery_DOM_Element $blockContent - the content to take the data from
 * @return void
 */
function renderDynamicPopupContent($blockContent){
  const $sectionPopupWrapper = jQuery(".modal-wrapper");
  $sectionPopupWrapper.find('.js-popup-title').html( $blockContent.find('.inner-title').html() );
  $sectionPopupWrapper.find('.js-popup-size').html( $blockContent.find('.sizes').html() );
  $sectionPopupWrapper.find('.js-popup-image').attr( 'src', $blockContent.find('.img').attr('src') );
}
/*form*/
/**
 * description function
 * @param {*} form  - 
 * @param {*} data - 
 * @return - void
 */
function handleFromSubmit( form, data ){
  data.append('action','handle_ajax_form');

  disableForm(true);
  jQuery.ajax({
    url  : 'https://local.local/ajax.php',
    data : data,
    type : 'POST',
    processData: false,
    contentType: false,
    success : function( response ){
      enableForm();
    },
    error: function(msg){
      window.location.href = './thankyou.html';
    }
  });
}
/**
 * 
 * @param {*} form 
 */
function cleanFormMessages(form){
  form.find('.msg-area').html('');
}
/**
 * 
 * @param {*} loading 
 */
function disableForm( loading = false ){
  const $button =  jQuery("form[name='form-submit'] .submit");
  $button.attr('disabled' ,'disabled');
  jQuery('.loader').show();
}

/**
 *  {*} loader
 */
function enableForm(){
  const $button =  jQuery("form[name='form-submit'] .submit");
  $button.removeAttr('disabled');
  jQuery('.loader').hide();
  
}

/**
 * submit form with vaildation
 */

function handleContactForm () {
  jQuery("form[name='form-submit']:not(.form-valid)").validate({
    onkeyup: function(input){
      let enableCount = 0;
      let checkInputs = ['first_name', 'last_name', 'email', 'phone'];
      jQuery("form[name='form-submit'] input").each(function(){
        const $currentInput = jQuery(this);
        if( checkInputs.includes( $currentInput.attr('name') ) && $currentInput.val().length > 0 ){
          enableCount++;
        }
      });
      if( enableCount == checkInputs.length ){
        enableForm();
      } else{
        disableForm();
      }
    },
    rules: {
      first_name: "required",
      last_name: "required",
      email: {required: true, email: true},
      phone: "required"
    },
    messages: {
      first_name: "Please enter a first name",
      last_name: "Please enter a last name",
      email: "Please enter a valid email address",
      phone: "Please enter a valid phone"
    },

    submitHandler: function(form) {
      let $form = jQuery(form);
      let data = new FormData($form[0]);
      handleFromSubmit($form,data);
    }
  });
};

