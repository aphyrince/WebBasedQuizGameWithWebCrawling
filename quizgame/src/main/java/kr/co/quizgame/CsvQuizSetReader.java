package kr.co.quizgame;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class CsvQuizSetReader {

    public List<QuizSet> readCsv(String filePath) throws IOException{
        List<QuizSet> records = new ArrayList<>();
        try(BufferedReader br = new BufferedReader(new FileReader(filePath))){
            String line;
            while((line = br.readLine()) != null){
                records.add(new QuizSet(line.split(",")));
            }
        }
        return records;
    }
}
