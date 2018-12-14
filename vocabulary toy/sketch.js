// Declare a "SerialPort" object
var serial;
var latestData = "waiting for data";  // you'll use this to write incoming data to the canvas

var sensors = [];

var splitter;

//var showsplittext;

var diameter0, diameter1, diameter2; //use to change the diameter of 3 circles

var img;
var song;

function preload(){
    //song = loadSound('../sound/audio.mp3');
    soundFormats('mp3');
    mySound = loadSound('sound/Happy.wav')
    
}


function setup() {
  createCanvas(windowWidth, windowHeight);

 img = loadImage ("assets/night.png");
  //song.loop();
  mySound.setVolume(0.1);
  mySound.play();
    
  //Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Get a list the ports available
  // You should have a callback defined to see the results
  serial.list();

  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.open("/dev/cu.usbmodem1461");

  // Here are the callbacks that you can register

  // When we connect to the underlying server
  serial.on('connected', serverConnected);

  // When we get a list of serial ports that are available
  serial.on('list', gotList);
  // OR
  //serial.onList(gotList);

  // When we some data from the serial port
  serial.on('data', gotData);
  // OR
  //serial.onData(gotData);

  // When or if we get an error
  serial.on('error', gotError);
  // OR
  //serial.onError(gotError);

  // When our serial port is opened and ready for read/write
  serial.on('open', gotOpen);
  // OR
  //serial.onOpen(gotOpen);

  // Callback to get the raw data, as it comes in for handling yourself
  //serial.on('rawdata', gotRawData);
  // OR
  //serial.onRawData(gotRawData);
}

// We are connected and ready to go
function serverConnected() {
  println("Connected to Server");
}

// Got the list of ports
function gotList(thelist) {
  println("List of Serial Ports:");
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    println(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  println("Serial Port is Open");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  println(theerror);
}

// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readLine();  // read the incoming string
  trim(currentString);                    // remove any trailing whitespace
  if (!currentString) return;             // if the string is empty, do no more
  //console.log(currentString);             // println the string
  latestData = currentString;            // save it for the draw method
  console.log("latestData" + latestData);   //check to see if data is coming in
  splitter = split(latestData, ',');       // split each number using the comma as a delimiter
  //console.log("splitter[0]" + splitter[0]); 
  diameter0 = splitter[0];                 //put the first sensor's data into a variable
  diameter1 = splitter[1];
  diameter2 = splitter[2];    
     
    
    
//showsplittext = (splitter[0]);
    
}

// We got raw from the serial port
function gotRawData(thedata) {
  println("gotRawData" + thedata);
}

// Methods available
// serial.read() returns a single byte of data (first in the buffer)
// serial.readChar() returns a single char 'A', 'a'
// serial.readBytes() returns all of the data available as an array of bytes
// serial.readBytesUntil('\n') returns all of the data available until a '\n' (line break) is encountered
// serial.readString() retunrs all of the data available as a string
// serial.readStringUntil('\n') returns all of the data available as a string until a specific string is encountered
// serial.readLine() calls readStringUntil with "\r\n" typical linebreak carriage return combination
// serial.last() returns the last byte of data from the buffer
// serial.lastChar() returns the last byte of data from the buffer as a char
// serial.clear() clears the underlying serial buffer
// serial.available() returns the number of bytes available in the buffer
// serial.write(somevar) writes out the value of somevar to the serial device







function draw() {
  background(255,255,255);
    image(img, 0, 0,2048, 1078);
   //background
    stroke(158,198,244);
     strokeWeight(10);
    noFill();
    ellipse(diameter2,250,100,100);
    
    arc(1850, 1200, 120, 120, 45, PI+QUARTER_PI, CHORD);
    ellipse(1700,diameter1,60,60);
    bezier(1500, 100, 1520, 130, 1540, 100, 1580, 130);
    ellipse(1050,diameter0,100,100);
    bezier(140, 1020, 160, 1050, 180, 1020, 200, 1050);
    
    stroke(34,111,200);
     strokeWeight(10);
    noFill();
    arc(350, 500, 100, 100, 45, PI+QUARTER_PI, CHORD);
    arc(1600, 800, 60, 60, HALF_PI, PI);
    arc(120, 800, 60, 60, HALF_PI, PI);
    bezier(500, 1000, 520, 970, 540, 1000, 580, 970);
    ellipse(1000,1000,50,50);
    
    
    //body
    fill(255,217,48);
    noStroke();
    rect(500,150,800,600);
    triangle(500, 150, 550, 40, 600, 150);
    triangle(1200, 150, 1250, 40, 1300, 150);
    
    
    //legs
    fill(255,77,23);
    rect(760,750,40,diameter2);
    rect(1000,750,40,diameter2);
   
    //eyes and mouth
    stroke(255,77,23);
    noFill();
  strokeWeight(30);    
  ellipse(750, 320, 280, diameter0);
  ellipse(1050, 320, 280, diameter0);
 
    fill(255,77,23);
    noStroke();
    ellipse(770, 320, 30,30);
     ellipse(1050, 320, 30,30);
    
    triangle(870, 450, 900, 480, 930, 450);
   
// wings
 fill(255,77,23);
    textSize(diameter1);
   // text("C ", diameter1, 800);
     text("w ", 540, 720);
     text("w ", 1050, 720);
    //text("w ", 460, 720);
    // text("w ", 1050, 720);
    

   //song.play();

 

   // noFill();
   // stroke(255, 102, 0);
   // bezier(500, 800, 550, diameter2, 750, diameter2, 800, 800);
    //arc(300, 800, 60, 60, HALF_PI, PI);
    //arc(500, 500, 200, 200, 45, PI+QUARTER_PI, CHORD);
    
    //noFill();
    //stroke(255, 102, 0);
//curve(500, 800, 550, 900, 750, 900, 800, 800);
  //ellipse(300, 100, diameter2, diameter2);
    
  //text(latestData, 10, 10);
    //text(showsplittext, 300, 300);
  // Polling method
  /*
  if (serial.available() > 0) {
  var data = serial.read();
  ellipse(50,50,data,data);
}
*/
}
