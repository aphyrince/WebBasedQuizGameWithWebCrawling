package kr.co.quizgame;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {

    @RequestMapping("/")
    public void getWithMainHtml() {
        
    }

    // 퀴즈 내용 요청
    // (문제, 정답) 10 개 요청
    @RequestMapping("/getQuizSet")
    public void getQuizSet(@RequestParam("flag") int flag) {

    }

    // 유저 게임 결과 전송
    // 유저의 이름 name, 유저가 맞힌 퀴즈 수 resultScore 
    @RequestMapping("/postUserGameResultRecord")
    public void postUserGameResultRecord(@RequestParam("name") String name,
            @RequestParam("resultScore") int resultScore) {

    }

    // 랭킹 정보 요청
    // 서버에 저장되어 있는 랭킹 정보 세트 10개 요청
    // 이미 받은 랭킹 수 flag
    @RequestMapping("/getRankingInfoSet")
    public void getRankingInfoSet(@RequestParam("flag") int flag) {

    }
}
