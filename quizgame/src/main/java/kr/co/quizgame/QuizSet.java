package kr.co.quizgame;

public class QuizSet {
    public String question;
    public String answer;

    public QuizSet(String question, String answer){
        this.question = question;
        this.answer = answer;
    }

    public QuizSet(String[] args){
        this.question = args[0].trim();
        this.answer = args[1].trim();
    }
}
