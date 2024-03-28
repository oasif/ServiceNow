
var agg = new GlideAggregate('recommended_field_remediation');
var count = '';
agg.addEncodedQuery("opened_at<javascript:gs.dateGenerate('2023-03-24','00:00:00')");
agg.addAggregate('COUNT');
agg.query();
if (agg.next()) {
    count = agg.getAggregate('COUNT');
}
gs.info(count)

//3086877

var agg = new GlideAggregate('cmdb_ci');
var count = '';
agg.addAggregate('COUNT');
agg.query();
if (agg.next()) {
    count = agg.getAggregate('COUNT');
}
gs.info(count)