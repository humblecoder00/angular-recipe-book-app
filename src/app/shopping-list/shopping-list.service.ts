import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({ providedIn: 'root' })

export class ShoppingListService {
    ingredientsChanged = new EventEmitter<Ingredient[]>()

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
      ]

    getIngredients() {
        // get a copy of data to prevent mutation
        return this.ingredients.slice()
    }

    // addIngredient(ingredient: Ingredient) {
    //     this.ingredients.push(ingredient)
    //     this.ingredientsChanged.emit(this.ingredients.slice())
    // }

    // Make the method smarter
    addIngredient(ingredient: Ingredient) {
        // Check first if it exists
        const targetIdx = this.ingredients.findIndex(item => item.name === ingredient.name)

        // if found
        if (targetIdx !== -1) {
            this.ingredients[targetIdx].amount += Number(ingredient.amount)
        } else {
            this.ingredients.push(ingredient)
        }

        this.ingredientsChanged.emit(this.ingredients.slice())
    }

    // add several ingredients at once
    addIngredients(ingredientsList: Ingredient[]) {
        // ingredientsList.forEach(ing => this.addIngredient(ing)) ---> too many events, better to send it once

        // check if it exists first
        const updatedIngredients = this._handleMultiIngredientUpdate(ingredientsList)
        this.ingredients = updatedIngredients
        this.ingredientsChanged.emit(this.ingredients.slice())
    }

    // helper for multi ingredient update with duplicate prevention - custom
    private _handleMultiIngredientUpdate(recievedIngredients: Ingredient[]): Ingredient[] {
        // Build a lookup table to make the comparison easier
        const ingredientsLookup: { name?: number } = {}        
        this.ingredients.forEach(item => ingredientsLookup[item.name] = item.amount)

        // now go through the target, add the amount if it mathces, otherwise add the new prop
        recievedIngredients.forEach(item => {
            if (ingredientsLookup[item.name]) {
                ingredientsLookup[item.name] = ingredientsLookup[item.name] + item.amount
            } else {
                ingredientsLookup[item.name] = item.amount
            }
        })

        let finalShape: Ingredient[] = []

        // Now transform it back into an array of objects
        Object.entries(ingredientsLookup).forEach(([key, val]) => finalShape.push(new Ingredient(key, val)))

        return finalShape
    }
}
