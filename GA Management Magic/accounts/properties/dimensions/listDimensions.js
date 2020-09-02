function listDimensions() {
  Logger.log("listDimensions");
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const included = _getIncludedProperties(ss);
  Logger.log(included);
  const emptyDimensions = [];
  const analytics = new AnalyticsManager(included);
  analytics.forEachProperty((property, account, analytics) => {
    const dimensionList = property.getDimensionList();
    dimensions = dimensionList.getItems() || [];
    if (!dimensions.length) {
      emptyDimensions.push(property.id);  
    } else {
      const dimensionSheet = createSheetIfNeeded(ss, "dimensions", property); // returns SpreadsheetManager
      const dimensionSheetValuesObject = new SheetValues(dimensionSheet);

      dimensions.forEach((dimension) => {
        const rowObject = mapDimensionValues(dimension);
        dimensionSheetValuesObject.assimilateEntry(rowObject);
      });
      // Delete all existing values from sheet and replace them with the new data.
      dimensionSheet.values = dimensionSheet.values.slice(0, 1);
      const newRows = dimensionSheetValuesObject.createRowsFromObject();
      if (newRows) {
        dimensionSheet.values.push(...newRows);
        dimensionSheet.clearSheetAndPasteValues();
      }
    }
  });
  if (emptyDimensions.length){
    const message = emptyDimensions.length === 1 ? "No dimensions for property" : "No dimensions for properties"
    SpreadsheetApp.getActiveSpreadsheet().toast(emptyDimensions.join("\n"), message);
  }
}
