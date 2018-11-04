/* ==========================================================================
Main javascripts
========================================================================== */

$(function($){

	halkbankApp.init();

	halkbankApp.trigger();

	$("ul.menu .activeMenu").siblings(".submenu").show(), $("ul.menu .activeMenu i").show()


}); // ready bitis

var caparams = {}
var capobject = {}
var halkbankApp = {
	
	init: function(){

		halkbankApp.pageUX();
		halkbankApp.mainSlider();

		halkbankApp.customFormElements();
		halkbankApp.customDatePicker();

	},

	// Hizli arama kutusu goster-gizli islemi
	searchBox: function(){
		var $searchInput = $('#qSearch');
		$searchInput.clearDefault();
		if($searchInput.is('.inactive')){
			$searchInput.removeClass('inactive').addClass('active').show().animate({
				width: '230px'
			});
		}

		$searchInput.focusout(function(){
			$searchInput.removeClass('active').addClass('inactive').animate({
				width: '0px'
			}, function(){
				$searchInput.hide();
			});
		});
	},

	// sayfa breadcrumb ve göstericiler ayarlaniyor
	pageUX: function(){
		var $page = $('body').attr('page');
		var $headerTitle = $('header h1');
		$headerTitle.addClass($page);
	},

	// anasayfada yer alan slider olusturuluyor
	mainSlider: function(){
		$('.bxslider').bxSlider({
			adaptiveHeight: true,
			pagerCustom: '.customPager',
			controls: false
		});
	},

	// custom select kutuları olusturuluyor
	customFormElements:function(){
		
		// IE8 Placeholder
		if($('html').is('.lt-ie9') || $('html').is('.no-cssanimations')){
			var $txtCalculate = $('.txtboxCalculate');
			$txtCalculate.each(function(){
				$(this).val($(this).attr('placeholder'));
			});
			$('.txtboxCalculate').clearDefault();
			
			var $txtSend = $('.txtSend');
			$txtSend.each(function(){
				$(this).val($(this).attr('placeholder'));
			});
		}
		
		$('#txtKeyword').clearDefault();
		$('#txtSearch').clearDefault();

		$('.txtSend').clearDefault();

		$('.custom-selectbox').select2();
		$('.custom-checkbox').checkbox();

		$('.custom-radio').checkbox({ cls: 'custom-radio' });

	},

	// Custom Date Picker olusturuluyor
	customDatePicker: function(){
		$('.date input').datepicker({
            dateFormat: "dd.mm.yy",
            showOn: "button",
            buttonImage: "/images/icon-date.png",
            buttonImageOnly: true,
            numberOfMonths: 1
        });
	},


	// Send to Mail
	emailBox: function(clickElements){
	    var $this = clickElements;
	    var containerId = $this.attr('href');
	    var $container = $(containerId);
		var $sendPerson = $this.attr('to-email');
		var $toEmailContent = $container.find("h2 span");
		var toEmailAddress = $this.attr("email-address");
		var $toEmailAddressField = $container.find("[name='emailAddress']");



		var $captchaObj = $container.find(".captcha-input").get(0).Captcha;
		capobject = $container.find(".captcha-input").get(0).Captcha;

		caparams.CaptchaId = $captchaObj.Id;
		caparams.InstanceId =$captchaObj.InstanceId;
		caparams.UserInput =$container.find(".captcha-input").val();


		$('.sendEmail').colorbox({
			inline:true,
			width:600,
			overlayClose: true,
			escKey: false,
			closeButton: false,
			onOpen: function(){
				$('.txtSend').val('');
				halkbankApp.customFormElements();
				$toEmailContent.html($sendPerson);
				$toEmailAddressField.val(toEmailAddress);
			}
		});
	},

	// Dropdown icerikli sayfalar
	dropdownContent: function(clickElements){
		var $this = clickElements;
		$this.siblings('.dropdownContent').slideToggle().parent().toggleClass('activeList');
	},

	// Executive Management tab sistemi
	hrContent: function(clickElements){
		var $this = clickElements;
		var $arrow = $('.arrow');
		var $hrContent = $('.hrContent');
		var $hrPerson = $('.hrCntr section');
		var $hrThisPer = $this.parent().parent();
		var perId = $hrThisPer.attr('person-id');
		//var perPos = $hrThisPer.position().top;
		$arrow.removeClass('active');
		$this.addClass('active');
		$hrContent.hide();
		$hrContent.find('article').hide();
		$hrPerson.css('height','225px');
		$hrThisPer.css('height','235px');
		$hrContent.show();
		$hrContent.find('article[person-content="'+perId+'"]').fadeIn();
		//$('body').scrollTop(perPos-240);
	},


	// Affiliates tab sistemi
	affiliatesContent: function(clickElements){
		var $this = clickElements;
		var $afContent = $('.affiliatesContent');
		var $afBrand = $('.affiliatesCntr section');
		var afId = $this.attr('brand-id');
		console.log(afId);
		//var perPos = $hrThisPer.position().top;
		$afContent.hide();
		$afContent.find('.affiliatesInfo').hide();
		//$afContent.find('article').hide();
		$afBrand.css('height','225px');
		$this.parents('.affiliates').css('height','235px');
		$afContent.find('.affiliatesInfo[brand-content="'+afId+'"]').parent().show();
		$afContent.find('.affiliatesInfo[brand-content="'+afId+'"]').show();
		//$afContent.find('.affiliatesInfo').attr('[brand-content="'+afId+'"]');
		//$('body').scrollTop(perPos-240);
	},

	// Share Price sayfasi tab sistemi
	sharePriceContent: function(clickElements){
		var $this = clickElements;
		var $pageTabContent = $('.pageTabContent');
		var $tabMenu = $('.sharePriceList li');
		var tabURL = $this.attr('tab-url');
		$tabMenu.removeClass();
		$this.parent().addClass('activeTab');
		$pageTabContent.find('.sharePriceTab').hide();
		$pageTabContent.find('.'+tabURL).show();
	},

	// Timeline Göstergeci
	timeline:function(clickElements){
		var $this = clickElements;
		var $timelineSec = $('.timeline li');
		var $timelineData = $('.btnTimeline');
		$timelineData.each(function(){
			$(this).text($(this).attr('data-year'));
		});
		$timelineSec.removeClass();
		$this.parent().addClass('active');
		$this.text('');
		$('.timelineInfo').hide();
		$this.siblings('.timelineInfo').fadeIn();
	},

	// History Timeline
	historicalTimeline: function(clickElements){
		var $this = clickElements;
		var $historicalInfo = $('.historicalCntr');
		var $timelist = $('.timelineHistory li');
		var $btnHistoryAll = $('.btnHistory');
		$btnHistoryAll.css('background','transparent url("/images/history-timeline-dot.png") center 14px no-repeat');
		$this.css('background','none');
		$historicalInfo.hide();
		$timelist.removeClass();
		$this.parent().addClass('active');
		$this.siblings($historicalInfo).fadeIn();
	},

	// Tetikleyici ve eventleri bir araya getiriliyor
	trigger: function(){
		
		// anasayfa slide tetikleyicisi
		var $tabPagerCntr = $('.tabPagerCntr');
		var $tabPage = $tabPagerCntr.find('a');
		var $tabContent = $('.infSliderCntr');
		$tabPage.click(function(e){
			var tabURL = $(this).attr('tab-url');
			$tabPage.removeClass();
			$(this).addClass('active');
			$tabContent.hide();
			$tabContent.parent().find('.infSliderCntr[data-tab="'+tabURL+'"]').show();
			e.preventDefault();
		});

		//searchbox tetikleyicisi
		var $qSearch = $('.searchLink');
		$qSearch.click(function(){
			halkbankApp.searchBox();
		});

		// markets tab tetikleyicisi
		var $market = $('.marketCapCntr');
		var $marketMenu = $('.marketMenu a');
		var $marketTabs = $marketMenu.parent();
		$marketMenu.click(function(e){
			var tabURL = $(this).attr('tab-url');
			
			$marketTabs.parent().find('.activeMarketTab').removeClass();
			$(this).parent().addClass('activeMarketTab');
			$market.find('.markets').hide();
			$market.find('.markets[data-tab="'+tabURL+'"]').show();
			e.preventDefault();
		});

		// dropdown content tetikleyicisi
		var $dropdownElm = $('.dropdownList a');
		$dropdownElm.click(function(e){
			halkbankApp.dropdownContent($(this));
			e.preventDefault();
		});


		// HR Content tetikleyicisi
		var $hrArrow = $('.arrow');
		$hrArrow.click(function(e){
			halkbankApp.hrContent($(this));
			e.preventDefault();
		});

		// Share Price Data sayfasi tab tetikleyici
		var $sharePriceTab = $('.sharePriceList a');
		$sharePriceTab.click(function(e){
			halkbankApp.sharePriceContent($(this));
			e.preventDefault();
		});

		// Affiliates sayfasi tab tetikleyici
		var $affiliatesTab = $('.btnAffiliates');
		$affiliatesTab.click(function(e){
			halkbankApp.affiliatesContent($(this));
			e.preventDefault();
		});

		// E-Mail gönderme popup'nin tetikleyicisi
		var $btnSendEmail = $('.sendEmail');
		$btnSendEmail.click(function(e){
			halkbankApp.emailBox($(this));
			e.preventDefault();
		});

		//Timeline Göstermek icin tetikleyici
		var $btnTimeline = $('.btnTimeline');
		$btnTimeline.click(function(e){
			halkbankApp.timeline($(this));
			e.preventDefault();
		});

		// History Tetikleyicisi
		var $btnHistory = $('.btnHistory');
		$btnHistory.click(function(e){
			halkbankApp.historicalTimeline($(this));
			e.preventDefault();
		});

	}

};

//function clearDefault
$.fn.clearDefault = function(){
	return this.each(function(){
	var default_value = $(this).val();
	$(this).focus(function(){
		
        if ($(this).val() == default_value) {
            $(this).val("");
            
            if($(this).hasClass('placeholder')){
                $(this).removeClass('phStyle');
            }
        }
	});
	$(this).blur(function(){
		
        if ($(this).val() == ""){
            $(this).val(default_value);
            $(this).addClass('phStyle');
        }

		});
	});
};


// Select2 turkcelestiriliyor
(function ($) {
    "use strict";

    $.extend($.fn.select2.defaults, {
        formatNoMatches: function () { return "Sonuç bulunamadı"; },
        formatInputTooShort: function (input, min) { var n = min - input.length; return "En az " + n + " karakter daha girmelisiniz"; },
        formatInputTooLong: function (input, max) { var n = input.length - max; return n + " karakter azaltmalısınız"; },
        formatSelectionTooBig: function (limit) { return "Sadece " + limit + " seçim yapabilirsiniz"; },
        formatLoadMore: function (pageNumber) { return "Daha fazla..."; },
        formatSearching: function () { return "Aranıyor..."; }
    });
})(jQuery);
