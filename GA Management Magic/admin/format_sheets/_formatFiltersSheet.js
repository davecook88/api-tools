function _formatFiltersSheet(sheet) {
  const columnHeaders = [
    ["Include", "Account", "ID", "Name", "Type", "field", "matchType", "expressionValue", "searchString", "replaceString", "fieldA", "extractA", "fieldARequired", "fieldB", "extractB", "fieldBRequired", "outputToField", "outputConstructor", "overrideOutputField", "caseSensitive"]
  ];
  const sheetFormatter = new SheetFormatter(sheet);
  sheetFormatter.setTopRowValues(columnHeaders);
  sheetFormatter.setTopRowFormat(globals.format.topRow);
  sheetFormatter.setSheetFormat(globals.format.all);

  sheetFormatter.resizeColumns();
  sheetFormatter.setSheetFormat(globals.format.all);
}