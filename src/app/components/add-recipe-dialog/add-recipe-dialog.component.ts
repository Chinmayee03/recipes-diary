import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-recipe-dialog',
  templateUrl: './add-recipe-dialog.component.html',
  styleUrls: ['./add-recipe-dialog.component.scss'],
})
export class AddRecipeDialogComponent {
  title = '';
  ingredientsText = '';
  procedure = '';
  tips = '';

  constructor(
    private dialogRef: MatDialogRef<AddRecipeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (data) {
      this.title = data.title;
      this.ingredientsText = data.ingredients.join('\n');
      this.procedure = data.procedure;
      this.tips = data.tips;
    }
  }

  save() {
    if (!this.title || !this.ingredientsText || !this.procedure) {
      alert('Please fill required fields');
      return;
    }

    const confirmSave = confirm('Are you sure you want to save?');

    if (!confirmSave) return;

    const ingredients = this.ingredientsText
      .split('\n')
      .map((i) => i.trim())
      .filter((i) => i !== '');

    const recipe = {
      title: this.title,
      ingredients,
      procedure: this.procedure,
      tips: this.tips,
    };

    // 👉 send data back + close dialog
    this.dialogRef.close(recipe);
  }

  close() {
    this.dialogRef.close();
  }
}
