package kr.co.quizgame;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class CsvRankingReader {

    public List<Ranking> readCsv(String filePath) throws IOException{
        List<Ranking> records = new ArrayList<>();
        try(BufferedReader br = new BufferedReader(new FileReader(filePath))){
            String line;
            while((line = br.readLine()) != null){
                records.add(new Ranking(line.split(",")));
            }
        }
        return records;
    }
}
