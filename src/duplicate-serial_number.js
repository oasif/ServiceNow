
var out = 'Serial Number,Dup Count\n';
var gaDupCheck1 = new GlideAggregate('cmdb_ci');
// gaDupCheck1.setLimit(10);
gaDupCheck1.addAggregate('COUNT', 'serial_number');
gaDupCheck1.groupBy('serial_number');
gaDupCheck1.addHaving('COUNT', '>', 1);
gaDupCheck1.query();
while (gaDupCheck1.next()) {
    var count = gaDupCheck1.getAggregate('COUNT', 'serial_number');
    out += gaDupCheck1.serial_number + ', ' + count + '\n';
}
// gs.info(out);
attachCsv2Kb('duplicate-serial_number', out);
