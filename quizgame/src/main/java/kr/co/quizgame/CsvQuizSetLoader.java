package kr.co.quizgame;

import java.io.IOException;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class CsvQuizSetLoader implements CommandLineRunner{
    private final CsvQuizSetReader csvQuizSetReader;
    private List<QuizSet> quizSet = null;
    private String filePath = null;

    public CsvQuizSetLoader(String filePath){
        this.csvQuizSetReader = new CsvQuizSetReader();
        this.filePath = filePath;
    }

    @Override
    public void run(String... args) throws Exception{
        try{
            this.quizSet = csvQuizSetReader.readCsv(this.filePath);
        }
        catch(IOException e){
            e.printStackTrace();
        }
    }

    public List<QuizSet> getQuizSet(){
        return quizSet;
    }
}
