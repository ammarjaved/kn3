package dvj.mx.service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import dvj.mx.Unicode;
import dvj.mx.modelo.ImagesToPoint;
import dvj.mx.modelo.RepoImagesToPoint;


@Service
public class ServiceImagesToPointImp implements ServiceImagesToPoint {
	
	@Autowired
	private RepoImagesToPoint repoImagesToPoint;
	
	
	public List<ImagesToPoint> find(Pageable page){
		return repoImagesToPoint.findAll(page).getContent();
	}
	
	public String saveImages(MultipartFile file) {
		String ruta = "";
		
		if(!file.isEmpty()) {
			byte[] bytes;
			try {
				bytes = file.getBytes();
				new Unicode();
				String name = Unicode.code()+file.getOriginalFilename();
				 Path path = Paths.get(".//src//main//resources//static//images//"+name);
				String type = file.getContentType();
				
				switch (type) {
				case "image/png":
					Files.write(path,bytes);
					ruta = "/images/"+name;
					break;
				case "image/jpg":
					Files.write(path,bytes);
					ruta = "/images/"+name;
					break;
				case "image/jpeg":
					Files.write(path,bytes);
					ruta = "/images/"+name;
					break;
				case "image/gif":
					Files.write(path,bytes);
					ruta = "/images/"+name;
					break;
					
				default:
					ruta="";
					break;
				}
				
				
				
			} catch (Exception e) {
				// TODO: handle exception
				System.out.println(e.getMessage());
			}
			
		}
		return ruta;
	}
	
	public void  saveImage(String title,String link,String Point) {
		ImagesToPoint img = new ImagesToPoint();
		img.setLink(link);
		img.setTitle(title);
		img.setDate(new Date());
		
		repoImagesToPoint.save(img);
	}

}
