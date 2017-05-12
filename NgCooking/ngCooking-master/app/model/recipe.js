class Recipe{
	Recipe.iterator = 0;

	constructor(name, image, ratings, ingredients){
		this.name = name;
		this.image = image;

		this.ratings = ratings;
		this.ingredients = ingredients;
	};

	constructor(){
		this.id = Recipe.iterator++;
	};
}

var bouillabaisse = new Recipe();