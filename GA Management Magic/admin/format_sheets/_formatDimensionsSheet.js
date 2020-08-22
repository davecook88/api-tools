function _formatDimensionsSheet(sheet) {
  const columnHeaders = [
    ["include", "property", "name", "index", "scope", "active", "url", "updated", "created"]
  ];

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
