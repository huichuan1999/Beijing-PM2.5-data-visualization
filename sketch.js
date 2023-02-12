//TURN OFF AUTO-REFRESH NOW !!!

//From: https://api.openaq.org
let airData;
let loading = true;
//let url = "https://api.openaq.org/v2/measurements?location_id=225765&parameter=pm25&parameter=pm10&parameter=no2&date_from=2023-02-06T00:00:00Z&date_to=2023-02-12T00:00:00Z&limit=1000";
let url =
  "https://api.openaq.org/v2/measurements?location_id=8833&parameter=pm25&parameter=o3&date_from=2023-02-11T00:00:00Z&date_to=2023-02-12T00:00:00Z&limit=1000";

let randomNum = [];

function setup() {
  createCanvas(600, 600);

  for (let i = 1; i < 26; i++) {
    randomNum.push(random(100));
  }

  //HAVE YOU TURNED OFF AUTO-REFRESH?

  // perform request
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("Got data");
      console.log(data);
      //HAVE YOU TURNED OFF AUTO-REFRESH?

      airData = data;
      loading = false;
    })
    .catch(function (err) {
      console.log(`Something went wrong: ${err}`);
    });
}

function draw() {
  //textAlign(CENTER);
  background(255);

  if (loading) {
    // loading screen
    textSize(30);
    text("Loading...", 0, height / 2 - 25, width, 50);
  } else {
    //display using the simple line-graph code
    //HAVE YOU TURNED OFF AUTO-REFRESH?

    for (let i = 1; i < airData.results.length + 1; i++) {
      let x = (i * width) / airData.results.length - width / airData.results.length;
      
      stroke(0, 10);
      line(x, 100, x, height);

      let col1 = map((i * width) / 24, width, 0, 255, 0);
      fill(0, col1 / 2);
      rect(x, 0, width / 24, airData.results[i - 1].value * 2);

      let col2 = map(airData.results[i - 1].value, 0, 200, 0, 255);
      fill(0, col2 / 2);
      //randomSeed(99);
      ellipse(x, height * 0.9 - randomNum[i], airData.results[i - 1].value);
      
      textSize(10);
      fill(0);
      text([i - 1] + ":00",x,airData.results[i - 1].value * 2 + 10,width,50);

      fill(255,20);
      noStroke();
      rect(0, 0, width, 40);
      
      textSize(20);
      fill(0);
      text(airData.results[2].location +" PM2.5 value changing in 24 hours, unit: µg/m³",0,10,width,50);
    }
  }
}
