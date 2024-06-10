package kr.co.quizgame;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class CsvFileReader {

    public List<QuizSet> readCsv(String filePath) throws IOException{
        List<QuizSet> records = new ArrayList<>();
        try(BufferedReader br = new BufferedReader(new FileReader(filePath))){
            String line;
            while((line = br.readLine()) != null){
                String[] values = line.split(",");
                records.add(new QuizSet(values[0], values[1]));
            }
        }
        return records;
    }
}
