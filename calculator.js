/**
	Day calculator class
	@author Jonah Rubin
	updated 1/9/2019
*/

// initialize variables
var currentTime = new Date();
let mobilepx = 600;
updateDay(currentTime);
var ahcDay;

// convert UTC 'day 0' to local time
function treatAsUTC(date) {
    var result = new Date(date);
    result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
    return result;
}

// get number of days passed
function daysBetween(startDate, endDate) {
    var millisecondsPerDay = 24 * 60 * 60 * 1000;
    return (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay;
}

// calculate day for custom requests
function updateDay(newDate) {

  // 'day 0'
  let day0UTC = new Date(2019, 0, 1, 0);
  day0Loc = new Date(day0UTC.toUTCString());

  var total = Math.floor(daysBetween(day0Loc, newDate));

  // account for dates before or after Jan 1
  if (total < 0) {
    ahcDay = total % 9 + 8;
  } else {
    ahcDay =  total % 9;
  }

  // for debugging
  console.log(total);
  console.log(total % 9);
  console.log(ahcDay);

  // get client view to adjust image size
  var x = getSize();

  // adjust size
  var size = "large";

  if (x < mobilepx) {
    size = "mobile";
  }

	// set backgrounds
	// let colors = ["32234E", "000000", "FFFFFF", "000000", "FFFFFF",
	//               "000000", "D0D0C8", "2652B3", "FFFFFF"]

  // set background image by calculated day
  document.getElementById("bckrd").src = "images/" + size + "/" + ahcDay + ".jpg";

	// document.body.style.backgroundColor = "#" + colors[ahcDay];
}

// switch to mobile image if screen gets too small
function resizeImage() {
  var x = getSize();

  if (x > mobilepx) {
    document.getElementById("bckrd").src = "images/large/" + ahcDay + ".jpg";
  } else {
    document.getElementById("bckrd").src = "images/mobile/" + ahcDay + ".jpg";
  }
}

// recieve form input and do calculations
function updateDayFromForm(month, day, year) {
  var date = new Date(year, month-1, day);
  updateDay(date);
}

// get info about the user view
function getSize() {
  var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;

    return x;
}
