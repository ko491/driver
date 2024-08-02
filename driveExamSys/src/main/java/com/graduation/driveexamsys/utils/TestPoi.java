package com.graduation.driveexamsys.utils;

import com.graduation.driveexamsys.domain.VO.QuestionBankVO;
import com.graduation.driveexamsys.domain.VO.TestBankVO;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class TestPoi {
    public static List<TestBankVO> POIUtil(MultipartFile file) throws IOException {
        //list用来装从  xlsx文件中读取的大量的数据
        List<TestBankVO> list = new ArrayList<TestBankVO>();
        try {
            Workbook book = null;
            //判断文件是不是以  xlsx结尾的文件
            if (file.getOriginalFilename().endsWith(".xlsx")) {
                //对book进行初始化
                book = new XSSFWorkbook(file.getInputStream());
            } else {
                book = new HSSFWorkbook(file.getInputStream());
            }

            //获取 表格的第一个sheet
            Sheet sheet = book.getSheetAt(0);
            // 判断第一个sheet里有多少行数据
            System.out.println(sheet.getLastRowNum());
            //如果数据小于1直接将空集合返回
            if (sheet.getLastRowNum() < 1) {
                return list;
            }
            //从第一行(实际是第二行开始读取数据)
            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                // 获取这一行的类
                Row row = sheet.getRow(i);
                // row (行)在获取每一列
                row.getCell(0).setCellType(CellType.STRING);
                String questiontext = row.getCell(0).getStringCellValue();

                row.getCell(1).setCellType(CellType.STRING);
                String answer = row.getCell(1).getStringCellValue();

                row.getCell(2).setCellType(CellType.STRING);
                String explanation = row.getCell(2).getStringCellValue();

                TestBankVO testBankVO = new TestBankVO();
                testBankVO.setQuestiontext(questiontext);
                testBankVO.setAnswer(answer);
                testBankVO.setExplanation(explanation);
                list.add(testBankVO);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return list;

        }
        return list;
    }
}
