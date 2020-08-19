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
      property.name,
      property.url,
      property.id,
    ]);    
  });

  sheet.values.push(...rows);
  Logger.log(sheet.values);
  sheet.updateAllValues();
}