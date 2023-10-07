(function($) {
	
	"use strict";
	
		//Event Countdown Timer
	if($('.red-countdown').length){ 
	
		$('.red-countdown').each(function() {
		var $this = $(this), NewDate = $(this).data('countdown');
		 
		//var NewDate = '28/12/2019';
		
		let current_datetime = new Date();
		let formatted_date = current_datetime.getDate() + "/" + (current_datetime.getMonth() + 1) + "/" + current_datetime.getFullYear();
		var a = moment(formatted_date, 'DD/MM/YYYY');
		var b = moment(NewDate, 'DD/MM/YYYY');
		var remainingDays = b.diff(a, 'days');
		//var remainingDays = moment(NewDate).fromNow(true);
		var currentHours = current_datetime.getHours();
		var FinalHours = (24-currentHours)*60*60;
		var currentMins = current_datetime.getMinutes();
		var FinalMins = (60-currentMins)*60;
		var currentSecs = current_datetime.getSeconds();
		var FinalSecs = (60-currentSecs);
		var remainSum = FinalHours+FinalMins+FinalSecs;
		
		var endDate = remainingDays*24*60*60;
		var FinalendDate = endDate+remainSum;
		//alert(FinalendDate);
		$('.red-countdown-one').redCountdown({
			end: $.now() + FinalendDate,
			labels: true,
			style: {
				element: "",
				textResponsive: 0.5,
				daysElement: {
					gauge: {
						thickness: 0.09,
						bgColor: "#f2ede6",
						fgColor: "#7e3cf9"
					}
				},
				hoursElement: {
					gauge: {
						thickness: 0.09,
						bgColor: "#f2ede6",
						fgColor: "#2d8dfa"
					}
				},
				minutesElement: {
					gauge: {
						thickness: 0.09,
						bgColor: "#f2ede6",
						fgColor: "#9449fb"
					}
				},
				secondsElement: {
					gauge: {
						thickness: 0.09,
						bgColor: "#f2ede6",
						fgColor: "#4ad425"
					}
				}
				
			},
			onEndCallback: function() { console.log("Time out!"); }
		});
		});
	}

})(window.jQuery);