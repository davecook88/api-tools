function updateFilters() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const allSheets = ss.getSheets();
  const updatedResourceIds = [];
  let noIncludeds = true;
  const filtersSheets = allSheets
    .filter((sheet) => sheet.getName().indexOf("filters") > -1)
    .map((sheet) => new SpreadsheetManager(ss, sheet.getName()));
  filtersSheets.forEach((sheet) => {
    sheet.forEachRow((row) => {
      const included = row.col("include") !== "";
      if (included) {
        noIncludeds = false;
        const rowObject = row.createObject();

        const resource = Analytics.Management.CustomFilters.get(
          rowObject.accountId,
          rowObject.webPropertyId,
          rowObject.id
        );
        Logger.log(JSON.stringify(resource));
        const updatedResource = mapSheetToFilterResource(rowObject, resource);
        Logger.log(JSON.stringify(updatedResource));
        const updateResponse = Analytics.Management.CustomFilters.update(
          updatedResource,
          rowObject.accountId,
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
  if (noIncludeds){
    SpreadsheetApp.getUi().alert('No items were selected for update');
  }
  
}
