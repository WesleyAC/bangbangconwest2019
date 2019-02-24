var slide_num = 0;
var hash_match = window.location.hash.match("^#slide([0-9]+)$");

var p = '<mi>p</mi>'
var pdot = '<mrow class="MJX-TeXAtom-ORD"><mover><mi>p</mi><mo>˙</mo></mover></mrow>' 
var pddot = '<mrow class="MJX-TeXAtom-ORD"><mover><mi>p</mi><mo>¨</mo></mover></mrow>' 
var a4 = "<mo>−</mo><mfrac><mi>damping</mi><mi>mass</mi></mfrac>"
var b2 = "<mfrac><mi>1</mi><mi>mass</mi></mfrac>"
var undecided = '<mo>?</mo>' 
var formula = '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block" id="eq1"><mrow><mo>[</mo><mtable rowspacing="4pt" columnspacing="1em"><mtr><mtd id="xd1">{{pdot}}</mtd></mtr><mtr><mtd id="xd2">{{pddot}}</mtd></mtr></mtable><mo>]</mo></mrow><mo>=</mo><mrow><mo>[</mo><mtable rowspacing="4pt" columnspacing="1em"><mtr><mtd id="a1">{{a1}}</mtd><mtd id="a2">{{a2}}</mtd></mtr><mtr><mtd id="a3">{{a3}}</mtd><mtd id="a4">{{a4}}</mtd></mtr></mtable><mo>]</mo></mrow><mrow><mo>[</mo><mtable rowspacing="4pt" columnspacing="1em"><mtr><mtd id="x1">{{p}}</mtd></mtr><mtr><mtd id="x2">{{pdot}}</mtd></mtr></mtable><mo>]</mo></mrow><mo>+</mo><mrow><mo>[</mo><mtable rowspacing="4pt" columnspacing="1em"><mtr><mtd id="b1">{{b1}}</mtd></mtr><mtr><mtd id="b2">{{b2}}</mtd></mtr></mtable><mo>]</mo></mrow><mrow><mo>[</mo><mtable rowspacing="4pt" columnspacing="1em"><mtr><mtd id="u1">{{u1}}</mtd></mtr></mtable><mo>]</mo></mrow></math>'
var current_formula = formula;

function highlight(id) {
	$(id).css("color", "red");
}

function unhighlight(id) {
	$(id).css("color", "black");
}

var slides = [
	() => { window.location.hash = "slide0" },
	() => { window.location.hash = "slide1" },
	() => { window.location.hash = "slide2" },
	() => { $("#slide2_1").show(); },
	() => { window.location.hash = "slide3"; $("#v1")[0].play(); },
	() => { window.location.hash = "slide4" },
	() => { window.location.hash = "slide5" },
	() => { window.location.hash = "slide6" },
	() => { $("#slide6_1").show(); },
	() => { $("#slide6_2").show(); },
	() => { $("#slide6_3").show(); },
	() => { $("#slide6_4").show(); },
	() => { $("#eq1").show(); },
	() => { highlight("#a1"); },
	() => { highlight("#x1"); },
	() => { highlight("#xd1"); },
	() => {
		unhighlight("#a1");
		unhighlight("#x1");
		unhighlight("#xd1");
		MathJax.Hub.Queue([
			"Text",
			MathJax.Hub.getJaxFor("eq1"),
			formula.replace(/{{p}}/g,"<mi>position</mi>").replace(/{{pdot}}/g, "<mi>velocity</mi>").replace(/{{pddot}}/g, "<mi>acceleration</mi>").replace(/{{a1}}/g, "<mi>0</mi>").replace(/{{a2}}/g, undecided).replace(/{{a3}}/g, undecided).replace(/{{a4}}/g, undecided).replace(/{{b1}}/g, undecided).replace(/{{b2}}/g, undecided).replace(/{{u1}}/g, "<mi>force</mi>")
		]);
	},
	() => { highlight("#a2"); },
	() => { highlight("#x2"); },
	() => { highlight("#xd1"); },
	() => {
		unhighlight("#a2");
		unhighlight("#x2");
		unhighlight("#xd1");
		MathJax.Hub.Queue([
			"Text",
			MathJax.Hub.getJaxFor("eq1"),
			formula.replace(/{{p}}/g,"<mi>position</mi>").replace(/{{pdot}}/g, "<mi>velocity</mi>").replace(/{{pddot}}/g, "<mi>acceleration</mi>").replace(/{{a1}}/g, "<mi>0</mi>").replace(/{{a2}}/g, "<mi>1</mi>").replace(/{{a3}}/g, undecided).replace(/{{a4}}/g, undecided).replace(/{{b1}}/g, undecided).replace(/{{b2}}/g, undecided).replace(/{{u1}}/g, "<mi>force</mi>")
		]);
	},
	() => { highlight("#a3"); },
	() => { highlight("#x1"); },
	() => { highlight("#xd2"); },
	() => {
		unhighlight("#a3");
		unhighlight("#x1");
		unhighlight("#xd2");
		MathJax.Hub.Queue([
			"Text",
			MathJax.Hub.getJaxFor("eq1"),
			formula.replace(/{{p}}/g,"<mi>position</mi>").replace(/{{pdot}}/g, "<mi>velocity</mi>").replace(/{{pddot}}/g, "<mi>acceleration</mi>").replace(/{{a1}}/g, "<mi>0</mi>").replace(/{{a2}}/g, "<mi>1</mi>").replace(/{{a3}}/g, "<mi>0</mi>").replace(/{{a4}}/g, undecided).replace(/{{b1}}/g, undecided).replace(/{{b2}}/g, undecided).replace(/{{u1}}/g, "<mi>force</mi>")
		]);
	},
	() => { highlight("#a4"); },
	() => { highlight("#x2"); },
	() => { highlight("#xd2"); },
	() => {
		unhighlight("#a4");
		unhighlight("#x2");
		unhighlight("#xd2");
		MathJax.Hub.Queue([
			"Text",
			MathJax.Hub.getJaxFor("eq1"),
			formula.replace(/{{p}}/g,"<mi>position</mi>").replace(/{{pdot}}/g, "<mi>velocity</mi>").replace(/{{pddot}}/g, "<mi>acceleration</mi>").replace(/{{a1}}/g, "<mi>0</mi>").replace(/{{a2}}/g, "<mi>1</mi>").replace(/{{a3}}/g, "<mi>0</mi>").replace(/{{a4}}/g, a4).replace(/{{b1}}/g, undecided).replace(/{{b2}}/g, undecided).replace(/{{u1}}/g, "<mi>force</mi>")
		]);
	},
	() => { highlight("#b2"); },
	() => { highlight("#u1"); },
	() => { highlight("#xd2"); },
	() => {
		unhighlight("#b2");
		unhighlight("#u1");
		unhighlight("#xd2");
		MathJax.Hub.Queue([
			"Text",
			MathJax.Hub.getJaxFor("eq1"),
			formula.replace(/{{p}}/g,"<mi>position</mi>").replace(/{{pdot}}/g, "<mi>velocity</mi>").replace(/{{pddot}}/g, "<mi>acceleration</mi>").replace(/{{a1}}/g, "<mi>0</mi>").replace(/{{a2}}/g, "<mi>1</mi>").replace(/{{a3}}/g, "<mi>0</mi>").replace(/{{a4}}/g, a4).replace(/{{b1}}/g, undecided).replace(/{{b2}}/g, b2).replace(/{{u1}}/g, "<mi>force</mi>")
		]);
	},
	() => { highlight("#b1"); },
	() => { highlight("#u1"); },
	() => { highlight("#xd1"); },
	() => {
		unhighlight("#b1");
		unhighlight("#u1");
		unhighlight("#xd1");
		MathJax.Hub.Queue([
			"Text",
			MathJax.Hub.getJaxFor("eq1"),
			formula.replace(/{{p}}/g,"<mi>position</mi>").replace(/{{pdot}}/g, "<mi>velocity</mi>").replace(/{{pddot}}/g, "<mi>acceleration</mi>").replace(/{{a1}}/g, "<mi>0</mi>").replace(/{{a2}}/g, "<mi>1</mi>").replace(/{{a3}}/g, "<mi>0</mi>").replace(/{{a4}}/g, a4).replace(/{{b1}}/g, "<mi>0</mi>").replace(/{{b2}}/g, b2).replace(/{{u1}}/g, "<mi>force</mi>")
		]);
	},
	() => { window.location.hash = "slide7" },
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

$(document).keydown(function(e) {
	k = e.originalEvent.keyCode;
	if (k == 39) {
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
// damping
// control
// gravity
// timestep

function sim_elevator(state) {
	// TODO clamp control func
	var out = state.control(state.x, state.xdot, state.goal);
	state.out = out;
	state.xddot = (out / state.mass) - (state.damping / state.mass * state.xdot) - state.gravity;
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
	ctx.fillStyle = 'red';
	ctx.fillRect(canvas.width/2, transform_coords(state.x, canvas.height, min_h, max_h), 1, state.out/(canvas.height*2));
}


function update(state, canvas, canvas_id, graph, time, graph_data, init_state, editor) {
	if (editor.hack_reload) {
		state = JSON.parse(JSON.stringify(init_state)); // fuckin javascript semantics
		eval(editor.getValue());
		state.control = control;
		time = 0;
		graph_data = [[0, state.x, state.goal]];
		graph.updateOptions({'file': graph_data});
		graph.updateOptions({'dateWindow': [0, 250]});
		graph.resize();
		editor.hack_reload = false;
	}
	if (editor.start) {
		var out = sim_elevator(state);
		graph_data.push([time, state.x, state.goal]);
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

	graph_data = [[0, state.x, state.goal]];
	var graph = new Dygraph(document.getElementById(graph_id), graph_data,
		{
			drawPoints: true,
			labels: ["time", "position", "goal"],
			series: {
				"time": { axis: "y1" },
				"position": { axis: "y1" },
				"goal": { axis: "y1" },
			},
			valueRange: [min_h,max_h],
			axes: {
				y1: {
					valueRange: [min_h,max_h],
				},
				y2: {
					valueRange: [-10000, 10000],
					drawAxis: false,
					axisLabelFormatter: (d, g, o, dg) => { return "" },
				}
			},
			dateWindow: [0,250],
			drawPoints: false,
			strokeWidth: 4,
		});

	init_state = JSON.parse(JSON.stringify(state));

	eval(control_func);
	state.control = control;
	
	update(state, canvas, canvas_id, graph, 0, graph_data, init_state, editor);
}
