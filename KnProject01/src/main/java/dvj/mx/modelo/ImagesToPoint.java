package dvj.mx.modelo;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;

@Entity
@Data
public class ImagesToPoint {
	/**
	 * 
	 */

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private int id;
	
//RELACION DE TRABLAS PROPONER CAMBIOS
/*	@JoinTable(name = "point",
			joinColumns = {
					@JoinColumn(name = "id", referencedColumnName = "id", 
							foreignKey = @ForeignKey(name ="IMAGEPOINT_FK")
					) }, 
					inverseJoinColumns = {
					@JoinColumn(name = "ogr_fid", referencedColumnName = "ogr_fid", 
							foreignKey = @ForeignKey(name ="OGRFID_FK")) },
					foreignKey = @ForeignKey(name ="IMAGEPOINT_FK"),
					inverseForeignKey = @ForeignKey(name ="OGRFID_FK")		 
			)
	@ManyToMany(fetch = FetchType.EAGER)*/
	private String point;
	
	@Column(name = "title")
	private String title;
	
	@Column(name = "link")
	private String link;
	
	@Column(name = "date")
	@DateTimeFormat
	private Date date;

	
	
	
}
