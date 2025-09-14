package com.example.my_blog_spring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class ArticleServiceImpl implements ArticleService {
    
    @Autowired
    private ArticleRepository articleRepository;

    @Override
    public Page<Article> getAllArticles(int page, int size, String[] sort, String search) {
        // 解析排序參數
        Sort sortOrder = Sort.unsorted();
        if (sort != null && sort.length > 0) {
            String sortBy = sort[0];
            Sort.Direction direction = sort.length > 1 && sort[1].equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
            sortOrder = Sort.by(direction, sortBy);
        }

        // 建立分頁物件
        Pageable pageable = PageRequest.of(page, size, sortOrder);

        // 根據是否有搜尋參數來決定呼叫哪個方法
        if (search != null && !search.isEmpty()) {
            // 如果有搜尋參數，則呼叫自定義的搜尋方法
            return articleRepository.findByTitleContainingOrContentContaining(search, search, pageable);
        } else {
            // 如果沒有搜尋參數，則回傳所有文章
            return articleRepository.findAll(pageable);
        }
    }

    @Override
    public Optional<Article> getArticleById(Long id) {
        return articleRepository.findById(id);
    }

    @Override
    public Article saveArticle(Article article) {
        return articleRepository.save(article);
    }

    @Override
    public Article updateArticle(Long id, Article articleDetails) {
        Article article = articleRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("找不到 ID 為 " + id + " 的文章。"));

        article.setTitle(articleDetails.getTitle());
        article.setContent(articleDetails.getContent());
        // 僅當前端有傳 author 且不為 null 時才更新作者，否則保留原本作者
        if (articleDetails.getAuthor() != null && !articleDetails.getAuthor().isEmpty()) {
            article.setAuthor(articleDetails.getAuthor());
        }
        // 已移除 category 欄位，這裡不再設置
        return articleRepository.save(article);
    }

    @Override
    public void deleteArticle(Long id) {
        if (!articleRepository.existsById(id)) {
            throw new ResourceNotFoundException("找不到 ID 為 " + id + " 的文章。");
        }
        articleRepository.deleteById(id);
    }

    @Override
    public List<Article> getAllArticles(String category) {
        if (category != null && !category.isEmpty()) {
            return articleRepository.findByCategory(category);
        }
        return articleRepository.findAllByOrderByCreatedAtDesc();
    }

    // 移除 getAllCategories() 實作
}