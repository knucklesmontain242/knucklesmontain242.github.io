$(document).ready(function(){
    window.resizeTo("600", "600");
    $("#venom").css('height','100%');
    $("#venom").css('background-position','top left');
    $("#container").center();
    const venom = document.getElementById('venom');


    venom.addEventListener('transitionstart', (event) => {
        setTimeout(function () {
            $("#venom").css('background-position','bottom');
        }, 1000);
    });

    venom.addEventListener('webkitTransitionEnd', () => {
        $("html").css('background-color','rgba(181,123,169,255)');
        $("body").css('background-color','rgba(181,123,169,255)');
        $("#container").css('opacity','1');
        $("#venom").css('opacity', '0');
        console.log('Transition ended!');
    });

    $('body').append('<script src="https://www.youtube.com/player_api"></script><div class="gaf210imvustylez_youtubebox" style="width:1px;height:1px;overflow:hidden"><iframe allow="autoplay" width="300" height="300" src="https://www.youtube.com/embed/0HNEqunpi44?autoplay=1&amp;loop=1&amp;playlist=0HNEqunpi44" frameborder="0" onload="gaf210_youtube_invisible=new YT.Player(this,{events:{\'onReady\':function(event){event.target.playVideo()}}});" allowfullscreen></iframe><!--Youtube player code generated @ https://gaf210.imvustylez.net --></div>');
    
    window.addEventListener('resize', function (){
        $("#container").center();
    });

});

// https://stackoverflow.com/questions/210717/using-jquery-to-center-a-div-on-the-screen
jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + 
                                                $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + 
                                                $(window).scrollLeft()) + "px");
    return this;
}