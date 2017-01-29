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


		var grid = $('.grid');
      	grid.packery();
      	grid.find('.blog-grid').hoverdir({hoverElem:'.site-descr'});	

		//$('#test').on('click', function(){
		//	if($(this).hasClass('active')){
		//		$('.disc-product .disc-item').css('width','400px');				
		//		$(this).removeClass('active');
		//	}else{
		//		$(this).addClass('active');
		//		$('.disc-product .disc-item').css('width','0px');				
		//	};
		//});

		$('.disc-product .disc-item').on('click', function(){			
			var	that	 = $(this);
			 	deg 	   = $(this).data('deg'),
			 	ind      = $(this).data('index'),
				products = $('.product-wrap .product-item'),				
				addClass = function(){
					that.addClass('active');

					products.eq(ind-1).addClass('active');
				};
			deg+=90;
			products.removeClass('active');
			$('.disc-product .disc-item').removeClass('active');

			$('.disc-product').css({
				'transform': 'rotate('+ deg +'deg)'
			});
			setTimeout(addClass,1000);
		});		
		
		if(localStorage.getItem("User")){			
			$('.loader-wrap').detach();
			//localStorage.clear()
		}else{
			localStorage.setItem("User", true)
		};

		setTimeout(function(){			
			$('.loader-wrap').fadeOut(600);
		}, 5000);

		try {
			$.browserSelector();
			if($("html").hasClass("chrome")) {
					$.smoothScroll();
			}
		} catch(err) {};	
	});
});
