package uz.gvs.admin_crm.service;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Service;
import uz.gvs.admin_crm.entity.Student;
import uz.gvs.admin_crm.entity.StudentGroup;
import uz.gvs.admin_crm.entity.Teacher;
import uz.gvs.admin_crm.payload.excelDtos.PaymentExcelDtos;

import java.io.ByteArrayOutputStream;
import java.nio.charset.StandardCharsets;
import java.text.DateFormat;
import java.text.NumberFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.DateTimeException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class MakeExcelService {

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
            int age = 0;
            int studentStartDate = 0;
            if (students.get(i).getUser().getBirthDate() != null) {
                String[] s = students.get(i).getUser().getBirthDate().toString().split(" ");
                String[] split = s[0].split("-");
                int i1 = Integer.parseInt(split[0]);
                SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
                Date date = new Date(System.currentTimeMillis());
                String[] s1 = formatter.format(date).split(" ");
                String[] split2 = s1[0].split("-");
                int i2 = Integer.parseInt(split2[0]);
                age = i2 - i1;

                String[] s2 = students.get(i).getCreatedAt().toString().split(" ");
                String[] a = s2[0].split("-");
                studentStartDate = Integer.parseInt(a[0]);
            }

            String getGropuName = "";
            Set<StudentGroup> studentGroup = students.get(i).getStudentGroup();
            for (StudentGroup studentGroup1 : studentGroup) {
                if (studentGroup.size() > 1) {
                    getGropuName += studentGroup1.getGroup().getName() + ", ";
                } else {
                    getGropuName += studentGroup1.getGroup().getName();
                }
            }

            Row dataRow = sheet.createRow(i + 1);
            dataRow.createCell(0).setCellValue(students.get(i).getUser().getFullName());
            dataRow.createCell(1).setCellValue(age);
            dataRow.createCell(2).setCellValue(students.get(i).getUser().getPhoneNumber());
            dataRow.createCell(3).setCellValue(getGropuName);
            dataRow.createCell(4).setCellValue(students.get(i).getUser().getRegion() != null &&
                    students.get(i).getUser().getRegion().getId() != 0 ?
                    students.get(i).getUser().getRegion().getName() : null);
            dataRow.createCell(5).setCellValue(students.get(i).getBalans());
            dataRow.createCell(6).setCellValue(studentStartDate);
            dataRow.createCell(7).setCellValue(students.get(i).getParentPhone());
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

        cell = row.createCell(5);
        cell.setCellValue("Jisni");
        cell.setCellStyle(headerCellStyle);

        cell = row.createCell(6);
        cell.setCellValue("Tug`ilgan vaqti");
        cell.setCellStyle(headerCellStyle);


        // Creating data rows for each customer
        for (int i = 0; i < teachers.size(); i++) {
            String[] s = teachers.get(i).getUser().getBirthDate().toString().split(" ");
            String[] split = s[0].split("-");
            int i1 = Integer.parseInt(split[0]);
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
            Date date = new Date(System.currentTimeMillis());
            String[] s1 = formatter.format(date).split(" ");
            String[] split2 = s1[0].split("-");
            int i2 = Integer.parseInt(split2[0]);
            int age = i2 - i1;

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

    public byte[] listForToAccountant(List<PaymentExcelDtos> paymentExcelDtos) {

        Workbook workbook = new XSSFWorkbook();
        CellStyle sellStyle = workbook.createCellStyle();
        sellStyle.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
        sellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        sellStyle.setBorderBottom(BorderStyle.MEDIUM);
        sellStyle.setBorderLeft(BorderStyle.MEDIUM);
        sellStyle.setBorderRight(BorderStyle.MEDIUM);
        sellStyle.setBorderTop(BorderStyle.MEDIUM);

        Cell cell = null;
        Map<String, Double> allAmount = new HashMap<>();
        NumberFormat nf = NumberFormat.getInstance(new Locale("sk", "SK"));
        nf.setMinimumFractionDigits(2);

        for (PaymentExcelDtos paymentExcelDto : paymentExcelDtos) {
            XSSFSheet sheet = (XSSFSheet) workbook.createSheet(paymentExcelDto.getDate());
            double sumAmount = 0;
            double sumCash = 0;
            for (int i1 = 0; i1 < paymentExcelDto.getPaymentDtos().size(); i1++) {
                Row row = sheet.createRow(0);
                sheet.setColumnWidth(0, 1750);
                sheet.setColumnWidth(1, 8500);
                sheet.setColumnWidth(2, 10500);
                sheet.setColumnWidth(3, 4500);
                sheet.setColumnWidth(4, 3000);
                sheet.setColumnWidth(5, 3500);
                sheet.setColumnWidth(6, 4950);
                sheet.setColumnWidth(7, 2650);

                cell = row.createCell(0);
                cell.setCellValue("№");
                cell.setCellStyle(sellStyle);

                cell = row.createCell(1);
                cell.setCellValue("FISH \\ telefon raqami");
                cell.setCellStyle(sellStyle);

                cell = row.createCell(2);
                cell.setCellValue("Guruh raqami * Guruh nomi");
                cell.setCellStyle(sellStyle);

                cell = row.createCell(3);
                cell.setCellValue("To`lo`v");
                cell.setCellStyle(sellStyle);

                cell = row.createCell(4);
                cell.setCellValue("Chegirma");
                cell.setCellStyle(sellStyle);

                cell = row.createCell(5);
                cell.setCellValue("Jami hisobi");
                cell.setCellStyle(sellStyle);

                cell = row.createCell(6);
                cell.setCellValue("To`lo`v qilingan vaqt");
                cell.setCellStyle(sellStyle);

                cell = row.createCell(7);
                cell.setCellValue("To`lo`v turi");
                cell.setCellStyle(sellStyle);

                Row newRow = sheet.createRow(i1 + 1);
                newRow.createCell(0).setCellValue(i1 + 1);
                newRow.createCell(1).setCellValue(paymentExcelDto.getPaymentDtos().get(i1).getFullName());
                newRow.createCell(2).setCellValue(paymentExcelDto.getPaymentDtos().get(i1).getGroup());
                newRow.createCell(3).setCellValue(nf.format(paymentExcelDto.getPaymentDtos().get(i1).getAmount()));
                newRow.createCell(4).setCellValue(nf.format(paymentExcelDto.getPaymentDtos().get(i1).getCashBack()));
                newRow.createCell(5).setCellValue(nf.format(paymentExcelDto.getPaymentDtos().get(i1).getAllAmount()));
                newRow.createCell(6).setCellValue(paymentExcelDto.getPaymentDtos().get(i1).getPayDate());
                newRow.createCell(7).setCellValue(paymentExcelDto.getPaymentDtos().get(i1).getPayType());

                if (paymentExcelDto.getPaymentDtos().get(i1).getAmount() != 0) {
                    sumAmount += paymentExcelDto.getPaymentDtos().get(i1).getAmount();
                }
                if (paymentExcelDto.getPaymentDtos().get(i1).getCashBack() != 0) {
                    sumCash += paymentExcelDto.getPaymentDtos().get(i1).getCashBack();
                }
            }

            Row newRow1 = sheet.createRow((short) paymentExcelDto.getPaymentDtos().size() + 3);

            Cell cell1 = newRow1.createCell(0);
            cell1.setCellValue("Jami:");
            cell1.setCellStyle(sellStyle);

            cell1 = newRow1.createCell(1);
            cell1.setCellValue(paymentExcelDto.getPaymentDtos().size());
            cell1.setCellStyle(sellStyle);

            cell1 = newRow1.createCell(2);
            cell1.setCellValue(paymentExcelDto.getPaymentDtos().size());
            cell1.setCellStyle(sellStyle);

            cell1 = newRow1.createCell(3);
            cell1.setCellValue(nf.format(sumAmount));
            cell1.setCellStyle(sellStyle);

            cell1 = newRow1.createCell(4);
            cell1.setCellStyle(sellStyle);

            cell1.setCellValue(nf.format(sumCash));
            cell1 = newRow1.createCell(5);
            cell1.setCellStyle(sellStyle);

            cell1.setCellValue(nf.format(sumAmount + sumCash));
            cell1.setCellStyle(sellStyle);

            allAmount.put(paymentExcelDto.getDate(), sumAmount);
            cell1.setCellStyle(sellStyle);

            cell1 = newRow1.createCell(6);
            cell1.setCellStyle(sellStyle);
            cell1 = newRow1.createCell(7);
            cell1.setCellStyle(sellStyle);
        }
        XSSFSheet sheet = (XSSFSheet) workbook.createSheet("Umumiy");

        sheet.setColumnWidth(0,4000);
        sheet.setColumnWidth(1,6000);


        CellStyle sellStyle1 = workbook.createCellStyle();
        sellStyle1.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
        sellStyle1.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        sellStyle1.setBorderBottom(BorderStyle.MEDIUM);
        sellStyle1.setBorderLeft(BorderStyle.MEDIUM);
        sellStyle1.setBorderRight(BorderStyle.MEDIUM);
        sellStyle1.setBorderTop(BorderStyle.MEDIUM);

        Row newRow1 = sheet.createRow(0);

        Cell cell1 = newRow1.createCell(0);
        cell1.setCellValue("Sana");
        cell1.setCellStyle(sellStyle1);

        cell1 = newRow1.createCell(1);
        cell1.setCellValue("Summa");
        cell1.setCellStyle(sellStyle1);

        Set<String> strings = allAmount.keySet();
        int i = 1;
        double allSum = 0.0;
        for (String string : strings) {
            newRow1 = sheet.createRow(i);

            cell1 = newRow1.createCell(0);
            cell1.setCellValue(string);

            cell1 = newRow1.createCell(1);
            cell1.setCellValue(nf.format(allAmount.get(string)));
            allSum += allAmount.get(string);
            i++;
        }
        newRow1 = sheet.createRow(i);

        cell1 = newRow1.createCell(0);
        cell1.setCellValue("Jami:");
        cell1.setCellStyle(sellStyle1);

        cell1 = newRow1.createCell(1);
        cell1.setCellValue(nf.format(allSum));
        cell1.setCellStyle(sellStyle1);

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        try {
            workbook.write(outputStream);
            outputStream.close();
        } catch (Exception a) {
            a.printStackTrace();
        }
        return outputStream.toByteArray();
    }

    public String formatDecimal(Double number) {
        float epsilon = 0.004f; // 4 tenths of a cent
        if (Math.abs(Math.round(number) - number) < epsilon) {
            return String.format("%10.0f", number); // sdb
        } else {
            return String.format("%10.2f", number); // dj_segfault
        }
    }


}
