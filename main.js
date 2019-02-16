let $slide = $('#slides');
let $images = $slide.children('img');
let $button = $('#buttonWrapper > img')
let current = 0;
let previous = $('#previous')
let next = $('#next')


x();
$slide.css({transform:'translateX(-700px)'})
y();

previous.on('click',function(){
   goToSlide(current-1)
})
next.on('click',function(){
    goToSlide(current+1)
 })

let timer = setInterval(function(){
    goToSlide(current+1);
},4000)

$slide.on('mouseenter',function(){
   clearInterval(timer)
})
$slide.on('mouseleave',function(){
    timer = setInterval(function(){
        goToSlide(current+1);
    },2000)
 })
function y(){
    $('#buttonWrapper').on('click','img',function(e){
        let index = $(e.currentTarget).index();
              goToSlide(index)
    })
}

function goToSlide(index){
    if(index>$button.length-1){
        index=0;
    }
    else if(index<0){
        index=$button.length-1;
    }
    
    if(current===0&&index===$button.length-1){
        $slide.css({transform:`translateX(0px)`})
        .one('transitionend',function(){
            $slide.hide().offset();
            $slide.css({transform:`translateX(${-(index+1)*700}px)`}).show()
        })
    }
    else if(current===$button.length-1&&index===0){
            $slide.css({transform:`translateX(${-($button.length+1)*700}px)`})
            .one('transitionend',function(){
                $slide.hide().offset();
                $slide.css({transform:`translateX(${-(index+1)*700}px)`}).show()
            })
    }
    else{
        $slide.css({transform:`translateX(${-(index+1)*700}px)`})
    }  
    current=index;
}
function x(){
   let $firstcopy =  $images.eq(0).clone(true);
   let $lastcopy = $images.eq($images.length-1).clone(true);
   $slide.append($firstcopy);
   $slide.prepend($lastcopy);
}