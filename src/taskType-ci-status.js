// jQuery('#task_breadcrumb').text()
// 'All>Created on Last 3 months>Configuration item is not empty'
// 'sys_created_onONLast 3 months@javascript:gs.beginningOfLast3Months()@javascript:gs.endOfLast3Months()^cmdb_ciISNOTEMPTY'

var monthsAgo = "3";
var taskQuery = 'sys_created_onONLast ' + monthsAgo + ' months@javascript:gs.beginningOfLast' + monthsAgo + 'Months()@javascript:gs.endOfLast' + monthsAgo + 'Months()^cmdb_ciISNOTEMPTY';
var taskList = new GlideRecord('task');
//taskList.setLimit(10);
taskList.addEncodedQuery(taskQuery);
taskList.query();

var out = 'CI Class, Task Type, State\n';
while (taskList.next()) {
    var ciClass = taskList.cmdb_ci.sys_class_name;
    var taskType = taskList.sys_class_name;
    // var ciSys_id = taskList.cmdb_ci;
    var state = taskList.state.getDisplayValue();

    out += taskType + ', ' + ciClass + ', ' + state + '\n';
}
// gs.info(out);
attachCsv2Kb("taskType-ci-status", out);