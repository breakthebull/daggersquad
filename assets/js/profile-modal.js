// assets/js/profile-modal.js

document.addEventListener('DOMContentLoaded', () => {
  const dataElement = document.getElementById('leader-data-json');

  if (!dataElement) {
    console.error("❌ Error: Hidden data div #leader-data-json not found!");
    return;
  }

  let squadData = [];

  try {
    squadData = JSON.parse(dataElement.textContent.trim());
    console.log("✅ Leader data loaded:", squadData);
  } catch (error) {
    console.error("❌ CRITICAL ERROR: Failed to parse leader data.");
    console.error("Raw content causing error:", dataElement.textContent);
    console.error("Error details:", error);
    // Do not alert here if it's annoying, just log it. 
    // If this triggers, the JSON in index.html is broken.
    return;
  }

  window.openLeaderProfile = function(name) {
    console.log("🔍 Searching for:", name);
    const data = squadData.find(l => l.name === name);

    if (!data) {
      console.error("❌ Leader not found in data:", name);
      return;
    }

    console.log("✅ Found data:", data);

    // --- 1. Populate Basic Fields ---
    const nameEl = document.getElementById('modal-name');
    const roleEl = document.getElementById('modal-role');
    const imgEl = document.getElementById('modal-img');
    
    if(nameEl) nameEl.innerText = data.name;
    if(roleEl) roleEl.innerText = data.role;
    if(imgEl) {
        imgEl.src = data.image;
        imgEl.onerror = () => console.error("❌ Image load failed:", data.image);
    }
    
    // --- 2. Populate Stats ---
    const fields = {
        'modal-primary': data.primary,
        'modal-stratagem': data.stratagem,
        'modal-missions': data.missions,
        'modal-kd': data.kd,
        'modal-specialty': data.specialty,
        'modal-specialty-planet': data.specialty_planet
    };

    for (const [id, value] of Object.entries(fields)) {
        const el = document.getElementById(id);
        if(el) el.innerText = value || "--";
    }

    // --- 3. Populate Bio (Single Definition) ---
    const bioEl = document.getElementById('modal-bio');
    if (bioEl) {
        if (data.bio && data.bio.trim() !== "") {
            bioEl.innerText = data.bio;
            console.log("✅ Bio loaded");
        } else {
            bioEl.innerText = "No service record available.";
        }
    }

    // --- 4. Populate Quote ---
    const quoteEl = document.getElementById('modal-quote');
    if(quoteEl) {
        quoteEl.innerText = data.quote ? `"${data.quote}"` : "No recorded statement.";
    }

    // --- 5. Populate Medals ---
    const medalsContainer = document.getElementById('modal-medals');
    if(medalsContainer) {
        medalsContainer.innerHTML = ''; 
        if(data.medals && Array.isArray(data.medals) && data.medals.length > 0) {
            data.medals.forEach(medal => {
                const badge = document.createElement('span');
                badge.className = 'medal-badge';
                badge.innerText = medal;
                medalsContainer.appendChild(badge);
            });
        } else {
            medalsContainer.innerHTML = '<span style="color:#666; font-style:italic;">No decorations.</span>';
        }
    }

    // --- 6. Show Modal ---
    const modal = document.getElementById('leader-modal');
    if(modal) {
        modal.style.display = 'flex';
        void modal.offsetWidth; 
        modal.style.opacity = '1';
        modal.querySelector('.modal-terminal').style.transform = 'scale(1)';
        if (typeof SFX !== 'undefined') SFX.playOpen();
        document.body.style.overflow = 'hidden';
    }
  };

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

  document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
      const modal = document.getElementById('leader-modal');
      if (modal && modal.style.display === 'flex') {
        window.closeLeaderProfile({ target: { id: 'leader-modal' } });
      }
    }
  });
});
