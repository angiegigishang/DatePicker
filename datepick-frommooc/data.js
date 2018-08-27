(function() {
	var datepicker = {};

	datepicker.getMonthData = function(year, month) {
		var ret = [];//数组用来返回结果
		//参数判断，没有年或月时获取现在的年月
		if(!year || !month) {
			var today = new Date();
			year = today.getFullYear();
			month = today.getMonth() + 1;
		}

		var firstDay = new Date(year, month - 1, 1);//当月第一天
		var firstDayWeekDay = firstDay.getDay();//判断第一天是周几，以判断是否需要上个月
		if(firstDayWeekDay === 0) firstDayWeekDay = 7; //周日需要赋值为7

		year = firstDay.getFullYear();   //取值不越界
		month = firstDay.getMonth() + 1;

		var lastDayOfLastMonth = new Date(year, month - 1, 0);//上个月的最后一天
		var lastDateOfLastMonth = lastDayOfLastMonth.getDate();//将日期进行存储


		var preMonthDayCount = firstDayWeekDay - 1; //上月需要显示多少日期

		var lastDay = new Date(year, month, 0); //当月的最后一天，日期可能越界
		var lastDate = lastDay.getDate();  //当月最后一天星期几

		for(var i = 0; i < 7*6; i++){     //获取当月的每一天
			var date = i + 1 - preMonthDayCount;  
			var showDate = date;            
			var thisMonth = month;

			if(date <= 0){
				thisMonth = month - 1;   //上个月
				showDate = lastDateOfLastMonth + date;
			}else if(date > lastDate){   //下个月
				thisMonth = month + 1;
				showDate = showDate - lastDate;
			}

			if(thisMonth === 0) thisMonth = 12;
			if(thisMonth === 13) thisMonth = 1;

			ret.push({
				month: thisMonth,
				date: date,
				showDate: showDate
			});
		}

		return {
			year: year,
			month: month,
			days: ret
		}
	}



	window.datepicker = datepicker;

})();