function myFunction() {
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  var sheet = new SpreadsheetManager(ss, 'Filters@1597828212578')
  const sheetFormatter = new SheetFormatter(sheet.sheet);

  sheetFormatter.setTopRowFormat(globals.format.topRow);
}
