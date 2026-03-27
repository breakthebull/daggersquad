---
layout: default
title: Comms
permalink: /contact/
---

<div class="comms-container">

    <div class="section-header">
        <h2>// ESTABLISH CONTACT</h2>
        <div class="line-accent"></div>
        <p style="margin-top: 10px; color: #aaa;">
            Secure channel open. Transmit your inquiry to Command.
        </p>
    </div>

    <!-- FORM START -->
    <!-- Replace the ACTION URL below with your actual Formspree URL -->
    <form action="https://formspree.io/f/yoursecretcode" method="POST" class="terminal-form">

        <div class="form-group">
            <label for="name">// CODENAME</label>
            <input type="text" id="name" name="name" placeholder="Enter your callsign..." required>
        </div>

        <div class="form-group">
            <label for="email">// RETURN FREQUENCY (EMAIL)</label>
            <input type="email" id="email" name="email" placeholder="user@superearth.gov" required>
        </div>

        <div class="form-group">
            <label for="type">// TRANSMISSION TYPE</label>
            <select id="type" name="type">
                <option value="General Inquiry">General Inquiry</option>
                <option value="Recruitment">Recruitment Question</option>
                <option value="Mission Report">Mission Report</option>
                <option value="Bug Report">Technical Issue</option>
            </select>
        </div>

        <div class="form-group">
            <label for="message">// MESSAGE DATA</label>
            <textarea id="message" name="message" rows="6" placeholder="Type your transmission here..." required></textarea>
        </div>

        <!-- Hidden field to redirect back to your site after sending (Optional) -->
        <input type="hidden" name="_next" value="{{ site.url }}{{ site.baseurl }}/contact/thanks/">

        <button type="submit" class="enlist-btn" style="width: 100%; margin-top: 20px;">
            >> TRANSMIT DATA <<
        </button>
    </form>
    <!-- FORM END -->

</div>