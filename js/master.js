//check if there is local storage color option
let mainColor = localStorage.getItem("color-option");


if (mainColor !== null){

   document.documentElement.style.setProperty('--main-color', localStorage.getItem("color-option"));
   document.querySelectorAll(".color-list li").forEach(element => {
    element.classList.remove('active');
  
    //add active class on element with data-color === local storage item
    if (element.dataset.color == mainColor){
       
        //add active class
        element.classList.add("active");
    }
});

}

//random background option
let backgroundOption = true;

//variable to control the background interval
let backgroundInterval ; 

//check if there is local storage is not empty 
let  backgroundLocalStorage = localStorage.getItem("background-option");

//check if random background local storage is not empty
if (backgroundLocalStorage !== null){
    if (backgroundLocalStorage === 'true'){
        backgroundOption = true;

    }else{

        backgroundOption = false
    }


    document.querySelectorAll(".random-background span").forEach(element=>{
        element.classList.remove("active");
    });

    if(backgroundLocalStorage ==='true'){
        document.querySelector(".random-background .yes").classList.add("active");    

    }else{

        document.querySelector(".random-background .no").classList.add("active");

    }
}



//toggle spin class on icon
document.querySelector(".toggle-setting .fa-cog").onclick =  function(){

    this.classList.toggle("fa-spin");

    document.querySelector(".setting-box").classList.toggle("open");

}

const colorli= document.querySelectorAll(".color-list li");

//loop on Alllist items
colorli.forEach(li => {

    //click on all list items
    li.addEventListener("click", (e) =>{

        //set color on root
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

        //set color on local storage
        localStorage.setItem("color-option",e.target.dataset.color);

        handleActive(e);
    });
});

//switch random background option
const randomBackEl= document.querySelectorAll(".random-background span");

//loop on all spans
randomBackEl.forEach(span => {

    //click on every span
    span.addEventListener("click", (e) =>{

        handleActive(e);

        if(e.target.dataset.background === "yes"){
            backgroundOption= true;
       
            //console.log(backgroundOption)
            randomizeImgs();

         localStorage.setItem("background-option" , true);
           
        }else{
            
            backgroundOption= false ;
           // console.log(backgroundOption);
          clearInterval(backgroundInterval);
           
          localStorage.setItem("background-option" , false);
                 
        };
    });
});


//select landing page element
let landingPage = document.querySelector(".landing-page");

//get array of imge
let imgsArray =["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg"];

//function to randomize imgs
function randomizeImgs(){

    if(backgroundOption === true){
     
       backgroundInterval = setInterval(() => {

            //get random number
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
        
            //change background img url
            landingPage.style.backgroundImage = 'Url("photo/' + imgsArray[randomNumber] +' ")';
               
        }, 1000);
        
    }
}
    
randomizeImgs();


//select skills selrector
let ourSkill = document.querySelector(".skills");

window.onscroll = function (){

    //skills offset top 
    let skillsOffsetTop = ourSkill.offsetTop;

    //skills outer height
    let skillsOuterHeight = ourSkill.offsetHeight;

    //window height
    let windowHeight = this.innerHeight;
    
    //window scroll top
    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight -windowHeight)){

        let allSkill = document.querySelectorAll(".skill-box .skill-prograss span");

        allSkill.forEach(skill => {

            skill.style.width = skill.dataset.progress;

        });
    };
   
};

//create pop box
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {
    img.addEventListener('click' , (e) => {

    // create overlay element
    let overlay = document.createElement("div");

    //add class to overlay
    overlay.className ='popup-overlay';

    //appand overlay to the body 
    document.body.appendChild(overlay);

    //create popup box
    let popupBox = document.createElement("div");

    //add class to popupbox
    popupBox.className ='popup-box';

    if(img.alt !== null){

        //create heading
        let imgHeading = document.createElement("h3");

        //create text fot heading 
        let imageText =  document.createTextNode(img.alt);


        //appand text to heading
        imgHeading.appendChild(imageText);

        //appand the heading to popupbox
        popupBox.appendChild(imgHeading);
        
    };
    
    //create the img 
    let popupImage = document.createElement("img");
   
    //set image source
    popupImage.src = img.src;

    //add image to popupbox
    popupBox.appendChild(popupImage);

    //append the popupbox to body
    document.body.appendChild(popupBox);

    let closeButton = document.createElement("span");

    let closeButtonText = document.createTextNode ("X")

    closeButton.appendChild(closeButtonText)

    closeButton.className ='close-button';

    popupBox.appendChild(closeButton);
    

    });
});

//close popup
document.addEventListener("click", function(e){
    if (e.target.className == 'close-button'){

         //remove current popup
         e.target.parentNode.remove();
         //remove over lay 
         document.querySelector(".popup-overlay").remove();
    }


})

// select all bullets 
const allBullets = document.querySelectorAll(".nav-bullets .bullets");

const allLinks = document.querySelectorAll(".link a");

function  scrollToSomeWhere(elements){
 
    elements .forEach(element =>{

        element.addEventListener("click" , (e) =>{

            e.preventDefault();

            document.querySelector(e.target.dataset.section).scrollIntoView({

                behavior: 'smooth'
            });
        });
    });

};

scrollToSomeWhere(allBullets);
scrollToSomeWhere(allLinks);

//handle active class
function handleActive(ev){

    //remove active class from all classes
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove('active');
    });

    //add active class on self
    ev.target.classList.add("active");

};

let bulletSpan = document.querySelectorAll(".bullets-option span");

let  bulletContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets-option");


if (bulletLocalItem !== null ){

    bulletSpan.forEach(span => {

        span.classList.remove("active");

    });

    if (bulletLocalItem === 'block'){

        bulletContainer.style.display = 'block';

        document.querySelector(".bullets-option .yes").classList.add("active");

    }else{

        bulletContainer.style.display = 'none';

        document.querySelector(".bullets-option .no").classList.add("active");
    };

};


bulletSpan.forEach(span =>{
   

    span.addEventListener("click", (e) => {

        

        if (e.target.dataset.display === 'show'){

            bulletContainer.style.display ='block';

            localStorage.setItem("bullets-option", 'block');

        }else{

            bulletContainer.style.display = 'none';

            localStorage.setItem("bullets-option", 'none');

        }

        handleActive(e)
    });
});
 
document.querySelector(".reset-option").onclick = function(){
    //localStorage.clear();
    localStorage.removeItem("color-option");
    localStorage.removeItem("background-option");
    localStorage.removeItem("bullets-option");

    //reload window
    window.location.reload();
};

//toggle menu
let togglebtn = document.querySelector(".toggle-menu");

let tlinks = document.querySelector(".link");

togglebtn.onclick = function(e){

    //stop propagation
    e.stopPropagation();

    this.classList.toggle("menu-active");

    tlinks.classList.toggle("open");


};

document.addEventListener("click",(e)=>{
    if(e.target !==  togglebtn && e.target !== tlinks){

        if (tlinks.classList.contains("open")){


            togglebtn.classList.toggle("menu-active");

            tlinks.classList.toggle("open");
        };
    };
});

tlinks.oncclick = function(e)  {
    e.stopPropagation();
    
};
