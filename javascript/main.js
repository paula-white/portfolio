
// The extension of the navigation bar
$(".hamburger").on("click", function () {
  // console.log("clicked")
  // $(".hamburger").toggle()

  $("header").toggleClass("toggle", function() {

  });
   setTimeout(function () {
   $("nav a").toggleClass("linktoggle");
 }, 1000);
});
