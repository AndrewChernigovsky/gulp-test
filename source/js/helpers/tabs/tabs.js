// const active = 'js-tabs-active';

// const
//   tab = document.querySelector('.tabs'),
//   tabButton = document.querySelectorAll('.tabs__tab'),
//   contents = document.querySelectorAll('.tabs__content'),
//   tabsLinks = document.querySelectorAll('.tabs__link');

// function tabs (cb) {

//   tabButton.forEach(el => {
//     if (el.classList.contains(active)){
//       el.classList.remove(active);
//     } else {
//       el.classList.add(active);
//     }
//   });

//   contents.forEach(el => {
//     if(el.classList.contains(active)){
//       el.classList.remove(active);
//     } else {
//       el.classList.add(active);
//     }
//   })

//   cb()
// };


// tabButton.addEventListener = () => cb('click')
$(document).ready(function(){

  $('.js-tabs-header').click(function() {
    var id = $(this).attr('data-tab'),
        content = $('.js-tabs-body[data-tab="'+ id +'"]');

    $('.js-tabs-header.active').removeClass('active');
    $(this).addClass('active');

    $('.js-tabs-body.active').removeClass('active');
    content.addClass('active');
  });

});



