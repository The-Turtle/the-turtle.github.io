/* Single source of truth for the 0xPARC writing.
   The landing page, each section page, and per-post prev/next nav
   all read from this file.

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
        intro: `Fully homomorphic encryption (FHE) lets you compute on
                encrypted data without ever decrypting it. The result of
                the computation, when decrypted, is the same as if it had
                been performed on the plaintext &mdash; but the server
                doing the work never sees the inputs or the output.`,
        posts: [
            { slug: 'history',      title: 'A brief history of FHE' },
            { slug: 'use-cases',    title: 'What can you do with FHE?' },
            { slug: 'alternatives', title: 'Alternatives to FHE' },
            { slug: 'limitations',  title: 'Limitations of FHE' }
        ]
    },
    {
        slug: 'building',
        title: 'How do you build with CKKS?',
        intro: `This section covers the practical side: the CKKS API
                surface we expose, the cost model that determines what's
                cheap and what's expensive, how to pick parameters, and
                worked examples drawn from real demos.`,
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
        intro: `An under-the-hood look at CKKS: the polynomial ring it
                lives in, how ciphertext operations are actually
                implemented, how bootstrapping refreshes a tired
                ciphertext, and the optimizations that make the whole
                thing fast.`,
        posts: [
            { slug: 'rlwe',          title: 'Polynomials and RLWE' },
            { slug: 'operations',    title: 'Ciphertext operations' },
            { slug: 'bootstrapping', title: 'Bootstrapping' },
            { slug: 'optimizations', title: 'Optimizations' },
            { slug: 'multiparty',    title: 'Multiparty key generation' }
        ]
    },
    {
        slug: 'security',
        title: 'How secure is CKKS?',
        intro: `What "secure" means in the CKKS world, what assumptions
                that security rests on, and what attacks the scheme is
                designed (or not designed) to resist.`,
        posts: [
            { slug: 'models',  title: 'Security models' },
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
