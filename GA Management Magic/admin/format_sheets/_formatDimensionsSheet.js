function _formatDimensionsSheet(sheet) {
  const columnHeaders = [
    ["Include", "Property", "Name", "Index", "Scope", "Active"]
  ];

  const sheetFormatter = new SheetFormatter(sheet);
  sheetFormatter.setTopRowValues(columnHeaders);
  sheetFormatter.setTopRowFormat(globals.format.topRow);

  const includeColumnOptions = ["✓", ""];
  sheetFormatter.addDropdownsToColumn('Include',includeColumnOptions);

  const scopeColumnOptions = ["USER", "SESSION", "HIT", "PRODUCT"];
  sheetFormatter.addDropdownsToColumn('Scope',scopeColumnOptions);

  const activeColumnOptions =  ["TRUE", "FALSE"];
  sheetFormatter.addDropdownsToColumn('Active',activeColumnOptions);
}
