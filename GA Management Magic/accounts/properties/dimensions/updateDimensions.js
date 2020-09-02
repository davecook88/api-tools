function updateDimensions() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const allSheets = ss.getSheets();
  const dimensionSheets = allSheets
    .filter((sheet) => sheet.getName().indexOf("dimensions") > -1)
    .map((sheet) => new SpreadsheetManager(ss, sheet.getName()));
  dimensionSheets.forEach((sheet) => {
    sheet.forEachRow((row) => {
      const included = row.col("include") !== "";
      if (included) {
        const rowObject = row.createObject();

        const resource = Analytics.Management.CustomDimensions.get(
          rowObject.account,
          rowObject.webPropertyId,
          rowObject.id
        );
        Logger.log(resource);
        const updatedResource = mapSheetToProfileResource(rowObject, resource);
        Logger.log(updatedResource);
        const updateResponse = Analytics.Management.Profiles.update(
          updatedResource,
          rowObject.account,
          rowObject.webPropertyId,
          rowObject.id
        );
        Logger.log(updateResponse);
      }
    });
  });
}
