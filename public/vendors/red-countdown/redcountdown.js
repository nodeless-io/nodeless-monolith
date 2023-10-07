/*!
 * jQuery Red Countdown
 * (C) 2014 Dawid CzerwoĹ„ski
 * w: www.czerwonski.pl
 * e: dawid@czerwonski.pl
 * m: 0048 533 99 55 77
 *
 * This is copyrighted software. You can purchase licence on www.codecanyon.net
 */

 
(function ($) {
	$.fn.redCountdown = function(Options, Callback) {
		var Element = $(this);    
		var DaysLeft, HoursLeft, MinutesLeft, SecondsLeft;
		var OnlySecondsLeft;
		var Fired = false;
		
		// Default settings
		var Settings = {
				end:	undefined,
				now:	$.now(),
				labels: true,
				labelsOptions: {
					lang: {
						days: 'Days',
						hours: 'Hours',
						minutes: 'Minutes',
						seconds: 'Seconds'
					},
					style: 'font-size:0.5em;'
				},
				style: {
					element: "",
					labels: false,
					textResponsive: .5,
					daysElement: {
						gauge: {
							thickness: .02,
							bgColor: "rgba(0,0,0,0)",
							fgColor: "rgba(0,0,0,1)",
							lineCap: 'butt'
						},
						textCSS: ''
					},
					hoursElement: {
						gauge: {
							thickness: .02,
							bgColor: "rgba(0,0,0,0)",
							fgColor: "rgba(0,0,0,1)",
							lineCap: 'butt'
						},
						textCSS: ''
					},
					minutesElement: {
						gauge: {
							thickness: .02,
							bgColor: "rgba(0,0,0,0)",
							fgColor: "rgba(0,0,0,1)",
							lineCap: 'butt'
						},
						textCSS: ''
					},
					secondsElement: {
						gauge: {
							thickness: .02,
							bgColor: "rgba(0,0,0,0)",
							fgColor: "rgba(0,0,0,1)",
							lineCap: 'butt'
						},
						textCSS: ''
					}
					
				},
				onEndCallback: function() { }
			};
		
		// If preset is set
		if (Options.preset) {
			Settings = $.extend(true, Settings, getPreset(Options.preset));
		}
		
		// Get custom settings
		Settings = $.extend(true, Settings, Options);
				
		prepareCountdown();
		Ticking();
		var tickInterval = setInterval(Ticking, 1000);
		Responsive();
		

		function getPreset(presetName) {
			switch (presetName) {
				case 'flat-colors': return {labels:true,style:{element:"",textResponsive:.5,daysElement:{gauge:{thickness:.01,bgColor:"rgba(0,0,0,0.05)",fgColor:"#1abc9c"},textCSS:'font-family:\'Open Sans\';font-weight:300;color:#34495e;'},hoursElement:{gauge:{thickness:.01,bgColor:"rgba(0,0,0,0.05)",fgColor:"#2980b9"},textCSS:'font-family:\'Open Sans\';font-weight:300;color:#34495e;'},minutesElement:{gauge:{thickness:.01,bgColor:"rgba(0,0,0,0.05)",fgColor:"#8e44ad"},textCSS:'font-family:\'Open Sans\';font-weight:300;color:#34495e;'},secondsElement:{gauge:{thickness:.01,bgColor:"rgba(0,0,0,0.05)",fgColor:"#f39c12"},textCSS:'font-family:\'Open Sans\';font-weight:300;color:#34495e;'}}};
				case 'flat-colors-fat': return {labels:true,style:{element:"",textResponsive:.5,daysElement:{gauge:{thickness:.03,bgColor:"rgba(0,0,0,0.05)",fgColor:"#1abc9c"},textCSS:'font-family:\'Open Sans\';font-weight:300;color:#34495e;'},hoursElement:{gauge:{thickness:.03,bgColor:"rgba(0,0,0,0.05)",fgColor:"#2980b9"},textCSS:'font-family:\'Open Sans\';font-weight:300;color:#34495e;'},minutesElement:{gauge:{thickness:.03,bgColor:"rgba(0,0,0,0.05)",fgColor:"#8e44ad"},textCSS:'font-family:\'Open Sans\';font-weight:300;color:#34495e;'},secondsElement:{gauge:{thickness:.03,bgColor:"rgba(0,0,0,0.05)",fgColor:"#f39c12"},textCSS:'font-family:\'Open Sans\';font-weight:300;color:#34495e;'}}};
				case 'flat-colors-very-fat': return {labels:true,style:{element:"",textResponsive:.5,daysElement:{gauge:{thickness:.12,bgColor:"rgba(0,0,0,0.05)",fgColor:"#1abc9c"},textCSS:'font-family:\'Open Sans\';font-weight:300;color:#34495e;'},hoursElement:{gauge:{thickness:.12,bgColor:"rgba(0,0,0,0.05)",fgColor:"#2980b9"},textCSS:'font-family:\'Open Sans\';font-weight:300;color:#34495e;'},minutesElement:{gauge:{thickness:.12,bgColor:"rgba(0,0,0,0.05)",fgColor:"#8e44ad"},textCSS:'font-family:\'Open Sans\';font-weight:300;color:#34495e;'},secondsElement:{gauge:{thickness:.12,bgColor:"rgba(0,0,0,0.05)",fgColor:"#f39c12"},textCSS:'font-family:\'Open Sans\';font-weight:300;color:#34495e;'}}};
				case 'flat-colors-black': return {labels:true,style:{element:"",textResponsive:.5,daysElement:{gauge:{thickness:.25,bgColor:"rgba(0,0,0,0.05)",fgColor:"#1abc9c", lineCap: 'round'},textCSS:'font-family:\'Open Sans\';font-weight:300;color:#34495e;'},hoursElement:{gauge:{thickness:.25,bgColor:"rgba(0,0,0,0.05)",fgColor:"#2980b9", lineCap: 'round'},textCSS:'font-family:\'Open Sans\';font-weight:300;color:#34495e;'},minutesElement:{gauge:{thickness:.25,bgColor:"rgba(0,0,0,0.05)",fgColor:"#8e44ad", lineCap: 'round'},textCSS:'font-family:\'Open Sans\';font-weight:300;color:#34495e;'},secondsElement:{gauge:{thickness:.25,bgColor:"rgba(0,0,0,0.05)",fgColor:"#f39c12", lineCap: 'round'},textCSS:'font-family:\'Open Sans\';font-weight:300;color:#34495e;'}}};
				case 'black': return {labels:true,style:{element:"",textResponsive:.5,daysElement:{gauge:{thickness:.01,bgColor:"rgba(0,0,0,0.05)",fgColor:"#222"},textCSS:'font-family:\'Open Sans\';font-weight:300;color:#34495e;'},hoursElement:{gauge:{thickness:.01,bgColor:"rgba(0,0,0,0.05)",fgColor:"#222"},textCSS:'font-family:\'Open Sans\';font-weight:300;color:#34495e;'},minutesElement:{gauge:{thickness:.01,bgColor:"rgba(0,0,0,0.05)",fgColor:"#222"},textCSS:'font-family:\'Open Sans\';font-weight:300;color:#34495e;'},secondsElement:{gauge:{thickness:.01,bgColor:"rgba(0,0,0,0.05)",fgColor:"#222"},textCSS:'font-family:\'Open Sans\';font-weight:300;color:#34495e;'}}};
				case 'black-fat': return {labels:true,style:{element:"",textResponsive:.5,daysElement:{gauge:{thickness:.03,bgColor:"rgba(0,0,0,0.05)",fgColor:"#222"},textCSS:'font-family:\'Open Sans\';font-weight:300;color:#34495e;'},hoursElement:{gauge:{thickness:.03,bgColor:"rgba(0,0,0,0.05)",fgColor:"#222"},textCSS:'font-family:\'Open Sans\';font-weight:300;color:#34495e;'},minutesElement:{gauge:{thickness:.03,bgColor:"rgba(0,0,0,0.05)",fgColor:"#222"},textCSS:'font-family:\'Open Sans\';font-weight:300;color:#34495e;'},secondsElement:{gauge:{thickness:.03,bgColor:"rgba(0,0,0,0.05)",fgColor:"#222"},textCSS:'font-family:\'Open Sans\';font-weight:300;color:#34495e;'}}};
				case 'black-very-fat': return {labels:true,style:{element:"",textResponsive:.5,daysElement:{gauge:{thickness:.17,bgColor:"rgba(0,0,0,0.05)",fgColor:"#222"},textCSS:'font-family:\'Open Sans\';font-weight:300;color:#34495e;'},hoursElement:{gauge:{thickness:.17,bgColor:"rgba(0,0,0,0.05)",fgColor:"#222"},textCSS:'font-family:\'Open Sans\';font-weight:300;color:#34495e;'},minutesElement:{gauge:{thickness:.17,bgColor:"rgba(0,0,0,0.05)",fgColor:"#222"},textCSS:'font-family:\'Open Sans\';font-weight:300;color:#34495e;'},secondsElement:{gauge:{thickness:.17,bgColor:"rgba(0,0,0,0.05)",fgColor:"#222"},textCSS:'font-family:\'Open Sans\';font-weight:300;color:#34495e;'}}};
				case 'black-black': return {labels:true,style:{element:"",textResponsive:.5,daysElement:{gauge:{thickness:.25,bgColor:"rgba(0,0,0,0.05)",fgColor:"#222", lineCap: 'round'},textCSS:'font-family:\'Open Sans\';font-weight:300;color:#34495e;'},hoursElement:{gauge:{thickness:.25,bgColor:"rgba(0,0,0,0.05)",fgColor:"#222", lineCap: 'round'},textCSS:'font-family:\'Open Sans\';font-weight:300;color:#34495e;'},minutesElement:{gauge:{thickness:.25,bgColor:"rgba(0,0,0,0.05)",fgColor:"#222", lineCap: 'round'},textCSS:'font-family:\'Open Sans\';font-weight:300;color:#34495e;'},secondsElement:{gauge:{thickness:.25,bgColor:"rgba(0,0,0,0.05)",fgColor:"#222", lineCap: 'round'},textCSS:'font-family:\'Open Sans\';font-weight:300;color:#34495e;'}}};
				case 'white': return {labels:true,style:{element:"",textResponsive:.5,daysElement:{gauge:{thickness:.03,bgColor:"rgba(255,255,255,0.05)",fgColor:"#fff"},textCSS:'font-family:\'Open Sans\';font-weight:300;color:#fff;'},hoursElement:{gauge:{thickness:.03,bgColor:"rgba(255,255,255,0.05)",fgColor:"#fff"},textCSS:'font-family:\'Open Sans\';font-weight:300;color:#fff;'},minutesElement:{gauge:{thickness:.03,bgColor:"rgba(255,255,255,0.05)",fgColor:"#fff"},textCSS:'font-family:\'Open Sans\';font-weight:300;color:#fff;'},secondsElement:{gauge:{thickness:.03,bgColor:"rgba(255,255,255,0.05)",fgColor:"#fff"},textCSS:'font-family:\'Open Sans\';font-weight:300;color:#fff;'}}};
				case 'white-fat': return {labels:true,style:{element:"",textResponsive:.5,daysElement:{gauge:{thickness:.06,bgColor:"rgba(255,255,255,0.05)",fgColor:"#fff"},textCSS:'font-family:\'Open Sans\';font-weight:300;color:#fff;'},hoursElement:{gauge:{thickness:.06,bgColor:"rgba(255,255,255,0.05)",fgColor:"#fff"},textCSS:'font-family:\'Open Sans\';font-weight:300;color:#fff;'},minutesElement:{gauge:{thickness:.06,bgColor:"rgba(255,255,255,0.05)",fgColor:"#fff"},textCSS:'font-family:\'Open Sans\';font-weight:300;color:#fff;'},secondsElement:{gauge:{thickness:.06,bgColor:"rgba(255,255,255,0.05)",fgColor:"#fff"},textCSS:'font-family:\'Open Sans\';font-weight:300;color:#fff;'}}};
				case 'white-very-fat': return {labels:true,style:{element:"",textResponsive:.5,daysElement:{gauge:{thickness:.16,bgColor:"rgba(255,255,255,0.05)",fgColor:"#fff"},textCSS:'font-family:\'Open Sans\';font-weight:300;color:#fff;'},hoursElement:{gauge:{thickness:.16,bgColor:"rgba(255,255,255,0.05)",fgColor:"#fff"},textCSS:'font-family:\'Open Sans\';font-weight:300;color:#fff;'},minutesElement:{gauge:{thickness:.16,bgColor:"rgba(255,255,255,0.05)",fgColor:"#fff"},textCSS:'font-family:\'Open Sans\';font-weight:300;color:#fff;'},secondsElement:{gauge:{thickness:.16,bgColor:"rgba(255,255,255,0.05)",fgColor:"#fff"},textCSS:'font-family:\'Open Sans\';font-weight:300;color:#fff;'}}};
				case 'white-black': return {labels:true,style:{element:"",textResponsive:.5,daysElement:{gauge:{thickness:.25,bgColor:"rgba(255,255,255,0.05)",fgColor:"#fff", lineCap: 'round'},textCSS:'font-family:\'Open Sans\';font-weight:300;color:#fff;'},hoursElement:{gauge:{thickness:.25,bgColor:"rgba(255,255,255,0.05)",fgColor:"#fff", lineCap: 'round'},textCSS:'font-family:\'Open Sans\';font-weight:300;color:#fff;'},minutesElement:{gauge:{thickness:.25,bgColor:"rgba(255,255,255,0.05)",fgColor:"#fff", lineCap: 'round'},textCSS:'font-family:\'Open Sans\';font-weight:300;color:#fff;'},secondsElement:{gauge:{thickness:.25,bgColor:"rgba(255,255,255,0.05)",fgColor:"#fff", lineCap: 'round'},textCSS:'font-family:\'Open Sans\';font-weight:300;color:#fff;'}}};
			}
		}
		function prepareCountdown() {
			// Inject basic styles
			if ($("#redCountdownCSS").length <= 0) { 
				$("body").append("<style id='redCountdownCSS'>.redCountdownWrapper > div { display:inline-block; position:relative; width:calc(25% - 20px); margin:10px; } .redCountdownWrapper .redCountdownValue {  width:100%; line-height:1em; position:absolute; top:50%; text-align:center; left:0; display:block;}</style>");
			}
		
			// Create HTML elements
			Element.append('<div class="redCountdownWrapper"><div class="redCountdownDays"><input type="text" /><span class="redCountdownValue"><div></div><span></span></span></div><div class="redCountdownHours"><input type="text" /><span class="redCountdownValue"><div></div><span></span></span></div><div class="redCountdownMinutes"><input type="text" /><span class="redCountdownValue"><div></div><span></span></span></div><div class="redCountdownSeconds"><input type="text" /><span class="redCountdownValue"><div></div><span></span></span></div></div>');
		
			// Create jquery.knob instances
			Element.find(".redCountdownDays input").knob($.extend({width: '100%', displayInput: false, readOnly: true, max: 365}, Settings.style.daysElement.gauge));
			Element.find(".redCountdownHours input").knob($.extend({width: '100%', displayInput: false, readOnly: true, max: 24}, Settings.style.hoursElement.gauge));
			Element.find(".redCountdownMinutes input").knob($.extend({width: '100%', displayInput: false, readOnly: true, max: 60}, Settings.style.minutesElement.gauge));
			Element.find(".redCountdownSeconds input").knob($.extend({width: '100%', displayInput: false,  readOnly: true, max: 60}, Settings.style.secondsElement.gauge));

			// Style 
			Element.find(".redCountdownWrapper > div").attr("style", Settings.style.element);
			Element.find(".redCountdownDays .redCountdownValue").attr("style", Settings.style.daysElement.textCSS);
			Element.find(".redCountdownHours .redCountdownValue").attr("style", Settings.style.hoursElement.textCSS);
			Element.find(".redCountdownMinutes .redCountdownValue").attr("style", Settings.style.minutesElement.textCSS);
			Element.find(".redCountdownSeconds .redCountdownValue").attr("style", Settings.style.secondsElement.textCSS);
			Element.find(".redCountdownValue").each( function() {
				$(this).css("margin-top",Math.floor(0 - (parseInt($(this).height()) / 2)) + "px");
			});
			
			// Labels
			if (Settings.labels) {
				Element.find(".redCountdownDays .redCountdownValue > span").html(Settings.labelsOptions.lang.days);
				Element.find(".redCountdownHours .redCountdownValue > span").html(Settings.labelsOptions.lang.hours);
				Element.find(".redCountdownMinutes .redCountdownValue > span").html(Settings.labelsOptions.lang.minutes);
				Element.find(".redCountdownSeconds .redCountdownValue > span").html(Settings.labelsOptions.lang.seconds);
				
				Element.find(".redCountdownValue > span").attr("style", Settings.labelsOptions.style);
			}
			
			// Calculate seconds left and split into readable DHMS
			OnlySecondsLeft = Settings.end - Settings.now;
			SecsToDHMS();
		}
		
		/* Converts seconds to DHMS */
		function SecsToDHMS() {
			DaysLeft = 		Math.floor ( OnlySecondsLeft / 86400 );
			HoursLeft = 	Math.floor ( ( OnlySecondsLeft % 86400 ) / 3600);
			MinutesLeft =	Math.floor ( ( ( OnlySecondsLeft % 86400 ) % 3600 ) / 60);
			SecondsLeft = 	Math.floor ( ( ( ( OnlySecondsLeft % 86400 ) % 3600 ) % 60 ) % 60);		
		}
		
		/* Tick function */
		function Ticking() {
			
			// Decrease seconds left
			OnlySecondsLeft--;
			
			// Convert seconds to DHMS
			SecsToDHMS();
							
			// When it's over...
			if (OnlySecondsLeft <= 0) {
				if (!Fired) {
					Fired = true;
					Settings.onEndCallback();
				} 
				DaysLeft = 		0;
				HoursLeft = 	0;
				MinutesLeft =	0;
				SecondsLeft = 	0;
			}
			
			// Replace DOM values
			Element.find(".redCountdownDays input").val(365 - DaysLeft).trigger('change');
			Element.find(".redCountdownHours input").val(24 - HoursLeft).trigger('change');
			Element.find(".redCountdownMinutes input").val(60 - MinutesLeft).trigger('change');
			Element.find(".redCountdownSeconds input").val(60 - SecondsLeft).trigger('change');
			Element.find(".redCountdownDays .redCountdownValue > div").html(DaysLeft);
			Element.find(".redCountdownHours .redCountdownValue > div").html(HoursLeft);
			Element.find(".redCountdownMinutes .redCountdownValue > div").html(MinutesLeft);
			Element.find(".redCountdownSeconds .redCountdownValue > div").html(SecondsLeft);

		}
		
		/* Handles resizing */
		function Responsive() {
		
			// Keep it square 
			Element.find(".redCountdownWrapper > div").each(function() {
				$(this).css("height", $(this).width() + "px"); 
			});
			
			// Responsive font size
			if (Settings.style.textResponsive) { 
				Element.find(".redCountdownValue").css("font-size", Math.floor(Element.find("> div").eq(0).width() * Settings.style.textResponsive / 10) + "px");
				Element.find(".redCountdownValue").each( function() {
					$(this).css("margin-top",Math.floor(0 - (parseInt($(this).height()) / 2)) + "px");
				});
			}
				
			$(window).trigger("resize");	
			$(window).resize( $.throttle( 50, ResponsiveOnResize ) );
		}
		
		function ResponsiveOnResize (TriggerAfter) {
			// Keep it square 
			Element.find(".redCountdownWrapper > div").each(function() {
				$(this).css("height", $(this).width() + "px"); 
			});
			
			// Responsive font size 
			if (Settings.style.textResponsive) { 
				Element.find(".redCountdownValue").css("font-size", Math.floor(Element.find("> div").eq(0).width() * Settings.style.textResponsive / 10) + "px");
			}
			
			// Text vertical center
			Element.find(".redCountdownValue").each( function() {
				$(this).css("margin-top",Math.floor(0 - (parseInt($(this).height()) / 2)) + "px");
			});
			
			Element.find(".redCountdownDays input").trigger('change');
			Element.find(".redCountdownHours input").trigger('change');
			Element.find(".redCountdownMinutes input").trigger('change');
			Element.find(".redCountdownSeconds input").trigger('change'); 
		}
	}
})(jQuery);