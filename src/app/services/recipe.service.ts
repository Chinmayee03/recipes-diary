import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  addDoc,
  collectionData,
  deleteDoc,
  updateDoc,
  docData,
  setDoc,
} from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  constructor(private firestore: Firestore) {}

  // 🔥 Add recipe to Firestore
  addRecipe(recipe: any) {
    const ref = collection(this.firestore, 'recipes');
    return addDoc(ref, recipe);
  }

  // 🔥 Get all recipes
  getRecipes() {
    const ref = collection(this.firestore, 'recipes');
    return collectionData(ref, { idField: 'id' });
  }

  getRecipeById(id: string) {
    const ref = doc(this.firestore, `recipes/${id}`);
    return docData(ref, { idField: 'id' });
  }

  deleteRecipe(id: string) {
    const ref = collection(this.firestore, 'recipes');
    const docRef = doc(ref, id); // ✅ correct way
    return deleteDoc(docRef);
  }

  updateRecipe(id: string, data: any) {
    const ref = collection(this.firestore, 'recipes');
    const docRef = doc(ref, id); // ✅ correct way
    return updateDoc(docRef, data);
  }

  // ADD FAVORITE
  addToFavorites(userId: string, recipe: any) {
    const ref = doc(this.firestore, `users/${userId}/favorites/${recipe.id}`);
    return setDoc(ref, recipe);
  }

  // REMOVE FAVORITE
  removeFromFavorites(userId: string, recipeId: string) {
    const ref = doc(this.firestore, `users/${userId}/favorites/${recipeId}`);
    return deleteDoc(ref);
  }

  // GET FAVORITES
  getFavorites(userId: string) {
    const ref = collection(this.firestore, `users/${userId}/favorites`);
    return collectionData(ref, { idField: 'id' });
  }
}
