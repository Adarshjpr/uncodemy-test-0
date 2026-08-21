
const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];
let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;
// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});
// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});
// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");
// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
btn.addEventListener("click", () => {
carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
});
});
const dragStart = (e) => {
isDragging = true;
carousel.classList.add("dragging");
// Records the initial cursor and scroll position of the carousel
startX = e.pageX;
startScrollLeft = carousel.scrollLeft;
}
const dragging = (e) => {
if(!isDragging) return; // if isDragging is false return from here
// Updates the scroll position of the carousel based on the cursor movement
carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}
const dragStop = () => {
isDragging = false;
carousel.classList.remove("dragging");
}
const infiniteScroll = () => {
// If the carousel is at the beginning, scroll to the end
if(carousel.scrollLeft === 0) {
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
carousel.classList.remove("no-transition");
}
// If the carousel is at the end, scroll to the beginning
else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");
}
// Clear existing timeout & start autoplay if mouse is not hovering over carousel
clearTimeout(timeoutId);
if(!wrapper.matches(":hover")) autoPlay();
}
const autoPlay = () => {
if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
// Autoplay the carousel after every 2500 ms
timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 1500);
}
autoPlay();
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);










// placement script
// const galleryImages=document.querySelectorAll(".image-card-unique img"),lightbox=document.getElementById("lightbox-overlay-unique"),lightboxImg=document.getElementById("lightbox-img-2024"),closeBtn=document.getElementById("close-btn-2024"),nextBtn=document.getElementById("next-btn-2024"),prevBtn=document.getElementById("prev-btn-2024");let currentImageIndex=0;function openLightbox(e){currentImageIndex=e,lightboxImg.src=galleryImages[currentImageIndex].src,lightbox.style.display="flex"}closeBtn.addEventListener("click",(()=>{lightbox.style.display="none"})),nextBtn.addEventListener("click",(()=>{currentImageIndex=(currentImageIndex+1)%galleryImages.length,lightboxImg.src=galleryImages[currentImageIndex].src})),prevBtn.addEventListener("click",(()=>{currentImageIndex=(currentImageIndex-1+galleryImages.length)%galleryImages.length,lightboxImg.src=galleryImages[currentImageIndex].src})),galleryImages.forEach(((e,t)=>{e.addEventListener("click",(()=>{openLightbox(t)}))}));

const workSection=document.querySelector(".section-work-data");const workSectionObserve=entries=>{const[entry]=entries;if(!entry.isIntersecting)return;console.log(entries);const counterNum=document.querySelectorAll(".counter-numbers");const speed=50;counterNum.forEach(curNumber=>{const updateNumber=()=>{const targetNumber=parseInt(curNumber.dataset.number);const initialNumber=parseInt(curNumber.innerText);const incrementNumber=Math.trunc(targetNumber/speed);if(initialNumber<targetNumber){curNumber.innerText=`${initialNumber+incrementNumber}+`;setTimeout(updateNumber,10)}else{curNumber.innerText=`${targetNumber}+`}};updateNumber()})};const workSecObserver=new IntersectionObserver(workSectionObserve,{root:null,threshold:0});workSecObserver.observe(workSection);const container=document.getElementById("main-gallery");const containerWidth=container.offsetWidth;let scrollAmount=0;const step=10;let isMouseOverContainer=false;const scrollContainer=()=>{if(isMouseOverContainer){return}scrollAmount+=step;container.style.marginLeft=`-${scrollAmount}%`;if(scrollAmount>=100){scrollAmount=0}};container.addEventListener("mouseenter",()=>{isMouseOverContainer=true});container.addEventListener("mouseleave",()=>{isMouseOverContainer=false});setInterval(scrollContainer,1e3);function rightclick(){const scroll=document.querySelectorAll(".scroll");console.log(scroll);const compStyles=window.getComputedStyle(scroll[0]);console.log(compStyles);const movingWidth=parseFloat(compStyles.getPropertyValue("width"));console.log(movingWidth);const totalScrollWidth=(scroll.length-1)*movingWidth;console.log(totalScrollWidth);const cardSlidder=document.querySelector(".card-slider");console.log(cardSlidder);const slidderCompStyle=window.getComputedStyle(cardSlidder);const sliderLeft=parseFloat(slidderCompStyle.getPropertyValue("left"));console.log(sliderLeft);const sliderWidth=parseFloat(slidderCompStyle.getPropertyValue("width"));console.log(Math.abs(sliderLeft)+sliderWidth,totalScrollWidth);if(Math.abs(sliderLeft)+sliderWidth<=totalScrollWidth){const scrollValue=Math.abs(sliderLeft)+movingWidth;cardSlidder.style.left=`-${scrollValue}px`}else{console.log("else");cardSlidder.style.left="0"}}function leftclick(){const scroll=document.querySelectorAll(".scroll");const compStyles=window.getComputedStyle(scroll[0]);const movingWidth=parseFloat(compStyles.getPropertyValue("width"));const totalScrollWidth=(scroll.length-1)*movingWidth;const cardSlidder=document.querySelector(".card-slider");const slidderCompStyle=window.getComputedStyle(cardSlidder);const sliderLeft=parseFloat(slidderCompStyle.getPropertyValue("left"));console.log(sliderLeft);const sliderWidth=parseFloat(slidderCompStyle.getPropertyValue("width"));console.log(Math.abs(Math.abs(sliderLeft)+sliderWidth),sliderWidth,totalScrollWidth);if(Math.abs(Math.abs(sliderLeft)+sliderWidth)>sliderWidth+1){const scrollValue=Math.abs(sliderLeft)-movingWidth;cardSlidder.style.left=`-${scrollValue}px`}else{console.log("else");cardSlidder.style.left=`-${totalScrollWidth-sliderWidth}px`}}function leftClick(){const scroll=document.querySelectorAll(".scroll-review");const compStyles=window.getComputedStyle(scroll[0]);const movingWidth=parseFloat(compStyles.getPropertyValue("width"));const totalScrollWidth=(scroll.length-1)*movingWidth;const cardSlidder=document.querySelector(".card-slider-review");const slidderCompStyle=window.getComputedStyle(cardSlidder);const sliderLeft=parseFloat(slidderCompStyle.getPropertyValue("left"));console.log(sliderLeft);const sliderWidth=parseFloat(slidderCompStyle.getPropertyValue("width"));console.log(Math.abs(Math.abs(sliderLeft)+sliderWidth),sliderWidth,totalScrollWidth);if(Math.abs(Math.abs(sliderLeft)+sliderWidth)>sliderWidth+1){const scrollValue=Math.abs(sliderLeft)-movingWidth;cardSlidder.style.left=`-${scrollValue}px`}else{console.log("else");cardSlidder.style.left=`-${totalScrollWidth-sliderWidth}px`}}function rightClick(){const scroll=document.querySelectorAll(".scroll-review");console.log(scroll);const compStyles=window.getComputedStyle(scroll[0]);console.log(compStyles);const movingWidth=parseFloat(compStyles.getPropertyValue("width"));console.log(movingWidth);const totalScrollWidth=(scroll.length-1)*movingWidth;console.log(totalScrollWidth);const cardSlidder=document.querySelector(".card-slider-review");console.log(cardSlidder);const slidderCompStyle=window.getComputedStyle(cardSlidder);const sliderLeft=parseFloat(slidderCompStyle.getPropertyValue("left"));console.log(sliderLeft);const sliderWidth=parseFloat(slidderCompStyle.getPropertyValue("width"));console.log(Math.abs(Math.abs(sliderLeft)+sliderWidth),totalScrollWidth);if(Math.abs(Math.abs(sliderLeft)+sliderWidth)<=totalScrollWidth){const scrollValue=Math.abs(sliderLeft)+movingWidth;cardSlidder.style.left=`-${scrollValue}px`}else{console.log("else");cardSlidder.style.left="0"}}



