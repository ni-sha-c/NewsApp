$(document).ready(function(){  $.ajax({ url:'/post/0' , success:function(blue){ console.log(blue);for(var i=0;i<5;i++){ var contents="<a  href='"+ "/view/" + blue[i].pid+ "' ><h1>" + blue[i].title+ "</h1></a>";contents+="<p>"+blue[i].contents+"</p>"; contents+="<div class='author'>by" + blue[i].author+ "on"+blue[i].time+"</div>"; $(".articles-scroll").append(contents);} } });});
var slider = (function(el,time){
	var s = {
		el : el,
		time : time,
		max : el.getElementsByTagName('img').length - 1,
		curr : 0,
		i : 1,
		interval : 0
	}
	$(s.el).addClass('slider')
	s.slide = function(i){
		if(!i){
			if(s.curr == s.max)
				s.i = -1
			if(s.curr == 0)
				s.i = 1
			var i = s.i
		}
		var target = s.curr + i
		if(target < 0 || target > s.max)
			return
		var t = s.el.getElementsByTagName('img')[target]
		var child = $('.current').stop(true,true).fadeOut(function(){this.innerHTML = ""})
		$(s.el.getElementsByTagName('img')[0]).stop(true,true).animate({marginLeft : '+='+-t.offsetLeft},function(){
			s.curr = target
			var h = t.getAttribute('title')
			child.html(h).fadeIn()
		})
	}
	s.interval = setInterval(s.slide,time)
	return s
})(document.getElementById('archive-scroll'),4000)

$('.current').html(slider.el.getElementsByTagName('img')[0].getAttribute('title'))

$('.previous').click(function(){
	slider.slide(-1)
	clearInterval(slider.interval)
	slider.interval = setInterval(slider.slide,slider.time)
})

$('.next').click(function(){
	slider.slide(1)
	clearInterval(slider.interval)
	slider.interval = setInterval(slider.slide,slider.time)
})
