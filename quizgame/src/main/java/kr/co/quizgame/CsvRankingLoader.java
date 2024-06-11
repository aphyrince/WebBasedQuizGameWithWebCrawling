package kr.co.quizgame;

import java.io.IOException;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class CsvRankingLoader implements CommandLineRunner{
    private final CsvRankingReader csvRankingReader;
    private List<Ranking> ranking = null;
    private String filePath = null;

    public CsvRankingLoader(String filePath){
        this.csvRankingReader = new CsvRankingReader();
        this.filePath = filePath;
    }

    @Override
    public void run(String... args) throws Exception{
        try{
            this.ranking = csvRankingReader.readCsv(this.filePath);
        }
        catch(IOException e){
            e.printStackTrace();
        }
    }

    public List<Ranking> getQuizSet(){
        return ranking;
    }
}
