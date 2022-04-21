///////////////////////////////////////////////////////////////
//========= USAGE ============================================
// attachCsv2Kb("filename", '1,2,3\na,b,c\n');
///////////////////////////////////////////////////////////////

var attachCsv2Kb = Class.create();
/**
 * A script include to attach a CSV file to a KB article "Dev CSV File repository"
 * @param {String} fileName
 * @param {String} csvData
 */
 attachCsv2Kb = function(fileName, csvData) {
  var getKbRecord = function() {
    var gr = new GlideRecord('kb_knowledge');
    // Check to see if a KB article already exist
    gr.addEncodedQuery('short_description=Dev CSV File repository');
    gr.query();
    var sysId = false;
    while (gr.next()) {
      sysId = gr.getValue('sys_id');
    }
    return sysId;
  };
  var kbRecordSysId = getKbRecord();
  if (!getKbRecord()) {
    // if the KB article does not exist, create it
    var gr = new GlideRecord("kb_knowledge");
    gr.initialize();
    gr.article_type = "text";
    gr.direct=true;
    gr.display_attachments= true;
    gr.kb_knowledge_base="Knowledge";
    gr.meta_description="This knowledge article is a repository for various script-generated CSV files. If a long-running script";
    gr.short_description="Dev CSV File repository",
    gr.text="<p><span style=\"font-size: 12pt;\">This knowledge article is a repository for various script-generated CSV files.</span></p>\r\n<p><span style=\"font-size: 12pt;\">If a long-running script generates data, the developer could attach the data as a csv file to this article via the script include &#34;attachCsv2Kb&#34;</span></p>";
    gr.insert();
    kbRecordSysId = gr.getValue('sys_id');
    gs.info('Success: A knowdege article has been created: ' +  kbRecordSysId);

  }else {
    gs.info('No Action: Knowledge article exists: ' +  kbRecordSysId);
  }

  // if the filename does not end with .csv then add it
  if (!fileName.endsWith('.csv')) {
      fileName += '.csv';
  }
  // Attaching CSV to the KB article
  var grRec = new GlideRecord('kb_knowledge');
  grRec.addQuery('sys_id', kbRecordSysId);
  grRec.query();
  if(grRec.next()) {
      var grAttachment = new GlideSysAttachment();
      grAttachment.write(grRec, fileName, 'application/csv', csvData);
      gs.info('Success: The CSV file was attached to KB article "Dev CSV File repository"');
  }
};


