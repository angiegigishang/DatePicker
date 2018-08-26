;(function($) {

	 var getData = function(year, month){

	 	if(!year && !month) {
	 		var myDate = new Date();
	 	}else {
	 		myDate = new Date(year, month-1);
	 	}

	 	var _self_ = this;
	 	this.a1 = this.find("div.a1");
	  		 	
	 	var date = myDate.getDate();
	 	var month = myDate.getMonth() + 1;
	 	var day = myDate.getDay();
	 	var year = myDate.getFullYear();
	 	

	 	var present = year + '-' + month + '-' + date;

	 	var firstDate = new Date(year, month-1, 1);
	 	var firstDay = firstDate.getDay();

	 	var lastDateOfLastMonth = new Date(year, month-1, 0);
	 	var lastDayofLastMonth = lastDateOfLastMonth.getDate();
	 	var lastWeekDayofLastMonth = lastDateOfLastMonth.getDay();

	 	var lastDate = new Date(year, month, 0);
	 	var lastDay = lastDate.getDate();

	 	console.log(date, month, day, year);
	 	console.log(firstDay, lastDay);
	 	console.log(lastDateOfLastMonth, lastDayofLastMonth, lastWeekDayofLastMonth);

	 	var showDate = [];
	 	var showMonth = [];
	 	var i = i;
	 	var ret = [];

	 	

	 	var show = function() {
	 		
	 		for(var i = 0; i <42; i++) {
	 			if(firstDay === 0) {
	 		         firstDay = 7;
	 	        }
	 			var days = i - firstDay;
	 			//console.log(days);
	 			if(days < 0) {
		 			showDate[i] = lastDayofLastMonth + days;
		 			showMonth = month + 1;
		 			}
		 		if(days >= 0  && days < lastDay) {
	 				showDate[i] = i - lastWeekDayofLastMonth;
	 				showMonth = month;
	 			}
	 			if(days >= lastDay) {
	 				showMonth = month + 1;
	 				showDate[i] = i - lastDay - lastWeekDayofLastMonth;
	 			}

	 			if(showMonth === 0) showMonth = 12;
	 			if(showMonth === 13) showMonth = 1;

	 			ret.push({
	 				month: showMonth,
	 				date: date,
	 				showDate: showDate,
	 				i:i
	 			})
	 		}
	 		console.log(showDate);
	 		return ret;
	 	}

	 	show();
	 	

	 	var html;
	 	var body = document.querySelector('.body');

	 	var render = function() {
	 		 html ='<input class="put"></input>'+ 
	 		 '<div class="title">'+
'					<div class="a a1"><</div>'+
'					<div class="a a2">'+ present +'</div>'+
'					<div class="a a3">></div>'+
'				</div>'+
'				<div class="content">'+
'					<table>'+
'						<tr>'+
'							<th>日</th>'+
'							<th>一</th>'+
'							<th>二</th>'+
'							<th>三</th>'+
'							<th>四</th>'+
'							<th>五</th>'+
'							<th>六</th>'+
'						</tr>'
				for(var i=0; i < 42; i++) {
					if(i%7 === 0) {
						html += '<tr>';
					}
					html += '<td>' + showDate[i] +'</td>';
				}
				html += '</tr>' +				
'					</table>'+
'				</div>'
	    
		
		body.innerHTML = html;

		return html;
	 	}

 		render();

 		var renderData = function() {
 			myDate = new Date(year, month-1);
 			firstDate = new Date(year, month-1, 1);
 			firstDay = firstDate.getDay();
 			lastDateOfLastMonth = new Date(year, month-1, 0);
	 		lastDayofLastMonth = lastDateOfLastMonth.getDate();
	 		lastWeekDayofLastMonth = lastDateOfLastMonth.getDay();
 			show();
 		}
 
		var start = false;
		
		$('input').on('click', function() {
			if(start){
				$('.content').removeClass('comeout');
				$('.title').removeClass('comeout');				
				start = false;
			}else{
				$('.content').addClass('comeout');
				$('.title').addClass('comeout');
				start = true;
			}
		});	

		$('.a1').on('click', function(){
 			//alert(1);
 			month--;
 			renderData();
 			present = year + '-' + month + '-' + date;
 			render();
 		});

		$('.a3').on('click', function() {

			//alert(2);
			month++;
			renderData();
			present = year + '-' + month + '-' + date;
 			render();
			});	

		$('td').on('click', function(e) {
			var target = e.target;
			var tdate = new Date(year, month-1, target.date);

 			firstDay = tdate.getDay();
 			lastDateOfLastMonth = new Date(year, month-1, 0);
	 		lastDayofLastMonth = lastDateOfLastMonth.getDate();
	 		lastWeekDayofLastMonth = lastDateOfLastMonth.getDay();
 			show();
 			console.log(tdate);
 			i = ret.i;
			present = year + '-' + month + '-' + showDate[i];
			$('input').val(present);
		})
	}

	 window.getData = getData;

})(jQuery);