package com.example.my_blog_spring;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration  //告訴Spring 這是一個設定檔
public class CorsConfig implements WebMvcConfigurer{

    @Override
    public void addCorsMappings(CorsRegistry registry){ //這個設定檔適用於所有API端點
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3308") //允許來自3308的請求
                .allowedMethods("GET","POST","PUT","DELETE","OPTIONS")
                .allowedHeaders("*") //允許了所有HTTP方法和請求
                .allowCredentials(true);//允許瀏覽器發送帶有Cookie的請求
    }
    
}
