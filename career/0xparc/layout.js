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
            ['Resume',     root + 'other/resume.html'],
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

    /* ---- Prev/next nav (used on section and post pages) ---- */
    const navHtml = (prev, next, prevHref, nextHref, titleFn) => {
        const slot = (item, dir, href) => item
            ? `<a class="${dir}" href="${href(item)}">
                 <span class="label">${dir === 'prev' ? '&larr; Previous' : 'Next &rarr;'}</span>
                 <span class="post-nav-title">${titleFn(item)}</span>
               </a>`
            : `<span class="placeholder"></span>`;
        return `<nav class="post-nav">
                  ${slot(prev, 'prev', prevHref)}
                  ${slot(next, 'next', nextHref)}
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
                ${s.posts.map((p) => `
                  <li><a class="post-title" href="${s.slug}/${p.slug}.html">${p.title}</a></li>
                `).join('')}
              </ul>
            </li>`).join('');
    };

    /* ---- Section page ---- */
    const renderSection = () => {
        const el = document.getElementById('section-content');
        if (!el) return;
        const i = SECTIONS.findIndex((s) => s.slug === window.PAGE.section);
        if (i === -1) return;
        const section = SECTIONS[i];
        const heading = partTitle(section);
        document.title = `${heading} | 0xPARC | Holden Mui`;

        el.innerHTML = `
            <p class="post-breadcrumb">
              <a href="../index.html">All 0xPARC writing</a> &rsaquo;
              <span>${heading}</span>
            </p>
            <h1>${heading}</h1>
            <p>${section.intro}</p>
            <ul class="post-list">
              ${section.posts.map((p) =>
                `<li><a class="post-title" href="${p.slug}.html">${p.title}</a></li>`
              ).join('')}
            </ul>
            ${navHtml(
                i > 0 ? SECTIONS[i - 1] : null,
                i < SECTIONS.length - 1 ? SECTIONS[i + 1] : null,
                (s) => `../${s.slug}/index.html`,
                (s) => `../${s.slug}/index.html`,
                partTitle
            )}`;
    };

    /* ---- Post page ---- */
    const renderPost = () => {
        const section = SECTIONS.find((s) => s.slug === window.PAGE.section);
        if (!section) return;
        const i = section.posts.findIndex((p) => p.slug === window.PAGE.slug);
        if (i === -1) return;
        const post = section.posts[i];
        document.title = `${post.title} | 0xPARC | Holden Mui`;

        const crumb = document.getElementById('post-breadcrumb');
        if (crumb) crumb.innerHTML = `
            <a href="../index.html">All 0xPARC writing</a> &rsaquo;
            <a href="index.html">${partTitle(section)}</a> &rsaquo;
            <span>${post.title}</span>`;

        const nav = document.getElementById('post-nav');
        if (nav) nav.outerHTML = navHtml(
            i > 0 ? section.posts[i - 1] : null,
            i < section.posts.length - 1 ? section.posts[i + 1] : null,
            (p) => `${p.slug}.html`,
            (p) => `${p.slug}.html`,
            (p) => p.title
        );
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
