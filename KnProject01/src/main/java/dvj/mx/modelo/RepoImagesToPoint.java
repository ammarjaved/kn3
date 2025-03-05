package dvj.mx.modelo;

import java.io.Serializable;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepoImagesToPoint extends PagingAndSortingRepository<ImagesToPoint, Serializable> {

	//@Query("select i from images_to_point i order by i.date desc")
	public abstract Page<ImagesToPoint> findAll(Pageable page);
}
