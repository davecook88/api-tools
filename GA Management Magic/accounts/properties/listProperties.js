function listProperties() {
  Logger.log("listProperties");
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const included = _getIncludedProperties(ss);
  Logger.log(included);
  const analytics = new AnalyticsManager(included);
  const propertiesSheet = createSheetIfNeeded(ss, "properties"); // returns SpreadsheetManager
  const propertiesSheetValuesObject = new SheetValues(propertiesSheet);

  analytics.forEachProperty((property, account, analytics) => {
    Logger.log(property.GAProperty);
    const rowObject = mapPropertiesValues(property.GAProperty);
    Logger.log(rowObject);
    propertiesSheetValuesObject.assimilateEntry(rowObject);
  });

  propertiesSheet.values = propertiesSheet.values.slice(0, 1);
  const newRows = propertiesSheetValuesObject.createRowsFromObject();
  if (newRows) {
    propertiesSheet.values.push(...newRows);
    propertiesSheet.clearSheetAndPasteValues();
    propertiesSheet.resizeColumns();
  }
}
