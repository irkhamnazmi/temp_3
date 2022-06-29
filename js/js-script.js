(function($) {
    "use strict";
    if ($(".fancybox").length) {
        $(".fancybox").fancybox({
            openEffect: "elastic",
            closeEffect: "elastic",
            wrapCSS: "project-fancybox-title-style"
        });
    }
    if ($(".video-play-btn").length) {
        $(".video-play-btn").on("click", function() {
            $.fancybox({
                href: this.href,
                type: $(this).data("type"),
                'title': this.title,
                helpers: {
                    title: {
                        type: 'inside'
                    },
                    media: {}
                },
                beforeShow: function() {
                    $(".fancybox-wrap").addClass("gallery-fancybox");
                }
            });
            return false
        });
    }
    $('#konten').hide();
    $("#open").click(function() {
        $('.thebegining').hide();
        $('#konten').show()
        $("#audio").get(0).play();
        document.documentElement.requestFullscreen();
    });
    var navItems = document.querySelectorAll(".mobile-bottom-nav__item");
    navItems.forEach(function(e, i) {
        e.addEventListener("click", function(e) {
            navItems.forEach(function(e2, i2) {
                e2.classList.remove("mobile-bottom-nav__item--active");
            })
            this.classList.add("mobile-bottom-nav__item--active");
        });
    });
    $(".icons").click(function() {
        $("#nav2").animate({
            height: "toggle",
            opacity: "toggle",
        }, 100, 'linear');
        $("#lain").animate({
            height: "toggle",
            opacity: "toggle",
        }, 200, 'linear');
        $("#tutup").toggleClass('rotate');
    });
    $("#lain").click(function() {
        $("#nav2").animate({
            height: "toggle",
            opacity: "toggle",
        }, 100, 'linear');
        $("#lain").animate({
            height: "toggle",
            opacity: "toggle",
        }, 200, 'linear');
        $("#tutup").toggleClass('rotate');
    });
    var $allContentDivs = $('#sampul-konten, #mempelai-konten, #acara-konten, #album-konten, #ucapan-konten, #lokasi-konten, #cerita-konten').hide();
    $("#sampul-konten").show();
    $(".dekorasi-sampul").show();
    $(".dekorasi-all").hide();
    $('#sampul, #mempelai, #acara, #album, #ucapan, #lokasi, #cerita').click(function() {
        var $contentDiv = $("#" + this.id + "-konten");
        if (this.id == "sampul") {
            $("#imgbawah").hide();
            $(".dekorasi-sampul").show();
            $(".dekorasi-all").hide();
        } else {
            $("#imgbawah").show();
            $(".dekorasi-sampul").hide();
            $(".dekorasi-all").show();
        }
        if ($contentDiv.is(":visible")) {} else {
            $allContentDivs.hide();
            $contentDiv.show();
        }
        $('body,html').animate({
            scrollTop: 0
        }, 600);
    });
    $(".komen").slice(0, 4).show();
    $("#loadMore").on('click', function(e) {
        e.preventDefault();
        $(".komen:hidden").slice(0, 4).slideDown();
        if ($(".komen:hidden").length == 0) {
            $("#loadMore").fadeOut('slow');
        }
        $('html,body').animate({
            scrollTop: $(this).offset().top
        }, 1500);
    });
    moment.locale('id');
    var date_resepsi = moment(tanggal_resepsi).format('dddd, Do MMMM YYYY');
    var date_akad = moment(tanggal_akad).format('dddd, Do MMMM YYYY');
    var date_pernikahan = moment(tanggal_resepsi).format('DD / MM / YYYY');
    $('#tanggal-acara-resepsi').html(date_resepsi);
    $('#tanggal-acara-akad').html(date_akad);
    $('.tanggal-weddingnya').html(date_pernikahan);
    $('#submitKomen').on('click', function(event) {
        $('#loading_').css('display', 'inline');
        $('#submitKomen').css('display', 'none');
        var nama = $('#nama').val();
        var komentar = $('#komentar').val();
        $.ajax({
            url: base_url + '/add_komentar',
            method: "POST",
            data: {
                nama: nama,
                komentar: komentar
            },
            async: true,
            dataType: 'html',
            success: function(hasil) {
                var json = JSON.parse(hasil);
                var status = json.status;
                var nama = json.nama;
                var komentar = json.komentar;
                console.log(json);
                if (status == 'sukses') {
                    $('.layout-komen').append("<div class='komen' style='display:block'><div class='col-12 komen-nama'>" + nama + "</div><div class='col-12 komen-isi'>" + komentar + "</div></div>");
                    $(".komen:hidden").slice(0, 100).slideDown();
                    $("html, body").animate({
                        scrollTop: $(document).height()
                    }, 1000);
                    $("#loadMore").fadeOut('slow');
                    $('#loading_').css('display', 'none');
                    $('#submitKomen').css('display', 'block');
                    $('#submitKomen').prop('disabled', true);
                }
            }
        });
    });
})(window.jQuery);