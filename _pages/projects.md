---
layout: page
title: projects
permalink: /projects/
description: Open-source tools and research software.
nav: true
nav_order: 2
horizontal: true
---

<!-- pages/projects.md -->
<div class="projects">
  {% assign sorted_projects = site.projects | sort: "importance" %}
  <div class="container">
    <div class="row row-cols-1">
      {% for project in sorted_projects %}
        {% include projects_horizontal.liquid %}
      {% endfor %}
    </div>
  </div>
</div>

<script defer src="{{ '/assets/js/github-stars.js' | relative_url | bust_file_cache }}"></script>
