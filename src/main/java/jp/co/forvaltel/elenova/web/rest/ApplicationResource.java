package jp.co.forvaltel.elenova.web.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * Application controller
 */
@RestController
@RequestMapping("/api/application")
public class ApplicationResource {

    private final Logger log = LoggerFactory.getLogger(ApplicationResource.class);

    /**
     * POST uploadHandler
     */
    @PostMapping("/upload-bill")
    public void uploadHandler(@RequestParam MultipartFile file) {
        if (!file.isEmpty()) {
            System.out.println("Upload success");
        } else {
            System.out.println("Upload fail");
        }
//        return "uploadHandler";
    }

}
