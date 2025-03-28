var slideShowStatus = document.getElementById("status");
console.log("default "+slideShowStatus.checked);
imagesJSON = {captions:["A photo of me visiting the Apple Campus in Cupertino California",
        "Apple is my favorite Company",
        "This is a photo of me at the intel headquarters",
        "This is a photo of me at the Computer History Museum",
        "A photo of me with an orginal Apple 2",
        "A close up of the Apple 2 signed by Steve Wozniak",
        "This is me playing against Saskatoon Blades",
        "Close up shot of my mask",
        "This is the first view of the arcade machine I made from scratch",
        "This is the second view of the arcade machine I made from scratch",
        "This is the Simon Says game I made for one of my first computing classes",
        "A Sunflower iMac that I gutted and modified to be an external display",
        "This is the iMac DVI connection that was added to the proprietary apple connector",
        "The original iPhone 2G vs an iPhone X wrapped to look like the orginal",
        "A fun photo of my laptop",
        "An original hand painting of Steve Jobs by Glen Ronald",
        "LED analysis at the University Nano Fab facility",
        "A collection of electronics and textbooks in my office",
        "I am a big fan of the Artist Eminem, this is a brick from his childhood home",
        "Another view of the brick."],
    images:["Photos/apple.JPG",
        "Photos/apple2.JPG",
        "Photos/intel.jpg",
        "Photos/computerHist.jpg",
        "Photos/appleTWOME.JPG",
        "Photos/appleTWO.JPG",
        "Photos/saskatoon.JPG",
        "Photos/mask.JPG",
        "Photos/arcade.JPG",
        "Photos/arcade2.JPG",
        "Photos/simon.png",
        "Photos/imac.jpg",
        "Photos/imacDVI.jpg",
        "Photos/iphone2.jpg",
        "Photos/laptop.jpg",
        "Photos/steveJobs.jpg",
        "Photos/nano.jpg",
        "Photos/office.jpg",
        "Photos/eminemBrick.jpg",
        "Photos/eminemBrick2.jpg"]};
myJSON = JSON.stringify(imagesJSON);
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var index = 0;
var length = imagesJSON.images.length;
var intervalID;
var currentPhoto = imagesJSON.images[index];
var currentCaption = imagesJSON.captions[index];


function startSlideshow(){
    intervalID = setInterval(nextPhoto, 5000);
}

function startRandomSlideshow(){
    intervalID = stopSlideshow();
    intervalID = setInterval(nextRandomPhoto, 5000);
}

function stopSlideshow(){
    clearInterval(intervalID);
}

function transitions() {
    slideShowStatus = document.getElementById("status");
    if(slideShowStatus.checked == false) stopSlideshow(intervalID);
    if(slideShowStatus.checked == true) startSlideshow(intervalID);
}

function randomTransitions() {
    var randomStatus = document.getElementById("randomMode");
    console.log(randomStatus.checked+" this is random status" +slideShowStatus.checked + "this is slideshow status");
    if(randomStatus.checked == false && slideShowStatus.checked==false){
        stopSlideshow(intervalID);//stop all slideshows
        showButtons();
    }
    if(randomStatus.checked == false && slideShowStatus.checked ==true){
        stopSlideshow(intervalID); // stop the random slideshow
        startSlideshow(intervalID); //start the regular slideshow
        showButtons();
    }
    if(randomStatus.checked == true){
        startRandomSlideshow(intervalID);
        hideButtons();
    }

}
function myCanvas() {
    currentPhoto = imagesJSON.images[index];
    currentCaption = imagesJSON.captions[index];
    var img = new Image();
    img.src = currentPhoto;
    document.getElementById("Caption").innerHTML = currentCaption;
    img.onload = function() { //ensures that the image is loaded before it is drawn. Fix from https://stackoverflow.com/questions/21316402/canvas-image-not-displaying-until-second-attempt
        var hRatio = canvas.width / img.width    ;
        var vRatio = canvas.height / img.height  ;
        var ratio  = Math.min ( hRatio, vRatio );
        var centerShift_x = ( canvas.width - img.width*ratio ) / 2;
        var centerShift_y = ( canvas.height - img.height*ratio ) / 2;
        ctx.drawImage(img, 0,0, img.width, img.height,
            centerShift_x,centerShift_y,img.width*ratio, img.height*ratio);
        // ctx.drawImage(img, 0,0,);

    }
}


function nextPhoto(){
    var img = new Image();
    img.src = currentPhoto;

    if (index != length-1){
        // var scaleFactor = 1;
        // for(let i=0;i<100;i++) {
        //     console.log(i);
        //     setTimeout(function () {
        //         console.log(scaleFactor);
        //         ctx.clearRect(0, 0, canvas.width, canvas.height); // clearing the canvas so that a new picture can be drawn
        //         img.style.opacity = scaleFactor;
        //         ctx.drawImage(img, canvas.width / 2 - img.width / 2,
        //             canvas.height / 2 - img.height / 2); //centering the images
        //         scaleFactor -= 0.1;
        //         ctx.save();
        //         ctx = canvas.getContext("2d");
        //
        //     }, 10);
        // }

        ctx.clearRect(0, 0, canvas.width, canvas.height); // clearing the canvas so that a new picture can be drawn
        ctx.setGlobalAlpha = 1;
        index ++;
        myCanvas();
    }
}

function previousPhoto() {
    if (index != 0){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        index --;
        myCanvas();
    }
}

function nextRandomPhoto() {
    console.log("is this running?");
    index = Math.random() * (length-1);
    index = Math.round(index);
    console.log(index + " this is index" );
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    myCanvas();
}

function showButtons() {
    document.getElementById("previous").disabled = false;
    document.getElementById("next").disabled = false;
    document.getElementById("previous").hidden = false;
    document.getElementById("next").hidden = false;
}
function hideButtons(){
    document.getElementById("previous").disabled = true;
    document.getElementById("previous").hidden = true;
    document.getElementById("next").disabled = true;
    document.getElementById("next").hidden = true;
}
function transitionEffect(img){
    img.scale(0,0);
}