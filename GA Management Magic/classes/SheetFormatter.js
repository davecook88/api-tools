class SheetFormatter {
  constructor(sheet) {
    this.sheet = sheet;
    this.name = sheet.getName();
    this.lastColumnIndex;
  }

  /**

   * @param string columnHeader
   * @param string[] options = list of options to populate dropdown.
   * @returns void
   * @memberof SheetFormatter
   */
  addDropdownsToColumn(columnHeader, options) {
    const columnIndex = this.columnIndexMap.get(columnHeader);
    if (!columnIndex) {
      Logger.log(
        columnHeader + " not found in column headers for sheet " + this.name
      );
      return;
    }
    const includeRule = SpreadsheetApp.newDataValidation()
      .requireValueInList(options, true)
      .build();
    const column = this.sheet.getRange(2, columnIndex, 9999, 1);
    column.setDataValidation(includeRule);
  }

  /**
   *
   * @desc deletes all columns after last populated column header
   * @memberof SheetFormatter
   */
  deleteExcessColumns() {
    const { lastColumnIndex, sheet } = this;
    const numCols = sheet.getMaxColumns();
    const deltaCols = numCols - lastColumnIndex;
    try {
      if (deltaCols > 0) {
        sheet.deleteColumns(lastColumnIndex, deltaCols + 1);
      } else if (deltaCols < 0) {
        sheet.insertColumnsAfter(numCols, -deltaCols);
      }
    } catch (e) {
      Logger.log('Error deleting columns in sheet ' + sheet.name);
    };
  }

  /**
   *
   * @desc creates a map of column headers to column index
   * @param string[][] values
   * @memberof SheetFormatter
   */
  setColumnsMap(values) {
    const map = new Map();
    values[0].forEach((value, index) => map.set(value, index + 1));
    this.columnIndexMap = map;
  }

  /**
   * @desc applies formatting to top row of sheet
   * @param object options - background:hex color, bold: bool, fontColor: hex color
   * @memberof SheetFormatter
   */
  setTopRowFormat(options) {
    try{
      const topRow = this.sheet.getRange(1,1,1,this.lastColumnIndex - 1);
      if (options.bold) topRow.setFontWeight("bold");
      if (options.background) topRow.setBackground(options.background);
      if (options.fontColor) topRow.setFontColor(options.fontColor);
    } catch(err) {
      Logger.log('setTopRowFormat:', err);
    }    
  }

  /**
   * @desc Accepts an array of column headers and pastes to the top row, deleting excess columns
   *
   * @param string[][] values array of column headers
   * @memberof SheetFormatter
   */
  setTopRowValues(values) {
    this.sheet
      .getRange(1, 1, values.length, values[0].length)
      .setValues(values);
    this.lastColumnIndex = values[0].length + 1;
    this.setColumnsMap(values);
    this.deleteExcessColumns();
  }
}
