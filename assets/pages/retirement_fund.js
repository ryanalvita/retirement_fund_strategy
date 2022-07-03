// Variables
var a, b, c, d, e, f, g, h, i, j, k = 0;
var nomA, nomB, nomC, nomD, nomE, nomF, nomG, nomH, nomI, nomJ, nomK = 0;
var inf = 0;

// Interactions
$('.count-a').on("input", function(){
    a = $(this).val();
    nomA = parseFloat($(this).val().replace(/,/g, ''));
    b = nomA * 12;
    $('.count-b').html('EUR ' + addCommas(b.toFixed(0)));
    if($(this).val()){
        $('.step-2').removeClass('hide');
    } else {
        $('.step-2').addClass('hide');
    }
    
    if($('.count-d').val())
    { 
        d = $('.count-d').val();
        e = $('.count-e').val();
        g = d - c;
        inf = Math.pow(1+(e/100), g);
        f = b * inf;
        j = f / 0.04;
        $('.count-f').html('EUR ' + addCommas(f.toFixed(0)));
        $('.count-j').html('EUR ' + addCommas(j.toFixed(0)));
        $('.count-g').html(g + ' Year');
    }
});

$('.count-c').on("input", function(){
    c = $(this).val();
    
    if($(this).val()){
        $('.step-3').removeClass('hide');
    } else {
        $('.step-3').addClass('hide');
    }
    if($('.count-d').val())
    { 
        d = $('.count-d').val();
        e = $('.count-e').val();
        g = d - c;
        inf = Math.pow(1+(e/100), g);
        f = b * inf;
        j = f / 0.04;
        $('.count-f').html('EUR ' + addCommas(f.toFixed(0)));
        $('.count-j').html('EUR ' + addCommas(j.toFixed(0)));
        $('.count-g').html(g + ' Year');
    }
});

$('.count-d').on("input", function(){
    d = $(this).val();
    if(d <= c){
        $('.step-4').addClass('hide');
        $('.step-5').addClass('hide');
        $('small.pension-age').removeClass('hide');
    } else {
        $('small.pension-age').addClass('hide');
        e = $('.count-e').val();
        g = d - c;
        inf = Math.pow(1+(e/100), g);
        f = b * inf;
        j = f / 0.04;
        $('.count-f').html('EUR ' + addCommas(f.toFixed(0)));
        $('.count-j').html('EUR ' + addCommas(j.toFixed(0)));
        $('.count-g').html(g + ' Year');
        if($(this).val()){
            $('.step-4').removeClass('hide');
        } else {
            $('.step-4').addClass('hide');
        }
        if($('.count-e').val()){
            $('.step-5').removeClass('hide');
        } else {
            $('.step-5').addClass('hide');
        }
    }
});

$('.count-e').on("input", function(){
    e = $(this).val();
    inf = Math.pow(1+(e/100), g);
    f = b * inf;
    $('.count-f').html('EUR ' + addCommas(f.toFixed(0)));
    $('.count-g').html(g + ' Year');
    if($(this).val()){
        $('.step-5').removeClass('hide');
    } else {
        $('.step-5').addClass('hide');
    }
});

$('.count-i').on("input", function(){
    i = $(this).val();
    nomI = parseFloat($(this).val().replace(/,/g, ''));
    if($(this).val()){
        $('.step-6').removeClass('hide');
    } else {
        $('.step-6').addClass('hide');
    }
});
$('.count-k').on("input", function(){
    k = $(this).val();
    nomK = parseFloat($(this).val().replace(/,/g, ''));
    if($(this).val()){
        $('.step-7').removeClass('hide');
    } else {
        $('.step-7').addClass('hide');
    }
});

$('.count-h').on("input", function(){
    h= $(this).val();
    if($(this).val()){
        $('.step-8').removeClass('hide');
    } else {
        $('.step-8').addClass('hide');
    }
});

function FV(rate, nper, pmt, pv, type) {
    var pow = Math.pow(1 + rate, nper),
        fv;
    if (rate) {
    fv = (pmt*(1+rate*type)*(1-pow)/rate)-pv*pow;
    } else {
    fv = -1 * (pv + pmt * nper);
    }
    return fv.toFixed(2);
}

function PMT(rate, nper, fv, pv, type){
    if(rate){
    var q = Math.pow(1 + rate, nper);
    pmt = -(rate * (fv + (q * pv))) / ((-1 + q) * (1 + rate * (type)));
    } else 
    if(nper != 0.0){
    pmt = -(fv + pv) / nper;
    }
    return pmt.toFixed(2);
}

function recNominal(nominal, value){
    var nom = nominal;
    var fv = value;

    nom = -PMT(h/100/12,g*12,fv,nomI,0);
    fv = -FV(h/100/12,g*12,nom,nomI,1);

    $('#add-nominal').html("<span class='str'>EUR " + addCommas(nominal.toFixed(0)) + "</span>" +"<i class='fas fa-caret-right'></i>" + "EUR " + addCommas(nom.toFixed(0)));
    $('#count-nom').html("<i class='fas fa-chevron-circle-up'></i>" + "EUR " + addCommas(fv.toFixed(0)));

    
    if(g >= 0 && g <= 5){
        $('.nomVarVariant').html("Deposits, Bonds, Mutual Funds");
    } else if(g >= 6 && g <= 10){
        $('.nomVarVariant').html("Bonds, Mutual Funds, Stocks, P2P Lending");
    } else if(g > 10){
        $('.nomVarVariant').html("Stocks, Derivatives, Crypto");
    }

    if(g == 1){
        $('.timeline-startY-nom b').html("Start Year 1");
        $('.timeline-minY-nom').css("display", "none");
        $('.timeline-endY-nom b').html("End Year 1");
    } else if (g == 2){
        $('.timeline-startY-nom b').html("Year 1");
        $('.timeline-minY-nom').css("display", "none");
        $('.timeline-endY-nom b').html("Year 2");
    } else if (g > 2){
        $('.timeline-startY-nom b').html("Year 1");
        $('.timeline-minY-nom ').css("display", "list-item");
        $('.timeline-minY-nom b').html("Year " + (g-1));
        $('.timeline-endY-nom b').html("Year " + g);
    }

    // The Timeline
    $('.nomVaEUR V').html("EUR " + addCommas(nomI.toFixed(0)));
    $('.nomVarFV').html("EUR " + addCommas(fv.toFixed(0)));
}

function recReturn(y, ret, value){
    $('.rec-item.rec-add-return').removeClass('active');
    $('.return-pill').addClass('hide');
    var r = parseInt(ret);
    var year = parseInt(y);
    var fv = value;

    if(year >= 0 && year <=5){
        while(fv < j){
            if(r < 15){
                r++;
                fv = -FV(r/100/12,g*12,nomK,nomI,1);
                $('.return-pill').removeClass('hide');
                $('.pill-menu ul').removeClass('two-rec');
            } else {
                $('.return-pill').addClass('hide');
                $('.pill-menu ul').addClass('two-rec');
                break;
            }
        }
    } else if(year >= 6 && year <=10){
        while(fv < j){
            if(r < 20){
                r++;
                fv = -FV(r/100/12,g*12,nomK,nomI,1);
                $('.return-pill').removeClass('hide');
                $('.pill-menu ul').removeClass('two-rec');
            } else {
                $('.return-pill').addClass('hide');
                $('.pill-menu ul').addClass('two-rec');
                break;
            }
        }
    } else if(year > 10){
        while(fv < j){
            if(r < 30){
                r++;
                fv = -FV(r/100/12,g*12,nomK,nomI,1);
                $('.return-pill').removeClass('hide');
                $('.pill-menu ul').removeClass('two-rec');
            } else {
                $('.return-pill').addClass('hide');
                $('.pill-menu ul').addClass('two-rec');
                break;
            }
        }
    }

    $('#add-return').html("<span class='str'>" + ret + "%</span>" + "<i class='fas fa-caret-right'></i>" + r + "% / Year");
    $('#count-ret').html("<i class='fas fa-chevron-circle-up'></i>" + "EUR " + addCommas(fv.toFixed(0)));

    
    // Timeline
    if(year >= 0 && year <= 5){
        $('.retVarVariant').html("Deposits, Bonds, Mutual Funds");
    } else if(year >= 6 && year <= 10){
        $('.retVarVariant').html("Bonds, Mutual Funds, Stocks, P2P Lending");
    } else if(year > 10){
        $('.retVarVariant').html("Stocks, Derivatives, Crypto");
    }

    if(year == 1){
        $('.timeline-startY-ret b').html("Start Year 1");
        $('.timeline-minY-ret').css("display", "none");
        $('.timeline-endY-ret b').html("End Year 1");
    } else if (year == 2){
        $('.timeline-startY-ret b').html("Year 1");
        $('.timeline-minY-ret').css("display", "none");
        $('.timeline-endY-ret b').html("Year 2");
    } else if (year > 2){
        $('.timeline-startY-ret b').html("Year 1");
        $('.timeline-minY-ret ').css("display", "list-item");
        $('.timeline-minY-ret b').html("Year " + (year - 1));
        $('.timeline-endY-ret b').html("Year " + year);
    }

    // The Timeline
    $('.retVaEUR V').html("EUR " + addCommas(nomI.toFixed(0)));
    $('.retVarFV').html("EUR " + addCommas(fv.toFixed(0)));

}

function recYear(year, value){
    var y = parseInt(year);
    var fv = value;

    while(fv < j){
        y = y+1;
        fv = -FV(h/100/12,y*12,nomK,nomI,1);
    }

    // Timeline
    if(y >= 0 && y <= 5){
        $('.yearVarVariant').html("Deposits, Bonds, Mutual Funds");
    } else if(y >= 6 && y <= 10){
        $('.yearVarVariant').html("Bonds, Mutual Funds, Stocks, P2P Lending");
    } else if(y > 10){
        $('.yearVarVariant').html("Stocks, Derivatives, Crypto");
    }

    if(y == 1){
        $('.timeline-startY-year b').html("Start Year 1");
        $('.timeline-minY-year').css("display", "none");
        $('.timeline-endY-year b').html("End Year 1");
    } else if (y == 2){
        $('.timeline-startY-year b').html("Year 1");
        $('.timeline-minY-year').css("display", "none");
        $('.timeline-endY-year b').html("Year 2");
    } else if (y > 2){
        $('.timeline-startY-year b').html("Year 1");
        $('.timeline-minY-year ').css("display", "list-item");
        $('.timeline-minY-year b').html("Year " + (y - 1));
        $('.timeline-endY-year b').html("Year " + y);
    }

    // The Timeline
    $('.yearVaEUR V').html("EUR " + addCommas(nomI.toFixed(0)));
    $('.yearVarFV').html("EUR " + addCommas(fv.toFixed(0)));

    $('#add-year').html("<span class='str'>" + year + "</span>" + "<i class='fas fa-caret-right'></i>" + y + " Year");
    $('#count-year').html("<i class='fas fa-chevron-circle-up'></i>" + "EUR " + addCommas(fv.toFixed(0)));
}

function timelineCount(){
    var futureValue = -FV(h/100/12,g*12,nomK,nomI,1);
    // Fill Table
    $('.varInv').html("EUR " + addCommas(nomK.toFixed(0)) + " / Bulan");
    $('.varReturn').html(i + "% / Year");

    if(g >= 0 && g <= 5){
        $('.varVariant').html("Deposits, Bonds, Mutual Funds");
    } else if(g >= 6 && g <= 10){
        $('.varVariant').html("Bonds, Mutual Funds, Stocks, P2P Lending");
    } else if(g > 10){
        $('.varVariant').html("Stocks, Derivatives, Crypto");
    }

    // The Timeline
    $('.vaEUR V').html("EUR " + addCommas(nomI.toFixed(0)));
    $('.varYmin').html(g - 1);
    $('.varY').html(g);
    $('.varYear').html(g + " Year");
    $('.varFV').html("EUR " + addCommas(futureValue.toFixed(0)));

}


$('#start-count').on("click", function(){
    // Result Slider
    $('.results-slider').slick({
        arrows: false,
        dots: false,
        infinite: false,
        adaptiveHeight: true
    });
    $('#slickNext').click(function(){
        $('.results-slider').slick('slickNext');
    });
    $('#prevslide').click(function(){
        $('.results-slider').slick('slickPrev');
    });
    $('.results-container').addClass('show');
    $('body').addClass('results-open');


    $('.count-j').html("EUR " + addCommas(j.toFixed(0)));
    $('.count-k').html("EUR " + addCommas(nomK.toFixed(0)));
    $('.count-i').html("EUR " + addCommas(nomI.toFixed(0)));
    $('.count-h').html(h + "% / Year");
    $('.count-g').html(g + " Year");

    // Start Count
    var futureValue = -FV(h/100/12,g*12,nomK,nomI,1);
    var neg = -(futureValue - j);

    $('.count-fv').html("EUR " + addCommas(futureValue.toFixed(0)));

    if(futureValue >= j){
    // Success State
        // Hero Styling
        $('#results-img').html('<i class="fas fa-circle-check"></i>');
        $('#results-text').html("Your investment strategy <b class='count-success'>suits</b> retirement scheme!");
        
        // Hero State
        $('.results-hero').removeClass('almost');
        $('.results-hero').removeClass('failed');
        $('.results-hero').addClass('success');
        $('.neg-inv').html("");

        // Slide Navigation
        $('#slickNext').html(`
        <i class="fas fa-clock"></i>
        Timeline
        `);
        $('.slide-alert p').html('Swipe to see investment timeline');

        // Slide Container
        $('.state-container.state-one').addClass('active');
        $('.state-container.state-two').removeClass('active');

        // Count Timeline
        timelineCount();
    } else if (futureValue >= j*0.9 && futureValue < j){
    // Almost State
        // Hero Styling
        $('#results-img').html('<i class="fas fa-arrow-circle-up"></i>');
        $('#results-text').html("Your investment strategy <b class='count-almost'>almost</b> reach your retirement scheme.");
        
        // Hero State
        $('.results-hero').addClass('almost');
        $('.results-hero').removeClass('failed');
        $('.results-hero').removeClass('success');
        
        
        // Slide Navigation
        $('#slickNext').css('display', 'inline-block');
        $('#prevslide').css('display', 'inline-block');
        $('#slickNext').html(`
        <i class="fas fa-heart"></i>
        Recommendation
        `);
        $('.slide-alert p').html('Swipe to see investment recommendation');

        // Slide Container
        $('.state-container.state-one').removeClass('active');
        $('.state-container.state-two').addClass('active');

        // Input Numbers
        $('.res-inv').html("EUR " + addCommas(nomK.toFixed(0)));
        $('.res-return').html(h + "% / Year");
        $('.res-year').html(g + " Year");
        $('.neg-inv').html("You need " + "EUR " + addCommas(neg.toFixed(0)));
        $('.slide-2').css('display', 'block');
        
        $('.recommendation-container').removeClass('hide');
        if(!$('.no-rec.hide')[0]){
            $('.no-rec').addClass('hide');
        }  

        // Count Recommendations
        recNominal(nomK,futureValue);
        recYear(g, futureValue);
        recReturn(g, h, futureValue);

        // Count Timeline
        timelineCount();

    } else if (futureValue < j*0.9){
    // Failed State

        // Hero Styling
        $('#results-img').html('<i class="fas fa-circle-xmark"></i>');
        $('#results-text').html("Your investment strategy <b class='count-fail'>failed</b> to meet your retirement scheme");
            
        // Hero State
        $('.results-hero').removeClass('almost');
        $('.results-hero').addClass('failed');
        $('.results-hero').removeClass('success');

        // Slide Navigation
        $('#slickNext').css('display', 'inline-block');
        $('#prevslide').css('display', 'inline-block');
        
        $('#slickNext').html(`
        <i class="fas fa-heart"></i>
        Recommendation
        `);
        $('.slide-alert p').html('Swipe to see investment recommendation');
        $('.slide-2').css('display', 'block');
        
        // Slide Container
        $('.state-container.state-one').removeClass('active');
        $('.state-container.state-two').addClass('active');
        $('.recommendation-container').removeClass('hide');
        if(!$('.no-rec.hide')[0]){
            $('.no-rec').addClass('hide');
        }  

        // Input Numbers
        $('.res-inv').html("EUR "+ addCommas(nomK.toFixed(0)));
        $('.res-return').html(h + "% / Year");
        $('.res-year').html(j + " Year");
        $('.neg-inv').html("You need " + "EUR " + addCommas(neg.toFixed(0)));

        // Count Recommendations
        recNominal(nomK,j);
        recYear(g, futureValue);
        recReturn(g, h, futureValue);

        // Count Timeline
        timelineCount();

    }

});