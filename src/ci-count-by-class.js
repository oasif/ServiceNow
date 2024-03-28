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
attachCsv2Kb('ci-count-by-class', out);


////////////////////////////////////////////////////////////////////////
// A better way
var out = 'Class,Count\n';
var ext = GlideDBObjectManager.get().getAllExtensions('cmdb_ci');
for (var x = 0; x < ext.size(); ++x) {
    var cmdbTable = ext.get(x);
    var agg = new GlideAggregate('cmdb_ci');
    agg.addEncodedQuery('sys_class_name=' + cmdbTable);
    var count = '0';
    agg.addAggregate('COUNT');
    agg.query();
    if (agg.next()) {
        count = agg.getAggregate('COUNT');
    }

    out += cmdbTable + ', ' + count + '\n';
}
// gs.info(out);
attachCsv2Kb('ci-count-by-class', out);