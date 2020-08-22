function listAccounts() {  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = new SpreadsheetManager(ss,'accounts')
  const analytics = new AnalyticsManager();

  const rows = [];
  
  analytics.forEachProperty((property, account, analytics) => {
    rows.push([
      '',
      analytics.user,
      account.id,
      account.name,
      property.url,
      property.name,
      property.id,
    ]);    
  });

  sheet.values.push(...rows);
  Logger.log(sheet.values);
  sheet.updateAllValues();
}

function _getIncludedProperties(ss) {
  const included = {
    accounts: new Set(),
    properties: new Set(),
  };
  const accountsSheet = new SpreadsheetManager(ss, "accounts");
  accountsSheet.forEachRow((row) => {
    const include = row.col("include") !== "";
    if (include) {
      const account = row.col("account_id");
      const property = row.col("property_id");
      included.accounts.add(account);
      included.properties.add(property);
    }
  });
  if (included.properties.size || included.accounts.size) {
    return included;
  } else {
    return null;
  }
}