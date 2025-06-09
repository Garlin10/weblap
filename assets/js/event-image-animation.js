document.addEventListener("DOMContentLoaded", async function () {
    const image = document.getElementById("eventImage");
    const titleEl = document.getElementById("eventTitle");
    const descEl = document.getElementById("eventDescription");
    const timeEl = document.getElementById("eventTime");
    const statusEl = document.getElementById("eventStatus");
  
    try {
      const response = await fetch("https://galgyula.hu/event/0");
      const data = await response.json();
  
      // Set image
      if (data.image_url && image) {
        image.src = data.image_url;
  
        const eventLinkButton = document.getElementById("eventLinkButton");
        const eventLinkImage = document.getElementById("eventLinkImage");

        if (data.event_data.facebook_url) {
            if (eventLinkButton) eventLinkButton.href = data.event_data.facebook_url;
            if (eventLinkImage) eventLinkImage.href = data.event_data.facebook_url;
        }

        // Apply tilt + float animation
        image.style.transition = "transform 0.5s ease-in-out";
        image.style.transform = "rotate(5deg)";
        image.style.position = "relative";
  
        let direction = 1;
        let offset = 0;
  
        setInterval(() => {
          offset += direction * 0.5;
          if (offset > 10 || offset < -10) direction *= -1;
          image.style.transform = `rotate(5deg) translateY(${offset}px)`;
        }, 50);
      }
  
      // Set event title & description
      if (data.event_data) {
        titleEl.textContent = data.event_data.name || "Ismeretlen esemény";
        descEl.textContent = data.event_data.description || "Nincs leírás.";
  
        if (data.event_data.start_time) {
          const eventDate = new Date(data.event_data.start_time.replace("+0000", "Z"));
  
          // Format event date
          const formatter = new Intl.DateTimeFormat("hu-HU", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          });
          timeEl.textContent = "Kezdés: " + formatter.format(eventDate);
  
          // Check if event is older than 5 days
          const now = new Date();
          const daysSince = (now - eventDate) / (1000 * 60 * 60 * 24);
          if (daysSince > 5) {
            statusEl.textContent = "Vége";
            statusEl.style.display = "inline-block";
          } else {
            statusEl.style.display = "none";
          }
        }
      }
  
    } catch (error) {
      console.error("Failed to load main event:", error);
      titleEl.textContent = "Hiba történt";
      descEl.textContent = "Nem sikerült betölteni az eseményt.";
      timeEl.textContent = "";
      if (statusEl) statusEl.style.display = "none";
    }
  });
  