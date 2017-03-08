jQuery(function($) {

	//Preloader
	var preloader = $('.preloader');
	$(window).load(function(){
		preloader.remove();
	});

	//#main-slider
	var slideHeight = $(window).height();
	$('#home-slider .item').css('height',slideHeight);

	$(window).resize(function(){'use strict',
		$('#home-slider .item').css('height',slideHeight);
	});
	
	$('.inactiveUntilOnLoad').removeClass('inactiveUntilOnLoad');
	
	//Scroll Menu
	$(window).on('scroll', function(){
		if( $(window).scrollTop()>slideHeight ){
			$('.main-nav').addClass('navbar-fixed-top');
		} else {
			$('.main-nav').removeClass('navbar-fixed-top');
		}
	});
	
	$(window).on('scroll', function(){
		if( $(window).scrollTop()>slideHeight ){
			$('#services').addClass('push-top-big');
		} else {
			$('#services').removeClass('push-top-big');
		}
	});
	
	
	// Navigation Scroll
	$(window).scroll(function(event) {
		Scroll();
	});

	$('.navbar-collapse ul li a').on('click', function() {  
		$('html, body').animate({scrollTop: $(this.hash).offset().top - 3}, 1000);
		return false;
	});
	
	
	//Style Picker
	(function($)
   {
	$(document).ready(function() {
		$('.styleswitch').click(function()
		{
			switchStylestyle(this.getAttribute("data-rel"));
			return false;
		});
		var c = readCookie('style');
		if (c) switchStylestyle(c);
	});

	function switchStylestyle(styleName)
	{
		$('link[rel*=style][title]').each(function(i) 
		{
			this.disabled = true;
			if (this.getAttribute('title') == styleName) this.disabled = false;
		});
		createCookie('style', styleName, 365);
	}
   })(jQuery);
   
   
   // /cookie functions
   function createCookie(name,value,days)
   {
	   if (days)
	   {
		   var date = new Date();
		   date.setTime(date.getTime()+(days*24*60*60*1000));
		   var expires = "; expires="+date.toGMTString();
	   }
	   else var expires = "";
	   document.cookie = name+"="+value+expires+"; path=/";
   }
   function readCookie(name)
   {
   	   var nameEQ = name + "=";
	   var ca = document.cookie.split(';');
	   for(var i=0;i < ca.length;i++)
	   {
		   var c = ca[i];
		   while (c.charAt(0)==' ') c = c.substring(1,c.length);
		   if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	   }
	   return null;
   }
   function eraseCookie(name)
   {
	createCookie(name,"",-1);
   }
  });

     // Style Picker panel
      $('#opener').on('click', function() {		
		var panel = $('#slide-panel');
		if (panel.hasClass("visible")) {
			panel.removeClass('visible').animate({'margin-left':'-180px'});
		} else {
			panel.addClass('visible').animate({'margin-left':'0px'});
		}	
		return false;	
	});


	// User define function
	function Scroll() {
		var contentTop      =   [];
		var contentBottom   =   [];
		var winTop      =   $(window).scrollTop();
		var rangeTop    =   200;
		var rangeBottom =   500;
		$('.navbar-collapse').find('.scroll a').each(function(){
			contentTop.push( $( $(this).attr('href') ).offset().top);
			contentBottom.push( $( $(this).attr('href') ).offset().top + $( $(this).attr('href') ).height() );
		})
		$.each( contentTop, function(i){
			if ( winTop > contentTop[i] - rangeTop ){
				$('.navbar-collapse li.scroll')
				.removeClass('active')
				.eq(i).addClass('active');			
			}
		})
	};

	$('#tohash').on('click', function(){
		$('html, body').animate({scrollTop: $(this.hash).offset().top - 5}, 1000);
		return false;
	});
	
	//Initiat WOW JS
	new WOW().init();
	//smoothScroll
	smoothScroll.init();
	
	// Progress Bar
	$('#pb').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
		if (visible) {
			$.each($('div.progress-bar'),function(){
				$(this).css('width', $(this).attr('data-aria-valuetransitiongoal')+'%');
			});
			$(this).unbind('inview');
		}
	});

	//Countdown
	$('#counter').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
		if (visible) {
			$(this).find('.timer').each(function () {
				var $this = $(this);
				$({ Counter: 0 }).animate({ Counter: $this.text() }, {
					duration: 2000,
					easing: 'swing',
					step: function () {
						$this.text(Math.ceil(this.Counter));
					}
				});
			});
			$(this).unbind('inview');
		}
	});

//VIDEO PLAYER

   jQuery(function(){
			'use strict';

            jQuery(".player").mb_YTPlayer();
		});	



	// Portfolio Single View
	$('#portfolio').on('click','.folio-read-more',function(event){
		event.preventDefault();
		var link = $(this).data('single_url');
		var full_url = '#portfolio-single-wrap',
		parts = full_url.split("#"),
		trgt = parts[1],
		target_top = $("#"+trgt).offset().top;

		$('html, body').animate({scrollTop:target_top}, 600);
		$('#portfolio-single').slideUp(500, function(){
			$(this).load(link,function(){
				$(this).slideDown(500);
			});
		});
	});

	// Close Portfolio Single View
	$('#portfolio-single-wrap').on('click', '.close-folio-item',function(event) {
		event.preventDefault();
		var full_url = '#portfolio',
		parts = full_url.split("#"),
		trgt = parts[1],
		target_offset = $("#"+trgt).offset(),
		target_top = target_offset.top;
		$('html, body').animate({scrollTop:target_top}, 600);
		$("#portfolio-single").slideUp(500);
	});

	// Contact form
	var form = $('#main-contact-form');
	form.submit(function(event){
		event.preventDefault();
		var form_status = $('<div class="form_status"></div>');
		$.ajax({
			url: $(this).attr('action'),
			beforeSend: function(){
				form.prepend( form_status.html('<p><i class="fa fa-spinner fa-spin"></i> Email is sending...</p>').fadeIn() );
			}
		}).done(function(data){
			form_status.html('<p class="text-success">Thanks for your Email. We will reply you as soon as possible</p>').delay(3000).fadeOut();
		 
	  });
   });
   
      //portfolio tab popup
       $(function () {
       $('[data-toggle="tooltip"]').tooltip();
       $('[data-toggle="tooltip"]').on('shown.bs.tooltip', function () {
       $('.tooltip').addClass('animated bounce');
       })
    });

//Google Map
	var latitude = $('#google-map').data('latitude')
	var longitude = $('#google-map').data('longitude')
	function initialize_map() {
		var myLatlng = new google.maps.LatLng(latitude,longitude);
		 var styles = [
    {
      stylers: [
        { hue: "#000000" },
      { saturation: -100 }
      ]
    },{
      featureType: "road",
      elementType: "geometry",
      stylers: [
        { lightness: 100 },
        { visibility: "simplified" }
      ]
    },{
      featureType: "road",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    }
  ];
  // Create a new StyledMapType object, passing it the array of styles,
  // as well as the name to be displayed on the map type control.
  var styledMap = new google.maps.StyledMapType(styles,
    {name: "Styled Map"});

		var mapOptions = {
			zoom: 14,
			scrollwheel: false,
			disableDefaultUI: true,
			center: myLatlng,
			mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    }
		};
		var map = new google.maps.Map(document.getElementById('google-map'), mapOptions);
		var contentString = '';
		var infowindow = new google.maps.InfoWindow({
			content: '<div class="map-content"><ul class="address">' + $('.address').html() + '</ul></div>'
		});
		var marker = new google.maps.Marker({
			position: myLatlng,
			map: map
		});
		google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map,marker);
		});
		map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');
	}
	    initialize_map();
        $('#map').on('hidden.bs.collapse', function () {
           initialize_map();
        })
        $('#map').on('shown.bs.collapse', function () {
           initialize_map(); 
        })
	


   // ISOTOPE

    //ISOTOPE  PLUGIN SCRIPT FOR FILTER FUCNTIONALITY
    $(window).load(function () {
        var $container = $('#portfolio-div');
        $container.isotope({
            filter: '*',
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
        $('.caegories a').click(function () {
            $('.caegories .active').removeClass('active');
            $(this).addClass('active');
            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
            return false;
        });

     });


