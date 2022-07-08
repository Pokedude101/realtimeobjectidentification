function setup() {
  canvas = createCanvas(300, 300);
  canvas.position(325, 250);
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MoblieNet', modeLoaded);
}

function modeLoaded(){
  console.log("Model Loaded");
}

function preload(){
}

function draw(){
  image(video, 0, 0, 300, 300);
  classifier.classify(video, gotResults);
}

previous_result = "";

function gotResults(error, results){
    if(error){
      console.error(error);
    }
    else{
      if((results[0].confidence > 0.5) && (previous_result != results[0].label)){
        console.log(results);
        previous_result = results[0].label;
        synth = window.speechSynthesis;
        speak_data = 'Object detected is ' + results[0].label;
        utterThis = new SpeechSynthesisUtterance(speak_data);
        synth.speak(utterThis);

        document.getElementById("object").innerHTML = results[0].label;
        document.getElementById("accuracy").innerHTML = results[0].confidence.toFixed(3);
      }
    }
    
}



