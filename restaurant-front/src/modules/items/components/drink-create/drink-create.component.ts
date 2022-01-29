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

    previewImg: string | undefined;
    selectedImg: File | undefined;

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
        this.drinkService.add(this.drinkForm.value, this.selectedImg).subscribe((toastMessage) => {
            if (toastMessage.body)
                this.snackBarService.openSnackBar(toastMessage.body);
            this.router.navigate(["/rest-app/orders/orders-page"]);
        });
    }

    createEmptyDrink(): Drink {
        return {
            name: "",
            image: "",
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
        return !this.drinkForm.valid || !this.selectedImg;
    }

    public selectImage(event: any) {
        let selectedFiles = event.target.files;


        if (selectedFiles && selectedFiles[0]) {
            this.selectedImg = selectedFiles[0];
            if (this.selectedImg)
                this.drink.image = this.selectedImg.name;

            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.previewImg = e.target.result;

            }
            reader.readAsDataURL(selectedFiles[0]);
        }
    }
}
