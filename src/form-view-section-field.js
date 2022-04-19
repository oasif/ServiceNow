var out = '\n# of records,Class,View,Form Section,Field\n';

var getForm = function () {
    var gq = new GlideRecord('sys_ui_form');
    //get the forms for all tables that start with cmdb_ci
    gq.addEncodedQuery('nameSTARTSWITHcmdb_ci');
    gq.query();
    while (gq.next()) {
        var id = gq.getValue('sys_id');
        var tableName = gq.getValue('name');
        var view = gq.getDisplayValue('view');
        getCount(id, tableName, view);
    }
};

var getCount = function(tableId, tableName, view) {
	var agg = new GlideAggregate(tableName);
    agg.addAggregate('COUNT');
	agg.query();
	if (agg.next()) {
		var count = agg.getAggregate('COUNT');
        if (count > 0){
            getSections(count, tableId, tableName, view);
        }
	}
};

var getSections = function(count, tableId, tableName, view) {
    var gq = new GlideRecord('sys_ui_form_section');
    //get the forms for all tables that start with cmdb_ci
    gq.addEncodedQuery('sys_ui_form='+ tableId +'^');
    gq.query();
    while (gq.next()) {
        var id = gq.getValue('sys_ui_section');
        var name = gq.getDisplayValue('sys_ui_section');
        getFields(count, id, name, tableName, view);
    }
};

var getFields = function(count, sectionId, sectionName, tableName, view) {
    var gq = new GlideRecord('sys_ui_element');
    //get the forms for all tables that start with cmdb_ci
    gq.addEncodedQuery('sys_ui_section='+ sectionId +'^type=NULL');
    gq.query();
    while (gq.next()) {
        //gs.info(JSON.stringify(gr2obj(gq)));
        var name = gq.getDisplayValue('element');
        out += count + ',' + tableName + ',' + view + ',' + sectionName + ',' + name +'\n';
    }
};

getForm();
attachCsv2Kb("form-view-section-field", out);
gs.info('success!');