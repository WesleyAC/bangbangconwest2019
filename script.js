var slide_num = 0;
var hash_match = window.location.hash.match("^#slide([0-9]+)$");

var slides = [
	() => { window.location.hash = "slide1" },
	() => { window.location.hash = "slide2" },
	() => { window.location.hash = "slide3"; $("#v1")[0].play(); },
	() => { window.location.hash = "slide4" },
	() => { window.location.hash = "slide5" },
	() => { window.location.hash = "slide6" },
]

if (hash_match) {
	slide_num = parseInt(hash_match[1]);
} else {
	slides[0]();
}

function change_slide(n) {
	slide_num += n;
	slides[slide_num]();
}

$(document).keypress(function(e) {
	k = e.originalEvent.keyCode;
	if (k == 32 || k == 39) {
		change_slide(1);
	} else if (k == 37) {
		change_slide(-1);
	}

});

var min_h = -10;
var max_h = 10;

// State:
// x
// xdot
// xddot
// goal
// mass
// control
// gravity
// timestep

function sim_elevator(state) {
	// TODO clamp control func
	var out = state.control(state.x, state.goal);
	state.xddot = out / state.mass - state.gravity;
	state.xdot += state.xddot * state.timestep;
	state.x += state.xdot * state.timestep;
	return out
}

function transform_coords(coord, canvas_height, max, min) {
	return (coord + (max - min)/2) / (max - min) * canvas_height;
}

function transform_coords_inverse(coord, canvas_height, max, min) {
	return -(((canvas_height - coord) / canvas_height * (max-min)) - (max - min)/2);
}

// https://stackoverflow.com/questions/55677/how-do-i-get-the-coordinates-of-a-mouse-click-on-a-canvas-element
function getCursorPosition(canvas, event) {
	var x, y;

	canoffset = canvas.offset();
	x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - Math.floor(canoffset.left);
	y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop - Math.floor(canoffset.top) + 1;

	return [x,y];
}

function draw_state(state, canvas_id) {
	canvas = $("#"+canvas_id)[0];
	ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = 'blue';
	ctx.fillRect(0, transform_coords(state.goal, canvas.height, min_h, max_h), canvas.width, 0.25);
	ctx.fillStyle = 'grey';
	ctx.fillRect(canvas.width/2-15, transform_coords(state.x, canvas.height, min_h, max_h)-5, 30, 10);
}


function update(state, canvas, canvas_id, graph, time, graph_data, init_state, editor) {
	if (editor.hack_reload) {
		state = JSON.parse(JSON.stringify(init_state)); // fuckin javascript semantics
		eval(editor.getValue());
		state.control = control;
		time = 0;
		graph_data = [[0, state.x, 0, state.goal]];
		graph.updateOptions({'file': graph_data});
		graph.updateOptions({'dateWindow': [0, 250]});
		graph.resize();
		editor.hack_reload = false;
	}
	if (editor.start) {
		var out = sim_elevator(state);
		graph_data.push([time, state.x, out, state.goal]);
		if (graph_data.length > 250) {
			graph_data.shift();
			graph.updateOptions({'dateWindow': [time-250, time]});
		}
		if (time % 3 == 0) {
			graph.updateOptions({'file': graph_data});
		}
		time += 1;//state.timestep;
	}
	new_goal = $("#"+canvas_id).data().goal;
	if (new_goal) {
		state.goal = transform_coords_inverse(new_goal, canvas.height(), min_h, max_h);
	}
	draw_state(state, canvas_id);
	setTimeout(update, state.timestep * 1000, state, canvas, canvas_id, graph, time, graph_data, init_state, editor);
}

function load_sim(editor_id, canvas_id, graph_id, state, control_func) {
	var editor = ace.edit(editor_id);
	editor.setTheme("ace/theme/github");
	editor.session.setMode("ace/mode/javascript");
	editor.session.setValue(control_func);

	editor.commands.addCommand({
		name: 'run',
		bindKey: {win: 'Ctrl-S',  mac: 'Command-S'},
		exec: function(editor) {
			editor.hack_reload = true;
			editor.start = true;
		},
		readOnly: true
	});

	var canvas = $("#"+canvas_id);
	canvas.click(function(e) {
		$(this).data("goal", getCursorPosition($(this), e)[1]);
	});

	graph_data = [[0,state.x, 0, state.goal]];
	var graph = new Dygraph(document.getElementById(graph_id), graph_data,
		{
			drawPoints: true,
			labels: ["time", "position", "force", "goal"],
			series: {
				"time": { axis: "y1" },
				"position": { axis: "y1" },
				"force": { axis: "y2" },
				"goal": { axis: "y1" },
			},
			valueRange: [min_h,max_h],
			axes: {
				y1: {
					valueRange: [min_h,max_h],
				},
				y2: {
					valueRange: [-10000, 10000],
				}
			},
			dateWindow: [0,250],
		});

	init_state = JSON.parse(JSON.stringify(state));

	eval(control_func);
	state.control = control;
	
	update(state, canvas, canvas_id, graph, 0, graph_data, init_state, editor);
}
