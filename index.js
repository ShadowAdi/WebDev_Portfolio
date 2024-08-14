gsap.registerPlugin(ScrollTrigger)
const circleElement = document.querySelector(".circle");



function startLoader() {
    let counterElement = document.querySelector(".counter")
    let currentValue = 0
    function updateCounter() {
        if (currentValue === 100) {
            return
        }
        currentValue += Math.floor(Math.random() * 10) + 1
        if (currentValue > 100) {
            currentValue = 100
        }
        counterElement.textContent = currentValue
        let delay = Math.floor(Math.random() * 200) + 50
        setTimeout(updateCounter, delay);
    }
    updateCounter()
}
function LoaderAnimation() {
    var tl = gsap.timeline()
    tl.to(".counter", 0.25, {
        delay: 3.5,
        opacity: 0,
        display: "none"
    }, "anim")

    tl.to(".bar", 1.5, {
        delay: 3.5,
        height: 0,
        stagger: {
            amount: 0.5,
        },
        ease: "power4.inOut"
    }, "anim")

    tl.to(".overlay", {
        display: "none"
    })

    tl.to("nav", {
        top: "0%",
        opacity: 1,
        duration: 0.4
    })

   

    tl.from(".first h1", 0.4, {
        y: 300,
        stagger: {
            amount: 0.5
        },
        ease: "power4.inOut"
    })

}
function pageColorTransition() {
    const page = document.querySelector(".page2");
    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: page,
            scroller: "body",
            start: "-20% top",
        }
    });

    tl.to("body", {
        backgroundColor: "#1a1a1a", // Change to dark background
        color: "#a0a0a0", // Change to light text color
        duration: 0.3,
    }, "anim");

    tl.to(".first h1, nav div a", {
        color: "#fff", // Change text color
        duration: 0.3,
    }, "anim")
}


function imagesService() {
    const serviceElements = gsap.utils.toArray(".service");
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
    };

    const observeCallback = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const service = entry.target;
                const imageContainer = service.querySelector(".img");

                ScrollTrigger.create({
                    trigger: service,
                    start: "bottom bottom",
                    end: "top top",
                    scrub: true,
                    onUpdate: (self) => {
                        let progress = self.progress;
                        let newWidth = 30 + 70 * progress;
                        gsap.to(imageContainer, {
                            width: newWidth + "%",
                            duration: 0.1,
                            ease: "none"
                        });
                    }
                });

                ScrollTrigger.create({
                    trigger: service,
                    start: "top bottom",
                    end: "top top",
                    scrub: true,
                    onUpdate: (self) => {
                        let progress = self.progress;
                        let newHeight;

                        if (window.innerWidth < 1024) {
                            // For mobile or smaller screens
                            newHeight = Math.max(50 + 50 * progress, 30) + "vh";
                        } else {
                            // For larger screens
                            newHeight = Math.max(300 + 100 * progress, 300) + "px";
                        }

                        gsap.to(service, {
                            height: newHeight,
                            duration: 0.1,
                            ease: "none"
                        });
                    }
                });

                observer.unobserve(service);
            }
        });
    };

    const observer = new IntersectionObserver(observeCallback, observerOptions);
    serviceElements.forEach(service => {
        observer.observe(service);
    });

    // Adjust for screen resize
    window.addEventListener('resize', () => {
        ScrollTrigger.refresh();
    });
}



function ServiceImage() {

    const skills = gsap.utils.toArray(".skillInfo");

    skills.forEach((skill, index) => {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: skill,
                start: "top 95%", // Animation starts when the top of the skill is at 75% of the viewport height
                end: "bottom 5%",   // Animation ends when the top of the skill is at 25% of the viewport height
            }
        });

        tl.to(skill,
            {
                scale: 1,         // Final scale
                opacity: 1,       // Final opacity
                duration: 2.5,    // Duration of the animation within the timeline
                ease: "power2.out" // Smooth easing function
            });
    });
}



function marquee() {
    let currentScroll = 0;
    let isScrollingDown = true;
    let scrollSpeed = 1; // Base speed

    // Clone the marquee__inner content to create an infinite loop effect
    gsap.utils.toArray(".marquee__part").forEach(part => {
        let clone = part.cloneNode(true);
        document.querySelector(".marquee__inner").appendChild(clone);
    });

    // Set up the tween for continuous movement
    let tween = gsap.to(".marquee__inner", {
        xPercent: -50, // Moves to the midpoint, allowing for a seamless loop
        duration: 20, // Adjust this duration for the speed of the animation
        ease: "linear",
        repeat: -1, // Infinite loop
    });

    // Adjust speed and direction based on scroll
    window.addEventListener("scroll", function () {
        let newScroll = window.scrollY;

        // Determine scroll direction
        if (newScroll > currentScroll) {
            isScrollingDown = true;
        } else {
            isScrollingDown = false;
        }

        // Adjust speed based on scroll direction
        let speedMultiplier = isScrollingDown ? scrollSpeed : -scrollSpeed;
        gsap.to(tween, {
            timeScale: speedMultiplier,
            overwrite: true,
        });

        currentScroll = newScroll;
    });
}

function allCards() {
    const cards = gsap.utils.toArray(".blog")

    cards.forEach((card, index) => {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: card,
                start: "70% 55%", // Animation starts when the top of the skill is at 75% of the viewport height
                end: "bottom 5%",   // Animation ends when the top of the skill is at 25% of the viewport height
                scrub:1
            }
        });

        tl.from(card,
            {
                y: 400,
                duration: 3,    // Duration of the animation within the timeline
                ease: "power2.out", // Smooth easing function
                scale:0
            });
    });
}



function animateCircle() {
    let currentScale = 0;
    let currentAngle = 0;
    const mouse = { x: 0, y: 0 };
    const circle = { x: 0, y: 0 };
    const previousMouse = { x: 0, y: 0 };
    let isHidden = false;
  
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });
  
    const speed = 0.17;
    const tick = () => {
      if (!isHidden) {
        circle.x += (mouse.x - circle.x) * speed;
        circle.y += (mouse.y - circle.y) * speed;
  
        const translateTransform =
          (circleElement.style.transform = `translate(${circle.x}px,${circle.y}px)`);
  
        const deltaMouseX = mouse.x - previousMouse.x;
        const deltaMouseY = mouse.y - previousMouse.y;
        previousMouse.x = mouse.x;
        previousMouse.y = mouse.y;
  
        const mouseVelocity = Math.min(
          Math.sqrt(deltaMouseX ** 2 + deltaMouseY ** 2) * 4,
          150
        );
  
        const angle =
          mouseVelocity > 20
            ? (Math.atan2(deltaMouseX, deltaMouseY) * 180) / Math.PI
            : currentAngle;
  
        if (mouseVelocity > 20) {
          currentAngle = angle;
        }
  
        const rotateTransform = `rotate(${currentAngle}deg)`;
  
        const scaleValue = (mouseVelocity / 150) * 0.5;
  
        currentScale += (scaleValue - currentScale) * speed;
  
        const scaleTransform = `scale(${1 + currentScale}, ${1 - currentScale})`;
  
        circleElement.style.transform = `${translateTransform} ${scaleTransform} ${rotateTransform}`;
      }
  
      window.requestAnimationFrame(tick);
    };
    tick();
  
    return {
      hide() {
        isHidden = true;
        gsap.to(circleElement, { scale: 0, duration: 0.3, ease: "power1.inOut" });
      },
      show() {
        isHidden = false;
        gsap.to(circleElement, { scale: 1, duration: 0.3, ease: "power1.inOut" });
      },
    };
  }


document.addEventListener("DOMContentLoaded", function () {
    startLoader()
    LoaderAnimation()
    pageColorTransition()
    imagesService()
    ServiceImage()
    marquee()
    allCards()
    animateCircle()
}
)