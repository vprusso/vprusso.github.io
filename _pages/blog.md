---
layout: default
title: Blog
permalink: /blog/
---

<div class="home">

  <h1 class="page-heading">Posts</h1>

  <ul class="post-list">
    {% for post in site.posts %}
      <li>
        <span class="post-meta">{{ post.date | date: "%b %-d, %Y" }}</span>
		{% for tag in post.tags %}
  {% if tag == page.tag %}
  <li class="archive_list">
    <time style="color:#666;font-size:11px;" datetime='{{post.date | date: "%Y-%m-%d"}}'>{{post.date | date: "%m/%d/%y"}}</time> <a class="archive_list_article_link" href='{{post.url}}'>{{post.title}}</a>
    <p class="summary">{{post.summary}}</p>
    <ul class="tag_list">
      {% for tag in post.tags %}
      <li class="inline archive_list"><a class="tag_list_link" href="/tag/{.{ tag }}">{{ tag }}</a></li>
      {% endfor %}
    </ul>
  </li>
  {% endif %}
  {% endfor %}

        <h2>
          <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
        </h2>
      </li>
    {% endfor %}
  </ul>

  <p class="rss-subscribe">subscribe <a href="{{ "/feed.xml" | prepend: site.baseurl }}">via RSS</a></p>

</div>
