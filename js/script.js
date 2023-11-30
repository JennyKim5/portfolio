function topCal(top,anidis,scr){
    let pur = window.innerHeight/2 -70
    return top+(((pur-top)/anidis)*scr)
}
function leftCal(left,anidis,scr){
    let pur = window.innerWidth/2 -70
    return left+(((pur-left)/anidis)*scr)
}
function widthCal(width,anidis,scr){
    let pur = 140
    return width+(((pur-width)/anidis)*scr)
}
function heightCal(height,anidis,scr){
    let pur = 140
    return height+(((pur-height)/anidis)*scr)
}


$(document).ready(function(){
    //새로고침시 첫페이지로
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }

    $(".logo>a").click(function(e){
        e.preventDefault()
    })

    $(document).on('click','.gnb a',function(){
        $("html,body").animate({
            scrollTop : $(this.hash).offset().top
        },1000)
    });

    // header
    let headerState = true
    $(".logo").click(function(){
        if(headerState){
            $(".gnb").addClass("on")
            headerState = false
        }else{
            $(".gnb").removeClass("on")
            headerState = true
        }
    })

    // cover
    // setTimeout(function(){
    //     $(".cover").css("transform","translateY(-100%)")

    //     // $(".intro_txt").css("opacity","1")
    // },3000)
    // setTimeout(function(){
    //     $(".intro_words>*").css("opacity","1")
    //     $(".intro_icon>*").css("opacity","1")
    // },4000)

    //cover

    setTimeout(function(){
        $(".intro_wordsB>li").addClass("begin")
    },2000)
    setTimeout(function(){
        $(".intro_wordsB").removeClass("begin")
        // $(".intro_wordsB").css("display","none")
        $(".cover").removeClass("begin")
    },4000)

    

    let scr = 0
    let devHeight = $(window).height()

    $(window).scroll(function(){
        scr=$(window).scrollTop()
        let abtTop = $(".about").offset().top

        if (scr+devHeight*0.6>= abtTop){
            $(".start>div.on").addClass("abt")
            $(".start>div.abt").removeClass("return")
        }else if(scr+devHeight*0.6 < abtTop){
            $(".start>div.abt").addClass("return")
        }

    })

    let icons = $(".intro_icon>li")
    let wordsLi = $(".intro_words>li")

    let iconsTopArray = []
    icons.each(function(){
        iconsTopArray.push($(this).position().top)
    })
    let iconsLeftArray = []
    icons.each(function(){
        iconsLeftArray.push($(this).position().left)
    })
    
    let wordsLiTopArray = []
    wordsLi.each(function(){
        wordsLiTopArray.push($(this).position().top)
    })
    let wordsLiLeftArray = []
    wordsLi.each(function(){
        wordsLiLeftArray.push($(this).position().left)
    })

    let wordsLiWArray = []
    wordsLi.each(function(){
        wordsLiWArray.push($(this).width())
    })
    let wordsLiHArray = []
    wordsLi.each(function(){
        wordsLiHArray.push($(this).height())
    })

    
    $(window).scroll(function(){
        scr=$(window).scrollTop()
        let elvI = $(".intro_elv")
        let buildingTop = $(".building").offset().top
        let distanceI = scr - buildingTop //스크롤박스내에서 이동한 거리
        let buildingHeight =  $(".building").height()
        let elvIHeight = elvI.height()
        let aniIEnd = buildingHeight - elvIHeight
        let aniIMid = aniIEnd/2

        let perMid = distanceI/aniIMid*1.05

        let icontxt = $(".intro_words>li>div")
        let icon_imgs = $(".intro_icon>li>img")
        let graybox = $(".graybox")
        let introtxt = $(".intro_txt")
        
        let grayScale = 15*(distanceI/aniIMid)
        let pinkper = 46*(distanceI/aniIMid)
        let bYper = 32*(distanceI/aniIMid)


        if(distanceI<0){
            elvI.removeClass("fixed")
            elvI.removeClass("bottom")
            icon_imgs.css("opacity","1")
        }
        if(distanceI>=0 && distanceI < aniIMid){
            elvI.removeClass("bottom")
            elvI.addClass("fixed")
            icontxt.css("opacity",`${1 - perMid}`)
            icon_imgs.css("opacity",`${1 - perMid}`)
            introtxt.css("opacity",`${1 - perMid}`)
            graybox.css("opacity",`${perMid}`)
            $(".intro_words>.html,.intro_words>.js").css("background",`rgb(255, ${242 - pinkper}, ${ 242 - pinkper})`)
            $(".intro_words>.css,.intro_words>.web").css("background",`rgb(255, 253, ${234 - bYper})`)
            $(".intro_words>.jq").css("background",`rgb(${236 - bYper}, 249, 255)`)

            icons.each(function(index){
                $(this).css("top",topCal(iconsTopArray[index],aniIMid,scr)+"px")
                $(this).css("left",leftCal(iconsLeftArray[index],aniIMid,scr)+"px")
            })
        }
        if(distanceI>=aniIMid && distanceI < aniIEnd){
            icontxt.css("opacity",`0`)
            icon_imgs.css("opacity",`0`)
            introtxt.css("opacity",`0`)

            graybox.css("transform",`scale(${-14 + grayScale})`)
            elvI.removeClass("bottom")
            elvI.addClass("fixed")
            
            wordsLi.each(function(index){
                $(this).css("top",topCal(wordsLiTopArray[index],aniIMid,scr-aniIMid)+"px")
                $(this).css("left",leftCal(wordsLiLeftArray[index],aniIMid,scr-aniIMid)+"px")
                $(this).css("width",widthCal(wordsLiWArray[index],aniIMid,scr-aniIMid)+"px")
                $(this).css("height",heightCal(wordsLiHArray[index],aniIMid,scr-aniIMid)+"px")
                $(this).css("transform",`rotate(${pinkper-48}deg)`)
            })

        }
        if(distanceI>=aniIEnd){
            
            elvI.removeClass("fixed")
            elvI.addClass("bottom")
        }
    })


    //jiwon to jenny
    var words = document.getElementsByClassName('word'); //배열
    var wordArray = [];
    var currentWord = 0;

    words[currentWord].style.opacity = 1;
    for (var i = 0; i < words.length; i++) {
        splitLetters(words[i]);
    }
    function changeWord() {
        var cw = wordArray[currentWord];
        var nw = currentWord == words.length-1 ? wordArray[0] : wordArray[currentWord+1];
        for (var i = 0; i < cw.length; i++) {
            animateLetterOut(cw, i);
        }
        for (var i = 0; i < nw.length; i++) {
            nw[i].className = 'letter behind';
            nw[0].parentElement.style.opacity = 1;
            animateLetterIn(nw, i);
        }
        currentWord = (currentWord == wordArray.length-1) ? 0 : currentWord+1;
    }

    function animateLetterOut(cw, i) {
      setTimeout(function() {
        cw[i].className = 'letter out';
      }, i*80);
    }
    function animateLetterIn(nw, i) {
      setTimeout(function() {
        nw[i].className = 'letter in';
      }, 340+(i*80));
    }
    function splitLetters(word) {
      var content = word.innerHTML;
      word.innerHTML = '';
      var letters = [];
      for (var i = 0; i < content.length; i++) {
        var letter = document.createElement('span');
        letter.className = 'letter';
        letter.innerHTML = content.charAt(i);
        word.appendChild(letter);
        letters.push(letter);
      }
      wordArray.push(letters);
    }

    changeWord();
    setInterval(changeWord, 2000)


    //values
    $.fn.flip = function(options){
    var options = $.extend({
        targetClass: '.m-flip_item'
    }, options);

        return this.each(function(){
            var $this = $(this),
            $target = $this.find(options.targetClass);

            $this
            .on({
                'init.flip': function(){
                    // var targetFirst_height = $target.eq(0).height();
                    var targetFirst_height = 30;

                $this
                    .data('height', targetFirst_height)
                    .css({ height: targetFirst_height });
                },
                'mouseenter.flip': function(){
                $target.css({ top: -35 + 'px' });
                },
                'mouseleave.flip': function(){
                $target.css({ top: 0 + 'px' });
                }
            })
            .trigger('init.flip');
        });
    };

    $(function(){
      $('.js-flip').flip();
    });


    // profile
    $(window).scroll(function(){
        scr=$(window).scrollTop()
        let elvA = $(".about>.elv")
        let scrBoxTop = $(".about").offset().top
        let distance = scr - scrBoxTop //스크롤박스내에서 이동한 거리
        let scrBoxHeight =  $(".about").height()
        let elvHeight = elvA.height()
        let aniEnd = scrBoxHeight - elvHeight
        let per100 = distance/aniEnd*100
        let per90 = distance/aniEnd*90
        let per15 = distance/aniEnd*15
        let per40 = distance/aniEnd*40
        let per25 = distance/aniEnd*25

        let abtP= $(".about .shape>.pink")
        let abtY= $(".about .shape>.yellow")
        let abtB= $(".about .shape>.blue")

        if(distance<0){
            elvA.removeClass("fixed")
            elvA.removeClass("bottom")
        }
        if(distance>=0 && distance < aniEnd){
            elvA.removeClass("bottom")
            elvA.addClass("fixed")
            $(".bg_roundY").css(`transform`,`translateY(-${per100}%)`)
            abtP.css(`transform`,`rotate( ${per90 }deg)`)
            abtP.css(`top`,`${35 - per15}px`)
            abtP.css(`left`,`${40 + per40}px`)

            abtY.css(`transform`,`rotate( ${per90 }deg)`)
            abtY.css(`top`,`${20 + per40}px`)

            abtB.css(`transform`,`rotate( ${per90 }deg)`)
            abtB.css(`top`,`${60 - per25}px`)
            abtB.css(`left`,`${80 - per40}px`)
        }
        if(distance>=aniEnd){
            elvA.removeClass("fixed")
            elvA.addClass("bottom")
        }
    })

    //skill_per

    $(".cta").click(function(e){
        e.preventDefault()
        $(".skill_graph").addClass("on")
        $(".skill_graph span").addClass("on")
        $(this).addClass("off")


        $(".skill_graph>li").each(function(){
            let per = Number($(this).find("b").text())
            let count = 0
            let thisList = $(this)

            let timer = setInterval(function(){
                count++
                thisList.find("b").html(count)
                if(count >= per){clearInterval(timer)}
            },20)
        })
        return true
    })


    //skill text
    let btnNext = $(".btn_next")
    let btnPrev = $(".btn_prev")
    let train = $(".skill_txt>ul")
    let trainLiArray = train.children()
    let count = 0

    btnNext.click(function(){
        count++
        if(count>4){count=4}
        trainLiArray.removeClass("on")
        trainLiArray.eq(count).addClass("on")
        train.css("transform",`translateX(${-20*count}%)`)
    })
    btnPrev.click(function(){
        count--
        if(count<0){count=0}
        trainLiArray.removeClass("on")
        trainLiArray.eq(count).addClass("on")
        train.css("transform",`translateX(${-20*count}%)`)
    })



    //popup
    let popupTop =  $(".popup").offset().top

    $(window).scroll(function(){
        scr=$(window).scrollTop()
        let move =  (-(scr - popupTop) / devHeight* 100) - 100;

        if(scr+devHeight > popupTop){
            $(".popupA").css("transform","translateY("+move+"%)")
            $(".popupB").css("transform","translateY("+move*1.1+"%)")
            $(".popupC").css("transform","translateY("+move*1.2+"%)")
            $(".popupD").css("transform","translateY("+move*1.2+"%)")
            $(".popupE").css("transform","translateY("+move*1.3+"%)")
            $(".popupF").css("transform","translateY("+move*1.2+"%)")
            $(".popupG").css("transform","translateY("+move*1.2+"%)")
            $(".popupH").css("transform","translateY("+move*1.1+"%)")
        }
    })


    //banner
    let bannerLi = $(".bannerList").children()
    let banner_des = $(".banner_des").children()
    let banner_pop =  $(".bannerPop").children()
    $(".pagination>li").click(function(){
        let idx = $(this).index()
        bannerLi.removeClass("on")
        banner_des.removeClass("on")
        $(".pagination>li").removeClass("on")

        bannerLi.eq(idx).addClass("on")
        banner_des.eq(idx).addClass("on")
        $(this).addClass("on")
    })
    $(".bannerList>li").click(function(){
        let idx = $(this).index()
        banner_pop.removeClass("pop")
        banner_pop.eq(idx).addClass("pop")
        $(".modal").addClass("pop")
    })
    $(".bannerPop>li").click(function(){
        $(this).removeClass("pop")
        $(".modal").removeClass("pop")
    })



    //스크롤시 tranform transition 추가
    $(window).scroll(function(){
        scr=$(window).scrollTop()

        $(".transX,.transO").each(function(){
            if(scr+devHeight*0.85>=$(this).offset().top){
                $(this).addClass("on")
            }else{
                $(this).removeClass("on")
            }
        })
        $(".outro>section").each(function(){
            if(scr+devHeight*0.6>=$(this).offset().top){
                $(this).addClass("end")
            }else{
                $(this).removeClass("end")
            }
        })
    })





})