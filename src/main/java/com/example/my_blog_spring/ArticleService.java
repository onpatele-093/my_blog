package com.example.my_blog_spring;


import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;



public interface ArticleService {
    Page<Article> getAllArticles(int page, int size, String[] sort, String search); // 確保這行有 search 參數
    List<Article> getAllArticles(String category); // 實作已忽略 category，可考慮改為無參數
    Optional<Article> getArticleById(Long id);
    Article saveArticle(Article article);
    Article updateArticle(Long id, Article article);
    void deleteArticle(Long id);

}
