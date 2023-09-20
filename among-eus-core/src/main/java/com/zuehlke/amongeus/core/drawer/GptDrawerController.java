package com.zuehlke.amongeus.core.drawer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.theokanning.openai.client.OpenAiApi;
import com.theokanning.openai.completion.CompletionRequest;
import com.theokanning.openai.completion.chat.ChatCompletionRequest;
import com.theokanning.openai.completion.chat.ChatMessage;
import com.theokanning.openai.service.OpenAiService;
import okhttp3.OkHttpClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping(value = "/drawer/gpt")
public class GptDrawerController {

    Logger logger = LoggerFactory.getLogger(GptDrawerController.class);

    @Value("${among.eus.chat.gpt.api.key}")
    private String apiKey;

    @PostMapping
    @ResponseBody
    public String drawInMermaid(@RequestBody String message) {
        logger.info("Drawing: " + message);

        OpenAiService service = new OpenAiService(apiKey);
        ChatCompletionRequest completionRequest = ChatCompletionRequest.builder()
                .messages(List.of(
                        new ChatMessage("system", "You are a helpful assistant to produce correct MermaidJS code without any surrounding markdown tags."),
                        new ChatMessage("user", "Produce a MermaidJS to draw the following diagram: " + message + ". Please provide your answer in pure MermaidJS without any additional comments and no surrounding markdown tags. Simply start with graph directly. Make sure the mermaid code is complete and compiles.")
                ))
                .model("gpt-3.5-turbo")
                .build();
        String answer = service.createChatCompletion(completionRequest).getChoices().get(0).getMessage().getContent();
        logger.info("\n\nResponse by Chat GPT: \n===============\n" + answer + "\n==============\n\n");
        return answer;
    }

}
