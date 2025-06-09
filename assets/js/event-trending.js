document.addEventListener("DOMContentLoaded", function () {
    const containerIds = [1, 2, 3, 4];
  
    containerIds.forEach(async function (index) {
      try {
        const response = await fetch(`https://galgyula.hu/event/${index}`);
        const data = await response.json();
  
        const imageEl = document.getElementById(`eventImage${index}`);
        const dateEl = document.getElementById(`eventDate${index}`);
        const titleEl = document.getElementById(`eventTitle${index}`);
        const linkEl = document.getElementById(`eventLink${index}`);
  
        // Update image
        if (data.image_url && imageEl) {
          imageEl.src = data.image_url;
        }
  
        // Update date
        if (data.event_data?.start_time && dateEl) {
          const eventDate = new Date(data.event_data.start_time.replace("+0000", "Z"));
          const formatter = new Intl.DateTimeFormat("hu-HU", {
            month: "short",
            day: "2-digit"
          });
          dateEl.textContent = formatter.format(eventDate);
        }
  
        // Update title
        if (data.event_data?.name && titleEl) {
          titleEl.textContent = data.event_data.name;
        }
  
        // Make whole card clickable
        if (data.event_data?.facebook_url && linkEl) {
          linkEl.href = data.event_data.facebook_url;
        }
  
      } catch (error) {
        console.error(`Error loading event ${index}:`, error);
      }
    });
  });
  