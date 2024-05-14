window.addEventListener("DOMContentLoaded", function () {
    showContentGame();

    /**
     ** HELPER FUNCTIONS
     */
    const qSel = (obj) => document.querySelector(obj);
    const qSelAll = (obj) => document.querySelectorAll(obj);

    /**
     ** GLOBAL VARIABLES
     */
    const nav = qSel('#nav');
    const nav_container = qSel('#nav_icon');
    const nav_icon = qSel('#nav_icon > i');
    const nav_links = qSelAll('#nav > ul > li > a');

    /**
     ** OPEN SIDEBAR
     */
    nav_container.addEventListener('click', () => {
        if (nav.classList.contains('open')) {

            closeSidebar();
            return;
        }

        nav.classList.add('open');
        $('html').addClass('oL');
		$('#container div').first().addClass('ml-350'); 
        $('html').css('top', '0');
        $('.overlay').removeClass('c');
        nav_icon.classList.add('rotate');
    });

    /**
     ** CLOSE SIDEBAR AFTER CLICK ON LINK 
     */
    nav_links.forEach(link => {
        link.addEventListener('click', e => {
//            e.stopPropagation();
//
//            closeSidebar();
        });
    });

    /**
     ** MOUSE TRACK EVENT 
     */
    if (innerWidth > 1024) {
        // Mouse move event
//    window.addEventListener('mousemove', e => {
//        const mouseY = Math.round((e.y * 100) / innerHeight);
//        const mouseX = Math.round((e.x * 100) / innerWidth);
//
//        // Detect mouse position
//        if (!nav.classList.contains('open') && mouseX <= 20) {
//            nav_container.style.top = `${mouseY}%`;
//            nav_container.classList.add('mouseDistance');
//        } else {
//            nav_container.classList.remove('mouseDistance');
//            nav_container.style.top = '50px';
//        }
//        
//        // Check mouse distance to nav
//        mouseX <= 10 ? 
//            nav_container.classList.add('mouseDistanceCloser') : 
//            nav_container.classList.remove('mouseDistanceCloser');
//            
//        if (nav.classList.contains('open') || (mouseY >= 95 || mouseY <= 5)) resetNavIcon();
//    }); 

        // Mouse leave window
        document.addEventListener('mouseleave', () => {
//            closeSidebar();
//            resetNavIcon();
        });
    }
    ;

    /**
     ** CLOSE SIDEBAR WHILE CLICKING OUTSIDE
     */
    window.addEventListener('click', e => {
//        e.stopPropagation();
//        if (!nav.classList.contains('open'))
//            return;
//        if (!e.target.closest('nav')) {
//            closeSidebar();
//            resetNavIcon();
//        }
    });

    /**
     ** CLOSE SIDEBAR
     */
    function closeSidebar() {
        nav.classList.remove('open');
        nav_icon.classList.remove('rotate');
        $('html').removeClass('oL');
        $('html').css('top', '');
        $('.overlay').addClass('c');
		$('#container div').first().removeClass('ml-350'); 
    }

    /**
     ** RESET NAV ICON
     */
    function resetNavIcon() {
        nav_container.classList.remove('mouseDistance');
        nav_container.classList.remove('mouseDistanceCloser');
        nav_container.style.top = '50px';
    }
});
function showContentGame() {
    var container = $("#slope-game");
    var container_overlay = $(".popup-overlay");
    $('#about_icon').click(function () {
        if (container.css("display") == "none") {
            container_overlay.show()
            container.fadeIn(200);
        } else {
            container_overlay.hide()
            container.fadeOut(300);
        }
    });
    $(document).mouseup(function (e)
    {
        if (!container.is(e.target) && container.has(e.target).length === 0)
        {
            container_overlay.hide();
            container.fadeOut(300);

        }
    });
    $('.close_popup').click(function () {
        container_overlay.hide();
        container.fadeOut(300);
    })
}