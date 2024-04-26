// Variables to hold image and image segments
let img;
let numSegments = 10;
let segments = [];

// Variables for drawing segments and the circle effect
let drawSegments = true;
let circle = {
  x: 0,
  y: 0,
  radius: 20, // 初始半径
  visible: false,
  expanding: false, // 是否正在展开
  maxRadius: 40 // 最大半径
};

// Load the image from disk
function preload() {
  img = loadImage('/assets/Mona_Lisa.jpg');
}

// Setup the canvas and divide the image into segments
function setup() {
  createCanvas(img.width, img.height);
  let segmentWidth = img.width / numSegments;
  let segmentHeight = img.height / numSegments;

  // Create image segments
  for (let segYPos = 0; segYPos < img.height; segYPos += segmentHeight) {
    for (let segXPos = 0; segXPos < img.width; segXPos += segmentWidth) {
      let segmentColour = img.get(segXPos + segmentWidth / 2, segYPos + segmentHeight / 2);
      let segment = new ImageSegment(segXPos, segYPos, segmentWidth, segmentHeight, segmentColour);
      segments.push(segment);
    }
  }
}

// Draw function to handle all drawing on canvas
function draw() {
  background(0);
  if (drawSegments) {
    segments.forEach(segment => {
      if (segment.contains(mouseX, mouseY)) {
        stroke(255, 0, 0); // Red for hover
      } else {
        stroke(0); // Black otherwise
      }
      segment.draw();
    });
  } else {
    image(img, 0, 0);
  }

  // Draw the circle animation
  if (circle.visible) {
    noFill();
    stroke(128); // Grey stroke
    ellipse(circle.x, circle.y, circle.radius * 2);
    if (circle.expanding) {
      circle.radius += 5; // Increase radius for animation effect
      if (circle.radius > circle.maxRadius) {
        circle.visible = false; // Hide circle when max radius is exceeded
        circle.expanding = false; // Stop expanding
      }
    }
  }
}

// Mouse events for interaction
function mousePressed() {
  circle.x = mouseX;
  circle.y = mouseY;
  circle.radius = 20;
  circle.visible = true;
  circle.expanding = false;

  segments.forEach(segment => {
    if (segment.contains(mouseX, mouseY)) {
      segment.displayOriginal = true;  // Display original image segment on click
    } else {
      segment.displayOriginal = false;
    }
  });
}

function mouseReleased() {
  circle.expanding = true; // Start expanding circle on mouse release
  segments.forEach(segment => {
    segment.displayOriginal = false;  // Reset image segment display on mouse release
  });
}

// ImageSegment class to manage each image segment
class ImageSegment {
  constructor(x, y, width, height, colour) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.colour = colour;
    this.displayOriginal = false;
  }

  draw() {
    // Check if the mouse is over the segment
    if (this.contains(mouseX, mouseY)) {
      stroke(255, 0, 0); // Red stroke for hover
    } else {
      stroke(0); // Black stroke otherwise
    }

    if (this.displayOriginal) {
      // Draw original image segment
      image(img, this.x, this.y, this.width, this.height, this.x, this.y, this.width, this.height);
    } else {
      // Draw modified segment with fill color, leave 1 pixel space for borders
      fill(this.colour);
      rect(this.x, this.y, this.width - 1, this.height - 1);
    }
  }

  contains(px, py) {
    return px >= this.x && px <= this.x + this.width && py >= this.y && py <= this.y + this.height;
  }
}

