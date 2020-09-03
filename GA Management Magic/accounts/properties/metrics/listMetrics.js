function listMetrics() {
  Logger.log("listMetrics");
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const included = _getIncludedProperties(ss);
  Logger.log(included);
  const emptyList = [];
  const analytics = new AnalyticsManager(included);
  analytics.forEachProperty((property, account, analytics) => {
    const metricList = property.getMetricList();
    metrics = metricList.getItems() || [];
    if (!metrics.length) {
      emptyList.push(property.id)
    } else {
      const metricSheet = createSheetIfNeeded(ss, "metrics", property); // returns SpreadsheetManager
      const metricSheetValuesObject = new SheetValues(metricSheet);

      metrics.forEach((metric) => {
        const rowObject = mapMetricValues(metric);
        metricSheetValuesObject.assimilateEntry(rowObject);
      });
      // Delete all existing values from sheet and replace them with the new data.
      metricSheet.values = metricSheet.values.slice(0, 1);
      const newRows = metricSheetValuesObject.createRowsFromObject();
      if (newRows) {
        metricSheet.values.push(...newRows);
        metricSheet.clearSheetAndPasteValues();
      }
    }
  });
  if (emptyList.length){
    const message = emptyList.length === 1 ? "No metrics for property" : "No metrics for properties"
    SpreadsheetApp.getActiveSpreadsheet().toast(emptyList.join("\n"), message);
  }
}
