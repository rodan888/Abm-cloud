$(function() {
	var main = {
		opt: {
			tabs: $('.tabs'),
			popup: $('.btn.pop,.cut-btn.pop'),
			img: $('img'),
			linc: $('a'),
			body: $('body'),
			wind: $(window),
			header: $('header'),
			menu: $('.fixed-nav'),
			mobButton: $('.mob-button'),
			slider: $('.slider'),
			owlOptions: {
				autoPlay: 3000,
				navigation: true,
				singleItem: true,
				autoPlay: false,	
				pagination: true,
				scrollPerPage: true,
				navigationText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>']								
			}
		},
		menuAnim: function(){
			$('button.side-menu').on('click', function(){
				$(this).toggleClass('active').next().toggleClass('active');
			});
		},
		langSwitcher: function(){
			$('.lang-switcher span').on('click', function(){
				$(this).toggleClass('active').next().slideToggle('fast');
			});
		},
		tabs: function(el){
			var linc = el.find('.tab-link'),
					tab  = el.find('.tab'),
					dataShow;
			linc.on('click',function(){				
				dataShow = $(this).data('show');
				linc.removeClass('active');
				$(this).addClass('active');

				tab.css('display','none')
				.find('.tab-content').removeClass('active');

				$('#'+dataShow).fadeIn(600)
				.find('.tab-content').addClass('active');
			});
		},
		popup: function(el){
			el.on('click',function(event){
				event.preventDefault();		
				var show = $(this).data('show'),
						pop  = $('#'+ show);

				pop.fadeIn(600)
				.css('height', $(window).height() + 'px')
				.find('.popup-content')
				.removeClass('anim')
				.append('<span class="fade_out">&#9587;</span>')

				$('.fade_out').click(function(){
					pop.fadeOut(600)
					.find('.popup-content')
					.addClass('anim');
					$(this).detach();
				});
			});
		},
		toggleC: function(el){
			el.on('click',function(){
				el.toggleClass('active');
			});
		},
		winH: function(){
			return this.opt.wind.height();
		},
		fullHeight: function(el){
			$(el).css('min-height',this.winH()+'px');
		},
		dragstart: function(el){
			$(el).on('dragstart',function(event){
				event.preventDefault();
			});
		},
		scrollEvents: function(){
			$(document).scroll(function(){	
				var scrl = $(document).scrollTop();

				if(scrl >	main.opt.header.height()){
					main.opt.menu.addClass('active');					
				}else{
					main.opt.menu.removeClass('active');										
				};
			});
		},
		init: function(){
			// default functions
			this.dragstart(this.opt.img);
			this.dragstart(this.opt.linc);

			// tabs init 
			this.tabs(this.opt.tabs);
			// popup init
			this.popup(this.opt.popup);
			// Add el window height
			this.fullHeight(this.opt.body);
			//owl slider init
			this.opt.slider.owlCarousel(this.opt.owlOptions);
			//mob button toggle
			this.toggleC(this.opt.mobButton);

			this.scrollEvents();
			this.menuAnim();
			this.langSwitcher();
		}
	};

	//E-mail Ajax Send
	$("form").submit(function() { 
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {		
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});


	$(document).ready(function(){

		main.init();

		// $('.video').ripples({
		// 			resolution: 512,
		// 			dropRadius: 20, //px
		// 			perturbance: 0.04,
		// 			interactive: true
		// 		});

		// try {
				// $('body').ripples({
				// 	resolution: 512,
				// 	dropRadius: 20, //px
				// 	perturbance: 0.04,
				// });
			// 	$('.video').ripples({
			// 		resolution: 512,
			// 		dropRadius: 20, //px
			// 		perturbance: 0.04,
			// 		interactive: true
			// 	});
			// }
			// catch (e) {
			// 	$('.error').show().text(e);
			// }

			// $('.js-ripples-disable').on('click', function() {
			// 	$('body, main').ripples('destroy');
			// 	$(this).hide();
			// });

			// $('.js-ripples-play').on('click', function() {
			// 	$('body, main').ripples('play');
			// });

			// $('.js-ripples-pause').on('click', function() {
			// 	$('body, main').ripples('pause');
			// });

			// // Automatic drops
			// setInterval(function() {
			// 	var $el = $('main');
			// 	var x = Math.random() * $el.outerWidth();
			// 	var y = Math.random() * $el.outerHeight();
			// 	var dropRadius = 20;
			// 	var strength = 0.04 + Math.random() * 0.04;

			// 	$el.ripples('drop', x, y, dropRadius, strength);
			// }, 400);
		

		setTimeout(function(){
			// $('.loader-wrap').removeClass('active');
			$('.loader-wrap').fadeOut(600);
		}, 5000);

		try {
			$.browserSelector();
			if($("html").hasClass("chrome")) {
					$.smoothScroll();
			}
		} catch(err) {};

		function mapInit(){
			$('.gmap').each(function(){
			    var container = this;
			    var latlng = new google.maps.LatLng(
			        parseFloat($(container).data('lat')),
			        parseFloat($(container).data('lng'))
			    );
			    var mapOptions = {
			        zoom: parseInt($(container).data('zoom')),
			        center: latlng,
			        zoomControl: true,
			        mapTypeControl: false,
			        streetViewControl: false,
			        scrollwheel: true,
			        mapTypeId: google.maps.MapTypeId.ROADMAP
			    };
			    var map = new google.maps.Map(container, mapOptions);

			    var marker = new google.maps.Marker({
			        position: latlng,
			        map: map,
			        icon: $(container).data('marker')
			    });
			});
		};
		mapInit();



	});
});
