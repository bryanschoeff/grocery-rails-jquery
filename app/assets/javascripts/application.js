var template;
var groceries = {};

groceries.loadList = function () {
    $.getJSON('grocery_items', function (data) {
        
        var grouped = _.groupBy(data, function(item) { return item.section; });
	var mapped = _.map(grouped, function(val, key) { return { section: key, items: val}; });
        var result = { results: mapped };
        
        $('#grocerylist').html(template(result));
        groceries.rebindList();
    });
};

groceries.addItem = function (item, section, done) {
    var data = { grocery_item: { item: item, section: section, done: done }};
     $.ajax({
        type: 'POST',
        url: 'grocery_items',
        data: data,
	dataType: 'json'
    }).done(function () {
        $('#newitem').val('');
        groceries.loadList();
    });
};

groceries.updateDone = function (id, done) {
    var data = { grocery_item: { done: done }};
    $.ajax({
        type: 'PUT',
        url: 'grocery_items/' + id,
        data: data,
	dataType: 'json'
    }).done(function () {
        groceries.loadList();
    });
};

groceries.updateItem = function (id, item, section, done) {
   var data = { grocery_item: { item: item, section: section, done: done }};
    $.ajax({
        type: 'PUT',
        url: 'grocery_items/' + id,
        data: data,
	dataType: 'json'
    }).done(function () {
        groceries.loadList();
    });
};

groceries.clearDeleted = function () {
    $.ajax({
        type: 'GET',
        url: 'grocery_items/clear'
    }).done(function () {
        groceries.loadList();
    });
};

groceries.rebindList = function () {
    $('.itemview').on("dblclick", function (event) {
        $(this).parent().children('.itemview').addClass('hidden');
        $(this).parent().children('.itemedit').removeClass('hidden');
    });

    $('.itemupdate').on("click", function () {
        var item = $(this).parent().children('.changeitem').val();
        var section = $(this).parent().children('.changesection').val();
        var id = $(this).parent().children('.itemid').val();

        groceries.updateItem(id, item, section);
    });

    $('.itemchecked').on("click", function (event) {
        var id = $(this).parent().parent().children('.itemedit').children('.itemid').val();

        groceries.updateDone(id, !$(this).parent().hasClass('done'));
    });
    $('.changeitem,.changesection').keypress(function (e) {
        if (e.which == 13) {
            $(this).parent().children('.itemupdate').click();
        }
    });
};

$(document).ready(function () {
    template = Handlebars.compile($('#grocery-template').html());

    $('#addnew').click( function() {
        groceries.addItem($('#newitem').val(), "", false);
    });

    $('#newitem').keypress(function (e) {
        if (e.which == 13) {
            $('#addnew').click();
        }
    });

    $('#cleardeleted').click(function () {
        groceries.clearDeleted();
    });
    
    groceries.loadList();
});
