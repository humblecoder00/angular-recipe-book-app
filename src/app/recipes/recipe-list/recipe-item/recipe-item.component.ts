import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe
  // This emitter does not pass any data, so we use "void" as type
  @Output() recipeSelected = new EventEmitter<void>()

  constructor() { }

  ngOnInit() {
  }

  onSelected() {
    this.recipeSelected.emit()
  }
}

/*
- Emit an event from a recipe item that was clicked
- Get this event somehow to recipes component to pass down the event data which recipe was selected to that component.
*/