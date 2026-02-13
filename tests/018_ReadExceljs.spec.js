import { test } from '@playwright/test';
import ExcelJS from 'exceljs';

test('Read Excel using eachRow and eachCell', async () => {
let output={row:-1,col:-1};
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(
    'C:/Users/Kayathri/Downloads/Excel.xlsx'
  );

  // ✅ safest way
  const worksheet = workbook.getWorksheet(1);

  worksheet.eachRow((row, rowNumber) => {
   

    row.eachCell((cell, colNumber) => {
      if (cell.value === 'Apple')
         {
        output.row=rowNumber;
        output.col=colNumber;
        console.log(`Apple is located at Row: ${rowNumber}, Column: ${colNumber}`);
      // console.log(`  Cell ${rowNumber}-${colNumber}:`, cell.value);
      }
 });



  });
  const cellValue = worksheet.getRow(output.row).getCell(output.col);
  cellValue.value = 'Iphone';
  await workbook.xlsx.writeFile(
    'C:/Users/Kayathri/Downloads/Excel.xlsx'
  );  


});