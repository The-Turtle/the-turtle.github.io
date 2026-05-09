/* Shared layout for the 0xPARC writing pages.
   Each page sets `window.PAGE` before including this file:

     landing:   { kind: 'landing', depth: 2 }
     section:   { kind: 'section', section: '<slug>' }
     post:      { kind: 'post',    section: '<slug>', slug: '<slug>' }

   The script renders the site header, breadcrumb, and prev/next nav
   into placeholder elements with these IDs:
     #site-header     always
     #sections        landing page
     #section-content section page
     #post-breadcrumb post page (top of <main>)
     #post-nav        post page (bottom of <main>) */

(() => {
    const depth = (window.PAGE && window.PAGE.depth) || 3;
    const root = '../'.repeat(depth);

    const NAV = [
        ['Home', root + 'index.html'],
        ['Career', [
            ['0xPARC',     root + 'career/0xparc/index.html'],
            ['Coursework', root + 'career/coursework.html'],
            ['Resume',     root + 'career/resume.html'],
        ]],
        ['Math', [
            ['Research', root + 'math/research.html'],
            ['Talks',    root + 'math/talks.html'],
            ['Teaching', root + 'math/teaching.html'],
            ['Olympiad', root + 'math/olympiad.html'],
            ['Puzzles',  root + 'math/puzzles.html'],
        ]],
        ['Music', [
            ['Piano',             root + 'music/piano.html'],
            ['Composition',       root + 'music/composition.html'],
            ['Arrangements',      root + 'music/arrangements.html'],
            ['Music Guesser',     root + 'music/musicguesser.html'],
            ['Frequency Guesser', root + 'music/frequencyguesser.html'],
            ['Ear Training',      root + 'music/eartraining.html'],
        ]],
        ['Other', [
            ['Events',   root + 'other/events.html'],
            ['Writing',  root + 'other/writing.html'],
            ['Gallery',  root + 'other/gallery.html'],
            ['News',     root + 'other/news.html'],
            ['Links',    root + 'other/links.html'],
            ['SF Hills', root + 'other/sfhills.html'],
        ]],
    ];

    const partTitle = (s) => `Part ${SECTIONS.indexOf(s) + 1}. ${s.title}`;
    const postLabel = (i, j, p) => `${i + 1}.${j + 1} ${p.title}`;

    /* ---- Site header ---- */
    const renderHeader = () => {
        const el = document.getElementById('site-header');
        if (!el) return;
        const dropdownHtml = ([label, val]) => Array.isArray(val)
            ? `<div class="dropdown"><a class="dropbtn">${label}</a>
                 <div class="dropdown-content">
                   ${val.map(([t, h]) => `<a href="${h}">${t}</a>`).join('')}
                 </div>
               </div>`
            : `<div class="dropdown"><a class="dropbtn" href="${val}">${label}</a></div>`;
        el.innerHTML = `
            <div class="top-left-name">
              <img src="${root}files/images/turtleicon.png" alt="Turtle icon" class="name-icon" />
              <div style="display: inline-block">
                <div class="hide-name">
                  <a class="namebtn" href="${root}index.html">Holden Mui</a>
                </div>
              </div>
            </div>
            <nav>${NAV.map(dropdownHtml).join('')}</nav>`;

        const dropdowns = el.querySelectorAll('.dropdown');
        dropdowns.forEach((d) => {
            const btn = d.querySelector('.dropbtn');
            btn?.addEventListener('click', () => d.classList.toggle('active'));
        });
        document.addEventListener('click', (e) => {
            dropdowns.forEach((d) => { if (!d.contains(e.target)) d.classList.remove('active'); });
        });
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
              <a class="section-link" href="${s.slug}/index.html">Part ${i + 1}. ${s.title}</a>
              <ul class="post-list">
                ${s.posts.map((p, j) => `
                  <li><a class="post-title" href="${s.slug}/${p.slug}.html">${postLabel(i, j, p)}</a></li>
                `).join('')}
              </ul>
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
        document.title = `${heading} | 0xPARC | Holden Mui`;

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
        document.title = `${post.title} | 0xPARC | Holden Mui`;

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
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
