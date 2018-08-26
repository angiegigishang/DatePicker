;(function($) {

	var datepicker = {};

	datepicker.getData = function(year, month) {

		var myDate;
		var showDate = [];
		var ret = [];
		var showMonth;

		//是否传入年月日期，如果没有显示当前
		if(!year && !month) {
	 	    myDate = new Date();
	 	}else {
	 		myDate = new Date(year, month-1);
	 	}
		
		//当前的日期，月份，星期几，年	  		 	
	 	var date = myDate.getDate();
	 	var day = myDate.getDay();
	 	var month = myDate.getMonth() + 1;
	 	var year = myDate.getFullYear();

	 	//当前月份的第一天，星期
	 	var firstDate = new Date(year, month-1, 1);
	 	var firstDay = firstDate.getDay();

	 

	 	//获取上一个月的最后一天的日期，星期
	 	var lastDateOfLastMonth = new Date(year, month-1, 0);
	 	var lastDayofLastMonth = lastDateOfLastMonth.getDate();
	 	var lastWeekDayofLastMonth = lastDateOfLastMonth.getDay();

	 	//获取当前月份的最后一天
	 	var lastDate = new Date(year, month, 0);
	 	var lastDay = lastDate.getDate();

	 	//循环遍历上一个月本月及下一个月，共42天的日期
	 	for(var i = 0; i <42; i++) {
	 			//星期天的数值为0，更改为7
	 			if(firstDay === 0) {
	 		         firstDay = 7;
	 	        }
	 	        //如果i=0，firstDay为3，days为-3
	 			var days = i - firstDay;
	 			if(days < 0) {
		 			showDate = lastDayofLastMonth + days;
		 			showMonth = month - 1;
		 			}
		 		if(days >= 0  && days < lastDay) {
	 				showDate = i - lastWeekDayofLastMonth;
	 				showMonth = month;
	 			}
	 			if(days >= lastDay) {
	 				showMonth = month + 1;
	 				showDate = i - lastDay - lastWeekDayofLastMonth;
	 			}

	 			if(showMonth === 0) showMonth = 12;
	 			if(showMonth === 13) showMonth = 1;

	 			ret.push({ 	
	 			    month: showMonth,				 				
	 				showDate: showDate,	 				
	 			});


	 		} 	

	 		return {
	 			year: year,
	 			month: month,
	 			dates: ret
	 		};



	};

	window.datepicker = datepicker;

})(jQuery);