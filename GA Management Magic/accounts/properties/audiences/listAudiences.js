function listAudiences() {
  const ui = SpreadsheetApp.getUi()
  Logger.log("listAudiences");
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const included = _getIncludedProperties(ss);
  Logger.log(included);
  const emptyAudiences = [];
  const analytics = new AnalyticsManager(included);
  analytics.forEachProperty((property, account, analytics) => {
    const audienceList = property.getAudienceList();
    audiences = audienceList.getItems() || [];
    let createSheet = true;
    if (!audiences.length) {
      const createEmptyResponse = ui.alert(
        "No dimensions found for " + property.id + ". Create an empty sheet?",
        ui.ButtonSet.YES_NO
      );
      if (createEmptyResponse == ui.Button.NO) {
        createSheet = false;
        emptyAudiences.push(property.id);
      }
    }
    if (createSheet) {
      const audienceSheet = createSheetIfNeeded(ss, "audiences", property); // returns SpreadsheetManager
      const audienceSheetValuesObject = new SheetValues(audienceSheet);

      audiences.forEach((audience) => {
        Logger.log(audience);
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
  if (emptyAudiences.length) {
    const message =
      emptyAudiences.length === 1
        ? "No audiences for property"
        : "No audiences for properties";
    SpreadsheetApp.getActiveSpreadsheet().toast(
      emptyAudiences.join("\n"),
      message
    );
  }
}
