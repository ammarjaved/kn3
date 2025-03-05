package dvj.mx;

import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

public class MvcConfig implements WebMvcConfigurer {
	
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/herding/").setViewName("index");
		registry.addViewController("herding/index.html");
	//	registry.addViewController("images.html");
	}

}
