/**
 * 
 */
var game = sessionStorage.getItem("game");
console.log("game is "+game);
let xhr = new XMLHttpRequest();

xhr.open('GET', 'http://192.168.137.14:3000/leaderboard/'+game);

xhr.responseType = 'json';

xhr.send();

// the response is {"message": "Hello, world!"}
xhr.onload = function() {
  let responseObj = xhr.response;
  console.log(responseObj);
  var first = document.getElementById("firstlead");
  var second = document.getElementById("secondlead");
  var third = document.getElementById("thirdlead");
  var fourth = document.getElementById("fourthlead");
  var fifth = document.getElementById("fifthlead");
  first.innerHTML="<mark>"+responseObj[0].username+"</mark> <small>"+responseObj[0].score+" seconds</small>";
  second.innerHTML="<mark>"+responseObj[1].username+"</mark> <small>"+responseObj[1].score+" seconds</small>";
  third.innerHTML="<mark>"+responseObj[2].username+"</mark> <small>"+responseObj[2].score+" seconds</small>";
  fourth.innerHTML="<mark>"+responseObj[3].username+"</mark> <small>"+responseObj[3].score+" seconds</small>";
  fifth.innerHTML="<mark>"+responseObj[4].username+"</mark> <small>"+responseObj[4].score+" seconds</small>";
};			