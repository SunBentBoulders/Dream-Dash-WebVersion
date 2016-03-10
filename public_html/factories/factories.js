angular.module('dreamDash.factories', [])

.factory('DeveloperInfoFactory', function(){
	var getDeveloperInfo = {
		"dev1": {
            "firstname": "Shanna",
			"fullname": "Shanna Sullivan",
			"pictureSrc": 'assets/images/Boulder.png',
			"github": "acrobat130",
			"email": "shanna.sullivan@gmail.com",
			"linkedin": "shannasullivan",
			"blog": "http://www.shannamichelledesigns.com/blog",
			"bio": "I am a full-stack software engineer that gravitates toward front-end technologies. I love solving programming puzzles on projects that ultimately bring someone joy or improve their quality of life. As an active person with an eye for design, I am drawn to the game, fitness, design, and acoustics industries. I am a passionate and goal-oriented person who is always looking for a challenge. I learn by throwing myself head-first into projects and figuring things out along the way. When I'm not programming, you can find me running, climbing trees and rocks, blues-fusion dancing, or walking on my hands."
		},
		"dev2": {
            "firstname": "Jazz",
			"fullname": "Jazz Lyles",
			"pictureSrc": 'assets/images/Boulder.png',
			"github": "existenzial",
			"email": "ripley36706@gmail.com",
			"linkedin": "jazzlyles",
			"blog": "http://jazzedaboutcoding.wordpress.com",
			"bio": "Avid tinkerer, photography nerd and a lover of all things creative, Jazz draws passion for innovation from the natural beauty of the world and staying active in social justice reform. A believer in bridging the diversity gap in tech and helping those voices get heard drives their belief that the world is a work in progress, but it's doubly important that we make sure we have fun along the way to progress."
		},
		"dev3": {
            "firstname": "Darryl",
			"fullname": "Darryl Nunn",
			"pictureSrc": 'assets/images/Boulder.png',
			"github": "darrylnu",
			"email": "darrylnu@gmail.com",
			"linkedin": "darrylnunnii",
			"blog": "http://darrylnu.github.io",
			"bio": "I am a full-stack software engineer, with a  knack for making really cool stuff that everyone will also think is cool. Growing up, I spent most of my days playing video games or nagging my mother to buy me the latest tech gadget. Naturally, becoming an engineer meant having the tools to create something that I've always enjoyed...I can finally leave my mother alone :). My love for building things from the ground-up can never be replaced. Outside of coding, I enjoy all things motorsport related. Anything with less than four wheels that requires a helmet is fair game. You can also catch me on the latest first-person shooter for PS4, powning newbs. I was once a salesmen in my past life, so an opportunity to flex my interpersonal communication skills is always welcome. If you'd like to know more, suggest a place with good bourban or tacos, and I'll meet ya there! "
		}
	}
	return {
		getDeveloperInfo: getDeveloperInfo
	}
})



