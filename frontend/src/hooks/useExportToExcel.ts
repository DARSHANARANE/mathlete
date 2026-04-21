import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

type ExportOptions = {
    fileName?: string;
    sheetName?: string;
};

const useExportToExcel = () => {
    const exportToExcel = (
        data: any[],
        options?: ExportOptions
    ) => {
        if (!data || data.length === 0) return;

        const { fileName = "Export.xlsx", sheetName = "Sheet1" } = options || {};

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });

        const blob = new Blob([excelBuffer], {
            type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
        });

        saveAs(blob, fileName);
    };

    return { exportToExcel };
};

export default useExportToExcel;