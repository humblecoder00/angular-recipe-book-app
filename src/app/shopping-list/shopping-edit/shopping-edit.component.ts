import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', { static: false }) nameInput: ElementRef
  @ViewChild('amountInput', { static: false }) amountInput: ElementRef
  @Output() ingredientAdded = new EventEmitter<Ingredient>()

  constructor() { }

  ngOnInit() {
  }

  onAddIngredient() {
    const ingName = this.nameInput.nativeElement.value
    const ingAmount = this.amountInput.nativeElement.value

    const newIngredient = new Ingredient(ingName, ingAmount)
    
    this.ingredientAdded.emit(newIngredient)
  }

}
