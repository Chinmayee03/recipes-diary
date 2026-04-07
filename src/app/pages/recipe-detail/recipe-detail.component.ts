import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { MatDialog } from '@angular/material/dialog';
import { AddRecipeDialogComponent } from 'src/app/components/add-recipe-dialog/add-recipe-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: any;
  adminEmail = 'csbhoir203@gmail.com'; // 👈 replace with your Gmail
  isAdmin = false;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.recipeService.getRecipeById(id).subscribe((data) => {
        this.recipe = data;
      });
    }

    // 🔥 Check if admin
    this.authService.getUser().subscribe((user) => {
      if (user?.email === this.adminEmail) {
        this.isAdmin = true;
      }
    });
  }

  deleteRecipe() {
    const confirmDelete = confirm('Delete this recipe?');

    if (!confirmDelete) return;

    this.recipeService.deleteRecipe(this.recipe.id).then(() => {
      this.toastr.success('Deleted successfully');
      this.router.navigate(['/home']);
    });
  }

  editRecipe() {
    const dialogRef = this.dialog.open(AddRecipeDialogComponent, {
      // Use a responsive width when editing: 90% of viewport up to 900px
      width: '90vw',
      maxWidth: '900px',
      data: this.recipe,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.recipeService.updateRecipe(this.recipe.id, result).then(() => {
          this.toastr.success('Updated successfully');
        });
      }
    });
  }

  getSteps(procedure: string) {
    return procedure?.split('\n').filter((step) => step.trim() !== '');
  }

  getIngredients(ingredients: string[]) {
    return ingredients?.filter((i) => i.trim() !== '');
  }
}
