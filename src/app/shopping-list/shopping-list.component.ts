import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})

export class ShoppingListComponent implements OnInit {
  // have it undefined in the beginning
  ingredients: Ingredient[]

  constructor(private slService: ShoppingListService) { }

  // set the data at this step
  ngOnInit() {
    this.ingredients = this.slService.getIngredients()

    this.slService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients
    })
  }
}
