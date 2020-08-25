function updateProperties() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const propertiesSheet = new SpreadsheetManager(ss, "Properties - detail");

  propertiesSheet.forEachRow((row) => {
    const included = row.col("include") !== "";
    if (included) {
      const rowObject = row.createObject();

      const resource = Analytics.Management.Webproperties.get(
        rowObject.account,
        rowObject.id
      );
      Logger.log(resource);
      const updatedResource = mapSheetToPropertyResource(rowObject, resource);
      Logger.log(updatedResource);
      Analytics.Management.Webproperties.update(updatedResource, rowObject.account, rowObject.id);
    }
  });
}
