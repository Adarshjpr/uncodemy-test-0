function scrollToTop() {
  window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
}

  // Initialize animations when page loads
  document.addEventListener('DOMContentLoaded', function() {
    // Load AOS library for scroll animations
    const aosScript = document.createElement('script');
    aosScript.src = 'https://unpkg.com/aos@2.3.1/dist/aos.js';
    aosScript.onload = function() {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
      });
    };
    document.head.appendChild(aosScript);
    
    // Add styles for AOS
    const aosStyles = document.createElement('link');
    aosStyles.rel = 'stylesheet';
    aosStyles.href = 'https://unpkg.com/aos@2.3.1/dist/aos.css';
    document.head.appendChild(aosStyles);
    
    // Video trigger functionality
    document.querySelector('.unc-video-trigger').addEventListener('click', function() {
      // Implement your video modal functionality here
      console.log('Video demo triggered');
    });
  });
// Register service worker
if('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then(registration => {
        console.log('SW registered');
      }).catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
    });
  }