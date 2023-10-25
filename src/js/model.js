export class City {
    constructor(name,score,description){
        this.name=name;
        this.score=score;
        this.description=description;
        this.categories=[];
    }

    addCategory(name,color,score){
        const category = {
            name,
            score,
            color
          };
          this.categories.push(category);
    }

    visualizeCityData(){
        
        const descriptioncontainer=document.querySelector(".descriptioncontainer");
        descriptioncontainer.innerHTML=`<h4 class="text-center">${this.name} - SCORE: ${this.score.toFixed(2)}</h4>` + this.description;
        descriptioncontainer.classList.remove("hidden");
        this.addCategoryHTML();

    }

    addCategoryHTML(){
        
        const cardContainer = document.querySelector(".flexcardcontainer");
        cardContainer.innerHTML=''
        for(let category of this.categories){
            
            cardContainer.innerHTML += `
                            <div class="card my-3 mx-3">
                                <div class="category card-field mt-2 mx-2 mb-3 text-body-tertiary text-center"><strong>${category.name}</strong></div>
                                <div class="scorenumber mx-auto text-center text-body-tertiary mb-1">${category.score.toFixed(3)}</div>
                                <div class="score back card-field mb-3 mx-2 border border-secondary-subtle">
                                <div class="score display" style="width: ${category.score*10}%; background-color: ${category.color};"></div>
                                </div>
                            </div>`;
            
        }

    }
}