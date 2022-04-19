var classObj = {};

// jQuery('#task_breadcrumb').text()
// 'All>Created on Last 3 months>Configuration item is not empty'
var taskQuery = 'sys_created_onONLast 3 months@javascript:gs.beginningOfLast3Months()@javascript:gs.endOfLast3Months()^cmdb_ciISNOTEMPTY';
var taskList = new GlideRecord('task');
//taskList.setLimit(10);
taskList.addEncodedQuery(taskQuery);
taskList.query();

while (taskList.next()) {
    var CIClass = taskList.cmdb_ci.sys_class_name;
    var CIsys_id = taskList.cmdb_ci;

    if (CIClass && CIsys_id) {
        var CIFieldQuery = 'sys_idSTARTSWITH' + CIsys_id;
        var CIFields = new GlideRecord(CIClass);
        CIFields.addEncodedQuery(CIFieldQuery);
        CIFields.query();

        if (CIFields.next()) {
            var assigned_to = CIFields.assigned_to.getDisplayValue() + '';
            var assignment_group = CIFields.assignment_group.getDisplayValue() + '';
            var managed_by = CIFields.managed_by.getDisplayValue() + '';
            var managed_by_group = CIFields.manage_by_group.getDisplayValue() + '';
            var supported_by = CIFields.supported_by.getDisplayValue() + '';
            var support_group = CIFields.support_group.getDisplayValue() + '';
            var owned_by = CIFields.owned_by.getDisplayValue() + '';

            var classKey = CIClass + '|' + assigned_to + '|' + assignment_group + '|' + managed_by + '|' + managed_by_group + '|' + supported_by + '|' + support_group + '|' + owned_by;

            if (!classObj[classKey]) {
                classObj[classKey] = {
                    count: 1
                };
            } else {
                classObj[classKey].count++;
            }
        }
    }
}

var tableOut2 = '\nCIClass,assigned_to,assignment_group,managed_by,managed_by_group,supported_by,support_group,owned_by,task_count\n';
Object.keys(classObj).forEach(function (key) {
    tableOut2 += key.replaceAll('|', ',') + ',' + classObj[key].count + '\n';
});
//gs.info(tableOut2);
attachCsv2Kb("task-class-analysis", tableOut2);
