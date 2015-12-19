angular.module('dreamDash.factories', [])

.factory('DeveloperInfoFactory', function(){
	var getDeveloperInfo = {
		"dev1": {
			"name": "Shanna Sullivan",
			"pictureSrc": 'assets/images/Boulder.png',
			"github": "acrobat130",
			"email": "shanna.sullivan@gmail.com",
			"linkedin": "shannasullivan",
			"blog": "http://www.shannamichelledesigns.com/blog",
			"bio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque in porta ipsum, vitae ullamcorper nulla. Nulla malesuada feugiat diam. Phasellus sagittis quam urna, varius mattis ligula feugiat a. Integer vel metus auctor, convallis nunc id, molestie augue. Curabitur ligula erat, tincidunt quis tellus eget, ultrices hendrerit orci. Vestibulum sodales nisi tortor. Pellentesque vel quam elit. Ut egestas leo erat, ut viverra nibh luctus non. Quisque ipsum elit, porttitor et condimentum sit amet, tristique ut arcu. Donec pellentesque malesuada turpis eget interdum. Quisque vulputate mauris sit amet dapibus tristique. Nam at imperdiet eros, id mattis lorem. Quisque ut nisi sed mauris accumsan lobortis at eu metus. Etiam fermentum consequat lacus quis molestie. Phasellus fermentum dolor eu tellus luctus feugiat."
		},
		"dev2": {
			"name": "Jazz Lyles",
			"pictureSrc": 'assets/images/Boulder.png',
			"github": "existenzial",
			"email": "ripley36706@gmail.com",
			"linkedin": "jazzlyles",
			"blog": "http://www.jazzedaboutcoding.wordpress.com",
			"bio": "Avid tinkerer, photography nerd and a lover of all things creative, Jazz draws passion for innovation from the natural beauty of the world and staying active in social justice reform. A believer in bridging the diversity gap in tech and helping those voices get heard drives their belief that the world is a work in progress, but it's doubly important that we make games and have fun along the way."
		},
		"dev3": {
			"name": "Darryl Nunn",
			"pictureSrc": 'assets/images/Boulder.png',
			"github": "darrylnu",
			"email": "darrylnu@gmail.com",
			"linkedin": "darrylnunnii",
			"blog": "http://darrylnu.github.io",
			"bio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque in porta ipsum, vitae ullamcorper nulla. Nulla malesuada feugiat diam. Phasellus sagittis quam urna, varius mattis ligula feugiat a. Integer vel metus auctor, convallis nunc id, molestie augue. Curabitur ligula erat, tincidunt quis tellus eget, ultrices hendrerit orci. Vestibulum sodales nisi tortor. Pellentesque vel quam elit. Ut egestas leo erat, ut viverra nibh luctus non. Quisque ipsum elit, porttitor et condimentum sit amet, tristique ut arcu. Donec pellentesque malesuada turpis eget interdum. Quisque vulputate mauris sit amet dapibus tristique. Nam at imperdiet eros, id mattis lorem. Quisque ut nisi sed mauris accumsan lobortis at eu metus. Etiam fermentum consequat lacus quis molestie. Phasellus fermentum dolor eu tellus luctus feugiat."
		}
	}
	return {
		getDeveloperInfo: getDeveloperInfo
	}
})



