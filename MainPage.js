
interestsArray = ["Llandaff North", "Homelessness", "Knife Crime"]

function changeInterest(interest){
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
    console.log(interestsArray)

    document.getElementById("examplePost").outerHTML="<div class='post', id='examplePost'></div>"
    loadPosts();
}

function openPage(url){
    window.open(url,'_self')
}

function outputPost(image, video, title, text){
    
    myTemp = document.getElementById('myTemplate');
    normalContent = document.getElementById('examplePost');

    item = myTemp.content.querySelector("div");

    newContent = document.importNode(item, true);
    newContent.textContent += title;
    normalContent.appendChild(newContent);

    // Add video
    if (video!=null){
        normalContent.appendChild(video);
    } else if (image!=null) {
        normalContent.appendChild(image);
    }
    
    newContent = document.importNode(item, true);
    newContent.innerHTML += text + "<br /><br />";

    normalContent.appendChild(newContent);
}

function loadPosts(){
    /*
    myTemp = document.getElementById('myTemplate');
    normalContent = document.getElementById('fixedPost');
    tempContent = myTemp.content.cloneNode(true);
    normalContent.appendChild(tempContent);
    */

    // Input the content for the post
    titleArray = ["Llandaff North Flood Defenses", "Do we ban anti-homelessness architecture?"]
    
    textArray = ["Lorum", "Ipsum"]

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

    tagsArray = [["Cardiff", "Mental Health","Knife Crime"],["Homelessness"]]

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