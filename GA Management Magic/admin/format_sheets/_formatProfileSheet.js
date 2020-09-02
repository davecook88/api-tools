
function _formatProfilesSheet(sheet) {
  const columnHeaders = [Object.keys(mapProfileValues())];
  Logger.log(columnHeaders);

  const sheetFormatter = new SheetFormatter(sheet);
  sheetFormatter.setTopRowValues(columnHeaders);
  sheetFormatter.setTopRowFormat(globals.format.topRow);
  sheetFormatter.setSheetFormat(globals.format.all);
  
  const includeColumnOptions = ["✓", ""];
  sheetFormatter.addDropdownsToColumn("include", includeColumnOptions);

  const bools = ["✓", "x"];
  sheetFormatter.addDropdownsToColumn('stripSiteSearchQueryParameters',bools);
  sheetFormatter.addDropdownsToColumn('stripSiteSearchCategoryParameters',bools);
  sheetFormatter.addDropdownsToColumn('starred',bools);
  sheetFormatter.addDropdownsToColumn('botFilteringEnabled',bools);

  sheetFormatter.setSheetFormat(globals.format.all);
}
