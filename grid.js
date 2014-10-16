
app.Grid = Backbone.View.extend({
	className: 'datagrid',
	defaults: {
		sort: null,
	},
	events: {
		'click .headerCell': 'handleHeaderCellClick',
		'click .rowCell': 'handleRowCellClick',
		'blur .rowCell .editor' : 'handleRowCellBlur',
	},
	handleRowCellBlur: function( e ) {
		var $el, name, type, value, editing;

		$el = $(e.target);
		editing = $el.hasClass('editing');
		if (!editing) return app.cancelEvent(e);

		value = $el.text() || $el.val();

		$el.parent().empty().text(value);

		return app.cancelEvent(e);
	},
	handleHeaderCellClick: function( e ) {
		var $el = $(e.target);
		var name = $el.data('name');
		var type = $el.data('type');

		if (this.sort.column === name) {
			this.sort.asc = !this.sort.asc;
		} else {
			this.sort = {
				column: name,
				asc: true,
			}
		}

		this.render();
		return app.cancelEvent(e);
	},
	handleRowCellClick: function( e ) {
		var $el = $(e.target).closest('.rowCell');
		var name = $el.data('name');
		var type = $el.data('type');
		var value = $el.text() || $el.val();
		var editing = $el.hasClass('editing');
		var result;
		var $editor;
		var fadeTime = 500;

		if (this.model.config.update.allow === true && !editing) {
			result = app.editors[type]();
			$editor = result.$el;

			$editor.val(value);
			if ($editor) $el.empty().append($editor);

			if (type === app.types.Color) {
				$('.colorPicker', $el).spectrum({color: "#f00"});
			}

			if (type === app.types.Date) {
				result.control.setMoment(moment(value, 'MM/DD/YYYY'));
			} else if (type === app.types.Boolean) {
				if (value === 'true') {
					$editor.attr('checked', 'checked');
				} else {
					$editor.removeAttr('checked');
				}
			}

			$('.editorCloseButton', $el).on('click', function(e) {
				var $this = $(this);
				$this.parent().removeClass('editing');
				$this.parent().text($this.prev().val());
				$this.fadeOut(fadeTime).prev().fadeOut(fadeTime);
			});

			$('.editor', $el).fadeIn(fadeTime);
			$el.addClass('editing');
		}
	},
	initialize: function(args) {
		this.model = args.table;
		this.template = args.template;

		if (this.model.config.sort.allow === true && this.model.config.sort.defaultColumn) {
			this.sort = {
				column: this.model.config.sort.defaultColumn,
				asc: true,
			};
		}
	},
	render: function() {
		var $table, sortColumn;

		if (this.sort) {
			sortColumn = app.table.columnLookup[this.sort.column];

			if (sortColumn.type === app.types.Date) {
				this.model.data = _.sortBy(this.model.data, function(item) {
					return new Date(item.dateOfBirth);
				});
			} else {
				this.model.data = _.sortBy(this.model.data, this.sort.column);
			}

			if (!this.sort.asc) this.model.data = this.model.data.reverse();
		}

		this.$el.html(this.template(this.model));
		$table = $('table', this.$el);

		if (this.model.config.key) $table.addClass(this.model.config.key);
		if (this.model.config.style) $table.attr('style', this.model.config.style);
		if (this.model.config.classNames) $table.addClass(this.model.config.classNames);
		if (this.model.config.borderType) $table.addClass(this.model.config.borderType);
		if (this.model.config.alternateRowHighlighting) $table.addClass(this.model.config.alternateRowHighlighting);
	},
});