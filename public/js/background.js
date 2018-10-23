var colors = ["purple","rgb(222, 208, 31)", "rgb(103, 171, 189)", "rgb(28, 233, 36)"];
var currentIndex = 0;

setInterval(function() {
document.body.style.cssText = "background-color: " + colors[currentIndex];
currentIndex++;
if (currentIndex == undefined || currentIndex >= colors.length) {
 currentIndex = 0;
}
}, 2000);
