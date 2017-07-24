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
			carousel: $('.carousel'),
			owlOptions: function(item){
				return {
					autoPlay: 3000,
					navigation: true,
					singleItem: item,
					items: item == true ? 1 : 5,
					autoPlay: false,  
					pagination: true,
					scrollPerPage: true,
					navigationText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>']                
				}
			}
		},
		menuAnim: function(){
			$('.side-menu, .mob-button').on('click', function(){
				$(this).toggleClass('active');
				$('.stick-menu').toggleClass('active');
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
				dataShow,dataEq;
			linc.on('click',function(){       
				dataShow = $(this).data('show');
				dataEq = $(this).index();
				linc.removeClass('active');
				$(this).addClass('active');
				console.log(dataEq);
				tab.css('display','none')
				.find('.tab-content').removeClass('active');

				tab.eq(dataEq).fadeIn(600)
				.find('.tab-content').addClass('active');
				$('#'+dataShow).fadeIn(600)
				.find('.tab-content').addClass('active');
			});
		},
		logoAnim: function(){
			function isEven(n) {
				return n % 2 == 0;
			};
			var cases  = $('section.cases'),
					icon   = cases.find('.case'),
					width  = $(window).width(),
					height = cases.height();

			cases.mousemove(function(e) {   
				var xPos = e.pageX;
				var yPos = e.pageY;
				var xPos = xPos - (Math.floor(width/2));
				var yPos = yPos - (Math.floor(height/2));       
				icon.css({
					'-webkit-transform': 'rotateY('+ xPos/20 +'deg)',
					'transform': 'rotateY('+ xPos/20 +'deg)'
				});       
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

				if(scrl > main.opt.header.height()){
					main.opt.menu.addClass('active');         
				}else{
					if($('.stick-menu').hasClass('active')){
						$('.side-menu').click();
					}
					main.opt.menu.removeClass('active');
				};
			});
		},
		init: function(){
			// default functions
			this.dragstart(this.opt.img);
			this.dragstart(this.opt.linc);

			// this.logoAnim();

			// tabs init 
			this.tabs(this.opt.tabs);
			// popup init
			this.popup(this.opt.popup);
			// Add el window height
			this.fullHeight(this.opt.body);
			//owl slider init
			this.opt.slider.owlCarousel(new this.opt.owlOptions(true));
			this.opt.carousel.owlCarousel(new this.opt.owlOptions(false));
			//mob button toggle
			//this.toggleC(this.opt.mobButton);

			this.scrollEvents();
			this.menuAnim();
			this.langSwitcher();
		}
	};

	//E-mail Ajax Send
	$("form.send-form").submit(function() { 
		var th = $(this);
		$.ajax({
			type: "POST",
			url: th.action,
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

		function tabs(){
			$('.tabs button').on('click', function(){
				var ind = $(this).data('index');
				$('.tabs button').removeClass('active');
				$('.content-item img').removeClass('active');
				$(this).addClass('active');
				$('.content-item img').eq(ind).addClass('active');
			});
		};
		tabs();

		function logoAnim(){      
			var logo = $('.hills');
			var width = $(window).width();
			var height = $('header').height();

			$('.video').mousemove(function(e) {   
				var xPos = e.pageX;
				var yPos = e.pageY;

				var xPos = xPos - (Math.floor(width/2));
				var yPos = yPos - (Math.floor(height/2));

				logo.css({
					//'-webkit-transform': 'rotateY('+ xPos/20 +'deg) rotateX('+ (-yPos/20) +'deg)',
					//'transform': 'rotateY('+ xPos/20 +'deg) rotateX('+ (-yPos/20) +'deg)'
					'transform': 'translate('+ yPos/20 +'px, '+ xPos/20 +'px)'
				});   
			});
		};
		//logoAnim();

		$(document).on('click','.js-videoPoster',function(ev) {
			ev.preventDefault();
			var $poster = $(this);
			var $wrapper = $poster.closest('.js-videoWrapper');
			videoPlay($wrapper);
		});

		function videoPlay($wrapper) {
			var $iframe = $wrapper.find('.js-videoIframe');
			var src = $iframe.data('src');
			$wrapper.addClass('videoWrapperActive');
			$iframe.attr('src',src);
		}

		$(document).on('click','.closeWideo',function(ev){
			videoStop($(this).parent());
		});

		function videoStop($wrapper){
			if (!$wrapper) {
				var $wrapper = $('.js-videoWrapper');
				var $iframe = $('.js-videoIframe');
			} else {
				var $iframe = $wrapper.find('.js-videoIframe');
			}
			$wrapper.removeClass('videoWrapperActive');
			$iframe.attr('src','');
		};

		$.getJSON("http://ip-api.com/json/?callback=?", function(data){
			var phone = $('header .pnone-block a:first-child');
      var country = data.country, 
       		ip      = data.query;

			switch(country) {
			  case 'Ukraine':
			  	phone.text('+380 (44) 207-39-55');
			  	phone.attr('href','tel://+380 (44) 207-39-55');
			    break;
			  case 'Russia':
			  	phone.text('+7 (495) 204-15-09');
			  	phone.attr('href','tel://+7 (495) 204-15-09');
			    break;
			  case 'Kazakhstan':
			  	phone.text('+7 (727) 350-76-33');
			  	phone.attr('href','tel://+7 (727) 350-76-33');
			    break;
			  case 'Estonia':
			  	phone.text('+372 884-00-64');
			  	phone.attr('href','tel://+372 884-00-64');
			    break;
			  default:
			  	phone.text('+380 (44) 207-39-55');			    
			  	phone.attr('href','tel://+380 (44) 207-39-55');			  	
			};
        // console.log(country + "," + ip);
        //Ukraine Russia Kazakhstan Estonia
    });

		var grid = $('.grid');
				grid.packery();
				grid.find('.blog-grid').hoverdir({hoverElem:'.site-descr'});

	//    var pageScroll = {
		//  itemAc: $('nav ul li,menu ul li'),
		//  addClas: function(el){
		//    pageScroll.itemAc.removeClass('active');
		//    $(el).addClass('active');   
		//  },
		//  init: function(){
		//    pageScroll.itemAc.on('click',function(){    
		//      pageScroll.addClas(this);     
		//      var pos = $($(this).attr('data-id')).offset().top;
		//      $('body').animate({scrollTop: pos}, 1000);      
		//    });
		//  }
		// }

		$('.animation-arrow').on('click', function(){
			var h = $('.tabs-wrap').offset().top;
			$('body,html').animate({scrollTop: h}, 1000);     
		});

		//$('#test').on('click', function(){
		//  if($(this).hasClass('active')){
		//    $('.disc-product .disc-item').css('width','400px');       
		//    $(this).removeClass('active');
		//  }else{
		//    $(this).addClass('active');
		//    $('.disc-product .disc-item').css('width','0px');       
		//  };
		//});

		// $('.disc-product .disc-item').on('click', function(){
		//  var that   = $(this);
		//    deg      = $(this).data('deg'),
		//    ind      = $(this).data('index'),
		//    products = $('.product-wrap .product-item'),
		//    addClass = function(){
		//      that.addClass('active');

		//      products.eq(ind-1).addClass('active');
		//    };
		//  deg+=90;
		//  products.removeClass('active');
		//  $('.disc-product .disc-item').removeClass('active');

		//  $('.disc-product').css({
		//    'transform': 'rotate('+ deg +'deg)'
		//  });
		//  setTimeout(addClass,1000);
		// });
		
		// if(localStorage.getItem("User")){      
		//  $('.loader-wrap').detach();
		//  //localStorage.clear()
		// }else{
		//  localStorage.setItem("User", true)
		// };

		// setTimeout(function(){     
		//  $('.loader-wrap').fadeOut(600);
		// }, 5000);

		try {
			$.browserSelector();
			if($("html").hasClass("chrome")) {
					$.smoothScroll();
			}
		} catch(err) {};  
	});
});