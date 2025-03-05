package dvj.mx.controller;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.result.NoMoreReturnsException;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import dvj.mx.Unicode;
import dvj.mx.modelo.RepoImagesToPoint;
import dvj.mx.modelo.tfr_flood_area_b;
import dvj.mx.modelo.tfr_flood_area_bRepo;
import dvj.mx.service.ServiceImagesToPoint;

/**
 * 
 * mapping for browser requests
 *
 */
@Controller
@RequestMapping("/img")
public class MapMarkController {

	@Autowired
	private tfr_flood_area_bRepo repo;
	
	@Autowired
	private ServiceImagesToPoint servicesimImagesToPoint;

	@GetMapping("/cargaPuntos")
	public @ResponseBody List<String> homePageM() {

		List<String> points = repo.finAllpoints();
		List<tfr_flood_area_b> objets = repo.findAll();
		
		List<String> complete = new ArrayList<String>();
		String aux=null;
		for (String string : points) {
			string=string.replace("{","");
			string=string.replace("}","");
			aux ="[{" 
			+ "\"type\": \"FeatureCollection\"," 
			+ " \"features\": [{" 
			+ "\"type\": \"Feature\","
			+ "\"properties\": {" 
			+ "\"marker-size\": \"medium\","
			+ " \"marker-symbol\": \"circle-stroked\"" 
			+ "}," 
			+ "\"geometry\": {" 
			+ string + "}" + "}" + "]" + "}"
					+ "]";
			complete.add(aux);
			
		}	
		return complete;
	}
	
	
	//Regreso de imagenes
	@GetMapping("/all")
	public ModelAndView find(Pageable pageable) {
		ModelAndView md = new ModelAndView("images");
		md.addObject("imgs",servicesimImagesToPoint.find(pageable));
		return md;
	}
	
	@PostMapping("/upload")
	@ResponseBody
	public String link_upload(@RequestParam("img")MultipartFile file) {
		return servicesimImagesToPoint.saveImages(file);
	}
	
	@PostMapping("/register")
	@ResponseBody
	public String inser(@RequestParam("title")String title,@RequestParam("link")String link) {
		servicesimImagesToPoint.saveImage(title, link, "");
		return "/img/all?page=0&size=9";
	}
	
	
}
/*
		 * for (String jsonObject : puntos) { System.out.println(puntos); }
		 */
	/*	List<String> complete = new ArrayList<String>();
		String aux=null;
		for (String string : points) {
			string=string.replace("{","");
			string=string.replace("}","");
			aux ="{" 
			+ "\"type\": \"FeatureCollection\"," 
			+ " \"features\": [{" 
			+ "\"type\": \"Feature\","
			+ "\"properties\": {" 
			+ "\"marker-size\": \"medium\","
			+ " \"marker-symbol\": \"circle-stroked\"" 
			+ "}," 
			+ "\"geometry\": {" 
			+ string + "}" + "}" + "]" + "}";
			complete.add(aux);
			
		}*/
// System.out.println(json);
// Estructura GeoJson
/*
 * String result="{" + "\"type\": \"FeatureCollection\"," + " features: [{" +
 * "\"type\": \"Feature\"," + "\"properties\": {" +
 * "\"marker-color\": \"#be3737\"," + "\"marker-size\": \"medium\"," +
 * " \"marker-symbol\": \"circle-stroked\"" + "}," + "\"geometry\": {" + one
 * +"}" + "}" + "]" + "}";
 * 
 * //jsons.add(result);
 */
// JsonObject json = (JsonObject) parser.parse(src);
// JsonObject crear = (JsonObject) parser.parse(result);
// JsonObject crear = new JsonParser().parse(result).getAsJsonObject();
// System.out.println(crear.toString());
// Resolviendo problema con hashMap

//one=one.replaceFirst("type","");
		/*System.out.println(one);
		System.out.println(one);
		Gson google = new Gson();
		JsonParser parser = new JsonParser();

		List<String> jsons = new ArrayList<String>();
		String[] separar = one.split(",", 2);
		String extraeType = separar[0];
		String extraerCoord = separar[1];
		extraerCoord = extraerCoord.replace(":", "");
		extraerCoord = extraerCoord.replace("coordinates", "");
		extraerCoord = extraerCoord.replace("\"", "");
		System.out.println(extraerCoord);
		extraeType = extraeType.replace("type", "");
		extraeType = extraeType.replace("\"", "");
		extraeType = extraeType.replace(":", "");
		extraeType = extraeType.replace(" ", "");
		System.out.println("typo =" + extraeType);
		System.out.println("coordenadas =" + extraerCoord);
		String type = extraeType;
		String coordinates = extraerCoord;

		// crear la marca en el mapa propiedades
		MarkGeoJson propiedadesMark = new MarkGeoJson();

		// Preparamos la estructura del punto
		PointP org = new PointP();

		List<MarkGeoJson> propiedadesJson = new ArrayList<MarkGeoJson>();
		propiedadesJson.add(propiedadesMark);
		org.setProperties(propiedadesJson);

		List<PointP> propiedadesListas = new ArrayList<PointP>();
		propiedadesListas.add(org);

		// Agregar coordenadas

		GeometryGeoJson geometri = new GeometryGeoJson();
		geometri.setType(type);
		List<String> conjuntoCoordenadas = new ArrayList<String>();
		conjuntoCoordenadas.add(coordinates);
		geometri.setCoordanites(conjuntoCoordenadas);
		List<GeometryGeoJson> geometriafinal = new ArrayList<GeometryGeoJson>();

		GeoJSONP good = new GeoJSONP();
		good.setFeatures(propiedadesListas);
		good.setGeometry(geometriafinal);

		SimpleGeoJson simple = new SimpleGeoJson();
		simple.setJso(src);

		JSONArray jsonArray = new JSONArray();
		jsonArray.add(result);
		System.out.println(result);*/