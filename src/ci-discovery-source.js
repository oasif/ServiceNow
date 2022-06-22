// cmdb_ci discovery sources

var out = 'Discovery source,Count\n';
var aggQuery = new GlideAggregate('cmdb_ci');
// aggQuery.setLimit(10);
aggQuery.addAggregate('COUNT', 'discovery_source');
aggQuery.groupBy('discovery_source');
aggQuery.query();
while (aggQuery.next()) {
    var count = aggQuery.getAggregate('COUNT', 'discovery_source');
    out += aggQuery.discovery_source + ', ' + count + '\n';
}
// gs.info(out);
attachCsv2Kb('ci-discovery-source', out);

