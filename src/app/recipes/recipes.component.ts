import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe

  constructor() { }

  ngOnInit() {
  }

  // get the event val from recipeSelected - comes from recipe list component (go to template first)
  handleSetSelectedRecipe(recipe: Recipe) {
    this.selectedRecipe = recipe
  }

}
