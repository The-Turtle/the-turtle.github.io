const menus = document.querySelectorAll('.site-nav details');

for (const menu of menus) {
    menu.addEventListener('pointerenter', (event) => {
        if (event.pointerType === 'mouse') menu.open = true;
    });
    menu.addEventListener('pointerleave', (event) => {
        if (event.pointerType === 'mouse') menu.open = false;
    });
}

document.addEventListener('click', (event) => {
    for (const menu of menus) {
        if (!menu.contains(event.target)) menu.open = false;
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    for (const menu of menus) {
        if (!menu.open) continue;
        if (menu.contains(document.activeElement)) menu.querySelector('summary').focus();
        menu.open = false;
    }
});
