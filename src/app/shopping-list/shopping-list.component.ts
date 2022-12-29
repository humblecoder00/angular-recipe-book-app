import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})

export class ShoppingListComponent implements OnInit, OnDestroy {
  // have it undefined in the beginning
  ingredients: Ingredient[]
  private igChangeSub: Subscription

  constructor(private slService: ShoppingListService) { }

  // set the data at this step
  ngOnInit() {
    this.ingredients = this.slService.getIngredients()

    this.igChangeSub = this.slService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients
    })
  }

  ngOnDestroy() {
    this.igChangeSub.unsubscribe()
  }
}
