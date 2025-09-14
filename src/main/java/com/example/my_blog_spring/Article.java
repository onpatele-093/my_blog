package com.example.my_blog_spring;

import java.sql.Timestamp; // 確保有匯入這個套件
import org.hibernate.annotations.CreationTimestamp; // 確保有匯入這個套件

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name = "articles")
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Lob // @Lob 讓文章內容可以儲存大文本，沒有字數限制
     @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(nullable = false)
    private String author;

    @Column(nullable = false)
    private String category; // 新增分類欄位

    @CreationTimestamp
    private Timestamp createdAt; 

  

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Timestamp getCreatedAt() { // 新增這個 getter
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) { // 新增這個 setter
        this.createdAt = createdAt;
    }
}