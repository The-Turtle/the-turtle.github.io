/* iOS audio session unlock.

   On iOS, Web Audio plays in the "ambient" session by default, which
   the ringer/mute switch silences. Playing an <audio> element alongside
   it escalates the session to "playback", which ignores the switch.

   On the first user gesture, start a silent looping <audio>. The element
   is held by `window` so it isn't garbage-collected. No-op everywhere
   except iOS — harmless on other platforms. */
addEventListener('click', function unlock() {
    var a = new Audio('data:audio/wav;base64,UklGRiUAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQEAAACA');
    a.loop = true;
    a.play().catch(function () {});
    window.__silentAudio = a;
    removeEventListener('click', unlock, true);
}, true);
