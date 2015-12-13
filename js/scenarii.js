var bt1_cmd_output;
var bt2_cmd_output;
var bt1_scen_dest;
var bt2_scen_dest;
var next_scenario = 0;

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
			speed = 4;
			game.state.start('state1');

			bt1_cmd_output="Computing user choice ...\nSwitching AI control to human mode...\nChecking spaceship problems..."
			bt2_cmd_output="Computing user choice ...\nCannot find better solution...\nSpaceship autodestruction activated..."
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

			dom_bt1.onclick = function(){};
			dom_bt2.onclick = function(){};

			break;
		case 2:
			current_ai_msg = "Your spaceship is very slow. You have to find a way to escape this area.\n(1) Teleport to the nearest known planet\n(2) Use UltraSpeed mode";
			type_matrix("ai_output", current_ai_msg);

			bt1_scen_dest = 3;
			bt2_scen_dest = 4;

			dom_bt1.onclick = bt1_display;
			dom_bt2.onclick = bt2_display;
			break;
		case 3:
			
			dom_bt1.onclick = function(){};
			dom_bt2.onclick = function(){};
			break;
		case 4:
			
			dom_bt1.onclick = function(){};
			dom_bt2.onclick = function(){};
			break;
		default:
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
