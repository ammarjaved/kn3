package dvj.mx.modelo;

import java.util.List;

import lombok.Data;
@Data
public class GeoJSONP {
	
	private final String type = "FeatureCollection";
	private List<PointP> features;
	private List<GeometryGeoJson> geometry;


}
