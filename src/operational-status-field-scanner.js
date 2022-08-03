function fieldInRules() {
    var _field = "operational_status";
    var checks = [
        {
            name: "Business Rule",
            points: 2,
            table: "sys_script", 
            fields: [
                "template",
                "filter_condition",
                "condition",
                "script"
            ]
        },
        {
            name: "Assignment Rule",
            points: 2,
            table: "sysrule_assignment",
            fields: [
                "condition",
                "group"
            ]
        },
        {   
            name: "SLA Definition",
            points: 2,
            table: "contract_sla",
            fields: [
                "start_condition",
                "cancel_condition"
            ]
        },
        {
            name: "Script Include",
            points: 2,
            table: "sys_script_include",
            fields: [
                "script"
            ]
        },
        {
            name: "Catalog Client Script",
            points: 2,
            table: "catalog_script_client",
            fields: [
                "script"
            ]
        },
        {
            name: "Scheduled Script Execution",
            points: 2,
            table: "sysauto_script",
            fields: [
                "script"
            ]
        },
        {   
            name: "Discovery Pattern",
            points: 2,
            table: "sa_pattern",
            fields: [
                "ndl"
            ]
        },
        {   
            name: "Discovery Sensor",
            points: 2,
            table: "discovery_sensor",
            fields: [
                "script"
            ]
        },
        {   
            name: "Discovery Probes",
            points: 2,
            table: "discovery_probes",
            fields: [
                "post_processor_script"
            ]
        },
        {   
            name: "Discovery Probe Parameter",
            points: 2,
            table: "discovery_probe_parameter",
            fields: [
                "value",
                "value_script" 
            ]
        },
        {   
            name: "Email Action",
            points: 2,
            table: "sysevent_email_action",
            fields: [
                "advanced_condition"
            ]
        },
        {
            name: "Flow Record Triggers",
            points: 2,
            table: "sys_flow_record_trigger",
            fields: [
                "condition"
            ]
        },
        {
            name: "Flow Snapshots",
            points: 3,
            table: "sys_flow_report_snapshot",
            fields: [
                "payload"
            ]
        },
        {
            name: "Transform Field Map Script",
            points: 2,
            table: "sys_transform_entry",
            fields: [
                "source_script",
                "source_field"
            ]
        },
        {
            name: "Transform Script",
            points: 2,
            table: "sys_transform_script",
            fields: [
                "script",
            ]
        },
        {
            name: "Transform Processing",
            points: 2,
            table: "sys_transform_map",
            fields: [
                "script"
            ]
        },
        {
            name: "ACLs",
            points: 3,
            table: "sys_security_acl",
            fields: [
                "name"
            ]
        },
        {
            name: "DB Views",
            points: 3,
            table: "sys_db_view_table",
            fields: [
                "where_clause"
            ]
        },
        {
            name: "Workflows",
            points: 4,
            table: "sys_variable_value",
            fields: [
                "value"
            ]
        },
        {
            name: "Reference Qualifiers",
            points: 3,
            table: "sys_dictionary",
            query: "reference_qual_conditionLIKE" + _field
        },
        {
            name: "Reports",
            points: 2,
            table: "sys_report",
            query:  "filterLIKE" + _field
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