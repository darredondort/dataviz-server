let s = p => {
  // client-side js, loaded by index.html
  // run by the browser each time the page is loaded

  let canvas02;
  console.log("hello world :o");
  p.setup = function() {
    canvas02 = p.createCanvas(500, 350);
    canvas02.parent("canvasContainer02");
    // p.background(240, 150, 100);
    p.background("#181618");
    getData();
  };
  // fetch the initial list of dreams

  // p.draw = function() {};

  let getData = function() {
    fetch("/data")
      .then(response => response.json()) // parse the JSON from the server
      .then(data => {
        console.log(data);
        let x = p.width / 2;
        let y = p.height / 4;
        for (let i = 0; i < data.length; i++) {
          let d = p.map(data[i], 1, 1950, 1, 2000);
          p.stroke(240, 150, 100);

          p.noFill();
          let scale = 1.8;
          p.ellipse(x, y, p.sqrt(d)*scale, p.sqrt(d)*scale);
          p.fill("#F2F2F2");

          p.noStroke();
          p.textSize(16);
          p.textFont("Playfair Display");
          p.textAlign(p.CENTER, p.BOTTOM);
          // p.text("Top incendios Bosque de la Primavera 2019", x, 100);
          p.fill("#F2F2F2");

          p.textSize(map(data[i], 1, 1950, 10, 48));
          p.textAlign(p.LEFT, p.CENTER);

          p.text(data[i] + " ha", x, y);
          y += p.height / 4;
        }
      });
  };
};

let myp5 = new p5(s);
