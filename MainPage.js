
interestsArray = []

function changeInterest(interest, buttonId){
    if (interestsArray.includes(interest)){
        for (let i=0; i<interestsArray.length;i++){
            if (interestsArray[i]==interest){
                interestsArray[i]="";
                
                // If the array is now empty, replace it with []
                empty = true;
                for (let j=0; j<interestsArray.length;j++){
                    if (interestsArray[j]!=""){
                        empty = false;
                    }
                }
                if (empty){
                    interestsArray = [];
                }
            }
        }

    } else {
        interestsArray.push(interest)
    }
    thisButton = document.getElementById(buttonId)
    if (thisButton.style.backgroundColor == "greenyellow"){
        thisButton.style.backgroundColor = "red"
    } else {
        thisButton.style.backgroundColor = "greenyellow"
    }
    

    document.getElementById("examplePost").outerHTML="<div class='post' id='examplePost' style='float: left'></div>"
    loadPosts();
}

function openPage(url){
    window.open(url,'_self')
}

function outputPost(image, video, title, text){
    
    myTemp = document.getElementById('myTemplate');
    normalContent = document.getElementById('examplePost');

    item = myTemp.content.querySelector("div");

    postTitle = document.createElement("h2")
    postTitle.textContent = title
    normalContent.appendChild(postTitle);

    // Add video
    if (video!=null){
        normalContent.appendChild(video);
    } else if (image!=null) {
        normalContent.appendChild(image);
    }
    
    newContent = document.importNode(item, true);
    newContent.textAlign = "center"
    newContent.innerHTML += text + "<br /><br />";

    normalContent.appendChild(newContent);
}

function loadPosts(){

    // Input the content for the post
    titleArray = ["Llandaff North Flood Defenses", "Do we ban anti-homelessness architecture?"]
    
    textArray = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dignissim eu diam id maximus. Phasellus felis leo, malesuada quis dolor a, consectetur blandit odio. Suspendisse faucibus nisi vel sapien accumsan, eget gravida diam ullamcorper. Sed cursus metus at dolor elementum, quis condimentum quam euismod. In hac habitasse platea dictumst. Cras vitae rutrum dui, vitae suscipit risus. Nulla non ante sed elit pellentesque venenatis vitae sed elit. Nullam a feugiat leo. Mauris tempor libero sed diam eleifend venenatis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque sollicitudin metus nunc, sit amet mollis leo molestie vel.", "Ipsum"]

    pinkFlower = new Image();
    pinkFlower.src = "pinkFlower.jpg";

    yellowFlower = new Image();
    yellowFlower.src = "yellowFlower.jpg";

    imageArray = [pinkFlower, yellowFlower]

    darkWaves = document.createElement("VIDEO");
    if (darkWaves.canPlayType("video/mp4")) {
      darkWaves.setAttribute("src","DarkWaves.mp4");
    }
    darkWaves.setAttribute("width", 500);
    darkWaves.controls = true;

    birdseye = document.createElement("VIDEO");
    if (birdseye.canPlayType("video/mp4")) {
      birdseye.setAttribute("src","Birdseye.mp4");
    }
    birdseye.setAttribute("width", 500);
    birdseye.controls = true;

    videoArray = [darkWaves, null]

    tagsArray = [["Llandaff North","Environment"],["Homelessness"]]

    // For each post, output the post with the new content
    var somethingsBeenPosted = false;
    for (let i=0; i<textArray.length; i++){
        // check to see if the post is filtered or not
        var interested = false;
        if (interestsArray.length == 0){
            interested = true;
        } else {
            for (let j=0; j<tagsArray[i].length; j++){
                curr = tagsArray[i][j];
                if (interestsArray.includes(curr)){
                    interested = true;
                }
            }
        }
        if (interested){
            outputPost(imageArray[i], videoArray[i], titleArray[i], textArray[i]);
            somethingsBeenPosted=true
        }
        
    }
    if (somethingsBeenPosted==false){
        outputPost(null, null, "Nothing here", "Sorry we couldn't find any posts related to your interests");
    }
 
}

function loadImageInput(){
    seeFile = document.getElementById('fInput');

    if (seeFile.files[0].type=="video/mp4"){
         newMedia = document.createElement("VIDEO")
         newMedia.setAttribute("width", 500)
         newMedia.controls = true
    } else {
        newMedia = new Image();
    }

    newMedia.src = seeFile.files[0].name
  
    displayer = document.getElementById('ImageVideo Displayer')
    document.getElementById('ImageVideo Displayer').outerHTML="<div id='ImageVideo Displayer'></div>"
    document.getElementById('ImageVideo Displayer').appendChild(newMedia)
}

function grabData(){
    titleInput = document.getElementById("TitleInput")
    textInput = document.getElementById("TextInput")

    cbCardiff = document.getElementById("cbCardiff")
    cbLlandaffNorth = document.getElementById("cbLlandaffNorth")
    cbHeath = document.getElementById("cbHeath")
    cbMentalHealth = document.getElementById("cbMentalHealth")
    cbEnvironment = document.getElementById("cbEnvironment")
    cbHomelessness = document.getElementById("cbHomelessness")
    cbKnifeCrime = document.getElementById("cbKnifeCrime")
    cbList = [cbCardiff,cbLlandaffNorth,cbHeath,cbMentalHealth,cbEnvironment,cbHomelessness,cbKnifeCrime]

    // Clear all inputs
    titleInput.value=""
    textInput.value=""

    for (let i=0; i<cbList.length;i++){
        cbList[i].checked = false
    }
    document.getElementById("ImageVideo Displayer").outerHTML="<div id='ImageVideo Displayer'></div>"
    
}