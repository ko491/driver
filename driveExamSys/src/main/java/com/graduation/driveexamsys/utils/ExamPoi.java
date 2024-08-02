package com.graduation.driveexamsys.utils;


import com.graduation.driveexamsys.domain.VO.QuestionBankVO;
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

/*
 *
 * 用来读取 Excel文档的工具类
 *
 * */
public class ExamPoi {
    public static List<QuestionBankVO> POIUtil(MultipartFile file) throws IOException {
        //list用来装从  xlsx文件中读取的大量的数据
        List<QuestionBankVO> list = new ArrayList<QuestionBankVO>();
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
                String optionA = row.getCell(1).getStringCellValue();

                row.getCell(2).setCellType(CellType.STRING);
                String optionB = row.getCell(2).getStringCellValue();

                row.getCell(3).setCellType(CellType.STRING);
                String optionC = row.getCell(3).getStringCellValue();

                row.getCell(4).setCellType(CellType.STRING);
                String optionD = row.getCell(4).getStringCellValue();

                row.getCell(5).setCellType(CellType.STRING);
                String answer = row.getCell(5).getStringCellValue();

                row.getCell(6).setCellType(CellType.STRING);
                String explanation = row.getCell(6).getStringCellValue();


                QuestionBankVO questionBankVO = new QuestionBankVO();
                questionBankVO.setQuestiontext(questiontext);
                questionBankVO.setOptionA(optionA);
                questionBankVO.setOptionB(optionB);
                questionBankVO.setOptionC(optionC);
                questionBankVO.setOptionD(optionD);
                questionBankVO.setAnswer(answer);
                questionBankVO.setExplanation(explanation);
                list.add(questionBankVO);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return list;

        }
        return list;
    }


}
