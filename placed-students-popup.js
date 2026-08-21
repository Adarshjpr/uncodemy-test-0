const messages=["Sachin Charkhwal is Placed in Paytel Financial Technologies P.Ltd.","Amit Kumar is now working with Infosys.","Neha Sharma has joined HCL Technologies.","Mohit Verma is placed in Accenture.","Sanya Gupta has joined Cognizant.","Vikas Sharma is now working with IBM.","Anjali Desai is placed in Deloitte.","Rahul Mehta is working with Capgemini.","Simran Kaur is now part of Tech Mahindra.","Suresh Yadav has joined SAP.","Tanvi Reddy is now working with Oracle.","Karan Malhotra is placed in EY.","Deepak Sharma got hired by PwC.","Isha Bhatnagar is placed in Adobe.","Arjun Patel is now working with Accenture.","Ravi Kumar got placed in L&T Infotech.","Shivani Agarwal is now working with HP.","Ankit Kapoor is placed in Mindtree.","Prakash Yadav is working with Wipro.","Kriti Joshi is now part of Capgemini.","Manish Gupta is placed in Google."];let currentMessages=[],messageQueue=[...messages];function showToast(e){const t=document.getElementById("toastContainer"),a=document.createElement("div"),i=document.createElement("div");i.classList.add("toast");const s=document.createElement("img");if(s.src="image/congrat.gif",s.alt="Congrats GIF",s.style.width="45px",s.style.marginRight="10px",i.appendChild(s),i.innerHTML+=e,a.appendChild(i),t.appendChild(a),setTimeout((()=>i.classList.add("show")),1e3),currentMessages.push(a),currentMessages.length>1){const e=currentMessages.shift();e.querySelector(".toast").classList.add("fade-out"),setTimeout((()=>{e.remove()}),3e3)}}function displayNextMessage(){messageQueue.length>0&&(showToast(messageQueue.shift()),setTimeout((()=>{const e=document.querySelector(".toast");e&&e.classList.remove("show")}),5e3),setTimeout(displayNextMessage,7e3))}




// // Close Popup Function
// function closePopupXg34s() {
//     document.getElementById('popup-xg34s').style.display = 'none';
// }



// // Optimized Countdown Timer Function
// function updateCountdown() {
//     // Get current date
//     const now = new Date();
//     // Get last day of current month (April)
//     const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
//     // Set time to 23:59:59 on the last day of the month
//     endOfMonth.setHours(23, 59, 59, 999);
    
//     // Function to update the display
//     function updateDisplay() {
//         const currentTime = new Date();
//         const distance = endOfMonth - currentTime;
        
//         // If we've passed the end of month, clear interval
//         if (distance <= 0) {
//             clearInterval(countdownInterval);
//             document.getElementById("days").textContent = "00";
//             document.getElementById("hours").textContent = "00";
//             document.getElementById("minutes").textContent = "00";
//             document.getElementById("seconds").textContent = "00";
//             return;
//         }
        
//         // Calculate time units
//         const days = Math.floor(distance / (1000 * 60 * 60 * 24));
//         const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//         const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//         const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
//         // Update the display
//         document.getElementById("days").textContent = days.toString().padStart(2, '0');
//         document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
//         document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
//         document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
//     }
    
//     // Initial update
//     updateDisplay();
    
//     // Update every second, but only start after the popup is visible
//     const countdownInterval = setInterval(updateDisplay, 1000);
// }

// // Wait until entire page is fully loaded
// document.addEventListener('DOMContentLoaded', function() {
//     // Load the popup after a delay
//     setTimeout(function() {
//         const popup = document.getElementById('popup-xg34s');
//         if (popup) {
//             popup.style.display = 'flex';
//             // Only start the countdown when the popup is shown
//             updateCountdown();
//         }
//     }, 5000);
// });








// function closePopupXg34s() {
//     document.getElementById('popup-xg34s').style.display = 'none';
// }

// // Wait until entire page (including images, stylesheets) is fully loaded
// window.addEventListener('load', function () {
//     setTimeout(function () {
//         const popup = document.getElementById('popup-xg34s');
//         if (popup) {
//             popup.style.display = 'flex';
//         }
//     }, 5000); // 5 seconds after full page load
// });





// function closeFlashOffer(){document.getElementById("flashOfferPopup").classList.remove("show"),document.getElementById("flashOfferContainer").style.display="none"}function startCountdownTimer(){let e=new Date("March 31, 2025 23:59:59").getTime();setInterval((function(){let t=(new Date).getTime(),a=e-t,i=Math.floor(a/864e5),s=Math.floor(a%864e5/36e5),n=Math.floor(a%36e5/6e4),o=Math.floor(a%6e4/1e3);document.getElementById("countdownTimer").innerHTML=`<div>${i} Days</div> <div>${s} Hours</div> <div>${n} Minutes</div> <div>${o} Seconds</div>`}),1e3)}setTimeout(displayNextMessage,100),document.addEventListener("DOMContentLoaded",(function(){setTimeout((function(){document.getElementById("flashOfferPopup").classList.add("show"),startCountdownTimer()}),5e3)}));