(function($) {

	var datepicker = window.datepicker;
	var getData;
	var $wrapper;
	var start;

	//var next,prev;
	
	datepicker.build = function(year, month) {

		//获取数据
		getData = datepicker.getData(year, month);

		var  html =
	 		 '<div class="title">'+
'					<div class="a a1"><</div>'+
'					<div class="a a2">'+getData.year+ '-' + getData.month +'</div>'+
'					<div class="a a3">></div>'+
'				</div>'+
'				<div class="content">'+
'					<table>'+
'						<tr>'+
'							<th>'+'日'+ '</th>'+
'							<th>一</th>'+
'							<th>二</th>'+
'							<th>三</th>'+
'							<th>四</th>'+
'							<th>五</th>'+
'							<th>六</th>'+
'						</tr>' 
				for(var i=0; i < 42; i++) {
					var data = getData.dates[i];
					//console.log(data);
					if(i%7 === 0) {
						html += '<tr>';
					}

					if(data.month !== getData.month) {
						html += '<td  style="background-color: #f0f0f0">' + data.showDate +'</td>';
					}else{
						html += '<td class="thisday">' + data.showDate +'</td>';
					}
					
					if((i+1)%7 === 0) {
						html += '</tr>';
					}
				}
				html += '</tr>' +				
'					</table>'+
'				</div>'
		return html;
	};

	datepicker.reRender = function(direction, input) {
		var year,month;
		if(getData) {
			year = getData.year;
			month = getData.month;
		}

		if(direction === 'next') {
			month++;
		}
		if(direction === 'prev') {
			month--;
		}

	    var html = datepicker.build(year, month);

	    $wrapper = document.querySelector('.datepicker');

		if(!$wrapper){
	    	$wrapper = document.createElement('div');
	    	document.body.appendChild($wrapper);
	    	$wrapper.className = 'datepicker';
	    }

	    $wrapper.innerHTML = html;

	    $('.a1').on('click', function(){
 			datepicker.reRender('prev', input);
 			start = false;
 			$(input).trigger("click");
 			
 		});

		$('.a3').on('click', function() {
			datepicker.reRender('next', input);
			start = false;
			$(input).trigger("click");					
		});	

		$('.thisday').on('click', function(e) {
	
			var $target = e.target;
			
			var day = parseInt($target.innerHTML);

			year = getData.year;
			month = getData.month;
			data = getData.dates;

			present = year + '-' + month + '-' + day;

			$('input').val(present);

			$('.content').removeClass('comeout');
			$('.title').removeClass('comeout');			
			
			console.log(year, month,day, data);
					
		})
	}

	datepicker.init = function(input) {

		datepicker.reRender('', input);

		$(input).css({
			position: 'relative'
		})
		
		start = false;		
		$(input).on('click', function() {

			if(start){
				$('.content').removeClass('comeout');
				$('.title').removeClass('comeout');				
				start = false;
			}else{
				//弹出前动态计算位置，input为relative，内容为absolute
				var left = $(input).offset().left;
				var top = $(input).offset().top;
				var height = $(input).height();
				var theight = $('.title').height();
				var ttop = top + height + 20 + 'px';
				var ctop = top + height + 20 + theight + 'px';

				$('.title').css(
						{top: ttop,
						 left: left + 'px'}
					);
				$('.content').css(
						{top: ctop,
						 left: left + 'px'}
					)

				$('.content').addClass('comeout');
				$('.title').addClass('comeout');
				
				start = true;
			}
		});	

	}
	

})(jQuery);