document.addEventListener("DOMContentLoaded", function () {
    const image = document.getElementById("eventImage");
  
    if (!image) return;
  
    // Apply styles for tilt and float
    image.style.transition = "transform 0.5s ease-in-out";
    image.style.transform = "rotate(5deg)";
    image.style.position = "relative";
  
    // Floating animation
    let direction = 1;
    let offset = 0;
  
    setInterval(() => {
      offset += direction * 0.5;
      if (offset > 10 || offset < -10) direction *= -1;
      image.style.transform = `rotate(5deg) translateY(${offset}px)`;
    }, 50);
  });
  