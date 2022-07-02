// Field Thousand Separator
$('.mask-number').maskNumber({
    integer: true
});

$('.pill-item').click(function(){
    var target = $(this).data('target');
    $('.pill-item').removeClass('active');
    $(this).addClass('active');
    $(target).siblings().removeClass('active');
    $(target).addClass('active');
});

// Thousand Separator
function addCommas(nStr)
{
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

// Modals
$('#slickNext').click(function(){
    $('.results-slider').slick('slickNext');
    $(".results-container").scrollTop(0);
});
$('#prevslide').click(function(){
    $('.results-slider').slick('slickPrev');
    $(".results-container").scrollTop(0);
});


$('.results-slider').on('beforeChange', function(event, slick, currentSlide) {
    if (slick.$slides.length-1 != currentSlide) {
        $('#prevslide').addClass('active');
    } else {
        $('#prevslide').removeClass('active');
    }
  })
$('.results-slider').on('afterChange', function(event, slick, currentSlide) {
    if (slick.$slides.length-1 == currentSlide) {
        $('#slickNext').addClass('active');
        $(".results-container").scrollTop(0);
    } else {
        $('#slickNext').removeClass('active');
    }
    if (slick.$slides.length-1 != currentSlide) {
        $('#prevslide').addClass('active');
        $(".results-container").scrollTop(0);
    } else {
        $('#prevslide').removeClass('active');
    }
  })

  function closeResults(){
    $('.results-container').removeClass('show');
    $('body').removeClass('results-open');
    $('.container').attr('style', 'overflow-y: scroll');
    $('.results-slider').slick('unslick');
    $('#slickNext').removeClass('active');
    $('#prevslide').addClass('active');
}