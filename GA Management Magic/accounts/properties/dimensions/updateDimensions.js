function updateDimensions() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const allSheets = ss.getSheets();
  const updatedResourceIds = [];
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
        const updatedResource = mapSheetToDimensionResource(rowObject, resource);
        Logger.log(updatedResource);
        const updateResponse = Analytics.Management.CustomDimensions.update(
          updatedResource,
          rowObject.account,
          rowObject.webPropertyId,
          rowObject.id
        );
        Logger.log(updateResponse);
        if (updateResponse.id === rowObject.id){
          updatedResourceIds.push(rowObject.id);
        } else {
          SpreadsheetApp.getUI().alert("Error updating " + rowObject.id);
        }
      }
    });
  });
  if (updatedResourceIds.length){
    const message = "Successfully updated:"
    SpreadsheetApp.getActiveSpreadsheet().toast(updatedResourceIds.join("\n"), message);
  }
  
}
