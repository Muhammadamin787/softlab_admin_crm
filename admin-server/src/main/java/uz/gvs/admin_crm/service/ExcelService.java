package uz.gvs.admin_crm.service;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import uz.gvs.admin_crm.entity.Student;
import uz.gvs.admin_crm.entity.Teacher;

import java.io.ByteArrayOutputStream;
import java.nio.charset.StandardCharsets;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.DateTimeException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class ExcelService {

    public byte[] contactListToExcelStudentFile(List<Student> students) {

        Workbook workbook = new XSSFWorkbook();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH-mm-ss");
        String format = simpleDateFormat.format(new Date());

        XSSFSheet sheet = (XSSFSheet) workbook.createSheet(String.valueOf(format));

        Row row = sheet.createRow(0);

        CellStyle headerCellStyle = workbook.createCellStyle();
        headerCellStyle.setFillForegroundColor(IndexedColors.AQUA.getIndex());
        headerCellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        headerCellStyle.setBorderBottom(BorderStyle.MEDIUM);
        headerCellStyle.setBorderLeft(BorderStyle.MEDIUM);
        headerCellStyle.setBorderRight(BorderStyle.MEDIUM);
        headerCellStyle.setBorderTop(BorderStyle.MEDIUM);

        // Creating header

        sheet.setColumnWidth(0, 4000);
        sheet.setColumnWidth(1, 4000);
        sheet.setColumnWidth(2, 4000);
        sheet.setColumnWidth(3, 4000);
        sheet.setColumnWidth(4, 4000);
        sheet.setColumnWidth(5, 4000);
        sheet.setColumnWidth(6, 4000);
        sheet.setColumnWidth(7, 8000);


        Cell cell = row.createCell(0);
        cell.setCellValue("To`liq ismi");
        cell.setCellStyle(headerCellStyle);

        cell = row.createCell(1);
        cell.setCellValue("Yoshi:");
        cell.setCellStyle(headerCellStyle);

        cell = row.createCell(2);
        cell.setCellValue("Telefon raqami");
        cell.setCellStyle(headerCellStyle);

        cell = row.createCell(3);
        cell.setCellValue("Gruxi");
        cell.setCellStyle(headerCellStyle);

        cell = row.createCell(4);
        cell.setCellValue("Manzil");
        cell.setCellStyle(headerCellStyle);

        cell = row.createCell(5);
        cell.setCellValue("Balas");
        cell.setCellStyle(headerCellStyle);

        cell = row.createCell(6);
        cell.setCellValue("Qachon kelgani");
        cell.setCellStyle(headerCellStyle);

        cell = row.createCell(7);
        cell.setCellValue("Ota-onasi telefon raqami");
        cell.setCellStyle(headerCellStyle);

        // Creating data rows for each customer
        for (int i = 0; i < students.size(); i++) {
            CellStyle headerCellStyle1 = workbook.createCellStyle();
            headerCellStyle1.setBorderBottom(BorderStyle.MEDIUM);
            headerCellStyle1.setBorderLeft(BorderStyle.MEDIUM);
            headerCellStyle1.setBorderRight(BorderStyle.MEDIUM);
            headerCellStyle1.setBorderTop(BorderStyle.MEDIUM);

            Row dataRow = sheet.createRow(i + 1);
            dataRow.createCell(0).setCellValue(students.get(i).getUser().getFullName());
            dataRow.createCell(1).setCellValue(students.get(i).getUser().getPhoneNumber());
            dataRow.createCell(2).setCellValue(students.get(i).getUser().getRegion().getId() != 0 ?
                    students.get(i).getUser().getRegion().getName() : null);
            dataRow.createCell(3).setCellValue(students.get(i).getUser().getGender().toString());
            dataRow.createCell(4).setCellValue(students.get(i).getUser().getDescription());
            dataRow.createCell(5).setCellValue(students.get(i).getUser().getBirthDate());
//                dataRow.createCell(0).setCellValue(students.get(i).getFullName());
//                dataRow.createCell(1).setCellValue(students.get(i).getPhoneNumber());
//                dataRow.createCell(2).setCellValue(students.get(i).getAge());
//                dataRow.createCell(3).setCellValue(students.get(i).getAddress());
//                dataRow.createCell(4).setCellValue(students.get(i).getBalans());
//                dataRow.createCell(5).setCellValue(students.get(i).getGroupName());
//                dataRow.createCell(6).setCellValue(students.get(i).getStarttime());
//                dataRow.createCell(7).setCellValue(students.get(i).getParentPhone());
        }

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        try {
            workbook.write(outputStream);
            outputStream.close();
        } catch (Exception a) {
            a.printStackTrace();
        }
        return outputStream.toByteArray();

    }

    public byte[] contactListToExcelTeacherFile(List<Teacher> teachers) throws ParseException {

        Workbook workbook = new XSSFWorkbook();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH-mm-ss");
        String format = simpleDateFormat.format(new Date());

        XSSFSheet sheet = (XSSFSheet) workbook.createSheet(String.valueOf(format));

        Row row = sheet.createRow(0);

        CellStyle headerCellStyle = workbook.createCellStyle();
        headerCellStyle.setFillForegroundColor(IndexedColors.AQUA.getIndex());
        headerCellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        headerCellStyle.setBorderBottom(BorderStyle.MEDIUM);
        headerCellStyle.setBorderLeft(BorderStyle.MEDIUM);
        headerCellStyle.setBorderRight(BorderStyle.MEDIUM);
        headerCellStyle.setBorderTop(BorderStyle.MEDIUM);

        // Creating header

        sheet.setColumnWidth(0, 4000);
        sheet.setColumnWidth(1, 4000);
        sheet.setColumnWidth(2, 4000);
        sheet.setColumnWidth(3, 4000);
        sheet.setColumnWidth(4, 4000);
        sheet.setColumnWidth(5, 4000);
        sheet.setColumnWidth(6, 4000);
        sheet.setColumnWidth(7, 8000);


        Cell cell = row.createCell(0);
        cell.setCellValue("To`liq ismi");
        cell.setCellStyle(headerCellStyle);

        cell = row.createCell(1);
        cell.setCellValue("Yoshi:");
        cell.setCellStyle(headerCellStyle);

        cell = row.createCell(2);
        cell.setCellValue("Telefon raqami");
        cell.setCellStyle(headerCellStyle);

        cell = row.createCell(3);
        cell.setCellValue("Manzil");
        cell.setCellStyle(headerCellStyle);

        cell = row.createCell(4);
        cell.setCellValue("Oylik");
        cell.setCellStyle(headerCellStyle);

        cell=row.createCell(5);
        cell.setCellValue("Jisni");
        cell.setCellStyle(headerCellStyle);

        cell=row.createCell(6);
        cell.setCellValue("Tug`ilgan vaqti");
        cell.setCellStyle(headerCellStyle);



        // Creating data rows for each customer
        for (int i = 0; i < teachers.size(); i++) {
            String[] s = teachers.get(i).getUser().getBirthDate().toString().split(" ");
            String[] split = s[0].split("-");
            int i1 = Integer.parseInt(split[0]);
            SimpleDateFormat formatter= new SimpleDateFormat("yyyy-MM-dd");
            Date date = new Date(System.currentTimeMillis());
            String[] s1 = formatter.format(date).split(" ");
            String[] split2 = s1[0].split("-");
            int i2 = Integer.parseInt(split2[0]);
            int age = i2-i1;

            Row dataRow = sheet.createRow(i + 1);
            dataRow.createCell(0).setCellValue(teachers.get(i).getUser().getFullName());
            dataRow.createCell(1).setCellValue(age);
            dataRow.createCell(2).setCellValue(teachers.get(i).getUser().getPhoneNumber());
            dataRow.createCell(3).setCellValue(teachers.get(i).getUser().getRegion().getId() != 0 ?
                    teachers.get(i).getUser().getRegion().getName() : null);
            dataRow.createCell(4).setCellValue(teachers.get(i).getSalary() != null ? teachers.get(i).getSalary() : 0);
            dataRow.createCell(5).setCellValue(teachers.get(i).getUser().getGender().toString());
            dataRow.createCell(6).setCellValue(s[0]);
        }








        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        try {
            workbook.write(outputStream);
            outputStream.close();
        } catch (Exception a) {
            a.printStackTrace();
        }
        return outputStream.toByteArray();

    }


}
