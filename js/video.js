document.addEventListener("DOMContentLoaded", () => {
  const lazyVideos = document.querySelectorAll("video.lazy-video");

  if ("IntersectionObserver" in window) {
    const videoObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const video = entry.target;
          const videoSource = video.querySelector("source");

          // Hier wird die data-src zur echten src gemacht
          if (videoSource && videoSource.dataset.src) {
            videoSource.src = videoSource.dataset.src;
            video.load();
            video.play().catch(e => console.log("Autoplay blocked/failed", e));
            
            video.classList.remove("lazy-video");
            observer.unobserve(video);
          }
        }
      });
    });

    lazyVideos.forEach((video) => {
      videoObserver.observe(video);
    });
  }
});