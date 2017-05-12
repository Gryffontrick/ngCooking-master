class User{
	User.iterator = 0;

	constructor(name, image, firstName, lastName, age, recipe, comments, login, password, mail, cookLevel){
		this.id = User.iterator++;
		this.name = name;
		this.image = image;

		this.firstName = firstName;
		this.lastName = lastName;
		this.age = age;

		this.recipe = recipe;
		this.comments = comments;
		
		this.login = login;
		this.password = password;
		this.mail = mail;
		
		this.cookLevel = cookLevel;
	};

	constructor(){
		this.id = User.iterator++;
	};
}

var jeanLouis = new Person();