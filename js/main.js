$(document).ready(function () {
  var p1 = Math.floor($("#titleId").offset().top);
  var p2 = Math.floor($("#aboutId").offset().top) - 200;
  var p3 = Math.floor($("#servicesId").offset().top);
  var p4 = Math.floor($("#clientsId").offset().top);
  var p5 = Math.floor($("#portfolioId").offset().top) - 600;
  var p6 = Math.floor($("#blogId").offset().top) - 600;
  var p7 = Math.floor($("#contactId").offset().top) - 600;
  var p = [p1, p2, p3, p4, p5, p6, p7];

  // 검사기를 켰다가 끄는 등의 페이지 크기를 변동시킬 수 있는 상황 후에 위치값 재조정을 위해 resize 추가
  $(window).resize(function () {
    p1 = Math.floor($("#titleId").offset().top);
    p2 = Math.floor($("#aboutId").offset().top) - 200;
    p3 = Math.floor($("#servicesId").offset().top);
    p4 = Math.floor($("#clientsId").offset().top);
    var p5 = Math.floor($("#portfolioId").offset().top) - 600;
    var p6 = Math.floor($("#blogId").offset().top) - 600;
    var p7 = Math.floor($("#contactId").offset().top) - 600;
    p = [p1, p2, p3, p4, p5, p6, p7];
  });

  // 스크롤시 헤더 배경색 및 크기 변경
  $(window).scroll(function () {
    $(window).scrollTop() >= 100
      ? $(".navbar__container").addClass("navbar__container--scroll")
      : $(".navbar__container").removeClass("navbar__container--scroll");
  });

  // 새로고침시 페이지위치에 따라 헤더 스타일적용
  if ($(window).scrollTop() >= 100) {
    $(".navbar__container").addClass("navbar__container--scroll");
  }

  // 스크롤시 각 섹션의 위치 값에 맞게 메뉴 링크 색상 변경
  $(window).scroll(function () {
    var a = $(window).scrollTop();
    if (a > p1) {
      $(".0").addClass("navbar__lnb--linkActive");
      $(".navbar__lnb--link").not(".0").removeClass("navbar__lnb--linkActive");
    } else $(".0").removeClass("navbar__lnb--linkActive");
    if (a >= p2) {
      $(".1").addClass("navbar__lnb--linkActive");
      $(".navbar__lnb--link").not(".1").removeClass("navbar__lnb--linkActive");
    }
    if (a >= p3) {
      $(".2").addClass("navbar__lnb--linkActive");
      $(".navbar__lnb--link").not(".2").removeClass("navbar__lnb--linkActive");
    }
    if (a >= p4) {
      $(".3").addClass("navbar__lnb--linkActive");
      $(".navbar__lnb--link").not(".3").removeClass("navbar__lnb--linkActive");
    }
    if (a >= p5) {
      $(".4").addClass("navbar__lnb--linkActive");
      $(".navbar__lnb--link").not(".4").removeClass("navbar__lnb--linkActive");
    }
    if (a >= p6) {
      $(".5").addClass("navbar__lnb--linkActive");
      $(".navbar__lnb--link").not(".5").removeClass("navbar__lnb--linkActive");
    }
    if (a >= p7) {
      $(".6").addClass("navbar__lnb--linkActive");
      $(".navbar__lnb--link").not(".6").removeClass("navbar__lnb--linkActive");
    }
  });

  // service 1-----------------------------------------------------------------
  // 초기위치 지정
  var sLeft = $(".services__list").width() / 2;
  var sTop = $(".services__list").height() / 2;

  $(".services__listbox").css({ position: "relative" });
  $(".services__list").each(function () {
    $(this).css({
      position: "absolute",
      left: "calc(50% - " + sLeft + "px)",
      top: "calc(50% - " + sTop + "px)",
    });

    // 스크롤이벤트시 service li분산이동
    var k;
    var m;
    var sl;
    var st;
    $(document).on("scroll", function () {
      k = 0;
      m = 0;
      if ($(window).scrollTop() >= p3 - 200) {
        $(".services__list").each(function () {
          k = k % 3;
          sl = $(this).width() * k + 20 * k;
          st = $(this).height() * Math.floor(m / 3) + 20 * Math.floor(m / 3);
          $(this).css({ left: sl, top: st });
          k++;
          m++;
          if (m == 6) {
            $(document).off("scroll");
          }
        });
      }
    });
  });

  //클릭시 해당 href속성에 맞는 y좌표로 이동
  $(".navbar__lnb--link").click(function () {
    var n = $(this).attr("data-n");
    $("html, body").animate(
      {
        scrollTop: p[n],
      },
      500
    );
    console.log(typeof p[n]);
    return false;
  });

  //마우스모양 클릭시 다음 페이지로 이동

  $(".title__wheel").click(function () {
    $("html,body").animate(
      {
        scrollTop: p2,
      },
      500
    );
  });

  // 이미지 클릭시 팝업요소 삽입 및 이미지 src 변수 설정하여 삽입 + 닫기
  $(".portfolio").append("<div class='portfolio__popup'></div>");
  $(".portfolio__popup").hide();
  var current_popup_img;
  var closeT;
  var closeR;
  $(".portfolio__photoList").click(function () {
    $(".portfolio__popup").fadeIn();
    current_popup_img = $(this).children("img").attr("src");
    $(".portfolio__popup img").remove();
    $(".portfolio__popup").append("<img src='' alt='' />");
    $(".portfolio__popup img").attr("src", current_popup_img);

    // 팝업이미지 닫기 버튼 이미지크기에 따라 위치변수설정
    closeT = $(window).height() - $(".portfolio__popup img").height();
    console.log("top값:" + closeT);
    closeR = $(window).width() - $(".portfolio__popup img").width();
    console.log("right값:" + closeR);

    // 닫기 버튼 위치 resize
    $(window).resize(function () {
      closeT = $(window).height() - $(".portfolio__popup img").height();
      closeR = $(window).width() - $(".portfolio__popup img").width();
    });
    closeT = (closeT / 2) * 0.8;
    closeR = (closeR / 2) * 0.8;
    $(".portfolio__popup--close").remove();
    $(".portfolio__popup").append(
      "<button class='portfolio__popup--close'>X</button>"
    );
    $(".portfolio__popup--close").css({
      top: closeT,
      right: closeR,
    });

    // 닫기 버튼에 이벤트 붙이기
    $(".portfolio__popup--close").bind("click", function () {
      $(".portfolio__popup").fadeOut();
    });
    return false;
  });

  // clients 슬라이드 - slick
  $(".clients__listBox").slick({
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1000,
    arrows: false,
    speed: 300,
    slidesToShow: 1,
    dots: true,
  });

  // portfolio 이미지 재정렬과 트랜지션을 위해 position으로 위치 지정
  var portL;
  var portT;
  var f, g, h, i;

  // 이미지 위치값 지정
  h = 0;
  i = 0;
  $(".portfolio__photoList").each(function () {
    h = h % 3;
    portL = $(this).width() * h + 20 * h;
    portT = $(this).height() * Math.floor(i / 3) + 20 * Math.floor(i / 3);
    $(this).css({ position: "absolute", left: portL, top: portT });
    h++;
    i++;
  });

  // portfolio 리스트 각 클래스명에 맞게 분류 및 재정렬
  $(".portfolio__list").click(function () {
    g = $(this).data("w");
    f = $(".portfolio__photoListBox").find("." + g);
    if (g != null) {
      f.show();
      $(".portfolio__photoList").not(f).hide();
      // 분류된 이미지 재정렬
      h = 0;
      i = 0;
      f.each(function () {
        h = h % 3;
        portL = $(this).width() * h + 20 * h;
        portT = $(this).height() * Math.floor(i / 3) + 20 * Math.floor(i / 3);
        $(this).css({ position: "absolute", left: portL, top: portT });
        h++;
        i++;
      });
      return false;
    } else {
      h = 0;
      i = 0;
      $(".portfolio__photoList").show();
      $(".portfolio__photoListBox li").each(function () {
        h = h % 3;
        portL = $(this).width() * h + 20 * h;
        portT = $(this).height() * Math.floor(i / 3) + 20 * Math.floor(i / 3);
        $(this).css({ position: "absolute", left: portL, top: portT });
        h++;
        i++;
      });
      return false;
    }
  });
});
