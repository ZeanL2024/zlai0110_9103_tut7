let counter = 0;

function setup() {
  createCanvas(500, 500);
  background(111);
  noStroke();
  textAlign(CENTER, CENTER); // p5.js中需要在setup中设置textAlign
}

function draw() {
  background(111);
  counter++; // Increases counter by 1
  fill(255);
  textSize(50);

  if (counter < 150) {
    text("Sean Simon", random(-5, 5) + width / 2, random(-5, 5) + height / 2);
  } else if (counter < 180) {
    text("presents", random(-5, 5) + width / 2, random(-5, 5) + height / 2);
  } else {
    textSize(80);
    text("Attack on \n Mars!", random(-5, 5) + width / 2, random(-5, 5) + height / 2);
  }

  // Draw random floating white dots
  fill(255);
  ellipse(random(width), random(height), random(15), random(15));

  // Randomly apply blur effect
  if (random(100) > 90) {
    filter(BLUR, 3);
  }

  // Randomly apply invert effect
  if (random(100) > 95) {
    filter(INVERT);
  }
}
