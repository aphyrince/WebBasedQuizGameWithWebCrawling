package kr.co.quizgame;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.annotation.PreDestroy;

@RestController
public class Controller {
    private final int VOLUME = 10; // 한 번에 보내는 데이터 수
    @Autowired
    private final CsvQuizSetLoader quizSetLoader;
    @Autowired
    private final CsvRankingLoader rankingLoader;
    private List<QuizSet> quizSet; // 퀴즈 데이터 저장
    private List<Ranking> ranking; // 랭킹 데이터 저장

    private final String RankingFilePath = "./src/crawling/ranking.csv";
    private final String QuizSetFilePath = "./src/crawling/data.csv";

    public Controller(){
        System.out.println("현재 작업 디렉토리: " + System.getProperty("user.dir"));
        this.quizSetLoader = new CsvQuizSetLoader(QuizSetFilePath);
        this.rankingLoader = new CsvRankingLoader(RankingFilePath);
        try {
            quizSetLoader.run(null);
            rankingLoader.run(null);
        } catch (Exception e) {
            e.printStackTrace();
        }
        this.quizSet = quizSetLoader.getQuizSet();
        this.ranking = rankingLoader.getQuizSet();
    }

    // 서버가 꺼질 때 ranking 인스턴스를 서버에 저장하고 종료함.
    @PreDestroy
    public void saveRankingOnDestroy(){
        try{
            CsvRankingWriter.clearCsvFile(RankingFilePath);
            CsvRankingWriter.WriteCsv(ranking, RankingFilePath);
        }
        catch(IOException e){
            e.printStackTrace();
        }
    }

    // 퀴즈 내용 요청
    // (문제, 정답) 10 개 요청
    @RequestMapping(method = RequestMethod.GET, path = "/getQuizSet")
    public List<QuizSet> getQuizSet(@RequestParam("flag") int flag) {
        if (flag + VOLUME > quizSet.size()) {
            return quizSet.subList(flag, quizSet.size());
        }
        return quizSet.subList(flag, flag + VOLUME);
    }

    // 유저 게임 결과 전송
    // 유저의 이름 name, 유저가 맞힌 퀴즈 수 resultScore
    @RequestMapping(method = RequestMethod.POST, path = "/postUserGameResultRecord")
    public void postUserGameResultRecord(@RequestParam("name") String name,
            @RequestParam("resultScore") int resultScore) {
                // 새로 받은 유저의 정보 저장 , rank 정보 갱신
                ranking.add(new Ranking(name, resultScore));
                Ranking.renewRanking(ranking);
    }

    // 랭킹 정보 요청
    // 서버에 저장되어 있는 랭킹 정보 세트 10개 요청
    // 이미 받은 랭킹 수 flag
    @RequestMapping(method = RequestMethod.GET, path = "/getRankingInfoSet")
    public List<Ranking> getRankingInfoSet(@RequestParam("flag") int flag) {
        if (flag + VOLUME > ranking.size()) {
            return ranking.subList(flag, ranking.size());
        }
        return ranking.subList(flag, flag + VOLUME);
    }
}
