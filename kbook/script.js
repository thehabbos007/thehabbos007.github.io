var lat;
var lon;

jQuery(document).ready(function() {
    /*
        Background slideshow
    */
    $.backstretch([
      "img/backgrounds/1.jpg"
    , "img/backgrounds/2.jpg"
    , "img/backgrounds/3.jpg"
    ], {duration: 5000, fade: 750});

    /*
        Tooltips
    */
    $('.links a.home').tooltip();
    $('.links a.blog').tooltip();

    /*
        Form validation
    */
    $('.register form').submit(function(){
        $(this).find("label[for='firstname']").html('First Name');
        $(this).find("label[for='lastname']").html('Last Name');
        $(this).find("label[for='phone']").html('phone');
        $(this).find("label[for='email']").html('Email');
        $(this).find("label[for='password']").html('Password');
        ////
        var firstname = $(this).find('input#fornavn').val();
        var lastname = $(this).find('input#efternavn').val();
        var phone = $(this).find('input#mobilnummer').val();
        var email = $(this).find('input#email').val();
        var alder = $(this).find('input#alder').val();
        var password = $(this).find('input#adgangskode').val();
        if(firstname == '') {
            $(this).find("label[for='fornavn']").append("<span style='display:none' class='red'> - Indtast venligst et gyldigt fornavn.</span>");
            $(this).find("label[for='fornavn'] span").fadeIn('medium');
            return false;
        }
        if(lastname == '') {
            $(this).find("label[for='efternavn']").append("<span style='display:none' class='red'> - Indtast venligst et gyldigt efternavn.</span>");
            $(this).find("label[for='efternavn'] span").fadeIn('medium');
            return false;
        }
        if(phone == '') {
            $(this).find("label[for='mobilnummer']").append("<span style='display:none' class='red'> - Indtast venligst et gyldigt mobilnummer.</span>");
            $(this).find("label[for='mobilnummer'] span").fadeIn('medium');
            return false;
        }
        if(email == '') {
            $(this).find("label[for='email']").append("<span style='display:none' class='red'> - Indtast venligst en gyldigt email.</span>");
            $(this).find("label[for='email'] span").fadeIn('medium');
            return false;
        }
        if(alder == '') {
            $(this).find("label[for='alder']").append("<span style='display:none' class='red'> - Indtast venligst en gyldigt alder.</span>");
            $(this).find("label[for='alder'] span").fadeIn('medium');
            return false;
        }
        if(password == '') {
            $(this).find("label[for='adgangskode']").append("<span style='display:none' class='red'> - Indtast venligst en gyldigt adgangskode.</span>");
            $(this).find("label[for='adgangskode'] span").fadeIn('medium');
            return false;
        }
    });

        
        function initiate_geolocation() {
            navigator.geolocation.getCurrentPosition(handle_geolocation_query);
        }
 
        function handle_geolocation_query(position){
            lat = position.coords.latitude;
            lon = position.coords.longitude;
        }
        initiate_geolocation();

});

