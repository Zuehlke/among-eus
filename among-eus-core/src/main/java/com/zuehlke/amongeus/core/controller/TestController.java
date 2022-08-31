package com.zuehlke.amongeus.core.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value ="/test")
public class TestController {

    @GetMapping
    protected String getTest() {
        return "Hallo Rolf";
    }
}
