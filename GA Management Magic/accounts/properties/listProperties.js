function listProperties(){
  Logger.log("listDimensions");
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const included = _getIncludedProperties(ss);
  Logger.log(included);
  const analytics = new AnalyticsManager(included);
  const propertiesSheet = SpreadsheetApp.insertSheet('Properties');
}