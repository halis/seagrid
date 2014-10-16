
app.closeButton = '<div class="editorCloseButton">X</div>';

app.editors = {
	String: function() {
		return { $el: $('<input type="text" class="hidden editor" data-type="String" />' + app.closeButton), control: null,  };
	},
	LongString: function() {
		return { $el: $('<textarea class="hidden editor" data-type="String"></textarea>' + app.closeButton), control: null,  };
	},
	Boolean: function() {
		return { $el: $('<input class="hidden editor" data-type="Boolean" type="checkbox" />' + app.closeButton), control: null,  };
	},
	Number: function() {
		return { $el: $('<input class="hidden editor" data-type="Number" type="text" />' + app.closeButton), control: null, };
	},
	Date: function() {
		var $el = $('<input class="hidden editor" data-type="Date" type="text" />' + app.closeButton);

		var picker = new Pikaday({ 
			field: $el[0], 
			format: 'MM/DD/YYYY',
      onSelect: function(date) {
        $el[0].value = this.getMoment().format('MM/DD/YYYY');
    	},
		});

		return { $el: $el, control: picker };
	},
	File: function() {
		return { $el: $('<input class="hidden editor" data-type="File" type="file" />' + app.closeButton), control: null, };
	},
	Color: function() {
		return { $el: $('<input type="color" class="colorPicker" />' + app.closeButton), control: null, };
	},
};

app.getters = {
	String: function($el) {
		return $el.val();
	},
	LongString: function() {
		return $el.val();
	},
	Boolean: function() {
		return $el.val();
	},
	Number: function() {
		return $el.val();
	},
	Date: function() {
		return $el.val();
	},
	File: function() {
		return $el.val();
	},
	Color: function() {
		return $el.val();
	},
};

app.getters = {
	String: function($el, val) {
		return $el.val(val);
	},
	LongString: function(val) {
		return $el.val(val);
	},
	Boolean: function(val) {
		return $el.val(val);
	},
	Number: function(val) {
		return $el.val(val);
	},
	Date: function(val) {
		return $el.val(val);
	},
	File: function(val) {
		return $el.val(val);
	},
	Color: function(val) {
		return $el.val(val);
	},
};

app.id = 1;

app.table = {
	config: {
		key: 'people',
		url: 'api/people',
		style: '',
		classNames: 'pure-table',
		borderType: app.borderTypes.both,
		alternateRowHighlighting: 'pure-table-striped',
		sort: {
			allow: true,
			defaultColumn: 'first',
		},
		insert: {
			allow: false,
		},
		update: {
			allow: true,
		},
	  remove: {
	  	allow: false,
	  },
		validation: {
			allow: false,
		},
		filter: {
			allow: false,
		},
		paging: {
			allow: false,
		},
		grouping: {
			allow: false,
		},
		export: {
			allow: false,
		},
		columns: {
			reorder: false,
			showHide: false,
			widthMode: app.widthModes.autoBodyAndHeader,
		},
	},
	columns: [
		{ 
			name: 'first', 
			headerText: 'First Name',
			type: app.types.String,
		},
		{ 
			name: 'last', 
			headerText: 'Last Name',
			type: app.types.String,
		},
		{ 
			name: 'age', 
			headerText: 'Age',
			type: app.types.Number,
		},
		{ 
			name: 'married', 
			headerText: 'Married',
			type: app.types.Boolean,
		},
		{ 
			name: 'children', 
			headerText: 'Children',
			type: app.types.LongString,
		},
		{ 
			name: 'dateOfBirth', 
			headerText: 'Date of Birth',
			type: app.types.Date,
		},
		{ 
			name: 'resume', 
			headerText: 'Resume/CV',
			type: app.types.File,
		},
		{
			name: 'favoriteColor', 
			headerText: 'Favorite Color',
			type: app.types.Color,
		},
	],
	data: [
		{
			_id: app.id,
			first: 'chris',
			last: 'grimes',
			age: 33,
			married: true,
			children: 'Arlo, Emory',
			dateOfBirth: '05/19/1981',
			resume: null,
			favoriteColor: '#ff0000',
		},
		{
			_id: ++app.id,
			first: 'danielle',
			last: 'grimes',
			age: 32,
			married: true,
			children: 'Arlo, Emory',
			dateOfBirth: '03/04/1982',
			resume: null,
			favoriteColor: '#ff0000',
		},
		{
			_id: ++app.id,
			first: 'arlo',
			last: 'grimes',
			age: 1,
			married: false,
			children: [],
			dateOfBirth: '11/02/2012',
			resume: null,
			favoriteColor: '#ff0000',
		},
		{
			_id: ++app.id,
			first: 'emory',
			last: 'grimes',
			age: 1,
			married: false,
			children: [],
			dateOfBirth: '11/02/2012',
			resume: null,
			favoriteColor: '#ff0000',
		},
		{
			_id: ++app.id,
			first: 'billy',
			last: 'bob',
			age: 21,
			married: false,
			children: [],
			dateOfBirth: '11/03/2012',
			resume: null,
			favoriteColor: '#ff0000',
		},
		{
			_id: ++app.id,
			first: 'john',
			last: 'doe',
			age: 2,
			married: false,
			children: [],
			dateOfBirth: '03/04/1981',
			resume: null,
			favoriteColor: '#ff0000',
		},
		{
			_id: ++app.id,
			first: 'john',
			last: 'doe',
			age: 10,
			married: false,
			children: [],
			dateOfBirth: '03/04/1981',
			resume: null,
			favoriteColor: '#ff0000',
		},
	],
};

app.table.columnLookup = (function() {
	var result = {};
	_.each(app.table.columns, function(column) {
		result[column.name] = {
			headerText: column.headerText,
			type: column.type,
		};
	});

	return result;
}());