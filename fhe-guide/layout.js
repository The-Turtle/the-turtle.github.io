/* Shared layout for the FHE guide pages.
   Each page sets `window.PAGE` before including this file:

     landing:   { kind: 'landing', depth: 1 }
     section:   { kind: 'section', section: '<slug>' }     // depth defaults to 2
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
    const depth = (window.PAGE && window.PAGE.depth) || 2;
    const root = '../'.repeat(depth);

    const partTitle = (section) => `Part ${SECTIONS.indexOf(section) + 1}. ${section.title}`;
    const postLabel = (sectionIndex, postIndex, post) => `${sectionIndex + 1}.${postIndex + 1} ${post.title}`;

    /* ---- KaTeX + highlight.js, injected for section / post pages only ----
       Saves having to duplicate the same <head> boilerplate in every file.

       Note: <script> tags inserted via innerHTML/insertAdjacentHTML are
       NOT executed by the browser, so we have to programmatically create
       and append each script element. <link> tags work either way. */
    const injectMathAndCode = () => {
        const loadStylesheet = (href) => {
            const el = document.createElement('link');
            el.rel = 'stylesheet';
            el.href = href;
            document.head.appendChild(el);
        };
        const loadScript = (url, onload) => {
            const el = document.createElement('script');
            el.src = url;
            if (onload) el.onload = onload;
            document.head.appendChild(el);
        };

        /* KaTeX: load core, then auto-render on load. */
        loadStylesheet('https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css');
        loadScript('https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js', () => {
            loadScript('https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js', () => {
                renderMathInElement(document.body, {
                    delimiters: [
                        { left: '$$', right: '$$', display: true },
                        { left: '$',  right: '$',  display: false },
                    ],
                    throwOnError: false,
                });
            });
        });

        /* highlight.js: dark theme + auto-highlight on load. */
        loadStylesheet('https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles/tomorrow-night.min.css');
        loadScript('https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/lib/highlight.min.js', () => {
            hljs.highlightAll();
        });
    };

    const renderHeader = () => {
        const header = document.getElementById('site-header');
        header.innerHTML = `
            <a class="site-name" href="${root}index.html" aria-label="Holden Mui home">
                <img src="${root}files/images/turtleicon.png" alt="" />
                <span>Holden Mui</span>
            </a>`;
    };

    /* ---- Prev/next nav (used on section and post pages) ----
       Targets are { href, title } or null. The reading spine runs:
         Section 1 page → Post 1.1 → … → last post of Section 1
         → Section 2 page → Post 2.1 → … */
    const navHtml = (prev, next) => {
        const slot = (target, direction) => target
            ? `<a class="${direction}" href="${target.href}">
                 <span class="label">${direction === 'prev' ? '&larr; Previous' : 'Next &rarr;'}</span>
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
        const tag = (status) => status === 'todo' ? ' <span class="todo">[TODO]</span>'
                          : status === 'incomplete' ? ' <span class="todo">[INCOMPLETE]</span>'
                          : '';
        el.innerHTML = SECTIONS.map((section, sectionIndex) => {
            const sub = section.posts.length
                ? `<ul class="post-list">${section.posts.map((post, postIndex) => `
                  <li><a class="post-title" href="${section.slug}/${post.slug}.html">${sectionIndex + 1}.${postIndex + 1} ${post.title}</a>${tag(post.status)}</li>`).join('')}</ul>`
                : '';
            return `
            <li>
              <a class="post-title" href="${section.slug}/index.html">Part ${sectionIndex + 1}. ${section.title}</a>${tag(section.status)}
              ${sub}
            </li>`;
        }).join('');
    };

    /* ---- Section page ----
       The body (h1, intro, post list) is hand-written in each
       section's index.html. We only inject the breadcrumb at the
       top, the auto-generated post list (if it has a #post-list
       placeholder), and the prev/next nav at the bottom. */
    const renderSection = () => {
        const sectionIndex = SECTIONS.findIndex((candidate) => candidate.slug === window.PAGE.section);
        if (sectionIndex === -1) return;
        const section = SECTIONS[sectionIndex];
        const heading = partTitle(section);
        document.title = `${heading} | FHE Guide | Holden Mui`;

        /* Breadcrumb at top of <main>. */
        const breadcrumb = document.getElementById('post-breadcrumb');
        if (breadcrumb) breadcrumb.innerHTML = `
            <a href="../index.html">Contents</a> &gt;
            <span>${heading}</span>`;

        /* Auto-rendered post list (if the page has a #post-list placeholder). */
        const list = document.getElementById('post-list');
        if (list) list.innerHTML = section.posts.map((post, postIndex) =>
            `<li><a class="post-title" href="${post.slug}.html">${postLabel(sectionIndex, postIndex, post)}</a></li>`
        ).join('');
    };

    /* ---- Post page ---- */
    const renderPost = () => {
        const sectionIndex = SECTIONS.findIndex((candidate) => candidate.slug === window.PAGE.section);
        if (sectionIndex === -1) return;
        const section = SECTIONS[sectionIndex];
        const postIndex = section.posts.findIndex((candidate) => candidate.slug === window.PAGE.slug);
        if (postIndex === -1) return;
        const post = section.posts[postIndex];
        document.title = `${post.title} | FHE Guide | Holden Mui`;

        const breadcrumb = document.getElementById('post-breadcrumb');
        if (breadcrumb) breadcrumb.innerHTML = `
            <a href="../index.html">Contents</a> &gt;
            <a href="index.html">${partTitle(section)}</a> &gt;
            <span>${post.title}</span>`;
    };

    const renderReadingNav = () => {
        const contents = { href: '../index.html', title: 'Contents' };
        const pages = [contents];
        SECTIONS.forEach((section, sectionIndex) => {
            pages.push({
                href: `../${section.slug}/index.html`,
                title: partTitle(section),
            });
            section.posts.forEach((post, postIndex) => {
                pages.push({
                    href: `../${section.slug}/${post.slug}.html`,
                    title: postLabel(sectionIndex, postIndex, post),
                });
            });
        });
        pages.push(contents);

        const href = `../${window.PAGE.section}/${window.PAGE.slug || 'index'}.html`;
        const current = pages.findIndex((page) => page.href === href);
        const nav = document.getElementById('post-nav');
        if (current > 0 && nav) nav.outerHTML = navHtml(pages[current - 1], pages[current + 1]);
    };

    /* ---- "Lies" popovers ----
       On desktop, a .lie span shows its truth on :hover via CSS.
       On touch devices where hover isn't a thing, tapping a .lie
       toggles the popover; tapping anywhere else closes any open
       popover. */
    const enableLiePopovers = () => {
        document.addEventListener('click', (e) => {
            const lie = e.target.closest('.lie');
            document.querySelectorAll('.lie.lie-open').forEach((el) => {
                if (el !== lie) el.classList.remove('lie-open');
            });
            if (lie) lie.classList.toggle('lie-open');
        });
    };

    /* ---- Page TOC ----
       Build a wiki-style sticky sidebar on the left listing each
       <h2> on the current page. Each h2 is auto-assigned an id
       (derived from its text) so the sidebar links act as in-page
       anchors. Skipped on pages with fewer than two h2s. */
    const renderPageToc = () => {
        const headings = document.querySelectorAll('main h2');
        if (headings.length < 2) return;

        const slugify = (text) => text
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .substring(0, 60) || 'section';

        const used = new Set();
        headings.forEach((h) => {
            if (h.id) { used.add(h.id); return; }
            let base = slugify(h.textContent);
            let id = base;
            let n = 1;
            while (used.has(id)) id = `${base}-${n++}`;
            used.add(id);
            h.id = id;
        });

        const items = [...headings].map((h) =>
            `<li><a href="#${h.id}">${h.textContent}</a></li>`
        ).join('');
        const nav = document.createElement('nav');
        nav.className = 'page-toc';
        nav.innerHTML = `
            <div class="page-toc-label">On this page</div>
            <ul>${items}</ul>`;
        document.body.appendChild(nav);
    };

    const boot = () => {
        renderHeader();
        if (window.PAGE?.kind === 'landing') renderLanding();
        if (window.PAGE?.kind === 'section') renderSection();
        if (window.PAGE?.kind === 'post')    renderPost();
        if (window.PAGE?.kind === 'section' || window.PAGE?.kind === 'post') {
            renderReadingNav();
            injectMathAndCode();
        }
        enableLiePopovers();
        renderPageToc();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
