(function ( $ ) {
	function pad(n) {
	    return (n < 10) ? ("0" + n) : n;
	}

	$.fn.showclock = function() {
	    
	    var currentDate=new Date();
	    var fieldDate=$(this).data('date').split('-');
	    var futureDate=new Date(fieldDate[0],fieldDate[1]-1,fieldDate[2]);
	    var seconds=futureDate.getTime() / 1000 - currentDate.getTime() / 1000;

	    if(seconds<=0 || isNaN(seconds)){
	    	this.hide();
	    	return this;
	    }

	    var days=Math.floor(seconds/86400);
	    seconds=seconds%86400;
	    
	    var hours=Math.floor(seconds/3600);
	    seconds=seconds%3600;

	    var minutes=Math.floor(seconds/60);
	    seconds=Math.floor(seconds%60);
	    
	    var html="";

	    if(days!=0){
		    html+="<div class='timer days'>"
		    	html+="<span class='days days-bottom'>"+pad(days)+"</span>";
                html+="<div class='smalltext days-top'>Days</div>";
		    html+="</div>";
		}

	    html+="<div class='timer hours'>"
            html+="<span class='hours hours-bottom'>"+pad(hours)+"</span>";
	    	html+="<div class='smalltext hours-top'>Hours</div>";
	    html+="</div>";

	    html+="<div class='timer minutes'>"
            html+="<span class='minutes minutes-bottom'>"+pad(minutes)+"</span>";
	    	html+="<div class='smalltext minutes-top'>Mins</div>";
	    html+="</div>";

	    html+="<div class='timer seconds'>"
            html+="<span class='seconds seconds-bottom'>"+pad(seconds)+"</span>";
	    	html+="<div class='smalltext seconds-top'>Secs</div>";
	    html+="</div>";

	    this.html(html);
	};

	$.fn.countdown = function() {
		var el=$(this);
		el.showclock();
		setInterval(function(){
			el.showclock();	
		},1000);
		
	}

}(jQuery));

jQuery(document).ready(function(){
	if(jQuery(".clock").length>0)
		jQuery(".clock").countdown();
})