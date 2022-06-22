///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// CMDB - Analysis 
// To kill a Scheduled Job
// 1. as admin Navigate to: System Diagnosis > Active Transactions (All Nodes)
// 2. Review active jobs with type "Scheduler"
// 3. Add user field to list view.  Use "Run As" user to identify specific jobs.
// 4. [x] the box on the left of the job that needs to be killed.
// 5. under [Perform actions on selected] - Choose the option "Kill".
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////
// Return the total number of records in the table. 
////////////////////////////////////////////////////////////////////////////////////////
var getCountRecordsCustomFieldNotEmpty = function (_table, _field) {
    var recCount = 0;
    // Get count of entries in table.
    var recQuery = _field + 'ISNOTEMPTY';
    var countRec = new GlideAggregate(_table);
    countRec.addEncodedQuery(recQuery);
    countRec.addAggregate('COUNT');
    countRec.query();

    if (countRec.next()) {
        recCount = countRec.getAggregate('COUNT');
    }

    return recCount;
};

////////////////////////////////////////////////////////////////////////////////////////
// Return the total number of records in the table. 
////////////////////////////////////////////////////////////////////////////////////////
var getRecordCount = function (_table) {
    var tabRecCount = 0;
    // Get count of entries in table.
    var tabRec = new GlideAggregate(_table);
    tabRec.addAggregate('COUNT');
    tabRec.query();

    if (tabRec.next()) {
        tabRecCount = tabRec.getAggregate('COUNT');
    }

    return tabRecCount;
};

var countTotalTables = 0;
var countTotalCustomFields = 0;

// jQuery('#sys_db_object_breadcrumb')
// All > Name starts with cmdb_ > or Name starts with u_cmdb_ > Extends table Name starts with cmdb_
// Get all tables and custom tables that are part of the CMDB
//super_class.nameSTARTSWITHcmdb_^ORnameSTARTSWITHcmdb_^NQnameSTARTSWITHu_cmdb

var dbObjectQuery = 'super_class.nameSTARTSWITHcmdb_^ORnameSTARTSWITHcmdb_^NQnameSTARTSWITHu_cmdb';
var dbObject = new GlideRecord('sys_db_object');
//dbObject.setLimit(5);
dbObject.addEncodedQuery(dbObjectQuery);
dbObject.query();

var tableOut = '\ntable,count\n';
var customFieldOut = '\ntable,field,count\n';

while (dbObject.next()) {
    var gRU = new GlideRecordUtil();
    var fieldsArr = gRU.getFields(dbObject);

    // verify that table has a name field
    if (fieldsArr.indexOf('name') > -1) {
        countTotalTables++;
        var tableName = dbObject.name + '';
        var countTableRecords = getRecordCount(tableName);

        if (countTableRecords > 0) {
            tableOut += tableName + ',' + countTableRecords + '\n';


            // get all the custom fields (that start with u_)  for each table in the CMDB
            var sysDictQuery = 'elementSTARTSWITHu_^name=' + tableName;
            var sysDict = new GlideRecord('sys_dictionary');
            sysDict.addEncodedQuery(sysDictQuery);
            sysDict.query();

            while (sysDict.next()) {
                countTotalCustomFields++;

                var customFieldName = sysDict.element + '';
                // get the number of records were the customFieldName is not empty
                var countRecordsCustomFieldNotEmpty = getCountRecordsCustomFieldNotEmpty(tableName, customFieldName);
                customFieldOut += tableName + ',' + customFieldName + ',' + countRecordsCustomFieldNotEmpty + '\n';
            }
        }

    }
}

var finalMsg = '\nRecord Scan\n...Total tables: ' + countTotalTables + '\n...Total custom fields: ' + countTotalCustomFields;

//gs.info(tableOut);
attachCsv2Kb("tableOut", tableOut);
//gs.info(customFieldOut);
attachCsv2Kb("customFieldOut", customFieldOut);
attachCsv2Kb("u_field Summary", finalMsg);
gs.info(finalMsg);
