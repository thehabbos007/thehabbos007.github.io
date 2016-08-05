var circle = document.getElementById('pizza');
var circles = $('.circle');

circle.addEventListener('animationend', 
  function() {
    console.log('don');
    checker();
  });
start();
function checker (i) {
    start();

    console.log("yeh");
    document.getElementsByTagName("span")[0].style.opacity='1';
    setTimeout(function() {
     document.getElementsByTagName("span")[1].style.opacity='1'; 
    }, 500);
}

function start () {
    $("#moonp").bind( "click", function() {
      document.getElementsByTagName("span")[0].style.opacity='0';
      document.getElementsByTagName("span")[1].style.opacity='0'; 
      circles.each(function(i) {
        $(this).removeClass('circle1');
      });
      setTimeout(function() {
        $("#amore").trigger('play');
        circles.each(function(i) {
          $(this).addClass('circle1');
        });
      }, 500);

      $("#moonp").unbind("click");
    });
}