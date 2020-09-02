function _formatDimensionsSheet(sheet) {
  const columnHeaders = [Object.keys(mapDimensionValues())];

  const sheetFormatter = new SheetFormatter(sheet);
  sheetFormatter.setTopRowValues(columnHeaders);
  sheetFormatter.setTopRowFormat(globals.format.topRow);

  const includeColumnOptions = ["✓", ""];
  sheetFormatter.addDropdownsToColumn('include',includeColumnOptions);

  const scopeColumnOptions = ["USER", "SESSION", "HIT", "PRODUCT"];
  sheetFormatter.addDropdownsToColumn('scope',scopeColumnOptions);

  const activeColumnOptions =  ["TRUE", "FALSE"];
  sheetFormatter.addDropdownsToColumn('active',activeColumnOptions);

  sheetFormatter.resizeColumns();
  sheetFormatter.setSheetFormat(globals.format.all);
}
