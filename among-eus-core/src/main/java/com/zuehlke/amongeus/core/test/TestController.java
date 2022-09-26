package com.zuehlke.amongeus.core.test;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/test")
public class TestController {

    Logger logger = LoggerFactory.getLogger(TestController.class);

    @GetMapping
    public ResponseEntity<String> getTest() {
        logger.info("An INFO Message");
        return new ResponseEntity<>("Hello world", HttpStatus.OK);
    }

}
