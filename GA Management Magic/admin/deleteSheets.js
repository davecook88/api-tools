function deleteSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = ss.getSheets();

  sheets.forEach(sheet => {
    if (sheet.getName().indexOf("accounts") === -1) {
      ss.deleteSheet(sheet);
    }
  });
}
