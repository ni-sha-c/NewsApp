/* Author:
Ashwini Khare@SDSLabs
*/
    
 $(document).ready(function(){
	 $('#archive-scroll').bxSlider();	
	 $(window).scroll(function(){
			var verticalPosition=$(window).scrollTop();
			//if(verticalPosition>50)
				//hideMainhead();
			
		 }); 
	var hideMainhead=function(){
			$('.mainHead').hide();
			$('.auxiliaryHead').fadeIn('slow');
		}
	var hideAuxiliaryhead=function(){
			$('.auxiliaryHead').hide();
			$('.mainHead').fadeIn('slow');
		}
$.ajax({
	url:'/post/wonasds/json1.pid',
	success:function(data){
		console.log(data);
		}
	});
 });
 



