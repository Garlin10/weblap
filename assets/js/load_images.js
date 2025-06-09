document.addEventListener("DOMContentLoaded", async function () {
    const titleEl = document.getElementById("eventTitle");
    const descEl = document.getElementById("eventDescription");
    const imageEl = document.getElementById("eventImage");
    const statusEl = document.getElementById("eventStatus");
    const timeEl = document.getElementById("eventTime");
  
    try {
      const response = await fetch("https://galgyula.hu/event/0?include_image=true");
      const data = await response.json();
  
      if (data.event_data) {
        const { name, description, start_time } = data.event_data;
  
        titleEl.textContent = name || "Ismeretlen esemény";
        descEl.textContent = description || "Nincs leírás.";
  
        if (start_time) {
          const eventDate = new Date(start_time);
  
          // Format the date (e.g., 2024. november 13. 18:00)
          const formatter = new Intl.DateTimeFormat("hu-HU", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
  
          timeEl.textContent = `Kezdés: ${formatter.format(eventDate)}`;
  
          // Show or hide "Vége"
          const now = new Date();
          const daysSinceStart = (now - eventDate) / (1000 * 60 * 60 * 24);
          if (daysSinceStart > 5) {
            statusEl.textContent = "Vége";
            statusEl.style.display = "inline-block";
          } else {
            statusEl.style.display = "none";
          }
        } else {
          timeEl.textContent = "";
        }
      }
  
      if (data.cover_image_base64) {
        imageEl.src = `data:image/jpeg;base64,${data.cover_image_base64}`;
      }
    } catch (error) {
      console.error("Failed to load event info:", error);
      titleEl.textContent = "Hiba történt";
      descEl.textContent = "Nem sikerült betölteni az eseményt.";
      timeEl.textContent = "";
      statusEl.style.display = "none";
    }
  });
  