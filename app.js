
var app = {};

app.cancelEvent = function(e) {
	e.preventDefault();
	e.stopImmediatePropagation();
	return false;
}

app.templates = {};

function getTemplate($el) {
	app.templates[$el.attr('id')] = $el.html();
	$el.empty().remove();
}

function getTemplates() {
	_.each($('[type="text/template"]'), function(template) {
		getTemplate($(template));
	});
}

getTemplates();

app.widthModes = {
	autoHeader: 1, // ensure that all column headers fit
	autoBody: 2, // ensure that all column cells fit
	autoBodyAndHeader: 3, // ensure that all column headers and cells fit
	userSettings: 4, // manually set width of columns
	forceFit: 5, // ensure that all columns fit in grid
};

app.types = {
	Boolean: 'Boolean',
	Number: 'Number',
	String: 'String',
	LongString: 'LongString',
	Object: 'Object',
	Array: 'Array',
	Function: 'Function',
	Date: 'Date',
	RegExp: 'RegExp',
	File: 'File',
	Color: 'Color',
};

app.borderTypes = {
	vertical: '',
	horizontal: 'pure-table-horizontal',
	both: 'pure-table-bordered',
};

app.typeNames = _.keys(app.types);