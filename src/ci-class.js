// cmdb_ci discovery sources

var out = 'Class,Count\n';
var aggQuery = new GlideAggregate('cmdb_ci');
// aggQuery.setLimit(10);
aggQuery.addAggregate('COUNT', 'sys_class_name');
aggQuery.groupBy('sys_class_name');
aggQuery.query();
while (aggQuery.next()) {
    var count = aggQuery.getAggregate('COUNT', 'sys_class_name');
    out += aggQuery.sys_class_name + ', ' + count + '\n';
}
// gs.info(out);
attachCsv2Kb('ci-class-name', out);


