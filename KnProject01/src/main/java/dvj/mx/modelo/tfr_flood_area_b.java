package dvj.mx.modelo;

import java.util.Arrays;

import javax.persistence.Entity;
import javax.persistence.Id;
import org.json.simple.JSONObject;



import lombok.Data;

@Entity
@Data
public class tfr_flood_area_b   {

	@Id
	private int ogr_fid;
	
	//@Column(name = "SHAPE", columnDefinition = "POINT") 
	private String  shape;
	
	private double id;
	
	private String sttlement;
	
	private String palestina;

	@Override
	public String toString() {
		return "tfr_flood_area_b [ogr_fid=" + ogr_fid + ", SHAPE=" + shape + ", id=" + id + ", sttlement=" + sttlement
				+ ", palestina=" + palestina + "]";
	}

	
	
}
