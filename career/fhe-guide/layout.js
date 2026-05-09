/* Shared layout for the FHE guide pages.
   Each page sets `window.PAGE` before including this file:

     landing:   { kind: 'landing', depth: 2 }
     section:   { kind: 'section', section: '<slug>' }
     post:      { kind: 'post',    section: '<slug>', slug: '<slug>' }

   The script renders the site header, breadcrumb, prev/next nav, and
   browser title into placeholder elements with these IDs:
     #site-header     always
     #sections        landing page
     #section-content section page (with posts)
     #post-breadcrumb section page (no posts) / post page – top of <main>
     #post-nav        section page (no posts) / post page – bottom of <main>

   It also injects KaTeX (for $math$) and highlight.js (for code blocks)
   on post pages, so individual post HTML files don't have to. */

(() => {
    const depth = (window.PAGE && window.PAGE.depth) || 3;
    const root = '../'.repeat(depth);

    const partTitle = (s) => `Part ${SECTIONS.indexOf(s) + 1}. ${s.title}`;
    const postLabel = (i, j, p) => `${i + 1}.${j + 1} ${p.title}`;

    /* ---- KaTeX + highlight.js, injected for post pages only ----
       Saves having to duplicate the same <head> boilerplate in every
       post file. */
    const injectMathAndCode = () => {
        const head = document.head;
        head.insertAdjacentHTML('beforeend', `
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
            <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
            <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"
                    onload="renderMathInElement(document.body, {
                        delimiters: [
                            { left: '$$', right: '$$', display: true },
                            { left: '$',  right: '$',  display: false }
                        ],
                        throwOnError: false
                    });"></script>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles/tomorrow-night.min.css">
            <script defer src="https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/lib/highlight.min.js"
                    onload="hljs.highlightAll();"></script>`);
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
       Sections with posts auto-render their full body from posts.js.
       Sections with no posts (e.g. "Takeaways") keep the page's
       hand-written content; we only inject a breadcrumb and prev/next. */
    const renderSection = () => {
        const i = SECTIONS.findIndex((s) => s.slug === window.PAGE.section);
        if (i === -1) return;
        const section = SECTIONS[i];
        const heading = partTitle(section);
        document.title = `${heading} | FHE Guide | Holden Mui`;

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

        const auto = document.getElementById('section-content');
        if (auto) {
            /* Sections with posts: render the whole body. */
            auto.innerHTML = `
                <p class="post-breadcrumb">
                  <a href="../index.html">Contents</a> &gt;
                  <span>${heading}</span>
                </p>
                <h1>${heading}</h1>
                <p>${section.intro}</p>
                <ul class="post-list">
                  ${section.posts.map((p, j) =>
                    `<li><a class="post-title" href="${p.slug}.html">${postLabel(i, j, p)}</a></li>`
                  ).join('')}
                </ul>
                ${navHtml(prev, next)}`;
            return;
        }

        /* Hand-written section page: just inject crumb at top, nav at bottom. */
        const crumb = document.getElementById('post-breadcrumb');
        if (crumb) crumb.innerHTML = `
            <a href="../index.html">Contents</a> &gt;
            <span>${heading}</span>`;

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
