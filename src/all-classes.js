var aggQuery = new GlideAggregate('cmdb_ci');
aggQuery.groupBy('sys_class_name');
aggQuery.query();
var classArr = [];
while (aggQuery.next()) {
    classArr.push(aggQuery.sys_class_name + '');
}
gs.info(JSON.stringify(classArr));


//////////////////////////////////////////////////////////
// A better way!!!!!!!!!!!!!!!!

var ext = GlideDBObjectManager.get().getAllExtensions('cmdb_ci');
gs.info(ext)