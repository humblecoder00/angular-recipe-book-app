import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})

export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeService.recipeSelected.subscribe((recipe: Recipe) => {
      this.selectedRecipe = recipe
    })
  }

  // get the event val from recipeSelected - comes from recipe list component (go to template first)
  handleSetSelectedRecipe(recipe: Recipe) {
    this.selectedRecipe = recipe
  }

}
