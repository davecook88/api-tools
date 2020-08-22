function updateProperties() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const propertiesSheet = new SpreadsheetManager(ss, "Properties - detail");

  propertiesSheet.forEachRow((row) => {
    const included = row.col("include") !== "";
    if (included) {
      const id = row.col("property_id");
      const name = row.col("property_name");
      const url = row.col("property_url");
      const accountId = row.col("account_id") + "";

      Logger.log(row);
      const resource = Analytics.Management.Webproperties.get(accountId, id);
      resource.name = name;
      Analytics.Management.Webproperties.update(resource, accountId, id);
    }
  });
}
