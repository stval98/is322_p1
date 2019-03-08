var foo = 'foo'; // Variables declared outside of any function are considered global variables.
				 // These variables can be found on the window object.
(function () {
	// Any kind of function, will create a new variable scope. Variables declared in this 
	// function will only be accesible inside this function, unless passed by reference through
	// a function call. 

	// Lower level scope will always overwrite a higher level scope.  
	var foo = 'bar';
	console.log(foo); // 'bar'
	// Global Variables can still be accessed through window object 
	console.log(window.foo); // 'foo'

	// An array of Objects, similar to database records we will eventually be dealing with.
	var recipeDatabase = [
		{ name: 'golden coconut lentil soup', title: 'Golden Coconut Lentil Soup', price: '4.27', img: 'recipe_imgs/Golden-Coconut-and-Lentil-Soup-V.jpg', bburl: 'https://www.budgetbytes.com/golden-coconut-lentil-soup/', vegan: true },
		{ name: 'roasted cauliflower salad', title: 'Roasted Cauliflower Salad with Lemon Tahini Dressing', price: '6.99', img: 'recipe_imgs/Roasted-Cauliflower-Salad-V2.jpg', bburl: 'https://www.budgetbytes.com/roasted-cauliflower-salad-lemon-tahini-dressing/', vegan: true },
		{ name: 'tomato herb rice', title: 'Tomato Herb Rice with White Beans and Spinach', price: '5.14', img: 'recipe_imgs/Tomato-Herb-Rice-with-White-Beans-and-Spinach-V-768x1024.jpg', bburl: 'https://www.budgetbytes.com/tomato-herb-rice-with-white-beans-and-spinach/', vegan: true },
		{ name: 'creamy white bean quesadillas', title: 'Creamy White Bean and Spinach Quesadillas', price: '3.99', img: 'recipe_imgs/Creamy-White-Bean-and-Spinach-Quesadillas-V-768x1024.jpg', bburl: 'https://www.budgetbytes.com/creamy-white-bean-and-spinach-quesadillas/', vegan: false },
		{ name: 'sheet pan pesto chicken', title: 'Sheet Pan Pesto Chicken Dinner', price: '11.99', img: 'recipe_imgs/Sheet-Pan-Pesto-Chicken-Dinner-V1-768x1024.jpg', bburl: 'https://www.budgetbytes.com/sheet-pan-pesto-chicken-dinner/ ', vegan: false },
		{ name: 'thai coconut curry carrot soup', title: 'Thai Coconut Curry Carrot Soup', price: '6.69', img: 'recipe_imgs/Thai-Coconut-Curry-Carrot-Soup-V1-768x1024.jpg', bburl: 'https://www.budgetbytes.com/thai-coconut-curry-carrot-soup/ vegan', vegan: true },
		{ name: 'yellow jasmine rice', title: 'Yellow Jasmine Rice', price: '2.01', img: 'recipe_imgs/Yellow-Jasmine-Rice-V1-768x1024.jpg', bburl: 'https://www.budgetbytes.com/yellow-jasmine-rice/', vegan: false },
		{ name: 'pressure cooker chicken', title: 'Pressure Cooker Chicken and Rice', price: '12.31', img: 'recipe_imgs/Pressure-Cooker-Chicken-and-Rice-V2.jpg', bburl: 'https://www.budgetbytes.com/pressure-cooker-chicken-rice/', vegan: false },
		{ name: 'cheesy cauliflower soup', title: 'Cheesy Cauliflower and Potato Soup', price: '6.37', img: 'recipe_imgs/Cheesy-Cauliflower-and-Potato-Soup-V3-768x1024.jpg', bburl: 'https://www.budgetbytes.com/cheesy-cauliflower-and-potato-soup/', vegan: false },
		{ name: 'smoky tomato soup', title: 'Smoky Tomato Soup', price: '4.12', img: 'recipe_imgs/Smoky-Tomato-Soup-bowl-text.jpg', bburl: 'https://www.budgetbytes.com/smoky-tomato-soup/', vegan: true },
		{ name: 'saucy southwest shredded beef', title: 'Saucy Southwest Shredded Beef', price: '15.22', img: 'recipe_imgs/Saucy-Southwest-Shredded-Beef-text.jpg', bburl: 'https://www.budgetbytes.com/saucy-southwest-shredded-beef/', vegan: false },
		{ name: 'garlic parmesan kale pasta', title: 'Garlic Parmesan Kale Pasta', price: '3.37', img: 'recipe_imgs/Garlic-Parmesan-Kale-Pasta-V2-768x1024.jpg', bburl: 'https://www.budgetbytes.com/garlic-parmesan-kale-pasta/', vegan: false },
	];

	function renderRecipes (results) {
		var recipesList = document.querySelector('#recipes');

		// clear out inner HTML to get rid of any older results
		recipesList.innerHTML = '';
		// Map each database record to a string containing the HTML for it's row
		var recipes = results.map(function (result) {
			return '<div id="recipe" class="card" style="width: 18rem;">' +
			'<img class="card-img-top" src="' + result.img + '">' +
			'<div class="card-body">' +
			'<p id="name" value="' + result.name + '" class="card-text" style="font-weight: bold;">' + result.title + '</p>' +
			'<p id="price" value="' + result.price + '" class="card-text">$' + result.price + '</p>' +
			'<a href="' + result.bburl + '" class="card-link" style="font-weight: bold; color: #ffdb58;">Read more</a>' +
			'</div>' +
			'</div>';
		});
		// Set the contents of the table body to the new set of rendered HTML rows
		recipes.forEach(function (column) {
			recipesList.innerHTML += column; // += adds to HTML instead of overwriting it entirely.
		});

		// Lower level scope once again overwrites what's above it.
		var foo = 'renderRecipes';
		console.log(foo); // 'renderRecipes'
	}

	renderRecipes(recipeDatabase);

	// Function to Order results list 
	function orderBy(sortValue) {
		// Sort method varies based on what type of value we're sorting 
		var sortedResults = (sortValue === 'name') ? 
			recipeDatabase.sort(function (a, b) { // Strings need to be sorted in a slightly more compldex way
				var nameA = a.name.toUpperCase(); // ignore upper and lowercase
				var nameB = b.name.toUpperCase(); // ignore upper and lowercase
				// Sorts alphabetically.  -1 puts it before. 1 puts it after
				if (nameA < nameB) {
				    return -1;
				}
				if (nameA > nameB) {
				    return 1;
				}
			}) : 
			recipeDatabase.sort(function (a, b) { // Numbers a booleans are much simpler. 
												// Just need postive or negative number 
				// Object properties can be accessed through a string representing their name
				return a[sortValue] - b[sortValue];
			});
		renderRecipes(sortedResults);
	}
	// Change events trigger after the value of a form input changes
	document.querySelector('#sortMenu').addEventListener('change', function(event){
		// Event is the JavaScript event that transpired, in our change a CHANGE event.
		// Target is the element it was performed on, useful for when the event targets 
		// multiple elements.
		// Value has the name implies is the current value of the input element, if there is one
		orderBy(event.target.value);
	});

	// Function to filter out unpublished results
	function toggleVegan(showVegan) {
		// If showPublished is TRUE, only display published results
		// Filter will only inclue objects that return TRUE from it's query
		var filteredResults = recipeDatabase.filter(function (result) {
			// If showPublished is TRUE, always show.
			// Otherweise only show if published is TRUE
			return showVegan || result.vegan;
		});
		renderRecipes(filteredResults);
	}
	// Change events trigger after the value of a form input changes
	document.querySelector('#vegan').addEventListener('change', function(event){
		// in this case value is a string that we need to convert to a boolean 
		var value = event.target.value === 'true';
		toggleVegan(value);
	});



})(); // Wrap entire file in self executing function. 
      // Keeping all variables declared in this file inside a local scope.