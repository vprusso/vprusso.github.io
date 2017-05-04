





<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">



  <link crossorigin="anonymous" href="https://assets-cdn.github.com/assets/frameworks-81a59bf26d881d29286674f6deefe779c444382fff322085b50ba455460ccae5.css" integrity="sha256-gaWb8m2IHSkoZnT23u/necREOC//MiCFtQukVUYMyuU=" media="all" rel="stylesheet" />
  <link crossorigin="anonymous" href="https://assets-cdn.github.com/assets/github-4a6d0d25a011b7202858c52c047bda6bd227d8853abb3e70edf75785f6a78122.css" integrity="sha256-Sm0NJaARtyAoWMUsBHvaa9In2IU6uz5w7fdXhfangSI=" media="all" rel="stylesheet" />
  
  
  
  

  <meta name="viewport" content="width=device-width">
  
  <title>vprusso.github.io/2017-04-15-tensor-flow-categorical-data.markdown at 8ddc418dd0f172f8851b233433bd1860dbca9c9b · vprusso/vprusso.github.io</title>
  <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="GitHub">
  <link rel="fluid-icon" href="https://github.com/fluidicon.png" title="GitHub">
  <meta property="fb:app_id" content="1401488693436528">

    
    <meta content="https://avatars3.githubusercontent.com/u/1562214?v=3&amp;s=400" property="og:image" /><meta content="GitHub" property="og:site_name" /><meta content="object" property="og:type" /><meta content="vprusso/vprusso.github.io" property="og:title" /><meta content="https://github.com/vprusso/vprusso.github.io" property="og:url" /><meta content="vprusso.github.io - Personal website" property="og:description" />

  <link rel="assets" href="https://assets-cdn.github.com/">
  <link rel="web-socket" href="wss://live.github.com/_sockets/VjI6MTcxNjE3MDU4OjBmZmI0NDQzN2IxMDA1ZWNmZmI3ZGRiODVjNmE1NzEyY2YwMTY1MDBlMzMyNTI4ZmM2MTk5ZGNmNmE2NGY5NjA=--4aa61e3b346b8d1c4f405877e9fb0f81a48f1527">
  <meta name="pjax-timeout" content="1000">
  <link rel="sudo-modal" href="/sessions/sudo_modal">
  <meta name="request-id" content="C4CC:404C:2235683:32D74C4:590B843E" data-pjax-transient>
  

  <meta name="selected-link" value="repo_source" data-pjax-transient>

  <meta name="google-site-verification" content="KT5gs8h0wvaagLKAVWq8bbeNwnZZK1r1XQysX3xurLU">
<meta name="google-site-verification" content="ZzhVyEFwb7w3e0-uOTltm8Jsck2F5StVihD0exw2fsA">
    <meta name="google-analytics" content="UA-3769691-2">

<meta content="collector.githubapp.com" name="octolytics-host" /><meta content="github" name="octolytics-app-id" /><meta content="https://collector.githubapp.com/github-external/browser_event" name="octolytics-event-url" /><meta content="C4CC:404C:2235683:32D74C4:590B843E" name="octolytics-dimension-request_id" /><meta content="1562214" name="octolytics-actor-id" /><meta content="vprusso" name="octolytics-actor-login" /><meta content="0dd3d3ae7e6f523fbe7ddc60f1239da5f4d59a05c5baeee665fc91b802d0542f" name="octolytics-actor-hash" />
<meta content="/&lt;user-name&gt;/&lt;repo-name&gt;/blob/show" data-pjax-transient="true" name="analytics-location" />




  <meta class="js-ga-set" name="dimension1" content="Logged In">


  

      <meta name="hostname" content="github.com">
  <meta name="user-login" content="vprusso">

      <meta name="expected-hostname" content="github.com">
    <meta name="js-proxy-site-detection-payload" content="OGIyNjFjMmU1YjJhNTljZDI5YmNhYjBjMTVkMjU3ZmM2MmU4NGYyMWJiNTE0MGZhN2U1ZjAxNzZiMWE0MzJkOHx7InJlbW90ZV9hZGRyZXNzIjoiMTM1LjIzLjEyNC4xNzgiLCJyZXF1ZXN0X2lkIjoiQzRDQzo0MDRDOjIyMzU2ODM6MzJENzRDNDo1OTBCODQzRSIsInRpbWVzdGFtcCI6MTQ5MzkyNjk3OCwiaG9zdCI6ImdpdGh1Yi5jb20ifQ==">


  <meta name="html-safe-nonce" content="9f44bc68692a089b0208c9697dbfb22150f0c49e">

  <meta http-equiv="x-pjax-version" content="54135a3b0eac0835751e71ad3f7d74ce">
  

    
  <meta name="description" content="vprusso.github.io - Personal website">
  <meta name="go-import" content="github.com/vprusso/vprusso.github.io git https://github.com/vprusso/vprusso.github.io.git">

  <meta content="1562214" name="octolytics-dimension-user_id" /><meta content="vprusso" name="octolytics-dimension-user_login" /><meta content="29408915" name="octolytics-dimension-repository_id" /><meta content="vprusso/vprusso.github.io" name="octolytics-dimension-repository_nwo" /><meta content="true" name="octolytics-dimension-repository_public" /><meta content="false" name="octolytics-dimension-repository_is_fork" /><meta content="29408915" name="octolytics-dimension-repository_network_root_id" /><meta content="vprusso/vprusso.github.io" name="octolytics-dimension-repository_network_root_nwo" />
  <link href="https://github.com/vprusso/vprusso.github.io/commits/8ddc418dd0f172f8851b233433bd1860dbca9c9b.atom" rel="alternate" title="Recent Commits to vprusso.github.io:8ddc418dd0f172f8851b233433bd1860dbca9c9b" type="application/atom+xml">


    <link rel="canonical" href="https://github.com/vprusso/vprusso.github.io/blob/8ddc418dd0f172f8851b233433bd1860dbca9c9b/_posts/2017-04-15-tensor-flow-categorical-data.markdown" data-pjax-transient>


  <meta name="browser-stats-url" content="https://api.github.com/_private/browser/stats">

  <meta name="browser-errors-url" content="https://api.github.com/_private/browser/errors">

  <link rel="mask-icon" href="https://assets-cdn.github.com/pinned-octocat.svg" color="#000000">
  <link rel="icon" type="image/x-icon" href="https://assets-cdn.github.com/favicon.ico">

<meta name="theme-color" content="#1e2327">


  <meta name="u2f-support" content="true">

  </head>

  <body class="logged-in env-production page-blob">
    


  <div class="position-relative js-header-wrapper ">
    <a href="#start-of-content" tabindex="1" class="accessibility-aid js-skip-to-content">Skip to content</a>
    <div id="js-pjax-loader-bar" class="pjax-loader-bar"><div class="progress"></div></div>

    
    
    



        
<div class="header" role="banner">
  <div class="container clearfix">
    <a class="header-logo-invertocat" href="https://github.com/" data-hotkey="g d" aria-label="Homepage" data-ga-click="Header, go to dashboard, icon:logo">
  <svg aria-hidden="true" class="octicon octicon-mark-github" height="32" version="1.1" viewBox="0 0 16 16" width="32"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
</a>


        <div class="header-search scoped-search site-scoped-search js-site-search" role="search">
  <!-- '"` --><!-- </textarea></xmp> --></option></form><form accept-charset="UTF-8" action="/vprusso/vprusso.github.io/search" class="js-site-search-form" data-scoped-search-url="/vprusso/vprusso.github.io/search" data-unscoped-search-url="/search" method="get"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /></div>
    <label class="form-control header-search-wrapper js-chromeless-input-container">
        <a href="/vprusso/vprusso.github.io/blob/8ddc418dd0f172f8851b233433bd1860dbca9c9b/_posts/2017-04-15-tensor-flow-categorical-data.markdown" class="header-search-scope no-underline">This repository</a>
      <input type="text"
        class="form-control header-search-input js-site-search-focus js-site-search-field is-clearable"
        data-hotkey="s"
        name="q"
        value=""
        placeholder="Search"
        aria-label="Search this repository"
        data-unscoped-placeholder="Search GitHub"
        data-scoped-placeholder="Search"
        autocapitalize="off">
        <input type="hidden" class="js-site-search-type-field" name="type" >
    </label>
</form></div>


      <ul class="header-nav float-left" role="navigation">
        <li class="header-nav-item">
          <a href="/pulls" aria-label="Pull requests you created" class="js-selected-navigation-item header-nav-link" data-ga-click="Header, click, Nav menu - item:pulls context:user" data-hotkey="g p" data-selected-links="/pulls /pulls/assigned /pulls/mentioned /pulls">
            Pull requests
</a>        </li>
        <li class="header-nav-item">
          <a href="/issues" aria-label="Issues you created" class="js-selected-navigation-item header-nav-link" data-ga-click="Header, click, Nav menu - item:issues context:user" data-hotkey="g i" data-selected-links="/issues /issues/assigned /issues/mentioned /issues">
            Issues
</a>        </li>
          <li class="header-nav-item">
            <a class="header-nav-link" href="https://gist.github.com/" data-ga-click="Header, go to gist, text:gist">Gist</a>
          </li>
      </ul>

    
<ul class="header-nav user-nav float-right" id="user-links">
  <li class="header-nav-item">
    
    <a href="/notifications" aria-label="You have unread notifications" class="header-nav-link notification-indicator tooltipped tooltipped-s js-socket-channel js-notification-indicator " data-channel="notification-changed:1562214" data-ga-click="Header, go to notifications, icon:unread" data-hotkey="g n">
        <span class="mail-status unread"></span>
        <svg aria-hidden="true" class="octicon octicon-bell float-left" height="16" version="1.1" viewBox="0 0 14 16" width="14"><path fill-rule="evenodd" d="M14 12v1H0v-1l.73-.58c.77-.77.81-2.55 1.19-4.42C2.69 3.23 6 2 6 2c0-.55.45-1 1-1s1 .45 1 1c0 0 3.39 1.23 4.16 5 .38 1.88.42 3.66 1.19 4.42l.66.58H14zm-7 4c1.11 0 2-.89 2-2H5c0 1.11.89 2 2 2z"/></svg>
</a>
  </li>

  <li class="header-nav-item dropdown js-menu-container">
    <a class="header-nav-link tooltipped tooltipped-s js-menu-target" href="/new"
       aria-label="Create new…"
       data-ga-click="Header, create new, icon:add">
      <svg aria-hidden="true" class="octicon octicon-plus float-left" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path fill-rule="evenodd" d="M12 9H7v5H5V9H0V7h5V2h2v5h5z"/></svg>
      <span class="dropdown-caret"></span>
    </a>

    <div class="dropdown-menu-content js-menu-content">
      <ul class="dropdown-menu dropdown-menu-sw">
        
<a class="dropdown-item" href="/new" data-ga-click="Header, create new repository">
  New repository
</a>

  <a class="dropdown-item" href="/new/import" data-ga-click="Header, import a repository">
    Import repository
  </a>

<a class="dropdown-item" href="https://gist.github.com/" data-ga-click="Header, create new gist">
  New gist
</a>

  <a class="dropdown-item" href="/organizations/new" data-ga-click="Header, create new organization">
    New organization
  </a>



  <div class="dropdown-divider"></div>
  <div class="dropdown-header">
    <span title="vprusso/vprusso.github.io">This repository</span>
  </div>
    <a class="dropdown-item" href="/vprusso/vprusso.github.io/issues/new" data-ga-click="Header, create new issue">
      New issue
    </a>

      </ul>
    </div>
  </li>

  <li class="header-nav-item dropdown js-menu-container">
    <a class="header-nav-link name tooltipped tooltipped-sw js-menu-target" href="/vprusso"
       aria-label="View profile and more"
       data-ga-click="Header, show menu, icon:avatar">
      <img alt="@vprusso" class="avatar" src="https://avatars1.githubusercontent.com/u/1562214?v=3&amp;s=40" height="20" width="20">
      <span class="dropdown-caret"></span>
    </a>

    <div class="dropdown-menu-content js-menu-content">
      <div class="dropdown-menu dropdown-menu-sw">
        <div class="dropdown-header header-nav-current-user css-truncate">
          Signed in as <strong class="css-truncate-target">vprusso</strong>
        </div>

        <div class="dropdown-divider"></div>

        <a class="dropdown-item" href="/vprusso" data-ga-click="Header, go to profile, text:your profile">
          Your profile
        </a>
        <a class="dropdown-item" href="/vprusso?tab=stars" data-ga-click="Header, go to starred repos, text:your stars">
          Your stars
        </a>
        <a class="dropdown-item" href="/explore" data-ga-click="Header, go to explore, text:explore">
          Explore
        </a>
          <a class="dropdown-item" href="/integrations" data-ga-click="Header, go to integrations, text:integrations">
            Integrations
          </a>
        <a class="dropdown-item" href="https://help.github.com" data-ga-click="Header, go to help, text:help">
          Help
        </a>

        <div class="dropdown-divider"></div>

        <a class="dropdown-item" href="/settings/profile" data-ga-click="Header, go to settings, icon:settings">
          Settings
        </a>

        <!-- '"` --><!-- </textarea></xmp> --></option></form><form accept-charset="UTF-8" action="/logout" class="logout-form" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="b6T1wSFSbsGH0la0Oo5+VKXMCvxH+gVneODuxB0XabRFw3iveH0OMNd5MIQNpGp9d4czLkS5TfrkUlYLb0nXNQ==" /></div>
          <button type="submit" class="dropdown-item dropdown-signout" data-ga-click="Header, sign out, icon:logout">
            Sign out
          </button>
</form>      </div>
    </div>
  </li>
</ul>


    <!-- '"` --><!-- </textarea></xmp> --></option></form><form accept-charset="UTF-8" action="/logout" class="sr-only right-0" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="tsqxln5oKnE07yv2l0mGp1HVlXoFm2XNkiToMVPVHOCcrTz4J0dKgGRETcagY5KOg56sqAbYLVAOllD+IYuiYQ==" /></div>
      <button type="submit" class="dropdown-item dropdown-signout" data-ga-click="Header, sign out, icon:logout">
        Sign out
      </button>
</form>  </div>
</div>


      

  </div>

  <div id="start-of-content" class="accessibility-aid"></div>

    <div id="js-flash-container">
</div>



  <div role="main">
        <div itemscope itemtype="http://schema.org/SoftwareSourceCode">
    <div id="js-repo-pjax-container" data-pjax-container>
        



    <div class="pagehead repohead instapaper_ignore readability-menu experiment-repo-nav">
      <div class="container repohead-details-container">

        <ul class="pagehead-actions">
  <li>
        <!-- '"` --><!-- </textarea></xmp> --></option></form><form accept-charset="UTF-8" action="/notifications/subscribe" class="js-social-container" data-autosubmit="true" data-remote="true" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="eKXEih3+CySP5SGvNDskPf9Murbd72btRD+hT5Ik2J6nqqsA++VGqc2zBcfOdjC39LHkRlfetorwnUPuSIhaIw==" /></div>      <input class="form-control" id="repository_id" name="repository_id" type="hidden" value="29408915" />

        <div class="select-menu js-menu-container js-select-menu">
          <a href="/vprusso/vprusso.github.io/subscription"
            class="btn btn-sm btn-with-count select-menu-button js-menu-target" role="button" tabindex="0" aria-haspopup="true"
            data-ga-click="Repository, click Watch settings, action:blob#show">
            <span class="js-select-button">
                <svg aria-hidden="true" class="octicon octicon-eye" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M8.06 2C3 2 0 8 0 8s3 6 8.06 6C13 14 16 8 16 8s-3-6-7.94-6zM8 12c-2.2 0-4-1.78-4-4 0-2.2 1.8-4 4-4 2.22 0 4 1.8 4 4 0 2.22-1.78 4-4 4zm2-4c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z"/></svg>
                Unwatch
            </span>
          </a>
            <a class="social-count js-social-count"
              href="/vprusso/vprusso.github.io/watchers"
              aria-label="1 user is watching this repository">
              1
            </a>

        <div class="select-menu-modal-holder">
          <div class="select-menu-modal subscription-menu-modal js-menu-content">
            <div class="select-menu-header js-navigation-enable" tabindex="-1">
              <svg aria-label="Close" class="octicon octicon-x js-menu-close" height="16" role="img" version="1.1" viewBox="0 0 12 16" width="12"><path fill-rule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48z"/></svg>
              <span class="select-menu-title">Notifications</span>
            </div>

              <div class="select-menu-list js-navigation-container" role="menu">

                <div class="select-menu-item js-navigation-item " role="menuitem" tabindex="0">
                  <svg aria-hidden="true" class="octicon octicon-check select-menu-item-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path fill-rule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5z"/></svg>
                  <div class="select-menu-item-text">
                    <input id="do_included" name="do" type="radio" value="included" />
                    <span class="select-menu-item-heading">Not watching</span>
                    <span class="description">Be notified when participating or @mentioned.</span>
                    <span class="js-select-button-text hidden-select-button-text">
                      <svg aria-hidden="true" class="octicon octicon-eye" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M8.06 2C3 2 0 8 0 8s3 6 8.06 6C13 14 16 8 16 8s-3-6-7.94-6zM8 12c-2.2 0-4-1.78-4-4 0-2.2 1.8-4 4-4 2.22 0 4 1.8 4 4 0 2.22-1.78 4-4 4zm2-4c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z"/></svg>
                      Watch
                    </span>
                  </div>
                </div>

                <div class="select-menu-item js-navigation-item selected" role="menuitem" tabindex="0">
                  <svg aria-hidden="true" class="octicon octicon-check select-menu-item-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path fill-rule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5z"/></svg>
                  <div class="select-menu-item-text">
                    <input checked="checked" id="do_subscribed" name="do" type="radio" value="subscribed" />
                    <span class="select-menu-item-heading">Watching</span>
                    <span class="description">Be notified of all conversations.</span>
                    <span class="js-select-button-text hidden-select-button-text">
                      <svg aria-hidden="true" class="octicon octicon-eye" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M8.06 2C3 2 0 8 0 8s3 6 8.06 6C13 14 16 8 16 8s-3-6-7.94-6zM8 12c-2.2 0-4-1.78-4-4 0-2.2 1.8-4 4-4 2.22 0 4 1.8 4 4 0 2.22-1.78 4-4 4zm2-4c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z"/></svg>
                        Unwatch
                    </span>
                  </div>
                </div>

                <div class="select-menu-item js-navigation-item " role="menuitem" tabindex="0">
                  <svg aria-hidden="true" class="octicon octicon-check select-menu-item-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path fill-rule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5z"/></svg>
                  <div class="select-menu-item-text">
                    <input id="do_ignore" name="do" type="radio" value="ignore" />
                    <span class="select-menu-item-heading">Ignoring</span>
                    <span class="description">Never be notified.</span>
                    <span class="js-select-button-text hidden-select-button-text">
                      <svg aria-hidden="true" class="octicon octicon-mute" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M8 2.81v10.38c0 .67-.81 1-1.28.53L3 10H1c-.55 0-1-.45-1-1V7c0-.55.45-1 1-1h2l3.72-3.72C7.19 1.81 8 2.14 8 2.81zm7.53 3.22l-1.06-1.06-1.97 1.97-1.97-1.97-1.06 1.06L11.44 8 9.47 9.97l1.06 1.06 1.97-1.97 1.97 1.97 1.06-1.06L13.56 8l1.97-1.97z"/></svg>
                        Stop ignoring
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
</form>
  </li>

  <li>
      <div class="js-toggler-container js-social-container starring-container ">
    <!-- '"` --><!-- </textarea></xmp> --></option></form><form accept-charset="UTF-8" action="/vprusso/vprusso.github.io/unstar" class="starred" data-remote="true" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="igkgqmW/zTWRr6D2O01nBAGP+OK0+qQEzeZkF32zl/9QL9HeDlNYg3Vj8PVEIGXhpIEZVg2B4jQfC+sFF8j0Ow==" /></div>
      <button
        type="submit"
        class="btn btn-sm btn-with-count js-toggler-target"
        aria-label="Unstar this repository" title="Unstar vprusso/vprusso.github.io"
        data-ga-click="Repository, click unstar button, action:blob#show; text:Unstar">
        <svg aria-hidden="true" class="octicon octicon-star" height="16" version="1.1" viewBox="0 0 14 16" width="14"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z"/></svg>
        Unstar
      </button>
        <a class="social-count js-social-count" href="/vprusso/vprusso.github.io/stargazers"
           aria-label="0 users starred this repository">
          0
        </a>
</form>
    <!-- '"` --><!-- </textarea></xmp> --></option></form><form accept-charset="UTF-8" action="/vprusso/vprusso.github.io/star" class="unstarred" data-remote="true" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="IQel6mZEfCB4NYmyKViqXC4Pbw2qs3PFcVFkCPruPZzJU99qKa9QRnBeGlz9sDYDOTT+XqLZQCP9zikuN8+Sdg==" /></div>
      <button
        type="submit"
        class="btn btn-sm btn-with-count js-toggler-target"
        aria-label="Star this repository" title="Star vprusso/vprusso.github.io"
        data-ga-click="Repository, click star button, action:blob#show; text:Star">
        <svg aria-hidden="true" class="octicon octicon-star" height="16" version="1.1" viewBox="0 0 14 16" width="14"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z"/></svg>
        Star
      </button>
        <a class="social-count js-social-count" href="/vprusso/vprusso.github.io/stargazers"
           aria-label="0 users starred this repository">
          0
        </a>
</form>  </div>

  </li>

  <li>
          <a href="#fork-destination-box" class="btn btn-sm btn-with-count"
              title="Fork your own copy of vprusso/vprusso.github.io to your account"
              aria-label="Fork your own copy of vprusso/vprusso.github.io to your account"
              rel="facebox"
              data-ga-click="Repository, show fork modal, action:blob#show; text:Fork">
              <svg aria-hidden="true" class="octicon octicon-repo-forked" height="16" version="1.1" viewBox="0 0 10 16" width="10"><path fill-rule="evenodd" d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"/></svg>
            Fork
          </a>

          <div id="fork-destination-box" style="display: none;">
            <h2 class="facebox-header" data-facebox-id="facebox-header">Where should we fork this repository?</h2>
            <include-fragment src=""
                class="js-fork-select-fragment fork-select-fragment"
                data-url="/vprusso/vprusso.github.io/fork?fragment=1">
              <img alt="Loading" height="64" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-128.gif" width="64" />
            </include-fragment>
          </div>

    <a href="/vprusso/vprusso.github.io/network" class="social-count"
       aria-label="1 user forked this repository">
      1
    </a>
  </li>
</ul>

        <h1 class="public ">
  <svg aria-hidden="true" class="octicon octicon-repo" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path fill-rule="evenodd" d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"/></svg>
  <span class="author" itemprop="author"><a href="/vprusso" class="url fn" rel="author">vprusso</a></span><!--
--><span class="path-divider">/</span><!--
--><strong itemprop="name"><a href="/vprusso/vprusso.github.io" data-pjax="#js-repo-pjax-container">vprusso.github.io</a></strong>

</h1>

      </div>
      <div class="container">
        
<nav class="reponav js-repo-nav js-sidenav-container-pjax"
     itemscope
     itemtype="http://schema.org/BreadcrumbList"
     role="navigation"
     data-pjax="#js-repo-pjax-container">

  <span itemscope itemtype="http://schema.org/ListItem" itemprop="itemListElement">
    <a href="/vprusso/vprusso.github.io" class="js-selected-navigation-item selected reponav-item" data-hotkey="g c" data-selected-links="repo_source repo_downloads repo_commits repo_releases repo_tags repo_branches /vprusso/vprusso.github.io" itemprop="url">
      <svg aria-hidden="true" class="octicon octicon-code" height="16" version="1.1" viewBox="0 0 14 16" width="14"><path fill-rule="evenodd" d="M9.5 3L8 4.5 11.5 8 8 11.5 9.5 13 14 8 9.5 3zm-5 0L0 8l4.5 5L6 11.5 2.5 8 6 4.5 4.5 3z"/></svg>
      <span itemprop="name">Code</span>
      <meta itemprop="position" content="1">
</a>  </span>

    <span itemscope itemtype="http://schema.org/ListItem" itemprop="itemListElement">
      <a href="/vprusso/vprusso.github.io/issues" class="js-selected-navigation-item reponav-item" data-hotkey="g i" data-selected-links="repo_issues repo_labels repo_milestones /vprusso/vprusso.github.io/issues" itemprop="url">
        <svg aria-hidden="true" class="octicon octicon-issue-opened" height="16" version="1.1" viewBox="0 0 14 16" width="14"><path fill-rule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"/></svg>
        <span itemprop="name">Issues</span>
        <span class="Counter">0</span>
        <meta itemprop="position" content="2">
</a>    </span>

  <span itemscope itemtype="http://schema.org/ListItem" itemprop="itemListElement">
    <a href="/vprusso/vprusso.github.io/pulls" class="js-selected-navigation-item reponav-item" data-hotkey="g p" data-selected-links="repo_pulls /vprusso/vprusso.github.io/pulls" itemprop="url">
      <svg aria-hidden="true" class="octicon octicon-git-pull-request" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path fill-rule="evenodd" d="M11 11.28V5c-.03-.78-.34-1.47-.94-2.06C9.46 2.35 8.78 2.03 8 2H7V0L4 3l3 3V4h1c.27.02.48.11.69.31.21.2.3.42.31.69v6.28A1.993 1.993 0 0 0 10 15a1.993 1.993 0 0 0 1-3.72zm-1 2.92c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zM4 3c0-1.11-.89-2-2-2a1.993 1.993 0 0 0-1 3.72v6.56A1.993 1.993 0 0 0 2 15a1.993 1.993 0 0 0 1-3.72V4.72c.59-.34 1-.98 1-1.72zm-.8 10c0 .66-.55 1.2-1.2 1.2-.65 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"/></svg>
      <span itemprop="name">Pull requests</span>
      <span class="Counter">0</span>
      <meta itemprop="position" content="3">
</a>  </span>

    <a href="/vprusso/vprusso.github.io/projects" class="js-selected-navigation-item reponav-item" data-selected-links="repo_projects new_repo_project repo_project /vprusso/vprusso.github.io/projects">
      <svg aria-hidden="true" class="octicon octicon-project" height="16" version="1.1" viewBox="0 0 15 16" width="15"><path fill-rule="evenodd" d="M10 12h3V2h-3v10zm-4-2h3V2H6v8zm-4 4h3V2H2v12zm-1 1h13V1H1v14zM14 0H1a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1z"/></svg>
      Projects
      <span class="Counter" >0</span>
</a>
    <a href="/vprusso/vprusso.github.io/wiki" class="js-selected-navigation-item reponav-item" data-hotkey="g w" data-selected-links="repo_wiki /vprusso/vprusso.github.io/wiki">
      <svg aria-hidden="true" class="octicon octicon-book" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M3 5h4v1H3V5zm0 3h4V7H3v1zm0 2h4V9H3v1zm11-5h-4v1h4V5zm0 2h-4v1h4V7zm0 2h-4v1h4V9zm2-6v9c0 .55-.45 1-1 1H9.5l-1 1-1-1H2c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1h5.5l1 1 1-1H15c.55 0 1 .45 1 1zm-8 .5L7.5 3H2v9h6V3.5zm7-.5H9.5l-.5.5V12h6V3z"/></svg>
      Wiki
</a>

  <a href="/vprusso/vprusso.github.io/pulse" class="js-selected-navigation-item reponav-item" data-selected-links="pulse /vprusso/vprusso.github.io/pulse">
    <svg aria-hidden="true" class="octicon octicon-pulse" height="16" version="1.1" viewBox="0 0 14 16" width="14"><path fill-rule="evenodd" d="M11.5 8L8.8 5.4 6.6 8.5 5.5 1.6 2.38 8H0v2h3.6l.9-1.8.9 5.4L9 8.5l1.6 1.5H14V8z"/></svg>
    Pulse
</a>
  <a href="/vprusso/vprusso.github.io/graphs" class="js-selected-navigation-item reponav-item" data-selected-links="repo_graphs repo_contributors /vprusso/vprusso.github.io/graphs">
    <svg aria-hidden="true" class="octicon octicon-graph" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M16 14v1H0V0h1v14h15zM5 13H3V8h2v5zm4 0H7V3h2v10zm4 0h-2V6h2v7z"/></svg>
    Graphs
</a>
    <a href="/vprusso/vprusso.github.io/settings" class="js-selected-navigation-item reponav-item" data-selected-links="repo_settings repo_branch_settings hooks integration_installations /vprusso/vprusso.github.io/settings">
      <svg aria-hidden="true" class="octicon octicon-gear" height="16" version="1.1" viewBox="0 0 14 16" width="14"><path fill-rule="evenodd" d="M14 8.77v-1.6l-1.94-.64-.45-1.09.88-1.84-1.13-1.13-1.81.91-1.09-.45-.69-1.92h-1.6l-.63 1.94-1.11.45-1.84-.88-1.13 1.13.91 1.81-.45 1.09L0 7.23v1.59l1.94.64.45 1.09-.88 1.84 1.13 1.13 1.81-.91 1.09.45.69 1.92h1.59l.63-1.94 1.11-.45 1.84.88 1.13-1.13-.92-1.81.47-1.09L14 8.75v.02zM7 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/></svg>
      Settings
</a>
</nav>

      </div>
    </div>

<div class="container new-discussion-timeline experiment-repo-nav">
  <div class="repository-content">

    
          

<a href="/vprusso/vprusso.github.io/blob/8ddc418dd0f172f8851b233433bd1860dbca9c9b/_posts/2017-04-15-tensor-flow-categorical-data.markdown" class="d-none js-permalink-shortcut" data-hotkey="y">Permalink</a>

<!-- blob contrib key: blob_contributors:v21:cb6b828445bbb6f06c0d0341215778d9 -->

<div class="file-navigation js-zeroclipboard-container">
  
<div class="select-menu branch-select-menu js-menu-container js-select-menu float-left">
  <button class=" btn btn-sm select-menu-button js-menu-target css-truncate" data-hotkey="w"
    
    type="button" aria-label="Switch branches or tags" tabindex="0" aria-haspopup="true">
      <i>Tree:</i>
      <span class="js-select-button css-truncate-target">8ddc418dd0</span>
  </button>

  <div class="select-menu-modal-holder js-menu-content js-navigation-container" data-pjax>

    <div class="select-menu-modal">
      <div class="select-menu-header">
        <svg aria-label="Close" class="octicon octicon-x js-menu-close" height="16" role="img" version="1.1" viewBox="0 0 12 16" width="12"><path fill-rule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48z"/></svg>
        <span class="select-menu-title">Switch branches/tags</span>
      </div>

      <div class="select-menu-filters">
        <div class="select-menu-text-filter">
          <input type="text" aria-label="Find or create a branch…" id="context-commitish-filter-field" class="form-control js-filterable-field js-navigation-enable" placeholder="Find or create a branch…">
        </div>
        <div class="select-menu-tabs">
          <ul>
            <li class="select-menu-tab">
              <a href="#" data-tab-filter="branches" data-filter-placeholder="Find or create a branch…" class="js-select-menu-tab" role="tab">Branches</a>
            </li>
            <li class="select-menu-tab">
              <a href="#" data-tab-filter="tags" data-filter-placeholder="Find a tag…" class="js-select-menu-tab" role="tab">Tags</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="select-menu-list select-menu-tab-bucket js-select-menu-tab-bucket" data-tab-filter="branches" role="menu">

        <div data-filterable-for="context-commitish-filter-field" data-filterable-type="substring">


            <a class="select-menu-item js-navigation-item js-navigation-open "
               href="/vprusso/vprusso.github.io/blob/master/_posts/2017-04-15-tensor-flow-categorical-data.markdown"
               data-name="master"
               data-skip-pjax="true"
               rel="nofollow">
              <svg aria-hidden="true" class="octicon octicon-check select-menu-item-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path fill-rule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5z"/></svg>
              <span class="select-menu-item-text css-truncate-target js-select-menu-filter-text">
                master
              </span>
            </a>
        </div>

          <!-- '"` --><!-- </textarea></xmp> --></option></form><form accept-charset="UTF-8" action="/vprusso/vprusso.github.io/branches" class="js-create-branch select-menu-item select-menu-new-item-form js-navigation-item js-new-item-form" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="o3zOMqHdo3mmhz+NM7wwvZMbnPETMaO7WgnQNS1IJ6L3lP6hFLOgTaBMkH4HVwS6bURYY32UNOr/OdsPkdGadA==" /></div>
          <svg aria-hidden="true" class="octicon octicon-git-branch select-menu-item-icon" height="16" version="1.1" viewBox="0 0 10 16" width="10"><path fill-rule="evenodd" d="M10 5c0-1.11-.89-2-2-2a1.993 1.993 0 0 0-1 3.72v.3c-.02.52-.23.98-.63 1.38-.4.4-.86.61-1.38.63-.83.02-1.48.16-2 .45V4.72a1.993 1.993 0 0 0-1-3.72C.88 1 0 1.89 0 3a2 2 0 0 0 1 1.72v6.56c-.59.35-1 .99-1 1.72 0 1.11.89 2 2 2 1.11 0 2-.89 2-2 0-.53-.2-1-.53-1.36.09-.06.48-.41.59-.47.25-.11.56-.17.94-.17 1.05-.05 1.95-.45 2.75-1.25S8.95 7.77 9 6.73h-.02C9.59 6.37 10 5.73 10 5zM2 1.8c.66 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2C1.35 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2zm0 12.41c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm6-8c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"/></svg>
            <div class="select-menu-item-text">
              <span class="select-menu-item-heading">Create branch: <span class="js-new-item-name"></span></span>
              <span class="description">from ‘8ddc418’</span>
            </div>
            <input type="hidden" name="name" id="name" class="js-new-item-value">
            <input type="hidden" name="branch" id="branch" value="8ddc418dd0f172f8851b233433bd1860dbca9c9b">
            <input type="hidden" name="path" id="path" value="_posts/2017-04-15-tensor-flow-categorical-data.markdown">
</form>
      </div>

      <div class="select-menu-list select-menu-tab-bucket js-select-menu-tab-bucket" data-tab-filter="tags">
        <div data-filterable-for="context-commitish-filter-field" data-filterable-type="substring">


        </div>

        <div class="select-menu-no-results">Nothing to show</div>
      </div>

    </div>
  </div>
</div>

  <div class="BtnGroup float-right">
    <a href="/vprusso/vprusso.github.io/find/8ddc418dd0f172f8851b233433bd1860dbca9c9b"
          class="js-pjax-capture-input btn btn-sm BtnGroup-item"
          data-pjax
          data-hotkey="t">
      Find file
    </a>
    <button aria-label="Copy file path to clipboard" class="js-zeroclipboard btn btn-sm BtnGroup-item tooltipped tooltipped-s" data-copied-hint="Copied!" type="button">Copy path</button>
  </div>
  <div class="breadcrumb js-zeroclipboard-target">
    <span class="repo-root js-repo-root"><span class="js-path-segment"><a href="/vprusso/vprusso.github.io/tree/8ddc418dd0f172f8851b233433bd1860dbca9c9b"><span>vprusso.github.io</span></a></span></span><span class="separator">/</span><span class="js-path-segment"><a href="/vprusso/vprusso.github.io/tree/8ddc418dd0f172f8851b233433bd1860dbca9c9b/_posts"><span>_posts</span></a></span><span class="separator">/</span><strong class="final-path">2017-04-15-tensor-flow-categorical-data.markdown</strong>
  </div>
</div>



  <div class="commit-tease">
      <span class="float-right">
        <a class="commit-tease-sha" href="/vprusso/vprusso.github.io/commit/8ddc418dd0f172f8851b233433bd1860dbca9c9b" data-pjax>
          8ddc418
        </a>
        <relative-time datetime="2017-04-20T18:02:45Z">Apr 20, 2017</relative-time>
      </span>
      <div>
        <img alt="@vprusso" class="avatar" height="20" src="https://avatars1.githubusercontent.com/u/1562214?v=3&amp;s=40" width="20" />
        <a href="/vprusso" class="user-mention" rel="author">vprusso</a>
          <a href="/vprusso/vprusso.github.io/commit/8ddc418dd0f172f8851b233433bd1860dbca9c9b" class="message" data-pjax="true" title="Adding tensorflow post">Adding tensorflow post</a>
      </div>

    <div class="commit-tease-contributors">
      <button type="button" class="btn-link muted-link contributors-toggle" data-facebox="#blob_contributors_box">
        <strong>1</strong>
         contributor
      </button>
      
    </div>

    <div id="blob_contributors_box" style="display:none">
      <h2 class="facebox-header" data-facebox-id="facebox-header">Users who have contributed to this file</h2>
      <ul class="facebox-user-list" data-facebox-id="facebox-description">
          <li class="facebox-user-list-item">
            <img alt="@vprusso" height="24" src="https://avatars3.githubusercontent.com/u/1562214?v=3&amp;s=48" width="24" />
            <a href="/vprusso">vprusso</a>
          </li>
      </ul>
    </div>
  </div>

<div class="file">
  <div class="file-header">
  <div class="file-actions">

    <div class="BtnGroup">
      <a href="/vprusso/vprusso.github.io/raw/8ddc418dd0f172f8851b233433bd1860dbca9c9b/_posts/2017-04-15-tensor-flow-categorical-data.markdown" class="btn btn-sm BtnGroup-item" id="raw-url">Raw</a>
        <a href="/vprusso/vprusso.github.io/blame/8ddc418dd0f172f8851b233433bd1860dbca9c9b/_posts/2017-04-15-tensor-flow-categorical-data.markdown" class="btn btn-sm js-update-url-with-hash BtnGroup-item" data-hotkey="b">Blame</a>
      <a href="/vprusso/vprusso.github.io/commits/8ddc418dd0f172f8851b233433bd1860dbca9c9b/_posts/2017-04-15-tensor-flow-categorical-data.markdown" class="btn btn-sm BtnGroup-item" rel="nofollow">History</a>
    </div>


        <button type="button" class="btn-octicon disabled tooltipped tooltipped-nw"
          aria-label="You must be on a branch to make or propose changes to this file">
          <svg aria-hidden="true" class="octicon octicon-pencil" height="16" version="1.1" viewBox="0 0 14 16" width="14"><path fill-rule="evenodd" d="M0 12v3h3l8-8-3-3-8 8zm3 2H1v-2h1v1h1v1zm10.3-9.3L12 6 9 3l1.3-1.3a.996.996 0 0 1 1.41 0l1.59 1.59c.39.39.39 1.02 0 1.41z"/></svg>
        </button>
        <button type="button" class="btn-octicon btn-octicon-danger disabled tooltipped tooltipped-nw"
          aria-label="You must be on a branch to make or propose changes to this file">
          <svg aria-hidden="true" class="octicon octicon-trashcan" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path fill-rule="evenodd" d="M11 2H9c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1H2c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1v9c0 .55.45 1 1 1h7c.55 0 1-.45 1-1V5c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 12H3V5h1v8h1V5h1v8h1V5h1v8h1V5h1v9zm1-10H2V3h9v1z"/></svg>
        </button>
  </div>

  <div class="file-info">
      496 lines (354 sloc)
      <span class="file-info-divider"></span>
    25.6 KB
  </div>
</div>

  
  <div id="readme" class="readme blob instapaper_body">
    <article class="markdown-body entry-content" itemprop="text"><table data-table-type="yaml-metadata">
  <thead>
  <tr>
  <th>layout</th>

  <th>comments</th>

  <th>title</th>

  <th>date</th>

  <th>categories</th>

  <th>excerpt</th>

  <th>tags</th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td><div>post</div></td>

  <td><div>true</div></td>

  <td><div>Using TensorFlow on Categorical Data</div></td>

  <td><div>2017-04-14 19:58:35 -0700</div></td>

  <td><div>tensorflow, machine learning, data science, neural networks</div></td>

  <td><div>We use TensorFlow to attempt to determine the edibility of a mushroom based on its physical traits that are encoded categorically.</div></td>

  <td><div><table>
  <tbody>
  <tr>
  <td><div>tensorflow</div></td>

  <td><div>machine learning</div></td>

  <td><div>data science</div></td>

  <td><div>neural networks</div></td>
  </tr>
  </tbody>
</table></div></td>
  </tr>
  </tbody>
</table>

<h3><a id="user-content-introduction" class="anchor" href="#introduction" aria-hidden="true"><svg aria-hidden="true" class="octicon octicon-link" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Introduction</h3>
<p>In this post, we will be using the UCI mushroom database as training data for us to determine if a given mushroom with specific attributes is either edible or poisonous. This data set serves as a nice example of one where the attributes are categorical, which is something you may run across yourself, and optimistically this article can serve as a guide post for how to deal with such situations. We will use TensorFlow to determine the edibility of a given mushroom, and the approach will follow in a very similar manner to <a href="https://www.tensorflow.org/get_started/tflearn">the excellent tutorial on the TensorFlow page where Iris flower data is considered</a> instead.</p>
<p>For anyone who has dipped their toes into machine learning, and specifically neural networks, two of the primary examples that come up as a typical "Hello World" application is the Iris classification and the hand-written digit classification. These are abundant examples with good reason, as they illustrate a useful and nontrivial property of neural networks. However, these examples tend to dominate the landscape of introductory neural network applications. The primary goal of this post then is to show a very similar type of example, but have a focus on data that is generally not used in the prototypical neural network introductions. One reason for this is that, at least for me, it was initially unclear what else neural networks could be applied to. Indeed, if you're inclined, the approach in this post is broadly applicable to just about any of the <a href="http://archive.ics.uci.edu/ml/datasets.html?format=&amp;task=cla&amp;att=&amp;area=&amp;numAtt=&amp;numIns=&amp;type=&amp;sort=nameUp&amp;view=table">"classification" data sets from the UCI machine learning repository</a>. If you want another example of using TensorFlow to construct a neural network on non-categorical data, I have <a href="http://vprusso.github.io/blog/2016/tensor-flow-neural-net-breast-cancer/">blog post that gives a quick example for how to classify breast cancer tumors</a>.</p>
<p>I encourage you to find an interesting dataset there and construct your own neural network. If you do so, please let me know!</p>
<h3><a id="user-content-overview" class="anchor" href="#overview" aria-hidden="true"><svg aria-hidden="true" class="octicon octicon-link" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Overview</h3>
<p>In a similar manner to the <a href="https://www.tensorflow.org/get_started/tflearn">TensorFlow tutorial</a>, we will be breaking this task down into the following bites:</p>
<ol>
<li>
<p><a href="#download-and-clean-the-mushroom-data-from-the-uci-repository">Download and Clean the Mushroom Data from the UCI Repository</a>.</p>
</li>
<li>
<p><a href="#load-mushroom-csv-data-into-tensorflow">Load Mushroom CSV Data into TensorFlow</a>.</p>
</li>
<li>
<p><a href="#use-tensorflow-to-construct-a-neural-network-classifier">Use TensorFlow to Construct a Neural Network Classifier</a>.</p>
</li>
<li>
<p><a href="#use-the-uci-data-to-train-the-neural-network">Use the UCI Data to Train the Neural Network</a>.</p>
</li>
<li>
<p><a href="#determine-the-accuracy-of-our-neural-network-model">Determine the Accuracy of our Neural Network Model</a>.</p>
</li>
<li>
<p><a href="#test-the-neural-network-on-a-sample-not-seen">Test the Neural Network on a Sample Not Seen</a>.</p>
</li>
</ol>
<p>The TensorFlow library is an evolving one, and as a result, some of the functions called in this post may be deprecated at some point in the future. I will do my best to update the code in this post as the updates come out. If you encounter any problems or errors, please feel free to contact me.</p>
<p>I'm also going to assume that you have a machine with TensorFlow on it. For more information on that, you can consult the <a href="https://www.tensorflow.org/install/">documentation on how to install TensorFlow</a> for your particular setup.</p>
<h3><a id="user-content-complete-source-code-listing" class="anchor" href="#complete-source-code-listing" aria-hidden="true"><svg aria-hidden="true" class="octicon octicon-link" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Complete Source Code Listing</h3>
<p>If you simply want some code to grab and try it out for yourself, I'll provide the complete listing below. You can just clone my repository to obtain all of the code and supplementary data files required. If you'd like a bit more explanation as to what is happening, the rest of the post will elaborate on that in greater detail.</p>
<p><strong>Git repository link</strong>: <a href="https://github.com/vprusso/tf_mushroom"></a><a href="https://github.com/vprusso/tf_mushroom">https://github.com/vprusso/tf_mushroom</a></p>
<div class="highlight highlight-source-python"><pre><span class="pl-k">from</span> <span class="pl-c1">__future__</span> <span class="pl-k">import</span> absolute_import
<span class="pl-k">from</span> <span class="pl-c1">__future__</span> <span class="pl-k">import</span> division
<span class="pl-k">from</span> <span class="pl-c1">__future__</span> <span class="pl-k">import</span> print_function

<span class="pl-k">import</span> tensorflow <span class="pl-k">as</span> tf
<span class="pl-k">import</span> numpy <span class="pl-k">as</span> np
<span class="pl-k">import</span> pandas <span class="pl-k">as</span> pd
<span class="pl-k">from</span> sklearn.model_selection <span class="pl-k">import</span> train_test_split

<span class="pl-k">import</span> os


<span class="pl-k">def</span> <span class="pl-en">prepare_data</span>(<span class="pl-smi">data_file_name</span>):
    <span class="pl-s"><span class="pl-pds">"""</span></span>
<span class="pl-s">    Responsible for cleaning the data file provided from the UCI machine</span>
<span class="pl-s">    learning repository here: http://archive.ics.uci.edu/ml/datasets/Mushroom.</span>
<span class="pl-s">    The function then produces two CSV files appropriately formatted to be</span>
<span class="pl-s">    used in TensorFlow where the CSV files split with respect to</span>
<span class="pl-s">    training and testing data.</span>
<span class="pl-s">    <span class="pl-pds">"""</span></span>

    <span class="pl-c"><span class="pl-c">#</span> The header is formed from the 'agaricus-lepiota.name' file found on</span>
    <span class="pl-c"><span class="pl-c">#</span> http://archive.ics.uci.edu/ml/datasets/Mushroom</span>
    header <span class="pl-k">=</span> [<span class="pl-s"><span class="pl-pds">'</span>class<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>cap_shape<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>cap_surface<span class="pl-pds">'</span></span>,
              <span class="pl-s"><span class="pl-pds">'</span>cap_color<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>bruises<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>odor<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>gill_attachment<span class="pl-pds">'</span></span>,
              <span class="pl-s"><span class="pl-pds">'</span>gill_spacing<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>gill_size<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>gill_color<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>stalk_shape<span class="pl-pds">'</span></span>,
              <span class="pl-s"><span class="pl-pds">'</span>stalk_root<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>stalk_surface_above_ring<span class="pl-pds">'</span></span>,
              <span class="pl-s"><span class="pl-pds">'</span>stalk_surface_below_ring<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>stalk_color_above_ring<span class="pl-pds">'</span></span>,
              <span class="pl-s"><span class="pl-pds">'</span>stalk_color_below_ring<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>veil_type<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>veil_color<span class="pl-pds">'</span></span>,
              <span class="pl-s"><span class="pl-pds">'</span>ring_number<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>ring_type<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>spore_print_color<span class="pl-pds">'</span></span>,
              <span class="pl-s"><span class="pl-pds">'</span>population<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>habitat<span class="pl-pds">'</span></span>]
    df <span class="pl-k">=</span> pd.read_csv(data_file_name, <span class="pl-v">sep</span><span class="pl-k">=</span><span class="pl-s"><span class="pl-pds">'</span>,<span class="pl-pds">'</span></span>, <span class="pl-v">names</span><span class="pl-k">=</span>header)

    <span class="pl-c"><span class="pl-c">#</span> Entries with a '?' indicate a missing piece of data, and</span>
    <span class="pl-c"><span class="pl-c">#</span> these entries are dropped from our dataset.</span>
    df.replace(<span class="pl-s"><span class="pl-pds">'</span>?<span class="pl-pds">'</span></span>, np.nan, <span class="pl-v">inplace</span><span class="pl-k">=</span><span class="pl-c1">True</span>)
    df.dropna(<span class="pl-v">inplace</span><span class="pl-k">=</span><span class="pl-c1">True</span>)

    <span class="pl-c"><span class="pl-c">#</span> The class of poisonous or edible is indicated in the data as</span>
    <span class="pl-c"><span class="pl-c">#</span> either 'p' or 'e' respectively. We require that this is numeric,</span>
    <span class="pl-c"><span class="pl-c">#</span> and therefore use '0' to indicate poisonous (or not edible) and</span>
    <span class="pl-c"><span class="pl-c">#</span> '1' to indicate edible.</span>
    df[<span class="pl-s"><span class="pl-pds">'</span>class<span class="pl-pds">'</span></span>].replace(<span class="pl-s"><span class="pl-pds">'</span>p<span class="pl-pds">'</span></span>, <span class="pl-c1">0</span>, <span class="pl-v">inplace</span><span class="pl-k">=</span><span class="pl-c1">True</span>)
    df[<span class="pl-s"><span class="pl-pds">'</span>class<span class="pl-pds">'</span></span>].replace(<span class="pl-s"><span class="pl-pds">'</span>e<span class="pl-pds">'</span></span>, <span class="pl-c1">1</span>, <span class="pl-v">inplace</span><span class="pl-k">=</span><span class="pl-c1">True</span>)

    <span class="pl-c"><span class="pl-c">#</span> Since we are dealing with non-numeric feature data, or in other</span>
    <span class="pl-c"><span class="pl-c">#</span> words, categorical data, we need to replace these with numerical</span>
    <span class="pl-c"><span class="pl-c">#</span> equivalents. Pandas has a nice function called "get_dummies" that</span>
    <span class="pl-c"><span class="pl-c">#</span> performs this task.</span>
    cols_to_transform <span class="pl-k">=</span> header[<span class="pl-c1">1</span>:]
    df <span class="pl-k">=</span> pd.get_dummies(df, <span class="pl-v">columns</span><span class="pl-k">=</span>cols_to_transform)

    <span class="pl-c"><span class="pl-c">#</span> We can now split the data into two separate data frames,</span>
    <span class="pl-c"><span class="pl-c">#</span> one for training, which will constitute the bulk of the</span>
    <span class="pl-c"><span class="pl-c">#</span> data, and one for testing.</span>
    df_train, df_test <span class="pl-k">=</span> train_test_split(df, <span class="pl-v">test_size</span><span class="pl-k">=</span><span class="pl-c1">0.1</span>)

    <span class="pl-c"><span class="pl-c">#</span> Determine the number of rows and columns in each of the</span>
    <span class="pl-c"><span class="pl-c">#</span> data frames.</span>
    num_train_entries <span class="pl-k">=</span> df_train.shape[<span class="pl-c1">0</span>]
    num_train_features <span class="pl-k">=</span> df_train.shape[<span class="pl-c1">1</span>] <span class="pl-k">-</span> <span class="pl-c1">1</span>

    num_test_entries <span class="pl-k">=</span> df_test.shape[<span class="pl-c1">0</span>]
    num_test_features <span class="pl-k">=</span> df_test.shape[<span class="pl-c1">1</span>] <span class="pl-k">-</span> <span class="pl-c1">1</span>

    <span class="pl-c"><span class="pl-c">#</span> The data frames are written as a temporary CSV file, as we still</span>
    <span class="pl-c"><span class="pl-c">#</span> need to modify the header row to include the number of rows and</span>
    <span class="pl-c"><span class="pl-c">#</span> columns present in the training and testing CSV files.</span>
    df_train.to_csv(<span class="pl-s"><span class="pl-pds">'</span>train_temp.csv<span class="pl-pds">'</span></span>, <span class="pl-v">index</span><span class="pl-k">=</span><span class="pl-c1">False</span>)
    df_test.to_csv(<span class="pl-s"><span class="pl-pds">'</span>test_temp.csv<span class="pl-pds">'</span></span>, <span class="pl-v">index</span><span class="pl-k">=</span><span class="pl-c1">False</span>)

    <span class="pl-c"><span class="pl-c">#</span> Append onto the header row the information about how many</span>
    <span class="pl-c"><span class="pl-c">#</span> columns and rows are in each file as TensorFlow requires.</span>
    <span class="pl-c1">open</span>(<span class="pl-s"><span class="pl-pds">"</span>mushroom_train.csv<span class="pl-pds">"</span></span>, <span class="pl-s"><span class="pl-pds">"</span>w<span class="pl-pds">"</span></span>).write(<span class="pl-c1">str</span>(num_train_entries) <span class="pl-k">+</span>
                                          <span class="pl-s"><span class="pl-pds">"</span>,<span class="pl-pds">"</span></span> <span class="pl-k">+</span> <span class="pl-c1">str</span>(num_train_features) <span class="pl-k">+</span>
                                          <span class="pl-s"><span class="pl-pds">"</span>,<span class="pl-pds">"</span></span> <span class="pl-k">+</span> <span class="pl-c1">open</span>(<span class="pl-s"><span class="pl-pds">"</span>train_temp.csv<span class="pl-pds">"</span></span>).read())

    <span class="pl-c1">open</span>(<span class="pl-s"><span class="pl-pds">"</span>mushroom_test.csv<span class="pl-pds">"</span></span>, <span class="pl-s"><span class="pl-pds">"</span>w<span class="pl-pds">"</span></span>).write(<span class="pl-c1">str</span>(num_test_entries) <span class="pl-k">+</span>
                                         <span class="pl-s"><span class="pl-pds">"</span>,<span class="pl-pds">"</span></span> <span class="pl-k">+</span> <span class="pl-c1">str</span>(num_test_features) <span class="pl-k">+</span>
                                         <span class="pl-s"><span class="pl-pds">"</span>,<span class="pl-pds">"</span></span> <span class="pl-k">+</span> <span class="pl-c1">open</span>(<span class="pl-s"><span class="pl-pds">"</span>test_temp.csv<span class="pl-pds">"</span></span>).read())

    <span class="pl-c"><span class="pl-c">#</span> Finally, remove the temporary CSV files that were generated above.</span>
    os.remove(<span class="pl-s"><span class="pl-pds">"</span>train_temp.csv<span class="pl-pds">"</span></span>)
    os.remove(<span class="pl-s"><span class="pl-pds">"</span>test_temp.csv<span class="pl-pds">"</span></span>)


<span class="pl-c"><span class="pl-c">#</span> Define the test inputs</span>
<span class="pl-k">def</span> <span class="pl-en">get_test_inputs</span>():
    x <span class="pl-k">=</span> tf.constant(test_set.data)
    y <span class="pl-k">=</span> tf.constant(test_set.target)

    <span class="pl-k">return</span> x, y


<span class="pl-c"><span class="pl-c">#</span> Define the training inputs</span>
<span class="pl-k">def</span> <span class="pl-en">get_train_inputs</span>():
    x <span class="pl-k">=</span> tf.constant(training_set.data)
    y <span class="pl-k">=</span> tf.constant(training_set.target)

    <span class="pl-k">return</span> x, y


<span class="pl-c"><span class="pl-c">#</span> Classify two new mushroom samples. (expect output: [0,1]),</span>
<span class="pl-c"><span class="pl-c">#</span> i.e. poisonous, edible.</span>
<span class="pl-k">def</span> <span class="pl-en">new_samples</span>():
    <span class="pl-k">return</span> np.array([[<span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>,
                      <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>,
                      <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>,
                      <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>,
                      <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>,
                      <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>,
                      <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>,
                      <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>],
                     [<span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>,
                      <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>,
                      <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>,
                      <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>,
                      <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>,
                      <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>,
                      <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>,
                      <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>]], <span class="pl-v">dtype</span><span class="pl-k">=</span>np.int)


<span class="pl-k">if</span> <span class="pl-c1">__name__</span> <span class="pl-k">==</span> <span class="pl-s"><span class="pl-pds">"</span>__main__<span class="pl-pds">"</span></span>:

    <span class="pl-c1">MUSHROOM_DATA_FILE</span> <span class="pl-k">=</span> <span class="pl-s"><span class="pl-pds">"</span>agaricus-lepiota.data<span class="pl-pds">"</span></span>

    <span class="pl-c"><span class="pl-c">#</span> Prepare the mushroom data for TensorFlow by</span>
    <span class="pl-c"><span class="pl-c">#</span> creating two train / test CSV files.</span>
    prepare_data(<span class="pl-c1">MUSHROOM_DATA_FILE</span>)

    <span class="pl-c"><span class="pl-c">#</span> Load datasets.</span>
    training_set <span class="pl-k">=</span> tf.contrib.learn.datasets.base.load_csv_with_header(
        <span class="pl-v">filename</span><span class="pl-k">=</span><span class="pl-s"><span class="pl-pds">'</span>mushroom_train.csv<span class="pl-pds">'</span></span>,
        <span class="pl-v">target_dtype</span><span class="pl-k">=</span>np.int,
        <span class="pl-v">features_dtype</span><span class="pl-k">=</span>np.int,
        <span class="pl-v">target_column</span><span class="pl-k">=</span><span class="pl-c1">0</span>)

    test_set <span class="pl-k">=</span> tf.contrib.learn.datasets.base.load_csv_with_header(
        <span class="pl-v">filename</span><span class="pl-k">=</span><span class="pl-s"><span class="pl-pds">'</span>mushroom_test.csv<span class="pl-pds">'</span></span>,
        <span class="pl-v">target_dtype</span><span class="pl-k">=</span>np.int,
        <span class="pl-v">features_dtype</span><span class="pl-k">=</span>np.int,
        <span class="pl-v">target_column</span><span class="pl-k">=</span><span class="pl-c1">0</span>)

    <span class="pl-c"><span class="pl-c">#</span> Specify that all features have real-value data</span>
    feature_columns <span class="pl-k">=</span> [tf.contrib.layers.real_valued_column(<span class="pl-s"><span class="pl-pds">"</span><span class="pl-pds">"</span></span>, <span class="pl-v">dimension</span><span class="pl-k">=</span><span class="pl-c1">98</span>)]

    <span class="pl-c"><span class="pl-c">#</span> Build 3 layer DNN with 10, 20, 10 units respectively.</span>
    classifier <span class="pl-k">=</span> tf.contrib.learn.DNNClassifier(
        <span class="pl-v">feature_columns</span><span class="pl-k">=</span>feature_columns,
        <span class="pl-v">hidden_units</span><span class="pl-k">=</span>[<span class="pl-c1">10</span>, <span class="pl-c1">20</span>, <span class="pl-c1">10</span>],
        <span class="pl-v">n_classes</span><span class="pl-k">=</span><span class="pl-c1">2</span>,
        <span class="pl-v">model_dir</span><span class="pl-k">=</span><span class="pl-s"><span class="pl-pds">"</span>/tmp/mushroom_model<span class="pl-pds">"</span></span>)

    <span class="pl-c"><span class="pl-c">#</span> Fit model.</span>
    classifier.fit(<span class="pl-v">input_fn</span><span class="pl-k">=</span>get_train_inputs, <span class="pl-v">steps</span><span class="pl-k">=</span><span class="pl-c1">2000</span>)

    <span class="pl-c"><span class="pl-c">#</span> Evaluate accuracy.</span>
    accuracy_score <span class="pl-k">=</span> classifier.evaluate(<span class="pl-v">input_fn</span><span class="pl-k">=</span>get_test_inputs,
                                         <span class="pl-v">steps</span><span class="pl-k">=</span><span class="pl-c1">1</span>)[<span class="pl-s"><span class="pl-pds">"</span>accuracy<span class="pl-pds">"</span></span>]

    <span class="pl-c1">print</span>(<span class="pl-s"><span class="pl-pds">"</span><span class="pl-cce">\n</span>Test Accuracy: <span class="pl-c1">{0<span class="pl-c1">:f</span>}</span><span class="pl-cce">\n</span><span class="pl-pds">"</span></span>.format(accuracy_score))

    <span class="pl-c"><span class="pl-c">#</span> Test on two mushroom samples.</span>
    predictions <span class="pl-k">=</span> <span class="pl-c1">list</span>(classifier.predict(<span class="pl-v">input_fn</span><span class="pl-k">=</span>new_samples))

    <span class="pl-c1">print</span>(<span class="pl-s"><span class="pl-pds">"</span>New Samples, Class Predictions:    <span class="pl-c1">{}</span><span class="pl-cce">\n</span><span class="pl-pds">"</span></span>
          .format(predictions))
</pre></div>
<h3><a id="user-content-download-and-clean-the-mushroom-data-from-the-uci-repository" class="anchor" href="#download-and-clean-the-mushroom-data-from-the-uci-repository" aria-hidden="true"><svg aria-hidden="true" class="octicon octicon-link" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Download and Clean the Mushroom Data from the UCI Repository</h3>
<p>We will be obtaining our data from the <a href="http://archive.ics.uci.edu/ml/machine-learning-databases/mushroom/">UCI machine learning mushroom data set page</a>. On this page, there are two primary files that we will be making using of, <code>agaricus-lepiota.data</code> and <code>agaricus-lepiota.names</code>. The <code>agaricus-lepiota.data</code> file is a comma separated file with 8124 rows and 22 columns. Each row corresponds to a mushroom, and each of the 22 columns correspond to respective attributes of each mushroom. Each entry consists of a single character, where the character legend is found in the <code>agaricus-lepiota.names</code> file. This tells us precisely what each of these letters in a given column means for the particular mushroom we are considering.</p>
<p>The UCI mushroom data is almost ready to go directly from the UCI link, but we're going to tweak a couple things. Before proceeding, we'll require the following imports.</p>
<div class="highlight highlight-source-python"><pre><span class="pl-k">from</span> <span class="pl-c1">__future__</span> <span class="pl-k">import</span> absolute_import
<span class="pl-k">from</span> <span class="pl-c1">__future__</span> <span class="pl-k">import</span> division
<span class="pl-k">from</span> <span class="pl-c1">__future__</span> <span class="pl-k">import</span> print_function

<span class="pl-k">import</span> tensorflow <span class="pl-k">as</span> tf
<span class="pl-k">import</span> numpy <span class="pl-k">as</span> np
<span class="pl-k">import</span> pandas <span class="pl-k">as</span> pd
<span class="pl-k">from</span> sklearn.model_selection <span class="pl-k">import</span> train_test_split

<span class="pl-k">import</span> os</pre></div>
<p>The first thing we're going to do is add a header row so that TensorFlow knows what each column in our data file corresponds to. The header row will be a comma separated row that we will place in the first row of the file, where each of the columns in this row will correspond to the attributes listed in the <code>agaricus-lepiota.names</code> file.</p>
<div class="highlight highlight-source-python"><pre><span class="pl-c"><span class="pl-c">#</span> The header is formed from the 'agaricus-lepiota.name' file found on</span>
<span class="pl-c"><span class="pl-c">#</span> http://archive.ics.uci.edu/ml/datasets/Mushroom</span>
header <span class="pl-k">=</span> [<span class="pl-s"><span class="pl-pds">'</span>class<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>cap_shape<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>cap_surface<span class="pl-pds">'</span></span>,
          <span class="pl-s"><span class="pl-pds">'</span>cap_color<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>bruises<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>odor<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>gill_attachment<span class="pl-pds">'</span></span>,
          <span class="pl-s"><span class="pl-pds">'</span>gill_spacing<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>gill_size<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>gill_color<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>stalk_shape<span class="pl-pds">'</span></span>,
          <span class="pl-s"><span class="pl-pds">'</span>stalk_root<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>stalk_surface_above_ring<span class="pl-pds">'</span></span>,
          <span class="pl-s"><span class="pl-pds">'</span>stalk_surface_below_ring<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>stalk_color_above_ring<span class="pl-pds">'</span></span>,
          <span class="pl-s"><span class="pl-pds">'</span>stalk_color_below_ring<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>veil_type<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>veil_color<span class="pl-pds">'</span></span>,
          <span class="pl-s"><span class="pl-pds">'</span>ring_number<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>ring_type<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>spore_print_color<span class="pl-pds">'</span></span>,
          <span class="pl-s"><span class="pl-pds">'</span>population<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>habitat<span class="pl-pds">'</span></span>]
df <span class="pl-k">=</span> pd.read_csv(data_file_name, <span class="pl-v">sep</span><span class="pl-k">=</span><span class="pl-s"><span class="pl-pds">'</span>,<span class="pl-pds">'</span></span>, <span class="pl-v">names</span><span class="pl-k">=</span>header)</pre></div>
<p>Second, we are now going to eliminate any row with a "?" entry in the column. It is arguably a bit overkill to just eliminate these rows entirely, as most times the rest of the columns are populated with non-"?" entries. There are many techniques for dealing with such data points in a machine learning context, but for the purposes of brevity, we'll be doing the relatively unsophisticated approach of just removing the rows with offending "?" entries.</p>
<div class="highlight highlight-source-python"><pre><span class="pl-c"><span class="pl-c">#</span> Entries with a '?' indicate a missing piece of data, and</span>
<span class="pl-c"><span class="pl-c">#</span> these entries are dropped from our dataset.</span>
df.replace(<span class="pl-s"><span class="pl-pds">'</span>?<span class="pl-pds">'</span></span>, np.nan, <span class="pl-v">inplace</span><span class="pl-k">=</span><span class="pl-c1">True</span>)
df.dropna(<span class="pl-v">inplace</span><span class="pl-k">=</span><span class="pl-c1">True</span>)</pre></div>
<p>Third, we're going to replace the "p" or "e" in the class column of the data frame, where "p" denotes a poisonous mushroom and "e" denotes an edible one. For our purposes, it will be much more straight forward to replace the "p" and "e" with "0" and "1" respectively.</p>
<div class="highlight highlight-source-python"><pre><span class="pl-c"><span class="pl-c">#</span> The class of poisonous or edible is indicated in the data as</span>
<span class="pl-c"><span class="pl-c">#</span> either 'p' or 'e' respectively. We require that this is numeric,</span>
<span class="pl-c"><span class="pl-c">#</span> and therefore use '0' to indicate poisonous (or not edible) and</span>
<span class="pl-c"><span class="pl-c">#</span> '1' to indicate edible.</span>
df[<span class="pl-s"><span class="pl-pds">'</span>class<span class="pl-pds">'</span></span>].replace(<span class="pl-s"><span class="pl-pds">'</span>p<span class="pl-pds">'</span></span>, <span class="pl-c1">0</span>, <span class="pl-v">inplace</span><span class="pl-k">=</span><span class="pl-c1">True</span>)
df[<span class="pl-s"><span class="pl-pds">'</span>class<span class="pl-pds">'</span></span>].replace(<span class="pl-s"><span class="pl-pds">'</span>e<span class="pl-pds">'</span></span>, <span class="pl-c1">1</span>, <span class="pl-v">inplace</span><span class="pl-k">=</span><span class="pl-c1">True</span>)</pre></div>
<p>Fourth, we are going to convert the categorical attributes of the mushroom dataset to numerical information that TensorFlow can use. In order to do this, we will be using the <code>get_dummies</code> function provided by the <code>pandas</code> library for precisely this purpose. For more information on how this function is used in machine learning for categorical feature data, you can refer to <a href="http://fastml.com/converting-categorical-data-into-numbers-with-pandas-and-scikit-learn/">the excellent blog post at fastml</a>.</p>
<div class="highlight highlight-source-python"><pre><span class="pl-c"><span class="pl-c">#</span> Since we are dealing with non-numeric feature data, or in other</span>
<span class="pl-c"><span class="pl-c">#</span> words, categorical data, we need to replace these with numerical</span>
<span class="pl-c"><span class="pl-c">#</span> equivalents. Pandas has a nice function called "get_dummies" that</span>
<span class="pl-c"><span class="pl-c">#</span> performs this task.</span>
cols_to_transform <span class="pl-k">=</span> header[<span class="pl-c1">1</span>:]
df <span class="pl-k">=</span> pd.get_dummies(df, <span class="pl-v">columns</span><span class="pl-k">=</span>cols_to_transform)</pre></div>
<p>Fifth, we're going to split the mushroom data into two different files: one for training and the other for testing. The training data will constitute the bulk of the mushroom data, and for the purposes of creating the testing data, I'll remove 10 random entries from our training data and place those in the testing data set.</p>
<div class="highlight highlight-source-python"><pre><span class="pl-c"><span class="pl-c">#</span> We can now split the data into two separate data frames,</span>
<span class="pl-c"><span class="pl-c">#</span> one for training, which will constitute the bulk of the</span>
<span class="pl-c"><span class="pl-c">#</span> data, and one for testing.</span>
df_train, df_test <span class="pl-k">=</span> train_test_split(df, <span class="pl-v">test_size</span><span class="pl-k">=</span><span class="pl-c1">0.1</span>)</pre></div>
<p>Finally, TensorFlow requires that we add two pieces of information to our CSV files that are not currently there. The data that we need to add is the number of rows and columns present in each of the training and testing CSV files. We first extract that information from our data frames created above, and then we modify the header in each file to reflect this information.</p>
<div class="highlight highlight-source-python"><pre><span class="pl-c"><span class="pl-c">#</span> Determine the number of rows and columns in each of the</span>
<span class="pl-c"><span class="pl-c">#</span> data frames.</span>
num_train_entries <span class="pl-k">=</span> df_train.shape[<span class="pl-c1">0</span>]
num_train_features <span class="pl-k">=</span> df_train.shape[<span class="pl-c1">1</span>] <span class="pl-k">-</span> <span class="pl-c1">1</span>

num_test_entries <span class="pl-k">=</span> df_test.shape[<span class="pl-c1">0</span>]
num_test_features <span class="pl-k">=</span> df_test.shape[<span class="pl-c1">1</span>] <span class="pl-k">-</span> <span class="pl-c1">1</span>

<span class="pl-c"><span class="pl-c">#</span> The data frames are written as a temporary CSV file, as we still</span>
<span class="pl-c"><span class="pl-c">#</span> need to modify the header row to include the number of rows and</span>
<span class="pl-c"><span class="pl-c">#</span> columns present in the training and testing CSV files.</span>
df_train.to_csv(<span class="pl-s"><span class="pl-pds">'</span>train_temp.csv<span class="pl-pds">'</span></span>, <span class="pl-v">index</span><span class="pl-k">=</span><span class="pl-c1">False</span>)
df_test.to_csv(<span class="pl-s"><span class="pl-pds">'</span>test_temp.csv<span class="pl-pds">'</span></span>, <span class="pl-v">index</span><span class="pl-k">=</span><span class="pl-c1">False</span>)

<span class="pl-c"><span class="pl-c">#</span> Append onto the header row the information about how many</span>
<span class="pl-c"><span class="pl-c">#</span> columns and rows are in each file as TensorFlow requires.</span>
<span class="pl-c1">open</span>(<span class="pl-s"><span class="pl-pds">"</span>mushroom_train.csv<span class="pl-pds">"</span></span>, <span class="pl-s"><span class="pl-pds">"</span>w<span class="pl-pds">"</span></span>).write(<span class="pl-c1">str</span>(num_train_entries) <span class="pl-k">+</span>
                                      <span class="pl-s"><span class="pl-pds">"</span>,<span class="pl-pds">"</span></span> <span class="pl-k">+</span> <span class="pl-c1">str</span>(num_train_features) <span class="pl-k">+</span>
                                      <span class="pl-s"><span class="pl-pds">"</span>,<span class="pl-pds">"</span></span> <span class="pl-k">+</span> <span class="pl-c1">open</span>(<span class="pl-s"><span class="pl-pds">"</span>train_temp.csv<span class="pl-pds">"</span></span>).read())

<span class="pl-c1">open</span>(<span class="pl-s"><span class="pl-pds">"</span>mushroom_test.csv<span class="pl-pds">"</span></span>, <span class="pl-s"><span class="pl-pds">"</span>w<span class="pl-pds">"</span></span>).write(<span class="pl-c1">str</span>(num_test_entries) <span class="pl-k">+</span>
                                     <span class="pl-s"><span class="pl-pds">"</span>,<span class="pl-pds">"</span></span> <span class="pl-k">+</span> <span class="pl-c1">str</span>(num_test_features) <span class="pl-k">+</span>
                                     <span class="pl-s"><span class="pl-pds">"</span>,<span class="pl-pds">"</span></span> <span class="pl-k">+</span> <span class="pl-c1">open</span>(<span class="pl-s"><span class="pl-pds">"</span>test_temp.csv<span class="pl-pds">"</span></span>).read())</pre></div>
<p>I've gone ahead and set each of the training and testing files up for download here:</p>
<ul>
<li><strong>A training set of mushroom data</strong> (<a href="http://vprusso.github.io/csv/mushroom_train.csv">mushroom_train.csv</a>).</li>
<li><strong>A test set of mushroom data</strong> (<a href="http://vprusso.github.io/csv/mushroom_test.csv">mushroom_test.csv</a>).</li>
</ul>
<h3><a id="user-content-load-mushroom-csv-data-into-tensorflow" class="anchor" href="#load-mushroom-csv-data-into-tensorflow" aria-hidden="true"><svg aria-hidden="true" class="octicon octicon-link" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Load Mushroom CSV Data into TensorFlow</h3>
<p>Now that we've appropriately created the CSV files above, we can now load the CSV files into TensorFlow. To do so, we shall make use the <code>load_csv_with_header()</code> function provided from TensorFlow.</p>
<div class="highlight highlight-source-python"><pre><span class="pl-c"><span class="pl-c">#</span> Load datasets.</span>
training_set <span class="pl-k">=</span> tf.contrib.learn.datasets.base.load_csv_with_header(
    <span class="pl-v">filename</span><span class="pl-k">=</span><span class="pl-s"><span class="pl-pds">'</span>mushroom_train.csv<span class="pl-pds">'</span></span>,
    <span class="pl-v">target_dtype</span><span class="pl-k">=</span>np.int,
    <span class="pl-v">features_dtype</span><span class="pl-k">=</span>np.int,
    <span class="pl-v">target_column</span><span class="pl-k">=</span><span class="pl-c1">0</span>)

test_set <span class="pl-k">=</span> tf.contrib.learn.datasets.base.load_csv_with_header(
    <span class="pl-v">filename</span><span class="pl-k">=</span><span class="pl-s"><span class="pl-pds">'</span>mushroom_test.csv<span class="pl-pds">'</span></span>,
    <span class="pl-v">target_dtype</span><span class="pl-k">=</span>np.int,
    <span class="pl-v">features_dtype</span><span class="pl-k">=</span>np.int,
    <span class="pl-v">target_column</span><span class="pl-k">=</span><span class="pl-c1">0</span>)</pre></div>
<p>We use this function to construct both the training and testing sets. The <code>load_csv_with_header()</code> function takes a filename, which corresponds to the respective CSV files we constructed in the previous section. It also takes an argument <code>target_dtype</code> that tells TensorFlow what numeric type it is trying to predict. In our case, it's trying to determine whether the mushroom is poisonous or edible. We encoded that information as either "0" or "1", so the target type is an integer. The <code>features_dtype</code> is similar, only now we're telling TensorFlow what the type of the features are.</p>
<p>Initially, the features were categorical, but recall we made use of the <code>get_dummies()</code> function to convert the categorical data into numerical data. If you take a peek at either the <code>mushroom_train.csv</code> file or the <code>mushroom_test.csv</code> file, you'll notice the features are composed of "0"s and "1"s. So again, the data type for our features are integer. Finally, the <code>target_column</code> tells TensorFlow what column in our file corresponds to the thing it is trying to predict. In our case, this is the first column, the one that corresponds to the <code>class</code> heading. Again, this <code>class</code> column is the one that consists of the information in terms of "0" or "1" whether the mushroom is poisonous or edible.</p>
<h3><a id="user-content-use-tensorflow-to-construct-a-neural-network-classifier" class="anchor" href="#use-tensorflow-to-construct-a-neural-network-classifier" aria-hidden="true"><svg aria-hidden="true" class="octicon octicon-link" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Use TensorFlow to Construct a Neural Network Classifier</h3>
<p>We are now going to create a classifier using TensorFlow based on our data set.</p>
<div class="highlight highlight-source-python"><pre><span class="pl-c"><span class="pl-c">#</span> Specify that all features have real-value data</span>
feature_columns <span class="pl-k">=</span> [tf.contrib.layers.real_valued_column(<span class="pl-s"><span class="pl-pds">"</span><span class="pl-pds">"</span></span>, <span class="pl-v">dimension</span><span class="pl-k">=</span><span class="pl-c1">98</span>)]

<span class="pl-c"><span class="pl-c">#</span> Build 3 layer DNN with 10, 20, 10 units respectively.</span>
classifier <span class="pl-k">=</span> tf.contrib.learn.DNNClassifier(
    <span class="pl-v">feature_columns</span><span class="pl-k">=</span>feature_columns,
    <span class="pl-v">hidden_units</span><span class="pl-k">=</span>[<span class="pl-c1">10</span>, <span class="pl-c1">20</span>, <span class="pl-c1">10</span>],
    <span class="pl-v">n_classes</span><span class="pl-k">=</span><span class="pl-c1">2</span>,
    <span class="pl-v">model_dir</span><span class="pl-k">=</span><span class="pl-s"><span class="pl-pds">"</span>/tmp/mushroom_model<span class="pl-pds">"</span></span>)</pre></div>
<p>Let's look at the arguments being fed into the <code>classifier</code> variable.</p>
<ul>
<li>
<p><code>feature_columns=feature_columns</code>. The features of our mushroom data. Notice that in the way in which we define the <code>feature_columns</code> variable, we pass it an argument of <code>dimension=98</code>, since there are 98 different features for each mushroom in the training and test data (not including the class column, since that is the column we are attempting to predict).</p>
</li>
<li>
<p><code>hidden_units=[10, 20, 10]</code>. This tells TensorFlow that we want to construct a neural network with 3 layers where the first layer consists of 10 neurons, the second of 20, and the third of 10 neurons. Why we chose 3 layers and to have a specific amount of neurons on each layer is somewhat more of an art than a science in some ways. In any case, tweaking these types of parameters is a large field of study, and we selected these particular parameters because these are precisely the same ones used in the TensorFlow quick start guide.</p>
</li>
<li>
<p><code>n_classes = 2</code>. This tells TensorFlow that we have two possible classes to predict. Again, in our case, these classes correspond to either poisonous or edible.</p>
</li>
<li>
<p><code>model_dir="/tmp/mushroom_model</code>. Training this model is quick since the amount of data we are providing to TensorFlow is quite small. However, it is usually good practice to checkpoint as the model is trained so that if the computation halts at some point, there's a point to go back to instead of training the entire network all over again. This stores the checkpoint in the Linux /tmp/mushroom_model directory.</p>
</li>
</ul>
<h3><a id="user-content-use-the-uci-data-to-train-the-neural-network" class="anchor" href="#use-the-uci-data-to-train-the-neural-network" aria-hidden="true"><svg aria-hidden="true" class="octicon octicon-link" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Use the UCI Data to Train the Neural Network</h3>
<p>For ease of use later, we're going to define two functions, <code>get_test_inputs()</code> and <code>get_train_inputs()</code>.</p>
<div class="highlight highlight-source-python"><pre><span class="pl-c"><span class="pl-c">#</span> Define the test inputs</span>
<span class="pl-k">def</span> <span class="pl-en">get_test_inputs</span>():
  x <span class="pl-k">=</span> tf.constant(test_set.data)
  y <span class="pl-k">=</span> tf.constant(test_set.target)

  <span class="pl-k">return</span> x, y

<span class="pl-c"><span class="pl-c">#</span> Define the training inputs</span>
<span class="pl-k">def</span> <span class="pl-en">get_train_inputs</span>():
  x <span class="pl-k">=</span> tf.constant(training_set.data)
  y <span class="pl-k">=</span> tf.constant(training_set.target)

  <span class="pl-k">return</span> x, y</pre></div>
<p>Each function performs the same task, where the only difference has to do with whether we are returning parameters based on either the training or testing data. In each function, we define variables <code>x</code> and <code>y</code> that are TensorFlow constant variables. We'll be using the <code>get_train_inputs()</code> function to fit the classifier, and the <code>get_test_inputs()</code> later.</p>
<p>We now fit the classifier to the mushroom training data set.</p>
<div class="highlight highlight-source-python"><pre><span class="pl-c"><span class="pl-c">#</span> Fit model.</span>
classifier.fit(<span class="pl-v">input_fn</span><span class="pl-k">=</span>get_train_inputs, <span class="pl-v">steps</span><span class="pl-k">=</span><span class="pl-c1">2000</span>)</pre></div>
<p>The <code>input_fn</code> argument in the <code>fit</code> function corresponds to the <code>get_train_inputs()</code> function defined above, and the <code>steps</code> argument is set relatively arbitrarily to 2000. Again, this number is also used in the TensorFlow quick start guide, and it seems to be a sufficient number of steps to run on such a small data set.</p>
<h3><a id="user-content-determine-the-accuracy-of-our-neural-network-model" class="anchor" href="#determine-the-accuracy-of-our-neural-network-model" aria-hidden="true"><svg aria-hidden="true" class="octicon octicon-link" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Determine the Accuracy of our Neural Network Model</h3>
<p>Now that we've trained our classifier, we're going to determine its accuracy.</p>
<div class="highlight highlight-source-python"><pre><span class="pl-c"><span class="pl-c">#</span> Evaluate accuracy.</span>
accuracy_score <span class="pl-k">=</span> classifier.evaluate(<span class="pl-v">input_fn</span><span class="pl-k">=</span>get_test_inputs,
                                     <span class="pl-v">steps</span><span class="pl-k">=</span><span class="pl-c1">1</span>)[<span class="pl-s"><span class="pl-pds">"</span>accuracy<span class="pl-pds">"</span></span>]

<span class="pl-c1">print</span>(<span class="pl-s"><span class="pl-pds">"</span><span class="pl-cce">\n</span>Test Accuracy: <span class="pl-c1">{0<span class="pl-c1">:f</span>}</span><span class="pl-cce">\n</span><span class="pl-pds">"</span></span>.format(accuracy_score))</pre></div>
<p>If you run the above, the accuracy of the classifier will print something like:</p>
<pre><code>Test Accuracy: 1.000000
</code></pre>
<h3><a id="user-content-test-the-neural-network-on-a-sample-not-seen" class="anchor" href="#test-the-neural-network-on-a-sample-not-seen" aria-hidden="true"><svg aria-hidden="true" class="octicon octicon-link" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Test the Neural Network on a Sample Not Seen</h3>
<p>Let's now create two samples that are not in the training data and see what class of mushroom TensorFlow predicts for these two samples. I'm just going to pull two samples out of the test data set that we already have, but perhaps you can imagine a scenario where, let's say, more mushroom data is selected, and we want to see what our classifier says about this new mushroom we've acquired as to whether it is poisonous or not.</p>
<div class="highlight highlight-source-python"><pre><span class="pl-c"><span class="pl-c">#</span> Classify two new mushroom samples. (expect output: [0,1]),</span>
<span class="pl-c"><span class="pl-c">#</span> i.e. poisonous, edible.</span>
<span class="pl-k">def</span> <span class="pl-en">new_samples</span>():
    <span class="pl-k">return</span> np.array([[<span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>,
                      <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>,
                      <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>,
                      <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>,
                      <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>,
                      <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>,
                      <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>,
                      <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>],
                     [<span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>,
                      <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>,
                      <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>,
                      <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>,
                      <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>,
                      <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>,
                      <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>,
                      <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">0</span>, <span class="pl-c1">1</span>]], <span class="pl-v">dtype</span><span class="pl-k">=</span>np.int)</pre></div>
<p>The two samples above in the function are two that were extracted from the test dataset. I made sure to take out the first column of each of these rows, as this piece of data corresponds to whether or not the mushroom is edible or not, precisely the piece of information we want to predict.</p>
<p>Since I took these two rows out, I know that the first mushroom is poisonous and the second one is edible. Therefore, we should expect to see a "0" output for the first and "1" output for the second. The following lines test these samples on our classifier.</p>
<div class="highlight highlight-source-python"><pre><span class="pl-c"><span class="pl-c">#</span> Test on two mushroom samples.</span>
predictions <span class="pl-k">=</span> <span class="pl-c1">list</span>(classifier.predict(<span class="pl-v">input_fn</span><span class="pl-k">=</span>new_samples))

<span class="pl-c1">print</span>(<span class="pl-s"><span class="pl-pds">"</span>New Samples, Class Predictions:    <span class="pl-c1">{}</span><span class="pl-cce">\n</span><span class="pl-pds">"</span></span>
      .format(predictions))</pre></div>
<p>Running the above, we indeed see that the output from our classifier agrees with what we already knew to be true, that is the first mushroom is poisonous and the second is edible.</p>
<pre><code>New Samples, Class Predictions:    [0, 1]
</code></pre>
<h3><a id="user-content-additional-resources" class="anchor" href="#additional-resources" aria-hidden="true"><svg aria-hidden="true" class="octicon octicon-link" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Additional Resources</h3>
<p>There are a number of excellent TensorFlow resources.</p>
<ul>
<li>
<p>The <a href="https://www.tensorflow.org/tutorials/">official TensorFlow tutorials</a> are very well-written.</p>
</li>
<li>
<p>This blog post covered many of the same concepts found in the <a href="https://www.tensorflow.org/get_started/tflearn"> tf.contrib.learn Quick Start guide</a> on the TensorFlow website.</p>
</li>
</ul>
</article>
  </div>

</div>

<button type="button" data-facebox="#jump-to-line" data-facebox-class="linejump" data-hotkey="l" class="d-none">Jump to Line</button>
<div id="jump-to-line" style="display:none">
  <!-- '"` --><!-- </textarea></xmp> --></option></form><form accept-charset="UTF-8" action="" class="js-jump-to-line-form" method="get"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /></div>
    <input class="form-control linejump-input js-jump-to-line-field" type="text" placeholder="Jump to line&hellip;" aria-label="Jump to line" autofocus>
    <button type="submit" class="btn">Go</button>
</form></div>


  </div>
  <div class="modal-backdrop js-touch-events"></div>
</div>

    </div>
  </div>

  </div>

      <div class="container site-footer-container">
  <div class="site-footer" role="contentinfo">
    <ul class="site-footer-links float-right">
        <li><a href="https://github.com/contact" data-ga-click="Footer, go to contact, text:contact">Contact GitHub</a></li>
      <li><a href="https://developer.github.com" data-ga-click="Footer, go to api, text:api">API</a></li>
      <li><a href="https://training.github.com" data-ga-click="Footer, go to training, text:training">Training</a></li>
      <li><a href="https://shop.github.com" data-ga-click="Footer, go to shop, text:shop">Shop</a></li>
        <li><a href="https://github.com/blog" data-ga-click="Footer, go to blog, text:blog">Blog</a></li>
        <li><a href="https://github.com/about" data-ga-click="Footer, go to about, text:about">About</a></li>

    </ul>

    <a href="https://github.com" aria-label="Homepage" class="site-footer-mark" title="GitHub">
      <svg aria-hidden="true" class="octicon octicon-mark-github" height="24" version="1.1" viewBox="0 0 16 16" width="24"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
</a>
    <ul class="site-footer-links">
      <li>&copy; 2017 <span title="0.16911s from github-fe-134ed95.cp1-iad.github.net">GitHub</span>, Inc.</li>
        <li><a href="https://github.com/site/terms" data-ga-click="Footer, go to terms, text:terms">Terms</a></li>
        <li><a href="https://github.com/site/privacy" data-ga-click="Footer, go to privacy, text:privacy">Privacy</a></li>
        <li><a href="https://github.com/security" data-ga-click="Footer, go to security, text:security">Security</a></li>
        <li><a href="https://status.github.com/" data-ga-click="Footer, go to status, text:status">Status</a></li>
        <li><a href="https://help.github.com" data-ga-click="Footer, go to help, text:help">Help</a></li>
    </ul>
  </div>
</div>



  

  <div id="ajax-error-message" class="ajax-error-message flash flash-error">
    <svg aria-hidden="true" class="octicon octicon-alert" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M8.865 1.52c-.18-.31-.51-.5-.87-.5s-.69.19-.87.5L.275 13.5c-.18.31-.18.69 0 1 .19.31.52.5.87.5h13.7c.36 0 .69-.19.86-.5.17-.31.18-.69.01-1L8.865 1.52zM8.995 13h-2v-2h2v2zm0-3h-2V6h2v4z"/></svg>
    <button type="button" class="flash-close js-flash-close js-ajax-error-dismiss" aria-label="Dismiss error">
      <svg aria-hidden="true" class="octicon octicon-x" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path fill-rule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48z"/></svg>
    </button>
    You can't perform that action at this time.
  </div>


    <script crossorigin="anonymous" integrity="sha256-ikMY/+oJoM24IUt2zykmufagztMYoxe+1BnbGSFMaQ0=" src="https://assets-cdn.github.com/assets/compat-8a4318ffea09a0cdb8214b76cf2926b9f6a0ced318a317bed419db19214c690d.js"></script>
    <script crossorigin="anonymous" integrity="sha256-5U4AYElhDMKX/hM/gkyHhMcS4XDLjAyAKu0qdnsoV+Y=" src="https://assets-cdn.github.com/assets/frameworks-e54e006049610cc297fe133f824c8784c712e170cb8c0c802aed2a767b2857e6.js"></script>
    <script async="async" crossorigin="anonymous" integrity="sha256-t8/9nXUQEk1+Ne7xa4x4Hl9xOjNEJvmfKHpZ0ddmXRI=" src="https://assets-cdn.github.com/assets/github-b7cffd9d7510124d7e35eef16b8c781e5f713a334426f99f287a59d1d7665d12.js"></script>
    
    
    
    
  <div class="js-stale-session-flash stale-session-flash flash flash-warn flash-banner d-none">
    <svg aria-hidden="true" class="octicon octicon-alert" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M8.865 1.52c-.18-.31-.51-.5-.87-.5s-.69.19-.87.5L.275 13.5c-.18.31-.18.69 0 1 .19.31.52.5.87.5h13.7c.36 0 .69-.19.86-.5.17-.31.18-.69.01-1L8.865 1.52zM8.995 13h-2v-2h2v2zm0-3h-2V6h2v4z"/></svg>
    <span class="signed-in-tab-flash">You signed in with another tab or window. <a href="">Reload</a> to refresh your session.</span>
    <span class="signed-out-tab-flash">You signed out in another tab or window. <a href="">Reload</a> to refresh your session.</span>
  </div>
  <div class="facebox" id="facebox" style="display:none;">
  <div class="facebox-popup">
    <div class="facebox-content" role="dialog" aria-labelledby="facebox-header" aria-describedby="facebox-description">
    </div>
    <button type="button" class="facebox-close js-facebox-close" aria-label="Close modal">
      <svg aria-hidden="true" class="octicon octicon-x" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path fill-rule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48z"/></svg>
    </button>
  </div>
</div>


  </body>
</html>

