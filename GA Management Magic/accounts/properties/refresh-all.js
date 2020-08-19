function refreshAll() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = ss.getSheets();
  const accountSheets = sheets.filter(
    (sheet) => sheet.getName().indexOf("Properties for acc:") > -1
  );

  if (!accountSheets.length) {
    Browser.msgBox("No account sheets found");
    return;
  }

  accountSheets.forEach((sheet) => {
    const accountId = sheet.getName().slice(20,30);
    listFilters([accountId]);
    const propertiesList = _getPropertiesList(sheet);
    listDimensions(propertiesList);
    listMetrics(propertiesList);    
  });
}

function _getPropertiesList(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow > 3) {
    const propertiesValues = sheet.getRange(3, 1, lastRow - 2, 2).getValues();
    const propertyIds = propertiesValues.map(row => row[0]);
    return propertyIds;
  }
}
