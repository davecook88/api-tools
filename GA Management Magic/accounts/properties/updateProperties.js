function updateProperties() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const accountsSheet = new SpreadsheetManager(ss, "accounts");

  accountsSheet.forEachRow((row) => {
    const included = row.col("include") !== "";
    if (included) {
      // {"id":"UA-145357337-1","name":"Patreon","url":"https://www.patreon.com/lakarencita","accountId":"145357337"}
      const id = row.col("property id");
      const name = row.col("property name");
      const url = row.col("property url");
      const accountId = row.col("account id");

      const resource = {
        id:id,
        name:name,
        url:url,
        accountId:accountId,
      }
      Analytics.Management.Webproperties.update(resource, accountId, id);
    }
  });
}