---
layout: default
title: Command Hubs
permalink: /hub/
---

<div class="hub-container">
    <div class="section-header">
        <h2>// DIVISIONAL COMMAND</h2>
        <div class="line-accent"></div>
        <p>Select your platform division to access local comms, rosters, and deployment orders.</p>
    </div>

    <!-- HONEYCOMB GRID -->
    <div class="honeycomb-grid">
        {% for hub in site.data.squad.hubs %}
        <div class="hub-node" onclick="openHubModal('{{ hub.name | escape }}')">
            <div class="hub-octagon">
                {% if hub.logo contains 'http' %}
                    <img src="{{ hub.logo }}" alt="{{ hub.name }}">
                {% else %}
                    <img src="{{ '/assets/img/hubs/' | append: hub.logo | relative_url }}" alt="{{ hub.name }}">
                {% endif %}
                <div class="hub-overlay">
                    <span class="hub-label">{{ hub.platform }}</span>
                </div>
            </div>
        </div>
        {% endfor %}
    </div>
</div>

<!-- HUB MODAL TERMINAL (Hidden by default) -->
<div id="hub-modal" class="modal-overlay" onclick="closeHubModal(event)">
    <div class="modal-terminal">
        <button class="modal-close" onclick="closeHubModal(event)">✕</button>

        <!-- Fixed Header: Logo + Name -->
        <div class="modal-fixed-header">
            <div class="modal-image-top">
                <img id="modal-hub-img" src="" alt="Hub Logo">
                <div class="image-glow"></div>
            </div>
            <div class="modal-header">
                <h2 id="modal-hub-name">DIVISION NAME</h2>
                <span id="modal-hub-platform" class="modal-role">PLATFORM</span>
            </div>
        </div>

        <!-- Scrollable Body -->
        <div class="modal-body">

            <!-- Stats Grid -->
            <div class="modal-stats-grid">
                <div class="stat-box">
                    <span class="stat-label">DIVISION COMMANDER</span>
                    <span class="stat-value" id="modal-hub-commander">--</span>
                </div>
                <div class="stat-box">
                    <span class="stat-label">ACTIVE MEMBERS</span>
                    <span class="stat-value" id="modal-hub-members">--</span>
                </div>
                <div class="stat-box full-width">
                    <span class="stat-label">OPERATIONAL STATUS</span>
                    <span class="stat-value" id="modal-hub-status" style="color: var(--hd-cyan);">--</span>
                </div>
            </div>

            <!-- Description / Briefing -->
            <div class="modal-bio-section">
                <span class="stat-label">// DIVISION BRIEFING</span>
                <p id="modal-hub-desc" class="bio-text">Loading tactical data...</p>
            </div>

            <!-- LAUNCH PAD BUTTON -->
            <div class="launch-pad-section">
                <span class="stat-label">// SECURE COMMS LINK</span>
                <a id="modal-hub-link" href="#" target="_blank" class="launch-btn" onclick="if(typeof SFX!=='undefined')SFX.playClick()">
                    <span class="btn-text">INITIATE LAUNCH SEQUENCE</span>
                    <span class="btn-icon">🚀</span>
                </a>
                <p style="font-size: 0.7rem; color: #666; text-align: center; margin-top: 8px;">
                    // CLICK TO JOIN DISCORD CHANNEL
                </p>
            </div>

        </div>

        <div class="modal-footer">
            // CLEARANCE LEVEL 4 // PLATFORM SPECIFIC // END OF LINE
        </div>
    </div>
</div>

<!-- HIDDEN DATA FOR JAVASCRIPT -->
<div id="hub-data-json" style="display:none;">
[
  {% for hub in site.data.squad.hubs %}
  {
    "name": "{{ hub.name | escape }}",
    "platform": "{{ hub.platform | escape }}",
    "logo": "{% if hub.logo contains 'http' %}{{ hub.logo }}{% else %}{{ '/assets/img/hubs/' | append: hub.logo | relative_url }}{% endif %}",
    "commander": "{{ hub.commander | escape }}",
    "members": "{{ hub.members }}",
    "status": "{{ hub.status }}",
    "description": "{{ hub.description | escape }}",
    "discord_link": "{{ hub.discord_link }}",
    "color": "{{ hub.color_theme | default: '#00f0ff' }}"
  }{% unless forloop.last %},{% endunless %}
  {% endfor %}
]
</div>

<!-- HUB MODAL SCRIPT -->
<script>
document.addEventListener('DOMContentLoaded', () => {
    const dataElement = document.getElementById('hub-data-json');
    let hubData = [];

    if (dataElement) {
        try {
            hubData = JSON.parse(dataElement.textContent.trim());
            console.log("✅ Hub Data Loaded:", hubData); // Debug: Check if color is here
        } catch (e) {
            console.error("❌ Hub data parse error:", e);
            console.error("Raw JSON:", dataElement.textContent);
        }
    }

    window.openHubModal = function(name) {
        const data = hubData.find(h => h.name === name);
        if (!data) {
            console.error("❌ Hub not found:", name);
            return;
        }

        // Populate Fields
        document.getElementById('modal-hub-name').innerText = data.name;
        document.getElementById('modal-hub-platform').innerText = data.platform;
        document.getElementById('modal-hub-commander').innerText = data.commander;
        document.getElementById('modal-hub-members').innerText = data.members;
        document.getElementById('modal-hub-status').innerText = data.status;
        document.getElementById('modal-hub-desc').innerText = data.description;

        // Set Image
        document.getElementById('modal-hub-img').src = data.logo;

        // Set Link & COLOR
        const linkBtn = document.getElementById('modal-hub-link');
        linkBtn.href = data.discord_link;

        // DEBUG: Check what we are reading
        console.log("🔍 Looking for color in data object...");
        console.log("Data Object:", data);
        console.log("Value of data.color:", data.color);

        // FIX: Changed data.color_theme to data.color to match the JSON key
        if (data.color && data.color !== "") {
            const c = data.color;

            console.log("✅ Applying Color:", c);

            // Force the border and shadow using inline styles
            linkBtn.style.border = `2px solid ${c}`;
            linkBtn.style.boxShadow = `0 0 20px ${c}, inset 0 0 5px ${c}40`;

            // Optional: Add a text glow too
            linkBtn.style.textShadow = `0 0 8px ${c}`;

        } else {
            console.warn("⚠️ No color found in data.color! Using fallback Cyan.");
            // Fallback to Cyan if missing
            linkBtn.style.border = "2px solid #00f0ff";
            linkBtn.style.boxShadow = "0 0 20px #00f0ff";
            linkBtn.style.textShadow = "0 0 8px #00f0ff";
        }

        // Show Modal
        const modal = document.getElementById('hub-modal');
        modal.style.display = 'flex';
        void modal.offsetWidth; // Force reflow
        modal.style.opacity = '1';
        modal.querySelector('.modal-terminal').style.transform = 'scale(1)';
        if (typeof SFX !== 'undefined') SFX.playOpen();

        document.body.style.overflow = 'hidden';
    };

    window.closeHubModal = function(event) {
        if (event.target.id === 'hub-modal' || event.target.classList.contains('modal-close')) {
            const modal = document.getElementById('hub-modal');
            modal.style.opacity = '0';
            modal.querySelector('.modal-terminal').style.transform = 'scale(0.9)';
            if (typeof SFX !== 'undefined') SFX.playClose();
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        }
    };

    // Escape Key Support
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            const modal = document.getElementById('hub-modal');
            if (modal.style.display === 'flex') closeHubModal({ target: { id: 'hub-modal' } });
        }
    });
});
</script>