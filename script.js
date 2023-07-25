function loco(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});



// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
loco();
var tl1 = gsap.timeline({
    scrollTrigger: {
        trigger: "#main",
        scroller: "#main",
        start: "top -20px",
        end: "top -10%",
        // markers: true,
        scrub: 2

    }
});

tl1.to("#svg-div", {
    width:"10vw",
    top:0,
    zIndex:99,
    
},"baby")

tl1.to("#nav", {
    zIndex:999,
    
},"baby")
gsap.to("#main",{
    paddingTop:"0px",
    // zIndex:9,
    scrollTrigger: {
        trigger: "#nav",
        scroller: "#main",
        start: "top -20px",
        end: "top -3%",
        // markers: true,
        scrub:4

    }
})
var slid = [
    {
        name: "Guchi horsebit 1995",
        imgs: "https://media.gucci.com/dynamic/b3c8/6w5c20YC6pJMA3l52D7idovgwp6ckPlW+myA5i96A4RerBZTD1xfRwgOye+yeg2UOpDr4CXrnEX1ZVhmMjiVLwkeYK__a6lT54B0AqG8BBzm1qQPbAK2Cu00RcdbcBVMfhdnWG8UMVP65X674gJJ63zTv5+qBiimY5wQmrh5FPWG0OHnSufwK2dtmHLAJ8W7Yx6yZg4HLSbjX3TjYC1Vd4vWgkXoqNYvm_2G5dcV6n3ohCB+6+7qPMfxTAS292cu/Portrait_Horsebit-4-Default.png"

    },
    {
        name: "men's bag",
        imgs: "https://media.gucci.com/dynamic/b3c8/hj0zGAzYfmKA5b+KMGgjOzBOqftbqLgl3Ikj+op4yC3i8u28c5adixKclXHOawWXzHh019bgDQKmIqHq8GLu9tU6Qdj3+FaNqIE+9_41B+ymtpnzVeT_W86nlHzroDCMpXQIt4CQC2Dh_wrhugRt+IpFEnyeF4I5uCN97mYf0FZp0t1OwTX_3ZvCYc1FeVybpdAHsyQPRuuwJpED4qjr8_PYunOtb3sUW9bNenkpWaZMBQSx5895Mx_zO3APDzXlpn1lqExvGIqBICl1Z3+hIeL4NYUX63pjRKLWlsfRSTk=/Gucci_Desktop_Routing_2UP_GQJannik-2-July23_3x4.png"

    },
    {
        name: "Gucci ace",
        imgs: "https://media.gucci.com/dynamic/b3c8/16UmSXGt_tJeGQoWflxiclkiQ50LtrG+gtDDCrFrSXXIeEb4zQf9E3_hYKnB30GdZG3_fTPuvlhlb7Np266T8z9TDbdix+FWN0hqLGdT6Ca075OnqJyNHVdKW1HRGXX0Z94IEGsnqZN3IJ8fn1QFvePpCQT0m6N6OdT3jpD1KrOpOMxQknG_8+H3v_sbIlZAKncx3k_OGPwppnH_9uCRGvx9y6KlLvE9AX5hkUZzo5vNza_Mznv_vTrlK8hTfhwNaAy3IQO4ucAqoqBO2weTQOXul1jI7M4Wy2njzobwVyQ=/Gucci_HP-20June23_AceJune23_Carousel_Desktop_.png"

    }

]

function anim1() {
    let index = 0;

    setInterval(function () {

        if (index === slid.length) {
            index = 0
        }
        document.querySelector("#page1-img img").src = `${slid[index].imgs}`
        document.querySelector("#page1-bottom h1").textContent = `${slid[index].name}`
        // console.log(index);
        gsap.from("#page1-bottom h1, #page1-bottom button",{
            y:30,
            opacity:0,
            duration:0.3
        
        })
        index += 1


    }, 3000)

    var slider = document.querySelectorAll(".inner");
    var slider1 = -1;
    setInterval(function () {

        var hit = 0;    
        if (slider1 === 2) {
            slider1 = -1
            hit = 0
        }
        // slider[slider1].style.width = `${hit}%`

        // console.log(slider1);
        setInterval(function () {
            if (hit <= 110) {
                // console.log(slider1);
                slider[slider1].style.height = `${hit}%`
                console.log(hit);
                if (hit === 110) {

                    slider[slider1].style.height = "0%"
                }
            }
            hit += 11;

        }, 250)
        // slider[slider1].style.height = "0%"

        // console.log(hit);
        slider1 += 1;


    }, 3000)


}

anim1();

gsap.to("#main", {
    scrollTrigger:{
        trigger:"#page1-bottom",
        scroller:"#main",
        // markers:true,
        start:"top 70%",
        end:"top -100%",
        pin:true,
    }
})
var tl = gsap.timeline({
    y:0,
    scrollTrigger:{
        trigger:"#page1-bottom h1",
        scroller:"#main",
        start:"top -40%",
        end:"top -60%",
        // markers:true,
        scrub:true
    }
})
tl.to("#page1-bottom h1",{
    color:"black",
    
},"anime")
tl.to("#page1-bottom button",{
    color:"white",
    backgroundColor:"black",
    
},"anime")


var sliderrr = 0;


var btm1 = document.querySelector("#btn1")
var btm2 = document.querySelector("#btn2")
var sliderrr = document.querySelectorAll(".scroll-div");


console.log(slid);

var count = 0;
var sliing = 0

btm1.addEventListener("click", ()=>{
    console.log(sliing);
    if(sliing<0){
        sliing +=100
        sliderrr.forEach((dets)=>{
            dets.style.transform = ` translate(${sliing}%, 0)`
        })
        
    }
    else{
        console.log("nika ja saale");
    }
})

btm2.addEventListener("click", ()=>{
    console.log(sliing);
    if(sliing> -500){
        sliing-=100
        sliderrr.forEach((dets)=>{
            dets.style.transform =` translate(${sliing}%, 0)`
        })
        console.log(sliing);
    }
    else{
        console.log("bas kar bhai");
    }

})

gsap.to("#page3", {
    
    scrollTrigger:{
        trigger:"#page3-1",
        scroller:"#main",
        start:"top 80%",
        end:"top 45%",
        scrub:3,
        // markers:true,
        pin:true,
    }
})
gsap.to("#page3", {
    
    scrollTrigger:{
        trigger:"#page3-2",
        scroller:"#main",
        start:"top 80%",
        end:"top 45%",
        scrub:3,
        // markers:true,
        pin:true,
    }
})

