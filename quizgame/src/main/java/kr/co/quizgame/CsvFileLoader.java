package kr.co.quizgame;

import java.io.IOException;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class CsvFileLoader implements CommandLineRunner{
    private final CsvFileReader csvFileReader;
    private List<QuizSet> quizSet = null;
    private String filePath = null;

    public CsvFileLoader(String filePath){
        this.csvFileReader = new CsvFileReader();
        this.filePath = filePath;
    }

    @Override
    public void run(String... args) throws Exception{
        try{
            this.quizSet = csvFileReader.readCsv(this.filePath);
        }
        catch(IOException e){
            e.printStackTrace();
        }
    }

    public List<QuizSet> getQuizSet(){
        return quizSet;
    }
}
