/* Shared layout for the FHE guide pages.
   Each page sets `window.PAGE` before including this file:

     landing:   { kind: 'landing', depth: 2 }
     section:   { kind: 'section', section: '<slug>' }
     post:      { kind: 'post',    section: '<slug>', slug: '<slug>' }

   The script renders the site header, breadcrumb, prev/next nav, and
   browser title into placeholder elements with these IDs:
     #site-header      always
     #sections         landing page (auto-list of all 6 parts)
     #post-breadcrumb  section / post page – top of <main>
     #post-list        section page – auto-list of posts in this section
     #post-nav         section / post page – bottom of <main>

   It also injects KaTeX (for $math$) and highlight.js (for code blocks)
   on post pages, so individual post HTML files don't have to. */

(() => {
    const depth = (window.PAGE && window.PAGE.depth) || 3;
    const root = '../'.repeat(depth);

    const partTitle = (s) => `Part ${SECTIONS.indexOf(s) + 1}. ${s.title}`;
    const postLabel = (i, j, p) => `${i + 1}.${j + 1} ${p.title}`;

    /* ---- KaTeX + highlight.js, injected for section / post pages only ----
       Saves having to duplicate the same <head> boilerplate in every file.

       Note: <script> tags inserted via innerHTML/insertAdjacentHTML are
       NOT executed by the browser, so we have to programmatically create
       and append each script element. <link> tags work either way. */
    const injectMathAndCode = () => {
        const link = (href) => {
            const el = document.createElement('link');
            el.rel = 'stylesheet';
            el.href = href;
            document.head.appendChild(el);
        };
        const script = (src, onload) => {
            const el = document.createElement('script');
            el.src = src;
            if (onload) el.onload = onload;
            document.head.appendChild(el);
        };

        /* KaTeX: load core, then auto-render on load. */
        link('https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css');
        const katexCore = document.createElement('script');
        katexCore.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js';
        katexCore.onload = () => {
            script('https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js', () => {
                renderMathInElement(document.body, {
                    delimiters: [
                        { left: '$$', right: '$$', display: true },
                        { left: '$',  right: '$',  display: false },
                    ],
                    throwOnError: false,
                });
            });
        };
        document.head.appendChild(katexCore);

        /* highlight.js: dark theme + auto-highlight on load. */
        link('https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles/tomorrow-night.min.css');
        script('https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/lib/highlight.min.js', () => {
            hljs.highlightAll();
        });
    };

    /* ---- Site header ----
       Inside the guide we drop the site-wide nav dropdowns and keep only
       the identity (turtle + name), so the page chrome signals "you're in
       a different section." The name still links back to the main site. */
    const renderHeader = () => {
        const el = document.getElementById('site-header');
        if (!el) return;
        /* The invisible <nav> with one dropdown reserves the exact same
           height a normal page header has, so the bar doesn't shrink. */
        el.innerHTML = `
            <div class="top-left-name">
              <img src="${root}files/images/turtleicon.png" alt="Turtle icon" class="name-icon" />
              <div style="display: inline-block">
                <div class="hide-name">
                  <a class="namebtn" href="${root}index.html">Holden Mui</a>
                </div>
              </div>
            </div>
            <nav style="visibility: hidden" aria-hidden="true">
              <div class="dropdown"><a class="dropbtn">&nbsp;</a></div>
            </nav>`;
    };

    /* ---- Prev/next nav (used on section and post pages) ----
       Targets are { href, title } or null. The reading spine runs:
         Section 1 page → Post 1.1 → … → last post of Section 1
         → Section 2 page → Post 2.1 → … */
    const navHtml = (prev, next) => {
        const slot = (target, dir) => target
            ? `<a class="${dir}" href="${target.href}">
                 <span class="label">${dir === 'prev' ? '&larr; Previous' : 'Next &rarr;'}</span>
                 <span class="post-nav-title">${target.title}</span>
               </a>`
            : `<span class="placeholder"></span>`;
        return `<nav class="post-nav">
                  ${slot(prev, 'prev')}
                  ${slot(next, 'next')}
                </nav>`;
    };

    /* ---- Landing page ---- */
    const renderLanding = () => {
        const el = document.getElementById('sections');
        if (!el) return;
        el.innerHTML = SECTIONS.map((s, i) => `
            <li>
              <a class="post-title" href="${s.slug}/index.html">Part ${i + 1}. ${s.title}</a>
            </li>`).join('');
    };

    /* ---- Section page ----
       The body (h1, intro, post list) is hand-written in each
       section's index.html. We only inject the breadcrumb at the
       top, the auto-generated post list (if it has a #post-list
       placeholder), and the prev/next nav at the bottom. */
    const renderSection = () => {
        const i = SECTIONS.findIndex((s) => s.slug === window.PAGE.section);
        if (i === -1) return;
        const section = SECTIONS[i];
        const heading = partTitle(section);
        document.title = `${heading} | FHE Guide | Holden Mui`;

        /* Breadcrumb at top of <main>. */
        const crumb = document.getElementById('post-breadcrumb');
        if (crumb) crumb.innerHTML = `
            <a href="../index.html">Contents</a> &gt;
            <span>${heading}</span>`;

        /* Auto-rendered post list (if the page has a #post-list placeholder). */
        const list = document.getElementById('post-list');
        if (list) list.innerHTML = section.posts.map((p, j) =>
            `<li><a class="post-title" href="${p.slug}.html">${postLabel(i, j, p)}</a></li>`
        ).join('');

        /* Previous: last post of previous section, or that section itself if it
           had no posts. On the very first section, point back to the landing. */
        let prev;
        if (i === 0) {
            prev = { href: '../index.html', title: 'Contents' };
        } else {
            const ps = SECTIONS[i - 1].posts;
            if (ps.length > 0) {
                const last = ps[ps.length - 1];
                prev = { href: `../${SECTIONS[i - 1].slug}/${last.slug}.html`,
                         title: postLabel(i - 1, ps.length - 1, last) };
            } else {
                prev = { href: `../${SECTIONS[i - 1].slug}/index.html`,
                         title: partTitle(SECTIONS[i - 1]) };
            }
        }

        /* Next: first post of this section, or next section if this one's
           empty. On the very last (empty) section, point back to landing. */
        const next = section.posts.length > 0
            ? { href: `${section.posts[0].slug}.html`,
                title: postLabel(i, 0, section.posts[0]) }
            : (i < SECTIONS.length - 1
                ? { href: `../${SECTIONS[i + 1].slug}/index.html`,
                    title: partTitle(SECTIONS[i + 1]) }
                : { href: '../index.html', title: 'Contents' });

        const nav = document.getElementById('post-nav');
        if (nav) nav.outerHTML = navHtml(prev, next);
    };

    /* ---- Post page ---- */
    const renderPost = () => {
        const sIdx = SECTIONS.findIndex((s) => s.slug === window.PAGE.section);
        if (sIdx === -1) return;
        const section = SECTIONS[sIdx];
        const j = section.posts.findIndex((p) => p.slug === window.PAGE.slug);
        if (j === -1) return;
        const post = section.posts[j];
        document.title = `${post.title} | FHE Guide | Holden Mui`;

        const crumb = document.getElementById('post-breadcrumb');
        if (crumb) crumb.innerHTML = `
            <a href="../index.html">Contents</a> &gt;
            <a href="index.html">${partTitle(section)}</a> &gt;
            <span>${post.title}</span>`;

        /* Previous: previous post in this section, or this section's page. */
        const prev = j > 0
            ? { href: `${section.posts[j - 1].slug}.html`,
                title: postLabel(sIdx, j - 1, section.posts[j - 1]) }
            : { href: 'index.html', title: partTitle(section) };

        /* Next: next post in this section, or the next section's page. */
        const next = j < section.posts.length - 1
            ? { href: `${section.posts[j + 1].slug}.html`,
                title: postLabel(sIdx, j + 1, section.posts[j + 1]) }
            : (sIdx < SECTIONS.length - 1
                ? { href: `../${SECTIONS[sIdx + 1].slug}/index.html`,
                    title: partTitle(SECTIONS[sIdx + 1]) }
                : null);

        const nav = document.getElementById('post-nav');
        if (nav) nav.outerHTML = navHtml(prev, next);
    };

    const boot = () => {
        renderHeader();
        if (window.PAGE?.kind === 'landing') renderLanding();
        if (window.PAGE?.kind === 'section') renderSection();
        if (window.PAGE?.kind === 'post')    renderPost();
        if (window.PAGE?.kind === 'section' || window.PAGE?.kind === 'post') {
            injectMathAndCode();
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
