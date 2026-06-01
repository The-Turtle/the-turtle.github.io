/* Single source of truth for the FHE guide's structure.
   The landing page, section pages, and per-post prev/next nav all
   read from this file.

   Each section's intro prose lives in its own index.html, not here.
   This file is purely structural: which sections exist, what posts
   they contain, and the order of both.

   To add a post: add a { slug, title } entry to the right section
   here, then copy any existing post .html as a starting point and
   update its window.PAGE block to match the new section + slug.

   To mark a section of a post as a draft, drop
     <p><b>[WORK IN PROGRESS]</b></p>
   right after the relevant heading. Delete it when that section
   is done. */
const SECTIONS = [
    {
        slug: 'introduction',
        title: 'What is FHE?',
        posts: [
            { slug: 'landscape',    title: 'The FHE landscape' },
            { slug: 'use-cases',    title: 'What can you do with FHE?' },
            { slug: 'alternatives', title: 'Alternatives to FHE' },
            { slug: 'limitations',  title: 'Limitations of FHE' }
        ]
    },
    {
        slug: 'building',
        title: 'How do you build with CKKS?',
        posts: [
            { slug: 'interface',  title: 'Interface' },
            { slug: 'cost',       title: 'Cost model' },
            { slug: 'parameters', title: 'Parameter selection' },
            { slug: 'examples',   title: 'Examples' }
        ]
    },
    {
        slug: 'internals',
        title: 'How does CKKS work?',
        posts: [
            { slug: 'polynomials',   title: 'Polynomials' },
            { slug: 'encryption',    title: 'Key generation, encryption, and decryption' },
            { slug: 'fundamental',   title: 'Fundamental operations' },
            { slug: 'composite',     title: 'Composite operations' },
            { slug: 'bootstrapping', title: 'Bootstrapping' },
            { slug: 'multiparty',    title: 'Multiparty key generation' },
            { slug: 'optimizations', title: 'Optimizations' }
        ]
    },
    {
        slug: 'implementation',
        title: 'How is CKKS implemented?',
        posts: [
            { slug: 'computation-graphs',  title: 'Computation graphs' },
            { slug: 'optimization-passes', title: 'Optimization passes' },
            { slug: 'data-layout',         title: 'Data layout' }
        ]
    },
    {
        slug: 'security',
        title: 'How secure is CKKS?',
        posts: [
            { slug: 'models',  title: 'Security models' },
            { slug: 'trust',   title: 'Trust assumptions' },
            { slug: 'attacks', title: 'Attacks' }
        ]
    },
    {
        slug: 'takeaways',
        title: 'Takeaways',
        /* This part has no sub-pages – the section page itself holds
           the writing. Edit takeaways/index.html directly. */
        posts: []
    }
];
