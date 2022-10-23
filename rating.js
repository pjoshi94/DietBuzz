const firebaseConfig = {
    apiKey: "AIzaSyDZHz1l5Aqkd0JEwYrtl8MCkqK2a3M9Egg",
    authDomain: "dietbuzz-5fc1d.firebaseapp.com",
    projectId: "dietbuzz-5fc1d",
    storageBucket: "dietbuzz-5fc1d.appspot.com",
    messagingSenderId: "218271397438",
    appId: "1:218271397438:web:cd219872ac3e191482836f",
    measurementId: "G-BY3S5ZDYMY"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()


const menuList = document.querySelector(".menu-wrapper")

provideRatings = false;

if (provideRatings) {
    const ratingSubmitBtn = document.getElementById("rating-submit-btn")
    document.querySelector(".submit-btn-container").getElementsByClassName.display = "block";
    const foodnames = '{"foodname": ["Braised Cabbage", "Red Beans and Rice", "Jerk Chicken", "Cornbread", "Cajun Shrimp and Cheddar Grits", "Steamed PEI Blend", "Bulgur Pilaf", "Cheese Pizza", "Pepperoni Pizza", "Buffalo Chicken Pizza", "Garlic Cheddar Biscuits", "Vegetable Herb Pizza", "Southwestern Chicken Wrap", "Fried Plantain", "Jerk Grilled Eggplant", "Caribbean Confetti Rice", "Cajun Chicken Thighs", "Crinkle Cut Fries", "Hamburger Bun", "Chicken Parmesan Sandwich", "Polish Sausage", "Spaghetti and Meatballs", "Cheese Tortellini Alfredo", "Bosco Sticks", "Chicken Fettucini Alfredo", "PASTA BAR", "Manicotti w/Marinara Sauce", "Saut\u00e9ed Vegetables, Penne and Pesto"]}'
    const names = JSON.parse(foodnames).foodname
    
    
    names.forEach(foodname => {
        menuList.innerHTML += `
        <div class="menu-item card list-group-item bg-light my-2">
                    <div class="row">
                        <div class="food-name align-self-center col">
                            <h5>${foodname}</h5>
                        </div>
                        <div class="ratings col">
                            <div class="btn-group rating-group" role="group" aria-label="Basic mixed styles example" data-type="">
                                <button type="button" class="btn text-danger" data-type="bad">
                                    <i class="bi bi-emoji-frown"></i>
                                    <i class="bi bi-emoji-frown-fill filled"></i>
                                </button>
                                <button type="button" class="btn text-warning" data-type="mid">
                                    <i class="bi bi-emoji-neutral"></i>
                                    <i class="bi bi-emoji-neutral-fill filled"></i>
                                </button>
                                <button type="button" class="btn text-success" data-type="good">
                                    <i class="bi bi-emoji-smile"></i>
                                    <i class="bi bi-emoji-smile-fill filled"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
        `
    })
    const ratingGroups = document.querySelectorAll('.rating-group')
    
    ratingGroups.forEach(g => {
        g.addEventListener('click', function handleClick(e){
            e.target.parentElement.parentElement.dataset.type = e.target.parentElement.dataset.type;
        })
    })
    
    ratingSubmitBtn.addEventListener("click", e => {
        let items = menuList.children 
        for (let i = 0; i < items.length; i++) {
            rating = menuList.children[i].children[0].children[1].children[0].dataset.type
            menuName = menuList.children[i].children[0].children[0].innerText
            let ratingVal = 0;
            let wasRated = 1;
            switch(rating) {
                case "":
                    wasRated = 0
                    break;
                case "bad":
                    ratingVal = -1;
                    break;
                case "mid":
                    ratingVal = 0;
                    break;
                case "good":
                    ratingVal = 1;
                    break;
            }
    
            db.collection("foodItems").doc(menuName).update({
                ratingCount: firebase.firestore.FieldValue.increment(wasRated),
                ratingTotal: firebase.firestore.FieldValue.increment(ratingVal)
            }).then(() => {
                console.log("Document updated")
            }).catch((error) => {
                console.log("Error updating", error)
            })
        }
        menuList.innerHTML = "<h3>Thanks for submitting!</h3>"
        console.log("done")
    })
} else {
    console.log("Hi")
    document.querySelector(".submit-btn-container").style.display = "none";
    
    db.collection("foodItems").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let ratingPercentage;
            let elementText;
            let color;
            if (doc.data().ratingCount > 0) {
                ratingPercentage = Math.round(((doc.data().ratingTotal / doc.data().ratingCount)+1)/2*100)
                if (ratingPercentage < 33) {
                    color = "danger"
                } else if (ratingPercentage < 67) {
                    color = "warning"
                } else {
                    color = "success"
                }
                elementText = `<div class="menu-item card list-group-item bg-light my-2">
                <div class="row">
                    <div class="food-name align-self-center col">
                        <h5>${doc.data().Name}</h5>
                    </div>
                    <div class="ratings col align-self-center">
                        <div class="progress">
                            <div class="progress-bar bg-${color}" role="progressbar" style="width: ${ratingPercentage}%;" aria-valuenow="${ratingPercentage}" aria-valuemin="0" aria-valuemax="100">${ratingPercentage}%</div>
                        </div>
                    </div>
                </div>
            </div>`
            }
            else {
                elementText = ""
                console.log("No ratings")
            }
            menuList.innerHTML += elementText;
            
        })
    })

}


// TODO: Write function to reset firebase values