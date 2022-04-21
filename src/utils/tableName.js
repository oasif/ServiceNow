var agg = new GlideAggregate("sys_ui_context_menu");
agg.addEncodedQuery("name=Copy Table Name^order=9876");
agg.addAggregate("COUNT");
agg.query();
var count = 0;
// Process returned records
while (agg.next()) {
  count = agg.getAggregate("COUNT");
}
if (count > 0) {
  gs.info("No Action: The menu item already exists");
} else {
  var gr = new GlideRecord("sys_ui_context_menu");
  gr.initialize();
  gr.name = "Copy Table Name";
  gr.active = true;
  gr.order = 9876;
  gr.type.setDisplayValue("action");
  gr.action_script = "copyToClipboard(g_list.tableName);";
  gr.menu.setDisplayValue("list_title");
  gr.insert();
  gs.info('List context "Copy Table Name" menu item was added');
}

/////////////////////////////////////////////////////////////////////////////////////////////////
//Find existing Copy Table Name menu item and remove it
var gr = new GlideRecord('sys_ui_context_menu');
gr.addEncodedQuery('name=Copy Table Name^order=9876');
gr.query();
var found = false;
while (gr.next()) {
  found = true;
  gr.deleteRecord();
  gs.info('The menu item was removed');
}
if (!found) {
  gs.info('No Action: The menu item was not found.');
}