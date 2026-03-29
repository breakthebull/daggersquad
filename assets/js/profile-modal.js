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

    // --- 1. Populate Basic Fields (MATCHING YOUR INDEX.HTML IDS) ---
    const nameEl = document.getElementById('modal-name');
    const roleEl = document.getElementById('modal-role');
    const imgEl = document.getElementById('modal-img');
    const bioEl = document.getElementById('modal-bio');
    
    if(nameEl) nameEl.innerText = data.name;
    if(roleEl) roleEl.innerText = data.role;
    if(imgEl) imgEl.src = data.image;
    
    // Optional fields
    const primaryEl = document.getElementById('modal-primary');
    const stratagemEl = document.getElementById('modal-stratagem');
    const missionsEl = document.getElementById('modal-missions');
    const kdEl = document.getElementById('modal-kd');
    const specialtyEl = document.getElementById('modal-specialty');
    
    if(primaryEl) primaryEl.innerText = data.primary || "Unknown";
    if(stratagemEl) stratagemEl.innerText = data.stratagem || "Unknown";
    if(missionsEl) missionsEl.innerText = data.missions || "0";
    if(kdEl) kdEl.innerText = data.kd || "0.0";
    if(specialtyEl) specialtyEl.innerText = data.specialty || "None";

    // Populate Specialty Planet
    const planetEl = document.getElementById('modal-specialty-planet');
    if(planetEl) planetEl.innerText = data.specialty_planet || "Classified";

    // Populate Quote
    const quoteEl = document.getElementById('modal-quote');
    if(quoteEl) quoteEl.innerText = data.quote ? `"${data.quote}"` : "No recorded statement.";

    // --- 2. Populate Bio ---
    if (bioEl) {
      bioEl.innerText = data.bio || "No service record available.";
    }

    // --- 5. Medals (Robust Fix) ---
    const medalsContainer = document.getElementById('modal-medals');
    if(medalsContainer) {
        medalsContainer.innerHTML = ''; // Clear existing
        
        // Check if data.medals exists and is an array
        if(data.medals && Array.isArray(data.medals) && data.medals.length > 0) {
            data.medals.forEach(medal => {
                const badge = document.createElement('span');
                badge.className = 'medal-badge'; // Ensure this class exists in CSS
                badge.innerText = medal;
                medalsContainer.appendChild(badge);
            });
            console.log("✅ Medals loaded:", data.medals);
        } else {
            console.warn("⚠️ No medals found for this leader.");
            medalsContainer.innerHTML = '<span style="color:#666; font-style:italic;">No decorations recorded.</span>';
        }
    }

    // --- 4. Show Modal Animation ---
    const modal = document.getElementById('leader-modal');
    if(modal) {
        modal.style.display = 'flex';
        void modal.offsetWidth; // Force reflow
        modal.style.opacity = '1';
        modal.querySelector('.modal-terminal').style.transform = 'scale(1)';
        if (typeof SFX !== 'undefined') SFX.playOpen();
        document.body.style.overflow = 'hidden';
    }
  };

  // Define Close Function
  window.closeLeaderProfile = function(event) {
    if (event.target.id === 'leader-modal' || event.target.classList.contains('modal-close')) {
      const modal = document.getElementById('leader-modal');
      if(!modal) return;

      modal.style.opacity = '0';
      modal.querySelector('.modal-terminal').style.transform = 'scale(0.9)';
      if (typeof SFX !== 'undefined') SFX.playClose();

      setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }, 300);
    }
  };

  // Escape Key Listener
  document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
      const modal = document.getElementById('leader-modal');
      if (modal && modal.style.display === 'flex') {
        window.closeLeaderProfile({ target: { id: 'leader-modal' } });
      }
    }
  });
});
