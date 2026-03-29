// assets/js/profile-modal.js

document.addEventListener('DOMContentLoaded', () => {
  const dataElement = document.getElementById('leader-data-json');

  if (!dataElement) {
    console.error("❌ Error: Hidden data div #leader-data-json not found!");
    return;
  }

  let squadData = [];

  try {
    // Parse the JSON from the hidden div
    squadData = JSON.parse(dataElement.textContent.trim());
    console.log("✅ Leader data loaded:", squadData);
  } catch (error) {
    console.error("❌ CRITICAL ERROR: Failed to parse leader data.");
    console.error("Raw content causing error:", dataElement.textContent);
    console.error("Error details:", error);
    alert("Error loading profile data. Check browser console (F12).");
    return;
  }

  // Define Open Function
  window.openLeaderProfile = function(name) {
    console.log("🔍 Searching for:", name);
    const data = squadData.find(l => l.name === name);

    if (!data) {
      console.error("❌ Leader not found in data:", name);
      return;
    }

    console.log("✅ Found data:", data);

    // --- 1. Populate Basic Fields ---
    document.getElementById('modal-name').innerText = data.name;
    document.getElementById('modal-role').innerText = data.role;
    document.getElementById('modal-img').src = data.image;
    document.getElementById('modal-primary').innerText = data.primary || "Unknown";
    document.getElementById('modal-stratagem').innerText = data.stratagem || "Unknown";
    document.getElementById('modal-missions').innerText = data.missions || "0";
    document.getElementById('modal-kd').innerText = data.kd || "0.0";
    document.getElementById('modal-specialty').innerText = data.specialty || "None";
    document.getElementById('modal-specialty_planet').innerText = data.specialty_planet || "None";
    document.getElementById('modal-quote').innerText = data.quote || "None";

    // --- 2. Populate Bio (NEW) ---
    const bioElement = document.getElementById('modal-bio');
    if (bioElement) {
      bioElement.innerText = data.bio || "No service record available.";
    }

    // --- 3. Populate Medals (NEW) ---
    const medalsContainer = document.getElementById('modal-medals');
    if (medalsContainer && data.medals) {
      medalsContainer.innerHTML = ''; // Clear old content
      data.medals.forEach(medal => {
        const badge = document.createElement('span');
        badge.className = 'medal-badge';
        badge.innerText = medal;
        medalsContainer.appendChild(badge);
      });
    } else if (medalsContainer) {
      medalsContainer.innerHTML = '<span style="color:#666; font-style:italic;">No decorations recorded.</span>';
    }

    // --- 4. Show Modal Animation ---
    const modal = document.getElementById('leader-modal');
    modal.style.display = 'flex';

    // Force browser reflow to ensure transition triggers
    void modal.offsetWidth;

    modal.style.opacity = '1';
    modal.querySelector('.modal-terminal').style.transform = 'scale(1)';
    if (typeof SFX !== 'undefined') SFX.playOpen();

    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
  };

  // Define Close Function
  window.closeLeaderProfile = function(event) {
    // Only close if clicking the overlay background or the X button
    if (event.target.id === 'leader-modal' || event.target.classList.contains('modal-close')) {
      const modal = document.getElementById('leader-modal');

      // Fade out
      modal.style.opacity = '0';
      modal.querySelector('.modal-terminal').style.transform = 'scale(0.9)';
      if (typeof SFX !== 'undefined') SFX.playClose();


      // Wait for transition to finish before hiding display
      setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
        console.log("✅ Modal closed, clicks restored.");
      }, 300); // Must match CSS transition time
    }
  };

  // Escape Key Listener
  document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
      const modal = document.getElementById('leader-modal');
      if (modal.style.display === 'flex') {
        // Simulate a click on the overlay to trigger close logic
        window.closeLeaderProfile({ target: { id: 'leader-modal' } });
      }
    }
  });
});
