// TODO: Add formatting once I know which headers go in this sheet

function _formatPropertiesSheet(sheet) {
  const verticalOptions = [
    "UNSPECIFIED",
    "ARTS_AND_ENTERTAINMENT",
    "AUTOMOTIVE",
    "BEAUTY_AND_FITNESS",
    "BOOKS_AND_LITERATURE",
    "BUSINESS_AND_INDUSTRIAL_MARKETS",
    "COMPUTERS_AND_ELECTRONICS",
    "FINANCE",
    "FOOD_AND_DRINK",
    "GAMES",
    "HEALTHCARE",
    "HOBBIES_AND_LEISURE",
    "HOME_AND_GARDEN",
    "INTERNET_AND_TELECOM",
    "JOBS_AND_EDUCATION",
    "LAW_AND_GOVERNMENT",
    "NEWS",
    "ONLINE_COMMUNITIES",
    "OTHER",
    "PEOPLE_AND_SOCIETY",
    "PETS_AND_ANIMALS",
    "REAL_ESTATE",
    "REFERENCE",
    "SCIENCE",
    "SHOPPING",
    "SPORTS",
    "TRAVEL",
  ];
  const columnHeaders = [Object.keys(mapPropertiesValues())];
  Logger.log(columnHeaders);

  const sheetFormatter = new SheetFormatter(sheet);
  sheetFormatter.setTopRowValues(columnHeaders);
  sheetFormatter.setTopRowFormat(globals.format.topRow);
  sheetFormatter.setSheetFormat(globals.format.all);

  sheetFormatter.addDropdownsToColumn('industryVertical',verticalOptions);

  sheetFormatter.resizeColumns();
  sheetFormatter.setSheetFormat(globals.format.all);
}
