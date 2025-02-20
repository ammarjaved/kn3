select * from tbl_no_construction_order
select * from tbl_area_a_and_b_combined
select * from tbl_area_a_and_b_combined_old
select * from tbl_area_b_training
select * from tbl_security_orders
with foo as(
select row_number() over() as id,geom from (
select (st_dump(geom)).geom from tbl_area_a_and_b_combined where class = 'Area A'
)foo
)select * from foo

select * from tbl_area_b_violations
select * from tbl_area_b_violations_old

alter table tbl_area_b_violations rename column category to category_hebrew;
alter table tbl_area_b_violations  add column category_english character varying(255);
alter table tbl_area_b_violations  add column category_arabic character varying(255);

alter table tbl_area_b_violations rename column settlement to settlement_hebrew;
alter table tbl_area_b_violations  add column settlement_english character varying(255);
alter table tbl_area_b_violations  add column settlement_arabic character varying(255);

alter table tbl_area_b_violations rename column palestinia to palestinia_hebrew;
alter table tbl_area_b_violations  add column palestinia_english character varying(255);
alter table tbl_area_b_violations  add column palestinia_arabic character varying(255);

alter table tbl_area_b_violations  add column classfication_english character varying(255);
alter table tbl_area_b_violations  add column classfication_hebrew character varying(255);

update tbl_area_b_violations set classfication_english = 'Prevention of Access' where id = 0;
update tbl_area_b_violations set classfication_hebrew = 'מניעת גישה' where id = 0;

update tbl_area_b_violations set classfication_english = 'Settlers Agricultural Takeover' where id = 1;
update tbl_area_b_violations set classfication_hebrew = 'השתלטויות חקלאיות' where id = 1;

update tbl_area_b_violations set classfication_english = 'Roads and Construction' where id = 2;
update tbl_area_b_violations set classfication_hebrew = 'פריצת דרכים ובנייה' where id = 2;


update tbl_area_b_violations set classfication_english = 'Settler Visit' where id = 3;
update tbl_area_b_violations set classfication_hebrew = 'מניעת גישה' where id = 3;

alter table tbl_area_b_violations add column image_path character varying(500);
alter table tbl_area_b_violations add column video_path character varying(500);

select fid, category_hebrew, settlement_hebrew, palestinia_hebrew, category_english, category_arabic,
settlement_english, settlement_arabic,
palestinia_arabic, palestinia_english,image_path, video_path
from tbl_area_b_violations

select * from tbl_area_b_violations


alter table tbl_area_b_violations rename column 
select * from tbl_settlements


create table tbl_no_construction_order_ab as 
select b.num,sign_date,area,a.class,st_intersection(a.geom,b.geom) from tbl_area_a_and_b_combined a, tbl_no_construction_order b 
where st_intersects (a.geom,b.geom)

drop table if exists tbl_no_construction_order_not_ab;
create table tbl_no_construction_order_not_ab as 
with foo as (
select st_union(geom) as geom from tbl_area_a_and_b_combined
),bar as (
select st_union(geom) as geom from tbl_no_construction_order
)select  row_number() over() as  id,geom from(
select st_makevalid((st_dump(ST_Difference(b.geom,a.geom))).geom) as geom from foo a, bar b 
)x




create table tbl_no_construction_order_ab as 
select b.num,sign_date,area,a.class,st_intersection(a.geom,b.geom) from tbl_area_a_and_b_combined a, tbl_no_construction_order b 
where st_intersects (a.geom,b.geom)

drop table if exists tbl_no_construction_order_not_ab;
create table tbl_no_construction_order_not_ab as 
with foo as (
select st_union(geom) as geom from tbl_area_a_and_b_combined
),bar as (
select st_union(geom) as geom from tbl_no_construction_order
)select  row_number() over() as  id,geom from(
select st_makevalid((st_dump(ST_Difference(b.geom,a.geom))).geom) as geom from foo a, bar b 
)x


with foo as(
select row_number() over() as fid,geom from (
select (st_dump(geom)).geom from tbl_area_a_and_b_combined where class = 'Area A'
)foo
)
SELECT row_to_json(fc)
 FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
 FROM (SELECT 'Feature' As type
    , ST_AsGeoJSON(lg.geom)::json As geometry
    , row_to_json((SELECT l FROM (SELECT fid) As l
      )) As properties
   FROM foo As lg   ) As f )  As fc;
   
   select * from tbl_area_a_and_b_combined
   alter table tbl_area_a_and_b_combined drop column shape_area;
   alter table tbl_area_a_and_b_combined drop column shape_leng;
   alter table tbl_area_a_and_b_combined  drop column objectid;
   
   select * from tbl_area_a_poly;
   select st_srid(geom) from tbl_seizure_all;
   
   alter table tbl_area_a_poly drop column shape_area;
   alter table tbl_area_a_poly drop column shape_leng;
   alter table tbl_area_a_poly drop column areaupdt;
   
   select * from tbl_seizure_all
   
   alter table tbl_seizure_all add column geom_n geometry(MultiPolygon,4326);
   update tbl_seizure_all set geom_n = st_transform(geom,4326)
   alter table tbl_seizure_all drop column geom;
   alter table tbl_seizure_all rename column geom_n to geom;
   
create table tbl_seizure_ab as 
select row_number() over() as id,geom from (
select st_intersection(a.geom,b.geom) as geom from tbl_area_a_and_b_combined a, tbl_seizure_all b 
where st_intersects (a.geom,b.geom)
) foo 

drop table if exists tbl_seizure_not_ab;
create table tbl_seizure_not_ab as 
with foo as (
select st_union(geom) as geom from tbl_area_a_and_b_combined
),bar as (
select st_union(geom) as geom from tbl_seizure_all
)select  row_number() over() as  id,geom from(
select st_makevalid((st_dump(ST_Difference(b.geom,a.geom))).geom) as geom from foo a, bar b 
)x
   

 
create table tbl_expropriation_orders_ab as 
select row_number() over() as id,geom from (
select st_intersection(a.geom,b.geom) as geom from tbl_area_a_and_b_combined a, tbl_expropriation_orders b 
where st_intersects (a.geom,b.geom)
) foo 

drop table if exists tbl_expropriation_orders_not_ab;
create table tbl_expropriation_orders_not_ab as 
with foo as (
select st_union(geom) as geom from tbl_area_a_and_b_combined
),bar as (
select st_union(geom) as geom from tbl_expropriation_orders
)select  row_number() over() as  id,geom from(
select st_makevalid((st_dump(ST_Difference(b.geom,a.geom))).geom) as geom from foo a, bar b 
)x

select * from tbl_settlements
select * from tbl_palestinian_localities_westbank

				   