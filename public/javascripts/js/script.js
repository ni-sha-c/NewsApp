/* Author:
Ashwini Khare@SDSLabs
*/
    
 $(document).ready(function(){
	 $('#archive-scroll').bxSlider();	
	 $(window).scroll(function(){
			var verticalPosition=$(window).scrollTop();
			if(verticalPosition>50)
				$('header').hide();
		 }) 
	var hideMainhead=function(){
			$('.mainHead').hide();
			$('.auxiliaryHead').fadeIn('slow');
		}
	var hideAuxiliaryhead=function(){
			$('.auxiliaryHead').hide();
			$('.mainHead').fadeIn('slow');
		}
 });



