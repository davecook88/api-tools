/**
 *
 * @desc creates and formats a new sheet to hold audience data
 * @param Sheet {object}
 * @param string property - property id
 */
function _formatAudiencesSheet(sheet) {
  const columnHeaders = [
    [
      "include",
      "accountId",
      "propertyId",
      "audienceId",
      "name",
      "description",
      "type",
      "isSmartList",
      "daysToLookBack",
      "membershipDurationDays",
      "segment",
      "linkedAdAccountType",
      "linkedAdAccountId",
      "linkedViews"
    ],
  ];

  const sheetFormatter = new SheetFormatter(sheet);
  sheetFormatter.setTopRowValues(columnHeaders);
  sheetFormatter.setTopRowFormat(globals.format.topRow);

  const includeColumnOptions = ["✓", ""];
  sheetFormatter.addDropdownsToColumn("include", includeColumnOptions);

  // const isSmartListOptions = [true, false];
  // sheetFormatter.addDropdownsToColumn('isSmartList',isSmartListOptions);

  const daysToLookBackOptions = [7, 14, 30];
  sheetFormatter.addDropdownsToColumn("daysToLookBack", daysToLookBackOptions);
}
