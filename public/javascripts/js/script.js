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
	url:'/post/0',
	success:function(data){
		console.log(data);
		for(i in data){
			var contents="<a href='/view/"+data[i].pid+"'><h1>"+data[i].title+'</h1></a>';
				contents+='<p>'+data[i].contents+'</p>';
				contents+="<div class='author'>by "+data[i].author+" @ "+data[i].time+"</div>";
			$('.articles-scroll').append(contents);	
			}
		}
	});
 });
 



