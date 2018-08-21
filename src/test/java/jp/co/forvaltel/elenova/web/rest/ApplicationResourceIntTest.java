package jp.co.forvaltel.elenova.web.rest;

import jp.co.forvaltel.elenova.ElenovaApp;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
/**
 * Test class for the Application REST controller.
 *
 * @see ApplicationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ElenovaApp.class)
public class ApplicationResourceIntTest {

    private MockMvc restMockMvc;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);

        ApplicationResource applicationResource = new ApplicationResource();
        restMockMvc = MockMvcBuilders
            .standaloneSetup(applicationResource)
            .build();
    }

    /**
    * Test uploadHandler
    */
    @Test
    public void testUploadHandler() throws Exception {
        restMockMvc.perform(post("/api/application/upload-handler"))
            .andExpect(status().isOk());
    }

}
