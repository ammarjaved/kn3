package dvj.mx.service;


import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import dvj.mx.modelo.ImagesToPoint;




public interface ServiceImagesToPoint {

	public List<ImagesToPoint> find(Pageable page);
	public String saveImages(MultipartFile file);
	public void  saveImage(String title,String link,String Point);
	
}
