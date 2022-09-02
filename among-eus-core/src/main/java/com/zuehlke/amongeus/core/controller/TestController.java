package com.zuehlke.amongeus.core.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/test")
public class TestController {

    @GetMapping
    public ResponseEntity<String> getTest() {
        return new ResponseEntity<>("Hello world", HttpStatus.OK);
    }
}
