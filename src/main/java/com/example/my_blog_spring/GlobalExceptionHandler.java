package com.example.my_blog_spring;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice  //告訴Spring 這個類別可以用來處理所有Controller 拋出的例外
public class GlobalExceptionHandler {

    @ExceptionHandler(NoSuchElementException.class)
    //這是一個捕捉棄 他會監聽應用程式中所有 NoSuchElementException 類型的例外
    public ResponseEntity<String> handleNoSuchElementExceptipn(NoSuchElementException ex){
        return new ResponseEntity<>("找不到指定的文章,請確認 ID 是否正確。", HttpStatus.NOT_FOUND );
    }
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex){
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((org.springframework.validation.FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        }); //收集所有驗證失敗的錯誤 , 並以一個JSON物件 的形式回傳
            //告訴前端哪一個欄位出錯了, 以及錯誤訊息是什麼

        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

}
