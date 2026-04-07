import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AddRecipeDialogComponent } from 'src/app/components/add-recipe-dialog/add-recipe-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  recipes: any[] = [];
  favorites: any[] = [];

  view: 'home' | 'all' | 'favorites' | 'info' = 'home';
  searchText: string = '';

  isSidebarOpen = false;
  user: any;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.recipeService.getRecipes().subscribe((data: any) => {
      this.recipes = data;
    });

    this.authService.getUser().subscribe((user) => {
      this.user = user;
    });

    this.authService.getUser().subscribe((user) => {
      this.user = user;

      if (user) {
        this.recipeService.getFavorites(user.uid).subscribe((data: any) => {
          this.favorites = data;
        });
      }
    });
  }

  setView(v: any) {
    this.view = v;
    this.searchText = '';
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  showSearch(): boolean {
    return this.view !== 'info';
  }

  showFab(): boolean {
    return this.view === 'home';
  }

  hasSearchText(): boolean {
    return this.searchText.trim().length > 0;
  }

  filteredRecipes() {
    return this.recipes.filter((r) =>
      r.title.toLowerCase().includes(this.searchText.toLowerCase()),
    );
  }

  filteredFavorites() {
    return this.favorites.filter((r) =>
      r.title.toLowerCase().includes(this.searchText.toLowerCase()),
    );
  }

  toggleFavorite(recipe: any) {
    if (!this.user) return;

    const isFav = this.isFavorite(recipe);

    if (isFav) {
      this.recipeService.removeFromFavorites(this.user.uid, recipe.id);
    } else {
      this.recipeService.addToFavorites(this.user.uid, recipe);
    }
  }

  isFavorite(recipe: any): boolean {
    return this.favorites.some((r) => r.id === recipe.id);
  }

  openRecipe(recipe: any) {
    this.router.navigate(['/recipe', recipe.id]);
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }

  openPopup() {
    const dialogRef = this.dialog.open(AddRecipeDialogComponent, {
      // Use a responsive width: 90% of viewport up to 900px
      width: '90vw',
      maxWidth: '900px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.recipeService.addRecipe(result);
      }
    });
  }
}
