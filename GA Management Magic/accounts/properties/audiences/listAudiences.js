function listAudiences() {
  Logger.log("listAudiences");
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const included = _getIncludedProperties(ss);
  Logger.log(included);
  const analytics = new AnalyticsManager(included);
  analytics.forEachProperty((property, account, analytics) => {
    Logger.log(property, account, analytics);
    const audienceList = property.getAudienceList();
    audiences = audienceList.getItems() || [];
    if (!audiences.length) {
      SpreadsheetApp.getUi().alert("No audiences for property " + property.id);
    } else {
      const audienceSheet = createSheetIfNeeded(ss, "audiences", property); // returns SpreadsheetManager
      const audienceSheetValuesObject = new SheetValues(audienceSheet);

      audiences.forEach((audience) => {
        const rowObject = mapAudienceValues(audience);
        audienceSheetValuesObject.assimilateEntry(rowObject);
      });
      // Delete all existing values from sheet and replace them with the new data.
      audienceSheet.values = audienceSheet.values.slice(0, 1);
      const newRows = audienceSheetValuesObject.createRowsFromObject();
      if (newRows) {
        audienceSheet.values.push(...newRows);
        audienceSheet.clearSheetAndPasteValues();
      }
    }
  });
}

function _getIncludedProperties(ss) {
  const included = {
    accounts: new Set(),
    properties: new Set(),
  };
  const accountsSheet = new SpreadsheetManager(ss, "accounts");
  accountsSheet.forEachRow((row) => {
    const include = row.col("include") !== "";
    if (include) {
      const account = row.col("account_id");
      const property = row.col("property_id");
      included.accounts.add(account);
      included.properties.add(property);
    }
  });
  if (included.properties.size || included.accounts.size) {
    return included;
  } else {
    return null;
  }
}
