function fieldInRules() {
    // note: if the need is to search for a field occurance, use line 3 instead of line 4
    // var _field = "operational_status"
    var _field = "operational_status = 6";
    var checks = [
        {
            name: "Business Rule",
            points: 2,
            table: "sys_script",
            query:"filter_conditionLIKE" + _field + "^ORtemplateLIKE" + _field + "^ORconditionLIKE" + _field + "^ORscriptLIKE" + _field + "^active=true"
        },
        {
            name: "Script Include",
            points: 2,
            table: "sys_script_include",
            query: "scriptLIKE" + _field + "^active=true"
        },
        {
            name: "Catalog Client Script",
            points: 2,
            table: "catalog_script_client",
            query: "scriptLIKE" + _field + "^active=true"
        },
        {
            name: "Scheduled Script Execution",
            points: 2,
            table: "sysauto_script",
            query: "scriptLIKE" + _field + "^active=true"
        },
        {   
            name: "Discovery Pattern",
            points: 2,
            table: "sa_pattern",
            query: "ndlLIKE" + _field + "^active=true"
        },
        {   
            name: "Discovery Sensor",
            points: 2,
            table: "discovery_sensor",
            query: "scriptLIKE" + _field + "^active=true"
        },
        {
            name: "Flow Record Triggers",
            points: 2,
            table: "sys_flow_record_trigger",
            query: "conditionLIKE" + _field + "^active=true"
        },
        {
            name: "Transform Field Map Script",
            points: 2,
            table: "sys_transform_entry",
            query: "source_fieldLIKE" + _field + "^ORsource_scriptLIKE" + _field
        },
        {
            name: "Transform Script",
            points: 2,
            table: "sys_transform_script",
            query: "scriptLIKE" + _field + "^active=true"
        },
        {
            name: "Transform Processing",
            points: 2,
            table: "sys_transform_map",
            query: "scriptLIKE" + _field + "^active=true"
        },
        {
            name: "ACLs*",
            points: 3,
            table: "sys_security_acl",
            query: "nameLIKE" + _field + "^active=true"
        },
        {
            name: "DB Views*",
            points: 3,
            table: "sys_db_view_table",
            query: "where_clauseLIKE" + _field + "^active=true"
        },
        {
            name: "Workflows",
            points: 4,
            table: "sys_variable_value",
            query: "valueLIKE" + _field 
        },
        {
            name: "Reference Qualifiers",
            points: 3,
            table: "sys_dictionary",
            query: "reference_qual_conditionLIKE" + _field + "^active=true"
        },
        {
            name: "Reports",
            points: 2,
            table: "sys_report",
            query:  "filterLIKE" + _field + "^is_published=true"
        }
    ];

    var out = "";
    checks.forEach(function (check) {
        if(check.fields) {
            check.fields.forEach(function (field) {
                var findRule = new GlideRecord(check.table);
               findRule.addEncodedQuery(field + "LIKE" + _field);
               findRule.query();
     
               var checkCount = 0;
                while (findRule.next()) {
                    checkCount++;
                    gs.info(findRule.findRule.sys_id);
                }
                out += "\n" + check.name + "," + check.table + "," + field + "," + checkCount + "," + check.points + "," + checkCount*check.points;
            });
        } else if (check.query) {
            var findRule = new GlideRecord(check.table);
            findRule.addEncodedQuery(check.query);
            findRule.query();
  
            var checkCount = 0;
             while (findRule.next()) {
                 checkCount++;
             }
             out += "\n" + check.name + "," + check.table + "," + check.query + "," + checkCount + "," + check.points + "," + checkCount*check.points;
        }
    });
    gs.info(out);
 }
fieldInRules();