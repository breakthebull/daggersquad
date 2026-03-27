---
layout: default
title: Intel
permalink: /about/
---

<div class="intel-container">

    <!-- HEADER & QUOTE -->
    <div class="section-header">
        <h2>// SQUAD DOSSIER: {{ site.data.squad.squad_name | upcase }}</h2>
        <div class="line-accent"></div>
        <p class="squad-motto" style="margin-top: 15px; color: var(--hd-cyan); font-style: italic; font-size: 1.1rem;">
            {{ site.data.squad.motto }} <span style="color: #888;">{{ site.data.squad.commander_quote }}</span>
        </p>
    </div>

    <!-- SMALL GAP AFTER QUOTE -->
    <div class="intel-spacer"></div>

    <!-- TOP ROW: STATS (Left) + LOADOUTS (Right) -->
    <div class="intel-dashboard-row">

        <!-- STATS PANEL (Left Side) -->
        <div class="stats-panel-compact">
            <h3>// OPERATIONAL STATS</h3>
            <ul class="stat-list-compact">
                {% for stat in site.data.squad.stats %}
                <li>
                    <span class="stat-label">{{ stat.label }}:</span>
                    <span class="stat-value" style="{% if stat.color %}color: {{ stat.color }};{% endif %}">
                        {{ stat.value }}
                    </span>
                </li>
                {% endfor %}
            </ul>
        </div>

        <!-- LOADOUT TABS (Right Side - Takes remaining space) -->
        <div class="panel-box intel-panel loadout-panel-compact">
            <h3>// TACTICAL LOADOUT DATABASE</h3>

            <!-- Tab Buttons -->
            <div class="loadout-tabs">
                {% for loadout in site.data.squad.loadouts %}
                <button class="tab-btn {% if forloop.first %}active{% endif %}"
                        onclick="openLoadout(event, 'loadout-{{ forloop.index }}')"
                        data-color="{{ loadout.theme_color }}">
                    {{ loadout.name }}
                </button>
                {% endfor %}
            </div>

            <!-- Tab Content Areas -->
            <div class="loadout-content-area">
                {% for loadout in site.data.squad.loadouts %}
                <div id="loadout-{{ forloop.index }}"
                     class="loadout-tab-content {% if forloop.first %}active{% endif %}"
                     data-theme="{{ loadout.theme_color }}">

                    <div class="loadout-header" style="border-bottom-color: var(--hd-{{ loadout.theme_color }}); color: var(--hd-{{ loadout.theme_color }});">
                        {{ loadout.name | upcase }}
                    </div>
                    <ul class="loadout-items">
                        {% for item in loadout.items %}
                        <li>{{ item }}</li>
                        {% endfor %}
                    </ul>
                </div>
                {% endfor %}
            </div>
        </div>
    </div>

    <!-- LARGE GAP BEFORE STORY -->
    <div class="intel-spacer-large"></div>

    <!-- BOTTOM ROW: ORIGIN STORY (Full Width) -->
    <div class="panel-box intel-panel story-panel-wide">
        <h3>// ORIGIN STORY</h3>
        <div class="story-content">
            {{ site.data.squad.story }}
        </div>
    </div>

</div>

<!-- JAVASCRIPT FOR TABS -->
<script>
function openLoadout(evt, loadoutName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("loadout-tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }
    tablinks = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(loadoutName).style.display = "block";
    setTimeout(() => {
        document.getElementById(loadoutName).classList.add("active");
    }, 10);
    evt.currentTarget.className += " active";
}
</script>