function listFilters() {
  Logger.log("listFilters");
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const included = _getIncludedProperties(ss);
  Logger.log(included);
  const emptyList = [];
  const analytics = new AnalyticsManager(included);
  analytics.forEachProperty((property, account, analytics) => {
    const filterList = property.getFilterList();
    filters = filterList.getItems() || [];
    if (!filters.length) {
      emptyList.push(property.id)
    } else {
      const filterSheet = createSheetIfNeeded(ss, "filters", property); // returns SpreadsheetManager
      const filterSheetValuesObject = new SheetValues(filterSheet);

      filters.forEach((filter) => {
        const rowObject = mapFilterValues(filter);
        filterSheetValuesObject.assimilateEntry(rowObject);
      });
      // Delete all existing values from sheet and replace them with the new data.
      filterSheet.values = filterSheet.values.slice(0, 1);
      const newRows = filterSheetValuesObject.createRowsFromObject();
      if (newRows) {
        filterSheet.values.push(...newRows);
        filterSheet.clearSheetAndPasteValues();
      }
    }
  });
  if (emptyList.length){
    const message = emptyList.length === 1 ? "No metrics for property" : "No metrics for properties"
    SpreadsheetApp.getActiveSpreadsheet().toast(emptyList.join("\n"), message);
  }
}
