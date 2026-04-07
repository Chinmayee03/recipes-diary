const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
const recipes = require("./recipes.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function upload() {
  for (const recipe of recipes) {
    await db.collection("recipes").add(recipe);
    console.log("Uploaded:", recipe.title);
  }
  console.log("Done ✅");
}

upload();
