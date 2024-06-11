package kr.co.quizgame;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class CsvRankingWriter {

    public static void WriteCsv(List<Ranking> records,String filePath) throws IOException{
         try (FileWriter writer = new FileWriter(filePath)) {
            for (Ranking rank : records) {
                writer.append(rank.getValue()+"\n");
            }
        }
    }
    public static void clearCsvFile(String filePath) throws IOException {
        try (PrintWriter writer = new PrintWriter(filePath)) {
            writer.print("");
        }
    }
}
