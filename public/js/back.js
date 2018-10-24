var ocolors = ["rgb(209, 39, 33)","rgb(139, 33, 24)", "rgb(231, 156, 78)", "rgb(102, 33, 51)"];
var currentIndex = 0;

setInterval(function() {
document.body.style.cssText = "background-color: " + ocolors[currentIndex];
currentIndex++;
if (currentIndex == undefined || currentIndex >= ocolors.length) {
 currentIndex = 0;
}
}, 2000);
