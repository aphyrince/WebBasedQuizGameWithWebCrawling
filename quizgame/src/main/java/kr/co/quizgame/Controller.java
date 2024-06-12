package kr.co.quizgame;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.springframework.core.io.ClassPathResource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.annotation.PreDestroy;

@RestController
public class Controller {
    // private final int VOLUME = 10; // 한 번에 보내는 데이터 수

    private final String dataPath = "data/data.txt";
    private final String rankingPath = "data/ranking.csv";

    private List<QuizSet> quizSet; // 퀴즈 데이터 저장
    private List<Ranking> ranking; // 랭킹 데이터 저장

    // 서버가 켜질 때 서버 컴퓨터에 저장된 quiz 정보와 ranking 정보 불러옴
    public Controller() throws IOException {
        quizSet = new ArrayList<>();
        ranking = new ArrayList<>();
        List<String> quizSetData = Files.readAllLines(Paths.get(new ClassPathResource(dataPath).getURI()));
        List<String> rankingData = Files.readAllLines(Paths.get(new ClassPathResource(rankingPath).getURI()));
        for (int i = 0; i < quizSetData.size(); i += 2) {
            quizSet.add(new QuizSet(quizSetData.get(i), quizSetData.get(i + 1)));
        }

        for (String value : rankingData) {
            ranking.add(new Ranking(value.split(",")));
        }
    }

    // 서버가 꺼질 때 ranking 인스턴스를 서버에 저장하고 종료함.
    @PreDestroy
    public void saveRankingOnDestroy() throws IOException {
        System.out.println("destroy");
        for(Ranking rank : ranking){
            System.out.println(String.format("%d %s %d", rank.rank, rank.name, rank.score));
        }
        ClassPathResource resource = new ClassPathResource(rankingPath);
        
        try(BufferedWriter writer = new BufferedWriter(new FileWriter(resource.getFile(),false))){
            //파일의 모든 내용을 지우고 새로운 내용을 씀
            for(Ranking rank : ranking){
                writer.write(rank.getValue());
            }
        }
        catch(IOException e){
            e.printStackTrace();
        }
    }

    // 퀴즈 내용 요청
    @RequestMapping(method = RequestMethod.GET, path = "/getQuizSet")
    public List<QuizSet> getQuizSet(@RequestParam("flag") int flag) {
        synchronized(quizSet){
            return quizSet;
        }
    }

    // 유저 게임 결과 전송
    // 유저의 이름 name, 유저가 맞힌 퀴즈 수 resultScore
    @RequestMapping(method = RequestMethod.POST, path = "/postUserGameResultRecord")
    public void postUserGameResultRecord(@RequestParam("name") String name, @RequestParam("resultScore") int score) {
        // 새로 받은 유저의 정보 저장 , rank 정보 갱신
        ranking.add(new Ranking(name, score));
        Ranking.renewRanking(ranking);
    }

    // 랭킹 정보 요청
    @RequestMapping(method = RequestMethod.GET, path = "/getRankingInfoSet")
    public List<Ranking> getRankingInfoSet(@RequestParam("flag") int flag) {
        synchronized (ranking) {
            return ranking;
        }
    }
}
