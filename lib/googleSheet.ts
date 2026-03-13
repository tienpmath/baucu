// import { GoogleSpreadsheet } from "google-spreadsheet";

// export async function getSheetData() {

//   const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID!);

// //   await doc.useServiceAccountAuth({
// //     client_email: process.env.GOOGLE_SERVICE_EMAIL!,
// //     private_key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
// //   });

//   await doc.loadInfo();

//   const sheet = doc.sheetsByIndex[0];
//   const rows = await sheet.getRows();

//   return rows.map((row) => ({
//     diem: row.get("Điểm bầu cử"),
//     cuTri: Number(row.get("Tổng cử tri")),
//     daBau: Number(row.get("Đã bầu")),
//     thoiGian: row.get("Khung giờ"),
//   }));
// }