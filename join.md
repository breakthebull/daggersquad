---
layout: default
title: Enlist
permalink: /join/
---

<div class="enlist-container">

    <!-- STATUS BANNER -->
    <div class="status-banner {% if site.data.squad.recruitment_status == 'OPEN' %}status-open{% elsif site.data.squad.recruitment_status == 'CLOSED' %}status-closed{% else %}status-limited{% endif %}">
        <div class="banner-icon">
            {% if site.data.squad.recruitment_status == 'OPEN' %}
                <span>//</span>
            {% elsif site.data.squad.recruitment_status == 'CLOSED' %}
                <span>X</span>
            {% else %}
                <span>!</span>
            {% endif %}
        </div>
        <div class="banner-text">
            <h2>RECRUITMENT STATUS: {{ site.data.squad.recruitment_status | upcase }}</h2>
            <p>
                {% if site.data.squad.recruitment_status == 'OPEN' %}
                    Super Earth needs you! Drop pods are launching hourly.
                {% elsif site.data.squad.recruitment_status == 'CLOSED' %}
                    Squad capacity reached. Check back later, Helldiver.
                {% else %}
                    Limited slots available. Priority given to veterans.
                {% endif %}
            </p>
        </div>
    </div>

    <!-- REQUIREMENTS GRID -->
    <div class="section-header" style="margin-top: 40px;">
        <h2>// CLEARANCE CRITERIA</h2>
        <div class="line-accent"></div>
    </div>

    <div class="requirements-grid">
        {% for req in site.data.squad.requirements %}
        <div class="req-card status-{{ req.status }}">
            <div class="req-label">{{ req.label }}</div>
            <div class="req-value">{{ req.value }}</div>
            <div class="req-status-indicator">
                {% if req.status == 'verified' %}
                    <span>✓ VERIFIED</span>
                {% elsif req.status == 'pending' %}
                    <span>⚠ REVIEW</span>
                {% else %}
                    <span>✗ FAILED</span>
                {% endif %}
            </div>
        </div>
        {% endfor %}
    </div>

    <!-- FINAL CALL TO ACTION -->
    <div class="launch-bay">
        <p class="launch-text">// CONFIRMED? INITIATE DROP SEQUENCE //</p>
        
        {% if site.data.squad.recruitment_status == 'OPEN' or site.data.squad.recruitment_status == 'LIMITED' %}
            <a href="{{ site.data.squad.discord_link }}" target="_blank" class="enlist-btn launch-btn">
                >> INITIATE DROP <<
            </a>
            <p class="disclaimer">* By clicking, you agree to serve Super Earth indefinitely.</p>
        {% else %}
            <button class="enlist-btn launch-btn disabled" disabled>
                >> RECRUITMENT HALTED <<
            </button>
            <p class="disclaimer">Contact Command for exemption requests.</p>
        {% endif %}
    </div>

</div>