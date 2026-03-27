---
layout: default
title: Live Feed
permalink: /watch/
---

<div class="watch-container">

    <div class="section-header">
        <h2>// LIVE BROADCAST</h2>
        <div class="line-accent"></div>
        <p style="margin-top: 10px; color: #aaa;">
            Tuning into frequency: <span style="color: var(--hd-cyan); font-weight: bold;">{{ site.twitch_channel }}</span>
        </p>
    </div>

    <!-- TWITCH EMBED CONTAINER -->
    <div class="twitch-embed-wrapper" id="twitch-video-container">
        <div id="twitch-embed"></div>
    </div>

    <div style="margin-top: 20px; text-align: center; font-size: 0.9rem; color: #888;">
        <p>// IF STREAM IS OFFLINE, PLAYER WILL SHOW LAST ACTIVE CONTENT //</p>
    </div>

</div>

<!-- TWITCH EMBED SCRIPT -->
<script src="https://embed.twitch.tv/embed/v1.js"></script>
<script type="text/javascript">
  document.addEventListener('DOMContentLoaded', function() {

    // Pulls the domain from config.
    // IMPORTANT: Update 'twitch_parent_domain' in _config.yml before deploying!
    var parentDomain = "{{ site.twitch_parent_domain }}";

    // Fallback if config is empty
    if (!parentDomain || parentDomain === "") {
      parentDomain = window.location.hostname;
    }

    new Twitch.Embed("twitch-embed", {
      width: "100%",
      height: 650,
      channel: "{{ site.twitch_channel }}",
      layout: "video",
      autoplay: false,
      parent: [parentDomain]
    });
  });
</script>