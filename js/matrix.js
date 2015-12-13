var print_timer;
var char_idx = 0;

var tmp_comp; 
var tmp_msg

var typing = false;

//Function called on click
function type_matrix(pComponent, pMsg) {
	tmp_comp = pComponent;
	tmp_msg = pMsg;
	char_idx = 0;
	typing = true;
	print_timer = setInterval(update_cmd, 100);
}

//Function called at regular interval to display progressively the command
function update_cmd() {
	var output = document.getElementById(tmp_comp);
	if(char_idx == 0)
	{
		output.value = "";
		if(tmp_comp == 'ai_output')
		{
			document.getElementById('cmd_output').value = "";
		}
	}
	
	output.value += tmp_msg.charAt(char_idx);	
	char_idx++;
	if(char_idx == tmp_msg.length)
	{
		clearInterval(print_timer);
		typing = false;
	}
}
