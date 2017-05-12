class Ingredient{
	Ingredient.iterator = 0;

	constructor(name, image, category, details, quantity, unity, calories){
		this.id = Ingredient.iterator++;
		this.name = name;
		this.image = image;

		this.category = category;
		this.details = details;
		this.quantity = quantity;

		this.unity = unity;
		this.calories = calories;
	};

	constructor(){
		this.id = Ingredient.iterator++;
	};
}

var pimentDEspelette = new Ingredient();