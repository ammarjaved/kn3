package dvj.mx.modelo;



import java.util.List;

import org.json.simple.JSONObject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;



public interface tfr_flood_area_bRepo extends JpaRepository<tfr_flood_area_b, Integer> {

	@Query(value = "Select ST_AsGeoJSON(tfr_flood_area_b.SHAPE) from tfr_flood_area_b", nativeQuery=true)
		public List<String>finAllpoints();
	
	@Query(value = "Select ogr_fid,ST_AsGeoJSON(SHAPE),id,settlement,palestina from tfr_flood_area_b",nativeQuery = true)
	List<tfr_flood_area_b> findAll();
}
