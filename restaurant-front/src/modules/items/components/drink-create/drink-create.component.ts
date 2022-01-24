import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemType } from 'src/modules/shared/models/enums/item-type';
import { SnackBarService } from 'src/modules/shared/services/snack-bar.service';
import { Drink } from '../../model/drink';
import { DrinkService } from '../../services/drink.service';

@Component({
    selector: 'app-drink-create',
    templateUrl: './drink-create.component.html',
    styleUrls: ['./drink-create.component.scss']
})
export class DrinkCreateComponent {

    drink: Drink;
    drinkForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private drinkService: DrinkService,
        private snackBarService: SnackBarService
    ) {
        this.drink = this.createEmptyDrink();

        this.drinkForm = this.fb.group(
            {
                name: ["", [Validators.required]],
                cost: [0, [Validators.required, Validators.min(50)]],
                category: ["", Validators.required],
                description: [null, Validators.compose([Validators.required, Validators.maxLength(256)])],
                volume: [0, [Validators.required, Validators.min(0.2)]],
            }
        );
    }

    get f() {
        return this.drinkForm.controls;
    }

    onSubmit() {
        this.drink = this.drinkForm.value;
        // category is object
        this.drink.category = {
            id: -1,
            name: this.drinkForm.value['category']
        }
        this.drink.itemType = ItemType.DRINK;
        this.drink.image = "slicica"; // TODO za sliku
        this.drink.deleted = false;
        this.drink.currentPrice = -1;
        this.drinkService.add(this.drink).subscribe((toastMessage) => {
            this.snackBarService.openSnackBar(toastMessage);
            this.router.navigate(["/rest-app/orders/orders-page"]);
        });
    }

    createEmptyDrink(): Drink {
        return {
            name: "",
            image: "putanjica/drink",
            cost: 0,
            category: {
                id: -1,
                name: ""
            },
            currentPrice: 0,
            itemType: ItemType.DRINK,
            description: "",
            deleted: false,
            volume: -1
        }
    }

    checkSubmit() {
        return !this.drinkForm.valid;
    }
}
