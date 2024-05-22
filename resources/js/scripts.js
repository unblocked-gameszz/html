window.addEventListener("DOMContentLoaded", function () {
    slider_js();
    search_complete();
    backToTop();
    /*$('input.searchMobileInput').on('keyup', function () {
        let empty = false;
        $('input.searchMobileInput').each(function () {
            empty = $(this).val().length == 0;
        });
        if (empty) {
            $('.searchMobileBtn').attr('disabled', 'disabled');
        } else {
            $('.searchMobileBtn').attr('disabled', false);
            $("input.searchMobileInput").on('keyup', function (e) {
                if (e.keyCode === 13) {
                    window.location.replace("/search/" + $("input.searchMobileInput").val());
                }
                $(".searchMobileBtn").on('click', function () {
                    window.location.replace("/search/" + $("input.searchMobileInput").val());
                });
            });
        }
    });
    let mobile_icon = document.querySelector("#menu-mobile");
    let mobile_close_icon = document.querySelector(".mobile-close");
    let mobile_menu = document.querySelector(".mobile-menu");
    if (mobile_icon) {
        mobile_icon.addEventListener('click', function (e) {
            document.querySelector(".mobile-menu").style.right = "0";
            e.stopPropagation();
        })
    }
    if (mobile_close_icon) {
        mobile_close_icon.addEventListener('click', function (e) {
            document.querySelector(".mobile-menu").style.right = "-310px";
        })
    }
    mobile_menu.addEventListener('click', function (e) {
        e.stopPropagation();
    })
    document.addEventListener('click', function () {
        document.querySelector(".mobile-menu").style.right = "-310px";
    })*/


//<div class="d-flex justify-content-start align-items-center"> <a href="/" class="search_item" > <img class="img_search_item" src="<?php echo $logo; ?>" alt="<?php echo $site_name; ?>" > <span class="game_name"><?php echo $site_name; ?></span> </a> </div>
//usage:
    $('input#search_input').keyup(function (e) {

        var keyword = $("input#search_input").val();

        if (keyword.length >= 3) {
            let empty = false;
            $('input#search_input').each(function () {
                empty = $(this).val().length == 0;
            });
            if (empty) {
                $('#search_button').attr('disabled', 'disabled');
            } else {
                $('#search_button').attr('disabled', false);
                $('#searchModalLabel').html('Result for ' + keyword);
                readTextFile(domain_root+"/games.json", function (text) {
                    var data = JSON.parse(text);
                    var games = search(data, keyword);

                    if (games.length > 0) {
                        console.log('result lenght:' + games.length);
                        let str_html = ''
                        games.forEach(function (item, index) {
                            str_html += `<div class="d-flex justify-content-start align-items-center my-1"> <a href="/${item.slug}.html" class="search_item w-100" > <img class="img_search_item" src="${item.image}" alt="${item.name}" > <span class="game_name">${item.name}</span> </a> </div>`;
                        });
                        $("#search_result").html(str_html);
                    } else {
                        console.log('no_result');
                        let no_result = `<center><h3 class="text-dark">No result for ${keyword}</h3></center>`
                        $("#search_result").html(no_result);
                    }

                });
            }
        }
    });


});

function search(array, value) {
    value = value.toString().toLowerCase();
    return array.filter(function (o) {
        return Object.keys(o).some(function (k) {
            return o[k].toString().toLowerCase().indexOf(value) !== -1;
        });
    });
}

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

function search_complete() {
    $("#search").keyup(delay(function (e) {
        var keyword = $("#search").val();
        if (keyword.length >= 3) {
            search_complete(keyword);
        }
    }, 700));

    function search_complete(s) {
        var metadataload = {};
        metadataload.keywords = s;
        jQuery.ajax({
            url: "game-results-search.ajax",
            data: metadataload,
            type: 'GET',
            success: function (data) {
                if (data) {
                    $("#results").show();
                    $("#results").html(data);
                    var i = document.getElementById("search");
                    i.addEventListener("focus", (function () {
                        document.getElementById("results").style.display = "block"
                    })), i.addEventListener("focusout", (function () {
                        setTimeout((function () {
                            document.getElementById("results").style.display = "none"
                        }), 500)
                    }))
                    $("#search").keyup(delay(function (e) {
                        var keyword = $("#search").val();
                        if (keyword.length < 3) {
                            $("#results").hide();
                        }
                    }, 700));
                }
            }
        });
    }

    //
    if ($("#search").val != '') {
        $("#search").on('keyup', function (e) {
            if (e.keyCode === 13) {
                window.location.replace("/search/" + $("#search").val());
            }
        });
    }

}

function slider_js() {
    $('.owl-carousel').owlCarousel({
        loop: true,
        center: false,
        dots: false,
        stagePadding: 50,
        margin: 10,
        nav: true,
        navText: [
            '<i class="fal fa-angle-left"></i>',
            '<i class="fal fa-angle-right"></i>'
        ],
        navContainer: '.main-content .custom-nav',
        autoplay: true,
        autoplayTimeout: 3000,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 7
            }
        }
    });

}

function backToTop() {
    $(window).scroll(function () {
        if ($(window).scrollTop() >= 200) {
            $('#button-gotop').addClass("show");
        } else {
            $('#button-gotop').removeClass("show");
        }
    });


    $("#button-gotop").click(function () {
        $("html, body").animate({
            scrollTop: 0
        });
        return false;
    });
    $(window).scroll(function () {
        if ($(window).scrollTop() >= 40) {
        } else {
        }
    });
}

function open_fullscreen() {
    let game = document.getElementById("game-area") || document.documentElement;
    if (!document.fullscreenElement && !document.mozFullScreenElement &&
        !document.webkitFullscreenElement && !document.msFullscreenElement) {

        if (game.requestFullscreen) {
            game.requestFullscreen();
        } else if (game.msRequestFullscreen) {
            game.msRequestFullscreen();
        } else if (game.mozRequestFullScreen) {
            game.mozRequestFullScreen();
        } else if (game.webkitRequestFullscreen) {
            game.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}

function delay(callback, ms) {
    var timer = 0;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            callback.apply(context, args);
        }, ms || 0);
    };
}
