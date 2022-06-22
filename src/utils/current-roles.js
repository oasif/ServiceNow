var gr = new GlideRecord('sys_user_has_role');
gr.addQuery('user', gs.getUserID());
gr.query();

var out = "\n";
while (gr.next()) {
    out += gr.getDisplayValue('role') + ",\n"; //Will give the sys_id of the roles
}
gs.info(out);