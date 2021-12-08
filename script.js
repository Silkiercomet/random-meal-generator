// const fetchMeal = async () => {
//     const  response = await fetch("www.themealdb.com/api/json/v1/1/random.php")
//     .then(e => e.json())
//     return response
// }
 async function fetchMeal() {
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    return response

}

function CreateMeal(promise) {
    promise.then( meal => {
        let mealObj = meal.meals[0]
        //meal name
        document.querySelector(".meal__name").textContent = mealObj.strMeal
        //meal preparation
        document.querySelector(".instructions").textContent = mealObj.strInstructions
        // meal thumbnail
        document.querySelector("#image").src = mealObj.strMealThumb
        // ingredients and measurements
        let i = 1, condition = true;
        while(condition == true){
            let ing = mealObj[`strIngredient${i}`],mea= mealObj[`strMeasure${i}`]

            function createElement(){
                let newLi = document.createElement("li")
                
                newLi.innerHTML = `
                <span class="measurement">${mea}</span> ${ing}
                `

                document.querySelector(".ingredients").appendChild(newLi)
            }

            (ing != "")? createElement() : condition = false
            i++
        }
    })
}

const compose = (f,g) => (data) => f(g(data))
let randomMeal = compose(CreateMeal,fetchMeal)
randomMeal()

document.querySelector(".btn").addEventListener("click", randomMeal)

