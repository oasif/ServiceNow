var regex_parse = /\[.*= /;
var RDTQuery = 'sys_created_onONThis week@javascript:gs.beginningOfThisWeek()@javascript:gs.endOfThisWeek()^ORsys_created_onONLast week@javascript:gs.beginningOfLastWeek()@javascript:gs.endOfLastWeek()^state=1'; // Created on last two weeks.
var RDT = new GlideRecord('reconcile_duplicate_task');
//    RDT.addEncodedQuery(RDTQuery);  // This is for just the last two weeks. 
RDT.addQuery('state', 1); // This is for all data in the duplicates list.
// RDT.setLimit(10)
RDT.query();

var dupClassObj = {};
var dupTypeObj = {};

while (RDT.next()) {
    var dupType = '';
    var SJF = new GlideRecord('sys_journal_field');
    SJF.addQuery('element_id', RDT.sys_id);
    SJF.query();
    if (SJF.next()) {
        dupType = regex_parse.exec(SJF.value) + '';
        if (dupType) {
            var dupTypeLength = dupType.length;
            dupType = dupType.substring(1, dupType.length - 2);
            if (!dupTypeObj[dupType]) {
                dupTypeObj[dupType] = {
                    count: 1
                };
            } else {
                dupTypeObj[dupType].count++;
            }

            var RDTSysId = RDT.sys_id;
            var RDTNUmberDV = RDT.number.getDisplayValue();
            var DARQuery = 'follow_on_task=' + RDTSysId;
            var DAR = new GlideRecord('duplicate_audit_result');
            DAR.addEncodedQuery(DARQuery);
            DAR.query();

            while (DAR.next()) {

                var dupCIDataSource = 'EMPTY';
                var dupCITypeValue = dupType;
                var dupCI = DAR.duplicate_ci;
                var dupCIName = DAR.duplicate_ci.name;
                var dupCIClass = DAR.duplicate_ci.sys_class_name + '';
                dupCIDataSource = DAR.duplicate_ci.discovery_source + '';
                var dupCIKey = dupCIClass + '|' + dupCIDataSource + '|' + dupCITypeValue;
                if (!dupClassObj[dupCIKey]) {
                    dupClassObj[dupCIKey] = {
                        count: 1
                    };
                } else {
                    dupClassObj[dupCIKey].count++;
                }
            }



        }
    }
}

// gs.info(JSON.stringify(dupClassObj))
var tableOut = '\nDuplicate Field,Number of Duplicates\n';
Object.keys(dupTypeObj).forEach(function (key) {
    tableOut += key + ',' + dupTypeObj[key].count + '\n';
});
// gs.info(tableOut)
attachCsv2Kb("duplicateFields", tableOut);

var tableOut2 = '\nDuplicate Class,Discovery Source,Field,Number of Duplicates\n';
Object.keys(dupClassObj).forEach(function (key) {
    tableOut2 += key.replaceAll('|', ',') + ',' + dupClassObj[key].count + '\n';
});
//gs.info(tableOut2);
attachCsv2Kb("DupValueClasses", tableOut2);