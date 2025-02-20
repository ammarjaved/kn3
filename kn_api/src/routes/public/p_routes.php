<?php
ini_set('memory_limit', '1024M');
ini_set("zlib.output_compression", 1);
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Max-Age: 86400');

use Slim\App;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\UploadedFileInterface;
use \slim4geonames\helpers\DbHelper;
use \slim4geonames\helpers\whereClauseParser;


return function (App $app) {

    $app->get(getenv("ROOT_PATH") . '/area_a_poly', function (Request $request, Response $response, $args) use($app) {
        $sql = "with foo as(
select row_number() over() as fid,geom from (
select (st_dump(geom)).geom from tbl_area_a_and_b_combined where class = 'Area A'
)foo
)SELECT row_to_json(fc)
 FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
 FROM (SELECT 'Feature' As type
    , ST_AsGeoJSON(lg.geom)::json As geometry
    , row_to_json((SELECT l FROM (SELECT fid) As l
      )) As properties
   FROM foo As lg   ) As f )  As fc;";
        $result = DbHelper::getDataArray($sql, []);

        $response->getBody()->write($result[0]['row_to_json'], true, true);
        return $response->withHeader('Content-Type', 'application/json')
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');;
    })->setName('area_a_poly');

    $app->get(getenv("ROOT_PATH") . '/area_b_poly', function (Request $request, Response $response, $args) use($app) {
        $sql = "with foo as(
select row_number() over() as fid,geom from (
select (st_dump(geom)).geom from tbl_area_a_and_b_combined where class = 'Area B'
)foo
)SELECT row_to_json(fc)
 FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
 FROM (SELECT 'Feature' As type
    , ST_AsGeoJSON(lg.geom)::json As geometry
    , row_to_json((SELECT l FROM (SELECT fid) As l
      )) As properties
   FROM foo As lg   ) As f )  As fc;";
        $result = DbHelper::getDataArray($sql, []);

        $response->getBody()->write($result[0]['row_to_json'], true, true);
        return $response->withHeader('Content-Type', 'application/json')
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');;
    })->setName('area_b_poly');

    $app->get(getenv("ROOT_PATH") . '/area_c_poly', function (Request $request, Response $response, $args) use($app) {
        $sql = "SELECT row_to_json(fc)
 FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
 FROM (SELECT 'Feature' As type
    , ST_AsGeoJSON(lg.geom)::json As geometry
    , row_to_json((SELECT l FROM (SELECT fid, area, perimeter, allmap1_, allmap1_id, name, name_city, area1, area2, acres) As l
      )) As properties
   FROM tbl_area_c_poly As lg   ) As f )  As fc;";
        $result = DbHelper::getDataArray($sql, []);

        $response->getBody()->write($result[0]['row_to_json'], true, true);
        return $response->withHeader('Content-Type', 'application/json')
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');;
    })->setName('area_c_poly');

    $app->get(getenv("ROOT_PATH") . '/area_a_and_b_combined', function (Request $request, Response $response, $args) use($app) {
        $sql = "SELECT row_to_json(fc)
 FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
 FROM (SELECT 'Feature' As type
    , ST_AsGeoJSON(lg.geom)::json As geometry
    , row_to_json((SELECT l FROM (SELECT fid,  class) As l
      )) As properties
   FROM tbl_area_a_and_b_combined As lg   ) As f )  As fc;";
        $result = DbHelper::getDataArray($sql, []);

        $response->getBody()->write($result[0]['row_to_json'], true, true);

        return $response->withHeader('Content-Type', 'application/json')
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');;
    })->setName('area_a_and_b_combined');

    $app->get(getenv("ROOT_PATH") . '/area_b_training', function (Request $request, Response $response, $args) use($app) {
        $sql = "SELECT row_to_json(fc)
                 FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
                 FROM (SELECT 'Feature' As type
                    , ST_AsGeoJSON(lg.geom)::json As geometry
                    , row_to_json((SELECT l FROM (SELECT fid) As l
                      )) As properties
                   FROM tbl_area_b_training As lg   ) As f )  As fc;";
        $result = DbHelper::getDataArray($sql, []);

        $response->getBody()->write($result[0]['row_to_json'], true, true);
        return $response->withHeader('Content-Type', 'application/json')
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');;
    })->setName('area_b_training');

    $app->get(getenv("ROOT_PATH") . '/security_orders', function (Request $request, Response $response, $args) use($app) {
        $sql = "SELECT row_to_json(fc)
                 FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
                 FROM (SELECT 'Feature' As type
                    , ST_AsGeoJSON(lg.geom)::json As geometry
                    , row_to_json((SELECT l FROM (SELECT fid) As l
                      )) As properties
                   FROM tbl_security_orders As lg   ) As f )  As fc;";
        $result = DbHelper::getDataArray($sql, []);

        $response->getBody()->write($result[0]['row_to_json'], true, true);
        return $response->withHeader('Content-Type', 'application/json')
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');;
    })->setName('security_orders');

    $app->get(getenv("ROOT_PATH") . '/area_b_violations', function (Request $request, Response $response, $args) use($app) {
        $sql = "SELECT row_to_json(fc)
                 FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
                 FROM (SELECT 'Feature' As type
                    , ST_AsGeoJSON(lg.geom)::json As geometry
                    , row_to_json((SELECT l FROM (SELECT gid, fid_, x, y, picture_id, categoryid, cat_eng, desc_arb, desc_eng, desc_heb, set_heb, set_arb,set_eng, pal_heb, pal_arb, pal_eng, art_heb, art_eng, art_arb, titt_heb, titt_eng, titt_arb, artheb1,arteng1, artarb1, tittheb1, titteng1, tittarb1) As l
                      )) As properties
                   FROM tbl_area_b_violations As lg   ) As f )  As fc;";
        $result = DbHelper::getDataArray($sql, []);

        $response->getBody()->write($result[0]['row_to_json'], true, true);
        return $response->withHeader('Content-Type', 'application/json')
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');;
    })->setName('area_b_violations');

    $app->get(getenv("ROOT_PATH") . '/area_b_violations_all', function (Request $request, Response $response, $args) use($app) {

        $sql = "SELECT row_to_json(fc)
                 FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
                 FROM (SELECT 'Feature' As type
                    , ST_AsGeoJSON(lg.geom)::json As geometry
                    , row_to_json((SELECT l FROM (SELECT fid, category_hebrew, settlement_hebrew, palestinia_hebrew, category_english, category_arabic, settlement_english, settlement_arabic, palestinia_arabic, palestinia_english,image_path, video_path) As l
                      )) As properties
                   FROM tbl_area_b_violations As lg   ) As f )  As fc;";
        $result = DbHelper::getDataArray($sql, []);

        $response->getBody()->write($result[0]['row_to_json'], true, true);
        return $response->withHeader('Content-Type', 'application/json')
                ->withHeader('Access-Control-Allow-Origin', '*')
                ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
                ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');;
    })->setName('area_b_violations');

    $app->get(getenv("ROOT_PATH") . '/area_b_violations/fid/{fid}', function (Request $request, Response $response, $args) use($app) {
        $fid = $args['fid'];
        $sql = "SELECT row_to_json(fc)
                 FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
                 FROM (SELECT 'Feature' As type
                    , ST_AsGeoJSON(lg.geom)::json As geometry
                    , row_to_json((SELECT l FROM (SELECT fid, category_hebrew, settlement_hebrew, palestinia_hebrew, category_english, category_arabic, settlement_english, settlement_arabic, palestinia_arabic, palestinia_english,image_path, video_path) As l
                      )) As properties
                   FROM tbl_area_b_violations As lg  where fid=?  ) As f )  As fc;";
        $result = DbHelper::getDataArray($sql, ['fid'=>$fid]);
        $res = json_decode($result[0]['row_to_json'],true);
        $directory    = __DIR__.'/../../../public/SettlerViolation_Pictures/'.$fid;
        $images = array_map('basename', glob($directory . "/*.{jpg,JPG,jpeg,JPEG,png,PNG}", GLOB_BRACE));
        foreach ($images as $key => $image){
            $images[$key] = getenv("hosted_url").'/public/SettlerViolation_Pictures/'.$fid.'/'.$image;
        }
        $res['features'][0]['properties']['images']=$images;
        $response->getBody()->write(json_encode($res,JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES), true, true);
        return $response->withHeader('Content-Type', 'application/json')
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    })->setName('area_b_violations');

    $app->post(getenv("ROOT_PATH") . '/upload/{data}', function (Request $request, Response $response, $args) use($app) {
        $data = json_decode($args['data'],true);
        echo ($data['adi']);
        $directory =  __DIR__ . '/../../../uploads';
        $uploadedFiles = $request->getUploadedFiles();

        // handle single input with single file upload
        $uploadedFile = $uploadedFiles['file'];

        echo ($uploadedFile->getError() );
        if ($uploadedFile->getError() === UPLOAD_ERR_OK) {
            $filename = DbHelper::moveUploadedFile($directory, $uploadedFile);
            $response->getBody()->write('Uploaded: ' . $filename . '<br/>');

        }



        return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    })->setName('upload');

    $app->get(getenv("ROOT_PATH") . '/area_b_demolitions', function (Request $request, Response $response, $args) use($app) {
        $sql = "SELECT row_to_json(fc)
                 FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
                 FROM (SELECT 'Feature' As type
                    , ST_AsGeoJSON(lg.geom)::json As geometry
                    , row_to_json((SELECT l FROM (SELECT fid) As l
                      )) As properties
                   FROM tbl_demolition_orders As lg   ) As f )  As fc;";
        $result = DbHelper::getDataArray($sql, []);

        $response->getBody()->write($result[0]['row_to_json'], true, true);
        return $response->withHeader('Content-Type', 'application/json')
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');;
    })->setName('area_b_demolitions');

    $app->get(getenv("ROOT_PATH") . '/no_construction_order', function (Request $request, Response $response, $args) use($app) {
        $sql = "SELECT row_to_json(fc)
                 FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
                 FROM (SELECT 'Feature' As type
                    , ST_AsGeoJSON(lg.geom)::json As geometry
                    , row_to_json((SELECT l FROM (SELECT fid, num, sign_date, area) As l
                      )) As properties
                   FROM tbl_no_construction_order As lg   ) As f )  As fc;";
        $result = DbHelper::getDataArray($sql, []);

        $response->getBody()->write($result[0]['row_to_json'], true, true);
        return $response->withHeader('Content-Type', 'application/json')
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');;
    })->setName('no_construction_order');

    $app->get(getenv("ROOT_PATH") . '/no_construction_order_ab', function (Request $request, Response $response, $args) use($app) {
        $sql = "SELECT row_to_json(fc)
                 FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
                 FROM (SELECT 'Feature' As type
                    , ST_AsGeoJSON(lg.geom)::json As geometry
                    , row_to_json((SELECT l FROM (SELECT fid,num, sign_date, area, class) As l
                      )) As properties
                   FROM tbl_no_construction_order_ab As lg   ) As f )  As fc;";
        $result = DbHelper::getDataArray($sql, []);

        $response->getBody()->write($result[0]['row_to_json'], true, true);
        return $response->withHeader('Content-Type', 'application/json')
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');;
    })->setName('no_construction_order_ab');

    $app->get(getenv("ROOT_PATH") . '/no_construction_order_not_ab', function (Request $request, Response $response, $args) use($app) {
        $sql = "SELECT row_to_json(fc)
                 FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
                 FROM (SELECT 'Feature' As type
                    , ST_AsGeoJSON(lg.geom)::json As geometry
                    , row_to_json
                    ((SELECT l FROM (SELECT id) As l
                 )) As properties
                   FROM tbl_no_construction_order_not_ab As lg   ) As f )  As fc;";
        $result = DbHelper::getDataArray($sql, []);

        $response->getBody()->write($result[0]['row_to_json'], true, true);
        return $response->withHeader('Content-Type', 'application/json')
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    })->setName('no_construction_order_not_ab');

    $app->get(getenv("ROOT_PATH") . '/expropriation_orders', function (Request $request, Response $response, $args) use($app) {
        $sql = "SELECT row_to_json(fc)
                 FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
                 FROM (SELECT 'Feature' As type
                    , ST_AsGeoJSON(lg.geom)::json As geometry
                    , row_to_json((SELECT l FROM (SELECT id, geom, reason, title, sign_date, district, remark, created_us, created_da, last_edite, last_edi_1, shape_leng, shape_area, d_reason, d_district) As l
                      )) As properties
                   FROM tbl_expropriation_orders As lg   ) As f )  As fc;";
        $result = DbHelper::getDataArray($sql, []);

        $response->getBody()->write($result[0]['row_to_json'], true, true);
        return $response->withHeader('Content-Type', 'application/json')
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');;
    })->setName('expropriation_orders');

    $app->get(getenv("ROOT_PATH") . '/expropriation_orders_ab', function (Request $request, Response $response, $args) use($app) {
        $sql = "SELECT row_to_json(fc)
                 FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
                 FROM (SELECT 'Feature' As type
                    , ST_AsGeoJSON(lg.geom)::json As geometry
                    , row_to_json((SELECT l FROM (SELECT id) As l
                      )) As properties
                   FROM tbl_expropriation_orders_ab As lg   ) As f )  As fc;";
        $result = DbHelper::getDataArray($sql, []);

        $response->getBody()->write($result[0]['row_to_json'], true, true);
        return $response->withHeader('Content-Type', 'application/json')
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');;
    })->setName('expropriation_orders_ab');

    $app->get(getenv("ROOT_PATH") . '/no_construction_order_barrier', function (Request $request, Response $response, $args) use($app) {
        $sql = "SELECT row_to_json(fc)
                 FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
                 FROM (SELECT 'Feature' As type
                    , ST_AsGeoJSON(lg.geom)::json As geometry
                    , row_to_json((SELECT l FROM (SELECT fid, num, sign_date, area) As l
                      )) As properties
                   FROM tbl_no_construction_order_barrier As lg   ) As f )  As fc;";
        $result = DbHelper::getDataArray($sql, []);

        $response->getBody()->write($result[0]['row_to_json'], true, true);
        return $response->withHeader('Content-Type', 'application/json')
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');;
    })->setName('no_construction_order_barrier');

    $app->get(getenv("ROOT_PATH") . '/tbl_no_construction_order_barrier_ab', function (Request $request, Response $response, $args) use($app) {
        $sql = "SELECT row_to_json(fc)
                 FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
                 FROM (SELECT 'Feature' As type
                    , ST_AsGeoJSON(lg.geom)::json As geometry
                    , row_to_json((SELECT l FROM (SELECT id) As l
                      )) As properties
                   FROM tbl_no_construction_order_barrier_ab As lg   ) As f )  As fc;";
        $result = DbHelper::getDataArray($sql, []);

        $response->getBody()->write($result[0]['row_to_json'], true, true);
        return $response->withHeader('Content-Type', 'application/json')
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');;
    })->setName('tbl_no_construction_order_barrier_ab');

    $app->get(getenv("ROOT_PATH") . '/no_construction_order_roads', function (Request $request, Response $response, $args) use($app) {
        $sql = "SELECT row_to_json(fc)
                 FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
                 FROM (SELECT 'Feature' As type
                    , ST_AsGeoJSON(lg.geom)::json As geometry
                    , row_to_json((SELECT l FROM (SELECT fid,area) As l
                      )) As properties
                   FROM tbl_no_construction_order_roads As lg   ) As f )  As fc;";
        $result = DbHelper::getDataArray($sql, []);

        $response->getBody()->write($result[0]['row_to_json'], true, true);
        return $response->withHeader('Content-Type', 'application/json')
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');;
    })->setName('no_construction_order_roads');

    $app->get(getenv("ROOT_PATH") . '/no_construction_order_roads_ab', function (Request $request, Response $response, $args) use($app) {
        $sql = "SELECT row_to_json(fc)
                 FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
                 FROM (SELECT 'Feature' As type
                    , ST_AsGeoJSON(lg.geom)::json As geometry
                    , row_to_json((SELECT l FROM (SELECT fid,area) As l
                      )) As properties
                   FROM tbl_no_construction_order_roads As lg   ) As f )  As fc;";
        $result = DbHelper::getDataArray($sql, []);

        $response->getBody()->write($result[0]['row_to_json'], true, true);
        return $response->withHeader('Content-Type', 'application/json')
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');;
    })->setName('no_construction_order_roads_ab');

    $app->get(getenv("ROOT_PATH") . '/seizure_ab', function (Request $request, Response $response, $args) use($app) {
        $sql = "SELECT row_to_json(fc)
                 FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
                 FROM (SELECT 'Feature' As type
                    , ST_AsGeoJSON(lg.geom)::json As geometry
                    , row_to_json((SELECT l FROM (SELECT id) As l
                      )) As properties
                   FROM tbl_seizure_not_ab As lg   ) As f )  As fc;";
        $result = DbHelper::getDataArray($sql, []);

        $response->getBody()->write($result[0]['row_to_json'], true, true);
        return $response->withHeader('Content-Type', 'application/json')
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');;
    })->setName('seizure_ab');

    $app->get(getenv("ROOT_PATH") . '/seizure_not_ab', function (Request $request, Response $response, $args) use($app) {
        $sql = "SELECT row_to_json(fc)
                    FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
                    FROM (SELECT 'Feature' As type
                    , ST_AsGeoJSON(lg.geom)::json As geometry
                    , row_to_json((SELECT l FROM (SELECT id) As l
                      )) As properties
                    FROM tbl_seizure_ab  As lg   ) As f )  As fc;";
        $result = DbHelper::getDataArray($sql, []);

        $response->getBody()->write($result[0]['row_to_json'], true, true);
        return $response->withHeader('Content-Type', 'application/json')
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');;
    })->setName('seizure_not_ab');

    $app->get(getenv("ROOT_PATH") . '/green_line', function (Request $request, Response $response, $args) use($app) {
        $sql = "SELECT row_to_json(fc)
                 FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
                 FROM (SELECT 'Feature' As type
                    , ST_AsGeoJSON(lg.geom)::json As geometry
                    , row_to_json((SELECT l FROM (SELECT fid, length, area, perimeter, allmap1_, allmap1_id, name, name_city) As l
                      )) As properties
                   FROM tbl_green_line As lg   ) As f )  As fc;";
        $result = DbHelper::getDataArray($sql, []);

        $response->getBody()->write($result[0]['row_to_json'], true, true);
        return $response->withHeader('Content-Type', 'application/json')
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');;
    })->setName('green_line');

    $app->get(getenv("ROOT_PATH") . '/area_b_nature_reserve', function (Request $request, Response $response, $args) use($app) {
        $sql = "SELECT row_to_json(fc)
                 FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
                 FROM (SELECT 'Feature' As type
                    , ST_AsGeoJSON(lg.geom)::json As geometry
                    , row_to_json((SELECT l FROM (SELECT fid,class,shape_area) As l
                      )) As properties
                   FROM tbl_area_b_nature_reserve As lg   ) As f )  As fc;";
        $result = DbHelper::getDataArray($sql, []);

        $response->getBody()->write($result[0]['row_to_json'], true, true);
        return $response->withHeader('Content-Type', 'application/json')
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');;
    })->setName('area_b_nature_reserve');

    $app->get(getenv("ROOT_PATH") . '/jerusalem_municipal_border_gis_line', function (Request $request, Response $response, $args) use($app) {
        $sql = "SELECT row_to_json(fc)
                 FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
                 FROM (SELECT 'Feature' As type
                    , ST_AsGeoJSON(lg.geom)::json As geometry
                    , row_to_json((SELECT l FROM (SELECT fid,et_id) As l
                      )) As properties
                   FROM tbl_jerusalem_municipal_border_gis_line As lg   ) As f )  As fc;
				   ";
        $result = DbHelper::getDataArray($sql, []);

        $response->getBody()->write($result[0]['row_to_json'], true, true);
        return $response->withHeader('Content-Type', 'application/json')
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');;
    })->setName('jerusalem_municipal_border_gis_line');

    $app->get(getenv("ROOT_PATH") . '/search/{lng}/{keyword}', function (Request $request, Response $response, $args) use($app) {
        $lng = $args['lng'];
        $key_word = $args['keyword'];

        if($lng=='heb'){
            $lng = 'name_hebrew';
        }elseif ($lng=='eng'){
            $lng='name_english';
        }elseif ($lng='ara'){
            $lng='name_arabic';
        }

        $sql = "SELECT $lng FROM tbl_search    where $lng is  not null ORDER BY SIMILARITY($lng,?) DESC LIMIT 5;";
        $result = DbHelper::getDataArray($sql, [$lng=>$key_word]);
        $result_arr=array();
        foreach ($result as $key ){
            array_push($result_arr,$key[$lng]);
        }
    $response->getBody()->write(json_encode($result_arr), true, true);
        return $response->withHeader('Content-Type', 'application/json')
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');;
    })->setName('search');

    $app->get(getenv("ROOT_PATH") . '/search_result/{lng}/{keyword}', function (Request $request, Response $response, $args) use($app) {

        $lng = $args['lng'];
        $key_word = $args['keyword'];

        if($lng=='heb'){
            $lng = 'name_hebrew';
        }elseif ($lng=='eng'){
            $lng='name_english';
        }elseif ($lng='ara'){
            $lng='name_arabic';
        }

        $sql = "SELECT fid,$lng,st_x(st_centroid(geom)) as lng,st_y(st_centroid(geom)) as lat FROM tbl_search    where $lng =?";
        $result = DbHelper::getDataArray($sql, [$lng=>$key_word]);

        $response->getBody()->write(json_encode($result), true, true);
        return $response->withHeader('Content-Type', 'application/json')
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');;
    })->setName('search_result');





};
