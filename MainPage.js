const backendLink = "https://cardiff.jellypro.xyz/api/v1"
const authorisation = "Basic YWJjQHBtLm1lOlgmZShbSVM7VkoneEtNZV8="
interestsArray = []
allInterests = [
    "Cultural Events",
    "Crime",
    "Education",
    "Environment",
    "Health & Fitness",
    "Homelessness",
    "Human Rights",
    "Local Campaigns",
    "Mental Health",
    "Adamsdown",
    "Caerau",
    "Canton & Pontcanna",
    "Cathays & City Centre",
    "Creigiau",
    "Ely East",
    "Ely West",
    "Fairwater & St Fagans",
    "Gabalfa",
    "Grangetown",
    "Gwaelod y Garth",
    "Heath & Birchgrove",
    "Leckwith",
    "Lisvane",
    "Llandaff & Llandaff North",
    "Llanedyrn & Cyncoed",
    "Llanishen",
    "Lower Llanrumney",
    "Maindy",
    "Morganstown & Radyr",
    "Mynachdy",
    "North Butetown",
    "Pentrebane",
    "Pentwyn & Pontprennau",
    "Pentyrch",
    "Plasnewydd",
    "Plott",
    "Rhiwbina",
    "Riverside",
    "Roath & Penylan",
    "Rumney",
    "South Butetown & Cardiff Bay",
    "St Mellons & Old St Mellons",
    "Tongwynlais",
    "Tremorfa & Pengam Green",
    "Trowbridge",
    "Upper Llanrumney",
    "Whitchurch"
    ]


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
    //loadPosts()
    prepAPIPostLoad()

}

function openPage(url){
    window.open(url,'_self')
}

function interestButtons(){
    interestMenu = document.getElementById("interestMenu")
    for (let i=0; i<allInterests.length;i++){
        button = document.createElement('button');       

        button.innerText = allInterests[i]

        button.id = allInterests[i]
        button.className = "interestButton"

        button.addEventListener('click', () => {
            changeInterest(allInterests[i],allInterests[i])
        })

        interestMenu.appendChild(button)
        interestMenu.appendChild(document.createElement('br'))
        if (i==8){
            interestMenu.appendChild(document.createElement('br'))
        }
    }
}

function addInterests(){
    menu = document.getElementById("examplePost")
    
    for (let i=0; i<allInterests.length;i++){
        checkbox = document.createElement('input');
        checkbox.id = allInterests[i];
        checkbox.type = 'checkbox';

        label = document.createElement('label');
        label.innerText = allInterests[i];
        menu.append(checkbox)
        menu.append(label)

        if ((i+1)%4==0){
            menu.append(document.createElement('br'))
        }
        if (i==8){
            menu.append(document.createElement('br'))
            menu.append(document.createElement('br'))
        }
    }
}

function outputPost(image, video, title, text, thisPostInterests){
    showPost = false

    console.log(image)
    console.log(video)
    if (thisPostInterests != undefined){
        for (let i=0; i<thisPostInterests.length;i++){
            interest = thisPostInterests[i]
            thisPostInterests[i] = interest.charAt(0).toUpperCase() + interest.slice(1)
        }

        if (interestsArray.length==0){
            showPost=true
        } else {
            
            for (let i=0; i<thisPostInterests.length; i++){
                curr = thisPostInterests[i]

                if (interestsArray.includes(curr)){
                    showPost = true;
                }
            }
        }
        
        if (showPost==true){
            myTemp = document.getElementById('myTemplate');
            normalContent = document.getElementById('examplePost');

            item = myTemp.content.querySelector("div");

            postTitle = document.createElement("h2")
            postTitle.textContent = title
            normalContent.appendChild(postTitle);

            // Add video
            if (video!=null){
                video.setAttribute("width",200)
                video.controls = true
                normalContent.appendChild(video);
            } else if (image!=null) {
                myImg = document.createElement("img")
                myImg.src="data:image/png;base64," + image
                myImg.setAttribute("width", 200)
                //image.setAttribute("width", 500)
                //normalContent.appendChild(image)
                normalContent.appendChild(myImg)
            }
            
            newContent = document.importNode(item, true);
            newContent.textAlign = "center"
            newContent.innerHTML += text + "<br /><br />";

            normalContent.appendChild(newContent);
        }
    }
}

document.addEventListener("DOMContentLoaded", ()=>{
    fetch(backendLink + '/posts/all/', {headers : {'authorization': authorisation}})
        .then((response) => {return response.json()})
        .then(loadPostsFromAPI)
    })

function prepAPIPostLoad(){fetch(backendLink + '/posts/all/', {headers : {'authorization': authorisation}})
    .then((response) => {return response.json()})
    .then(loadPostsFromAPI)
}

function loadPostsFromAPI(data){

    // get more info on first post ***** MAKE IT SO THAT IT LOOPS FOR ALL POSTS NOT 100 POSTS
    for (let i=0; i<1000;i++){
        fetch(backendLink + '/posts/' + data[i]['id'] + '/')
            .then((response) => {return response.json()})
            .then((data) => {
                console.log(data.preview)
                if (data.preview != null){
                    outputPost(data.preview,null,data.title,data.content, data.interests)
                    /*if (data.preview.canPlayType("video/mp4")){
                        outputPost(null,data.preview,data.title,data.content, data.interests)
                    } else {
                        
                    }*/
                } else {
                    outputPost(null,null, data.title,data.content, data.interests)
                }
            })
    }
    
}

function savePostsToAPI(title, text, interests, media){
    fetch(backendLink + '/posts/', {
        "method":"POST",
        headers: {
            "authorization":authorisation,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "title": title,
            "short_content": "",
            "content": text,
            "link": "",
            "preview_image": null,
            "binary_content": null,
            "interests": interests,
            "publish_at": 16000000
        })
    })
    .then((response) => {return response.json()})
    .then((data) => {

    })
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

    tagsArray = [["Llandaff & Llandaff North","Environment"],["Homelessness"]]

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
            outputPost(imageArray[i], videoArray[i], titleArray[i], textArray[i], tagsArray[i]);
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

    newInterests = []
    for (let i=0; i<allInterests.length;i++){
        if (document.getElementById(allInterests[i]).checked==true){
            newInterests = newInterests.concat(allInterests[i])
        }
    }
 
    // ***** send media to the API to be saved with the post
    savePostsToAPI(titleInput.value, textInput.value, newInterests, null)
    // Clear all inputs
    titleInput.value=""
    textInput.value=""

    for(let i=0; i<allInterests.length;i++){
        document.getElementById(allInterests[i]).checked=false
    }
    
    document.getElementById("ImageVideo Displayer").outerHTML="<div id='ImageVideo Displayer'></div>"
    
}