function _formatMetricsSheet(sheet) {
  const columnHeaders = [Object.keys(mapMetricValues())];

  const sheetFormatter = new SheetFormatter(sheet);
  sheetFormatter.setTopRowValues(columnHeaders);
  sheetFormatter.setTopRowFormat(globals.format.topRow);

  const includeColumnOptions = ["✓", ""];
  sheetFormatter.addDropdownsToColumn('include',includeColumnOptions);

  const scopeColumnOptions = ["HIT", "PRODUCT"];
  sheetFormatter.addDropdownsToColumn('scope',scopeColumnOptions);

  const activeColumnOptions =  ["✓", "x"];
  sheetFormatter.addDropdownsToColumn('active',activeColumnOptions);

  sheetFormatter.resizeColumns();
  sheetFormatter.setSheetFormat(globals.format.all);
}
