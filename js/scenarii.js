var bt1_cmd_output;
var bt2_cmd_output;
var bt1_scen_dest;
var bt2_scen_dest;
var next_scenario = 0;

var final_msg = "Thanks for playing this game!\nYou can play other games on www.celisoft.com ;)";

function move_to_scenario()
{
	var dom_ss_shield = document.getElementById('ss_shield');	
	var dom_ss_damages = document.getElementById('ss_damages');
	var dom_ss_oxygen = document.getElementById('ss_oxygen');
	var dom_ss_power = document.getElementById('ss_power');
	var dom_bt1 = document.getElementById('bt1');
	var dom_bt2 = document.getElementById('bt2');

	switch(next_scenario){
		case 0:
			background = "assets/space.jpeg";
			star_img = "assets/star.png";
			speed = 4;
			game.state.start('state1');

			bt1_cmd_output="Computing user choice ...\nSwitching AI control to human mode...\nChecking spaceship problems...";
			bt2_cmd_output="Computing user choice ...\nCannot find better solution...\nSpaceship autodestruction activated...";
			bt1_scen_dest = 2;
			bt2_scen_dest = 1;
			
			//Data to be displayed through AI
			var current_ai_msg = "Due to a cosmic storm, you have been awaken in order to use the control buttons to help the AI.\nDo you understand ?\n(1) YES\n(2) NO";

			dom_ss_shield.value = 100;
			dom_ss_damages.value = 0;
			dom_ss_oxygen.value = 95;
			dom_ss_power.value = 85;

			type_matrix("ai_output", current_ai_msg);
		
			dom_bt1.onclick = bt1_display;
			dom_bt2.onclick = bt2_display;

			break;
		case 1:
			current_ai_msg = "The spaceship AI decided to annihilate itself because you will not be able to survive";

			speed = 0;
			game.state.start('state1');

			dom_ss_shield.value = 0;
			dom_ss_damages.value = 100;

			type_matrix("ai_output", current_ai_msg);
			setTimeout(function(){type_matrix('cmd_output', final_msg);}, 10000);
		
			dom_bt1.onclick = function(){};
			dom_bt2.onclick = function(){};

			break;
		case 2:
			current_ai_msg = "Your spaceship is very slow. You have to find a way to escape this area.\n(1) Teleport to the nearest known planet\n(2) Use UltraSpeed mode";
			type_matrix("ai_output", current_ai_msg);

			bt1_cmd_output="Computing user choice ...\nTeleporting procedure launched...";
			bt2_cmd_output="Computing user choice ...\nPower level OK\nUltraSpeed mode activated"

			bt1_scen_dest = 3;
			bt2_scen_dest = 4;

			dom_bt1.onclick = bt1_display;
			dom_bt2.onclick = bt2_display;
			break;
		case 3:
			dom_ss_power.value = 10;
			background = 'assets/new_earth.jpg';
			speed = 0;
			game.state.start('state1');

			current_ai_msg = "Teleportation complete.\nWelcome to Earth 2.0.";
			type_matrix("ai_output", current_ai_msg);

			setTimeout(function(){type_matrix('cmd_output', final_msg);}, 10000);
			
			dom_bt1.onclick = function(){};
			dom_bt2.onclick = function(){};
			break;
		case 4:
			dom_ss_power.value = 60;
			dom_ss_damages = 55;

			speed = 15;
			game.state.start('state1');

			current_ai_msg = "You are now in UltraSpeed mode. The spaceship was damaged during acceleration. Planet detected.\n(1) Stop UltraSpeed mode.\n(2) Continue with current speed.";
			type_matrix("ai_output", current_ai_msg);

			bt1_cmd_output="Computing user choice ...\nStopping UltraSpeed mode...";
			bt2_cmd_output="Computing user choice ...\nNothing to do"

			bt1_scen_dest = 5;
			bt2_scen_dest = 6;

			dom_bt1.onclick = bt1_display;
			dom_bt2.onclick = bt2_display;
			break;
		case 5:
			dom_ss_power.value = 50;
			dom_ss_damages.value = 45;
			
			speed = 0;
			background = 'assets/new_earth.jpg';
			game.state.start('state1');

			current_ai_msg = "Welcome to Earth 2.0.";
			type_matrix("ai_output", current_ai_msg);

			setTimeout(function(){type_matrix('cmd_output', final_msg);}, 10000);
			
			dom_bt1.onclick = function(){};
			dom_bt2.onclick = function(){};
			break;
		case 6:
			dom_ss_power.value = 50;
			dom_ss_damages.value = 100;
			dom_ss_oxygen.value = 0;

			speed = 2;
			star_img = 'assets/asteroid.png';
			game.state.start('state1');

			current_ai_msg = "Too much asteroids encountered. Your spaceship is destroyed.";
			type_matrix("ai_output", current_ai_msg);

			setTimeout(function(){type_matrix('cmd_output', final_msg);}, 10000);

			dom_bt1.onclick = function(){};
			dom_bt2.onclick = function(){};
			break;

		default:
			console.log("Unknown scenario required");
			break;
	}
}

function bt1_display()
{
	type_matrix("cmd_output", bt1_cmd_output);
	next_scenario = bt1_scen_dest;
	setTimeout(move_to_scenario, 10000);
}

function bt2_display()
{
	type_matrix("cmd_output", bt2_cmd_output);
	next_scenario = bt2_scen_dest;
	setTimeout(move_to_scenario, 10000);
}

function reset_scenario()
{
	next_scenario = 0;
	move_to_scenario();
}

//Startup first scenario
move_to_scenario();
