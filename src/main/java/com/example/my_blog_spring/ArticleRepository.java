package com.example.my_blog_spring;



import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleRepository extends JpaRepository <Article, Long> {
    Page<Article> findByTitleContainingOrContentContaining(String title, String content,Pageable pageable);
    
    List<Article> findAllByOrderByCreatedAtDesc();
    
    List<Article> findByCategory(String category); // 新增方法以支援分類查詢
}
