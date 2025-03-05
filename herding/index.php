<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="shortcut icon" href="assets/img/Logo.jpg">
    <script type="text/javascript">
        window.FontAwesomeConfig = {
            autoReplaceSvg: false
        }
    </script>
    <link rel="stylesheet" href="assets/lib/fontawesome/css/all.min.css">
    <link rel="stylesheet" href="assets/lib/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="assets/lib/range_slider/style.css">
    <link rel="stylesheet" href="assets/lib/leaflet/leaflet.css">
    <link rel="stylesheet" href="assets/css/leaflet.custom.css">
    <link rel="stylesheet" href="assets/lib/leaflet_plugins/leaflet-marker-cluster/MarkerCluster.css">
    <link rel="stylesheet" href="assets/lib/leaflet_plugins/leaflet-marker-cluster/MarkerCluster.Default.css">
    <link rel="stylesheet" href="assets/lib/leaflet_plugins/basemaps/L.Control.Basemaps.css">
    <link rel="stylesheet" href="assets/css/main.css">
    <link rel="stylesheet" href="assets/css/leaflet.fullscreen.css">
    <link rel="stylesheet" href="assets/leaflet-groupedlayercontrol/leaflet.groupedlayercontrol.css">
    <link rel="stylesheet" href="assets/lib/opacity_slider/Control.Opacity.css"/>
    <link rel="stylesheet" href="assets/images_slider/css-view/lightbox.css" type="text/css"/>

    <link rel="stylesheet" href="assets/css/intro-slider.css" type="text/css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">


    <title>Herding</title>
</head>
<script src="assets/lib/jquery/jquery-3.4.1.js"></script>
<script src="assets/lib/jquery/jquery-ui-1.10.3.custom.min.js"></script>
<link rel="stylesheet" href="assets/lib/jquery/jquery-ui-1.10.3.custom.min.css"/>

<script type="text/javascript"
        src="https://cdnjs.cloudflare.com/ajax/libs/tooltipster/3.3.0/js/jquery.tooltipster.js"></script>

<link rel="stylesheet" type="text/css"
      href="https://cdnjs.cloudflare.com/ajax/libs/tooltipster/3.3.0/css/tooltipster.min.css"/>

<script>
    var language;
    var language_type;
    var selected_lang_global = '<?php if (isset($_GET['lang'])) {
        echo $_GET['lang'];
    } else {
        echo 'en';
    } ?>';
    var lat = '<?php if (isset($_GET['lat'])) {
        echo $_GET['lat'];
    } ?>';
    var lng = '<?php if (isset($_GET['lat'])) {
        echo $_GET['lng'];
    } ?>';
    var fid = '<?php if (isset($_GET['lat'])) {
        echo $_GET['fid'];
    } ?>';

    function getLanguage() {
        language_type = selected_lang_global;

        $.ajax({
            url: 'assets/lang/' + selected_lang_global + '.json',
            dataType: 'json',
            async: false,
            dataType: 'json',
            success: function (lang) {
                language = lang;
                console.log(language)
            }
        });
    }

    function set_lngBtn() {
        $("#en").removeClass('selected');
        $("#arb").removeClass('selected');
        $("#heb").removeClass('selected');
        switch (selected_lang_global) {
            case 'en':
                $("#en").addClass('selected');
                break;
            case 'arb':
                $("#arb").addClass('selected');
                break;
            case 'heb':
                $("#heb").addClass('selected');
                break;
        }
    }

    function setLanguage(lang) {
        var selected_lang = '<?php if (isset($_GET['lang'])) {
            echo $_GET['lang'];
        } else {
            echo 'en';
        } ?>';
        selected_lang_global = selected_lang;
    }

    getLanguage();
</script>

<body class="" id="body">
<div class="flex intro">

    <ul class="carousel-caption--top list-reset" data-index="1">

        <li class="containerr intro-slideMedia" style="opacity: 1;    background: url(assets/img/SocialMediaBannerV1.jpg);
        display: none;
            opacity: 1;
            width: 100%;
            height: 100vh;
            /* background: url(images/bg.jpg) no-repeat center center fixed; */
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            background-size: cover;">

        </li>

        <li class="nextSlide-2" id="intro-2" style="opacity: 0;padding: 0px; display:none">
            <div class="form-control langCombo" id="langCombo">
                <p style="display: none;" class="language-bar-title" id="language-bar-title"></p>
                <div class="language-bar-line"></div>
                <i class="fa fa-angle-down"></i>
            </div>
            <div style="margin-top: -7%" class="skipDiv">
                <div class="nextButton mt-1">
                    <button id="skipIntro" class="button-reset button--link" style="opacity: 1;">
                        <span data-translate="skm">Skip to Map</span>
                    </button>
                </div>
                <div class="nextButton">
                    <div id="nextSlide-2-down" class="">
                        <i class=""><img src="assets/img/arrow-down.png"></i>
                    </div>
                </div>
            </div>
        </li>
    </ul>
</div>

<section class="mainSection introBackground" style="opacity:0;">
    <div id="top_bar" style="display: none;position: absolute;">
        <div id="heb_content" class="">
            <div class="bs-example">
                <nav class="navbar navbar-expand-md" style="top: -12px;">
                    <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                        <span class="navbar-toggler-icon">L</span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarCollapse">
                        <div class="navbar-nav">
                            <div>
                                <span id="arb" class="label" title="عربى "> ع</span>
                                <span id="en" class="label" title="English"><div class="vl"></div> E </span>
                                <span id="heb" class="label" style="cursor:pointer;" title="עברית"> ע</span>
                            </div>

                        </div>

                    </div>
                </nav>
            </div>
        </div>
    </div>
    <div id="map" style="z-index: -1;position: absolute;" class="map_new">
        <div class="" style="float:right;padding-right: 300px;padding-top: 20px;">
        </div>
    </div>
    <a href="https://www.keremnavot.org/">
        <!---img id="KeremLogoWhite_bj" src="assets/img/KeremLogoWhite.png" style="display:none"---->

        <img id="KeremLogoWhite_bj" src="assets/img/BlackLogo.png" style="display:none">
    </a>

    <div class="Header_375">
        <a href="">
            <img id="KeremLogoWhite_bj_375" src="assets/img/KeremLogoWhite.png">
        </a>
        <div style='width:30%;display:flex;justify-content:center'>
            <div style="width: 5px; height: 50px; background-color: #d6ba99; "></div>
        </div>
        <i class="fa fa-bars"></i>
    </div>
    <div class="topnavbar_375">
        <div id="i_i_i" onclick="showIntro()">
            <span>i</span>
        </div>
        <div class="languageDiv_375">
            <div class="navbar-nav">
                <div class="navbar_nav_sub_375">
                    <span id="arb" style="border-right: 1px solid snow; padding-right: 7px;cursor:pointer; "
                          class="label" title="عربى ">ع</span>
                    <span id="en" style="border-right: 1px solid snow; padding-right: 7px;cursor:pointer; "
                          class="label" title="English"> E</span>
                    <span id="heb" class="label" style="cursor:pointer;" title="עברית"> ע</span>
                </div>
            </div>
        </div>
    </div>
    <script>
        set_lngBtn();
    </script>
    <div id="sidebar-container-symbology" class="sidebar-container sidebar-container-left" style="border-radius: 5px">
        <div class="sidebar-content row">
            <div class=" col-md-12 col-sm-4">
                <ul class="list-group list-group-flush customCssForLi" style="padding-top: 10px;padding-left: 5px;"
                    id="myUL">
                    <li class="list-group-item col-md-12 col-sm-4" style="">
                        <ul class="nested active" style="height:35px">
                            <li class="">
                                <label class="customCheckBox customCheckBoxpurple">
                                    <input class="form-check-input" type="checkbox" id="babachy_israeli"
                                           onclick="addAndRemoveLayer(babachy_israeli,'babachy_israeli')" value="">
                                    <span class="checkmark checkmarkLeftUpper" style="">
                                            <i class="fas fa-check" id="fa-seizure"></i>
                                        </span>
                                    <h6 id="babachy_israeli1" style="font-family: inherit;font-size:12px;"
                                        class="form-check-label">
                                        <label class="leftPanelTitleCss" style="float:left;" for="babachy_israeli"
                                               data-translate="babachy_israeli">Babachy Israeli
                                        </label>
                                    </h6>
                                </label>
                            </li>
                        </ul>
                    </li>

                    <!--- second li --->
                    <li class="list-group-item col-md-12 col-sm-4">
                        <ul class="nested active" style="height:35px">
                            <li>
                                <label class="customCheckBox customCheckBoxOrange">
                                    <input class="form-check-input" type="checkbox" id="security_orders"
                                           onclick="addAndRemoveLayer(security_orders,'security_orders')" value="A&B">
                                    <span class="checkmark checkmarkLeftUpper" style="">
                                            <i class="fas fa-check" id="fa-security_orders"></i>
                                        </span>
                                    <h6 style="font-family: inherit;font-size:12px;" id="security_orders1"
                                        class="form-check-label">
                                        <label class="leftPanelTitleCss" style="float:left;" for="security_orders"
                                               data-translate="Security_Measures">Tabu State Land
                                        </label>
                                    </h6>
                                </label>
                            </li>
                        </ul>
                    </li>
                    <!--- end  here--->
                    <!---- 3 li ---->
                    <li class="list-group-item col-md-12 col-sm-4" style="border-bottom: none;">
                        <ul class="nested active" style="height:35px">
                            <li>
                                <label class="customCheckBox customCheckBoxYellow">
                                    <input class="form-check-input" type="checkbox" id="area_b_training"
                                           onclick="addAndRemoveLayer(area_b_training,'area_b_training')" value="A&B">
                                    <span class="checkmark checkmarkLeftUpper" style="">
                                            <i class="fas fa-check" id="fa-area_b_training"></i>
                                        </span>
                                    <h6 style="font-family: inherit;font-size:12px;" id="area_b_training1"
                                        class="form-check-label">
                                        <label class="leftPanelTitleCss" style="float:left;" for="area_b_training"
                                               data-translate="training">Declared State Land
                                        </label>
                                    </h6>
                                </label>
                            </li>
                        </ul>
                    </li>
                    <!-- end 3 li here---->
                    <li class="list-group-item col-md-12 col-sm-4">
                        <ul class="nested active" style="height:35px">
                            <li style="">
                                <label class="customCheckBox customCheckBoxblue">
                                    <input class="form-check-input" type="checkbox" id="demolitions"
                                           onclick="addAndRemoveLayer(demolitions,'demolitions')" value="A&B">
                                    <span class="checkmark checkmarkLeftUpper" style="">
                                            <i class="fas fa-check" id="fa-Firing"></i>
                                        </span>
                                    <h6 id="demolitions1" style="font-family: inherit;font-size:12px;"
                                        class="form-check-label">
                                        <label class="leftPanelTitleCss" style="float:left;" for="firing_zone"
                                               data-translate="Area_B_Demolities">Firing Zone
                                        </label>
                                    </h6>
                                </label>

                            </li>
                        </ul>
                    </li>


                    <li class="list-group-item col-md-12 col-sm-4" style="">
                        <ul class="nested active" style="height:35px">
                            <li>
                                <label class="customCheckBox customCheckBoxPink">
                                    <input class="form-check-input" type="checkbox" id="no_construction_orders"
                                           onclick="addAndRemoveLayer(no_construction_orders,'no_construction_orders')"
                                           value="">
                                    <span class="checkmark checkmarkLeftUpper">
                                            <i class="fas fa-check" id="fa-no_construction_orders"></i>
                                        </span>
                                    <h6 class="form-check-label" style="font-family: inherit;font-size:12px;"
                                        id="no_construction_orders1">
                                        <label class="leftPanelTitleCss" style="float:left;" for="No_Construction_Order"
                                               data-translate="No_Construction_Order">Nature Reserve
                                        </label></h6>
                                </label>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <div class="sidebar-toggler-btn rotated-text d-flex align-items-center justify-content-center polygons"
             style="display: none !important;border-radius: 2px">
            <span data-translate="Polygons" class="customeFontSze">Polygons</span>
        </div>
    </div>

    <!--  <div onclick="closeDiclaration()" class="box">
          <div class="box-inner">
              <div class="modal-body" style="height: 600px;overflow-y: scroll;background-color: transparent;">
                  <div class="row" style="">
                      <div class="col-md-3" style="float: right !important;">
                          <a href="https://www.keremnavot.org/"><img src="assets/img/KeremLogoWhite.png" width="200px"
                                                                     height="200px"/></a>
                      </div>
                      <div class="col-md-6" style="padding-top: 10px;">
                          <h4 style="text-align: right;" data-translate="lading_top_line1"></h4>
                          <h5 style="text-align: right;" data-translate="lading_top_line2"></h5>
                          <h5 style="text-align: right;" data-translate="lading_top_line3"><b></b></h5>
                      </div>
                      <div class="col-md-3">
                          <img src="assets/img/OsloPic.jpeg" height="160px;"/>
                      </div>
                  </div>

                  <div class="col-md-12">
                      <div class="row">

                          <div class="col-md-12" style="">
                              <p style="text-align: right; " class="text-justify text-justify directionText"
                                 data-translate="p1">בנובמבר 1991 התקיימה ועידת שלום במדריד, ובעקבותיה נפתח באוסלו ערוץ
                                  משא ומתן סודי בין אש"ף לבין ישראל. משא ומתן זה הוביל להסכם אוסלו, שנחתם בוושינגטון ב־13
                                  בספטמבר 1993. בהסכם הזה, המכונה אוסלו א', נחתמה בין הצדדים הצהרת עקרונות בדבר הסכמי
                                  ביניים. ההצהרה נפתחה במילים האלה:
                                  ממשלת ישראל וצוות אש"ף [...] המייצג את העם הפלסטיני, מסכימים כי הגיעה העת לשים קץ לעשרות
                                  שנים של עימות וסכסוך, מכירים הדדית בזכויותיהם הלגיטימיות והפוליטיות ושואפים לפעול ככל
                                  יכולתם לחיות בדו־קיום בשלום ובכבוד ובביטחון הדדיים, ולהגיע להסדר שלום צודק, בר־קיימא
                                  וכולל ולפיוס היסטורי באמצעות התהליך המדיני המוסכם.
                              </p>
                          </div>
                          <div class="col-md-12 text-justify" style="">
                              <p style="text-align: right;" class="text-justify directionText" data-translate="p2">בסעיף
                                  הראשון של ההסכם הביניים, שהיה אמור
                                  לפתוח פרק חדש ביחסיהם של שני העמים, נכתב כך:
                                  יעדו של המשא ומתן הישראלי–הפלסטיני במסגרת תהליך השלום הנוכחי הינו, בין היתר, להקים רשות
                                  פלסטינית לממשל עצמי בשלב הביניים, המועצה הנבחרת עבור העם הפלסטיני בגדה המערבית וברצועת
                                  עזה, לתקופת מעבר שלא תעלה על חמש שנים, אשר תוביל להסדר קבע, המבוסס על החלטות מועצת
                                  הביטחון 242 ו־338.

                              </p>
                          </div>
                          <div class="col-md-12 text-justify" style="">
                              <p style="text-align: right;" class="text-justify directionText" data-translate="p3">
                                  ב־4 במאי 1994 נחתם בקהיר הסכם שבו סוכם שישראל תעביר בתחילה את השליטה ברוב רצועת עזה
                                  (למעט
                                  אזורי ההתנחלויות שהיו שם באותה עת) ובעיר יריחו לרשות הפלסטינית.
                                  ב־28 בספטמבר 1995 נחתם הסכם נוסף בין אש"ף לישראל – "הסכם ביניים ישראלי–פלסטיני בדבר הגדה
                                  המערבית ורצועת עזה". בהסכם הזה, המכונה אוסלו ב', הוסכמו פרטי תהליך העברת השליטה בגדה
                                  המערבית
                                  לידי הרשות הפלסטינית בתהליך שהיה אמור להסתיים עד מאי 1999. בהסכם זה התחייבה ישראל לסגת
                                  מהגדה
                                  במערבית בכמה שלבים, ולשם כך חולקה הגדה המערבית לשלושה אזורים (קטגוריות):
                                  ●<br> אזור A – אזורים שבהם תהיה הרשות הפלסטינית אחראית לענייני ביטחון וסדר ציבורי. אזור
                                  זה
                                  כלל
                                  בשלב ראשון את הערים הפלסטיניות (למעט חברון) בגדה המערבית, ואת רוב רצועת עזה.
                                  ● אזור B – אזורים שבהם תהיה הרשות הפלסטינית אחראית לשירותים, לתשתיות ולסדר הציבורי, אך
                                  ישראל
                                  תמשיך להחזיק "באחריות המכריעה לביטחון על מנת להגן על ישראלים ולהתמודד עם איום הטרור"
                                  (אוסלו
                                  ב', סעיף XIII 2 א).
                                  ● אזור C – שאר שטחי הגדה המערבית, שיישארו בשליטה אזרחית ביטחונית ישראלית.

                              </p>
                          </div>
                          <div class="col-md-12 text-justify" style="">
                              <p style="text-align: right;" class="text-justify directionText" data-translate="p4">ב־4
                                  לנובמבר
                                  1995 נרצח רה"מ יצחק רבין בשל
                                  חתימתו על הסכמי אוסלו. ביוני 1996 מונה בנימין נתניהו לראש ממשלה, אך בניגוד לקו החריף
                                  שהוא
                                  נקט כנגד הסכמי אוסלו בהיותו באופוזיציה, הוא המשיך את המו"מ עם הרשות הפלסטינית. ב־17
                                  בינואר
                                  1997 נחתם בטאבה הסכם שבעקבותיו נערכה ישראל מחדש בעיר חברון, העיר הפלסטינית היחידה שהצבא
                                  הישראלי עדיין שלט בכל שטחיה בשל מגורי מתנחלים במרכזה. על פי ההסכם חולקה העיר חברון לשני
                                  חלקים: 1H (כ־80% משטח העיר), שהועבר לשליטת הרשות הפלסטינית, והיה במעמד זהה לשאר שטחי A.
                                  ו־H2
                                  (כ־20% משטחי העיר), שכלל את גרעינה ההיסטורי והמסחרי של העיר, וכן את "מערת המכפלה" –
                                  המכונה
                                  בערבית "חראם אל־אברהימי".</p>
                          </div>
                          <div class="col-md-12 text-justify" style="">
                              <p style="text-align: right;" class="text-justify directionText" data-translate="p5">ב־23
                                  באוקטובר 1998 נחתם בוושינגטון הסכם ואי
                                  (Wye), ובו הוסכם בין ממשלת נתניהו, ובין הרשות הפלסטינית, בראשות יאסר ערפאת, כי ישראל
                                  תיסוג
                                  מ־13% נוספים משטחי הגדה המערבית, שיועברו לרשות הפלסטינית: אחוז אחד מהשטח יהפוך לשטח A,
                                  ואילו
                                  12% יהפכו לשטחי B ( 3% מהם במעמד של "שמורות טבע" שתיאסר בהם בנייה פלסטינית חדשה).</p>
                          </div>
                          <div class="col-md-12 text-justify" style="">
                              <p style="text-align: right;" class="text-justify directionText" data-translate="p6">
                                  ב־1998, לאחר נסיגת ישראל מהשטחים על פי ההסכמים שהוזכרו לעיל, הוגדרו 18% משטחי הגדה
                                  המערבית
                                  אזור A, ו־21% אזור B. שטחים אלו (בסך הכול כ־39% מהגדה המערבית) מכונים כיום "שטחי הרשות
                                  הפלסטינית". בשטחים אלו הועברו כל סמכויות הבנייה והתכנון לידי הפלסטינים. כלומר על ישראל
                                  נאסר
                                  לבנות שם התנחלויות או מתקנים צבאיים. כלשון ההסכם (אוסלו ב', סעיףXI 2 ב):
                                  "כל הכוחות והאחריות האזרחיים, לרבות תכנון ובנייה, באזורים A ו־B, כפי שהם קבועים בנספח
                                  III,
                                  יועברו למועצה וינטלו על ידה בשלב הראשון של ההיערכות מחדש."

                                  61% הנותרים משטחי הגדה המערבית נותרו מאז ועד היום באזור C, כלומר בשליטה ישראלית ישירה
                                  ומלאה.
                                  על פי הערכות האו"ם בשנת 2014, התגוררו באזור C כ־300 אלף פלסטינים, שהם כ־10% מהאוכלוסייה
                                  הפלסטינית בגדה המערבית. ההתנחלויות הישראליות בגדה המערבית נמצאות אף הן כולן באזור C.

                              </p>
                          </div>

                          <div class="col-md-12 text-justify" style="">
                              <p style="text-align: right;" class="text-justify directionText" data-translate="p7">על
                                  הפרויקט
                                  חצי יובל חלף מחתימת הסכם אוסלו ב' ו־21 שנים מאז הייתה ישראל אמורה להשלים את הנסיגה משטחי
                                  הגדה המערבית, או למצער מרובם ( סעיף XIהסכם אוסלו ב'), אך הדברים, כידוע, התפתחו אחרת
                                  מהמתוכנן. 25 שנה הם פרק זמן המזמין עצירה והתבוננות לאחור כדי לבחון תהליכים פוליטיים
                                  ארוכי
                                  טווח. ימים אלו של פוסט־סיפוח שלא אירע, מזמינים במיוחד בחינה כזאת, שכן המציאות בשטח היא
                                  דינמית, וגורמים שונים, הן בצד הפלסטיני הן בצד הישראלי, קוראים, מטעמים אחרים לחלוטין
                                  אומנם,
                                  לבטל את הסכמי אוסלו ולאלץ את ישראל לקבל את האחריות לכל שטחי הגדה המערבית ולאוכלוסייתה
                                  הפלסטינית, המונה כיום כשלושה מיליון נפש (כולל מזרח ירושלים).
                              </p>
                          </div>
                          <div class="col-md-12 text-justify" style="">
                              <p style="text-align: right;" class="text-justify directionText" data-translate="p8">בסוף
                                  1995
                                  חיו בגדה המערבית (בלא מזרח ירושלים)
                                  כ־120 אלף מתנחלים, ב־120 התנחלויות. כיום חיים בגדה המערבית כ־450 אלף מתנחלים,
                                  ולהתנחלויות
                                  שהיו קיימות אז (למעט ארבע התנחלויות בצפון הגדה שפונו בקיץ 2005), נוספו עוד כ־-140 מאחזים
                                  בגדלים שונים ומסוגים שונים. </p>
                          </div>
                          <div class="col-md-12 text-justify" style="">
                              <p style="text-align: right;" class="text-justify directionText" data-translate="p9">אף
                                  שבמובנים
                                  רבים הגדה המערבית השתנתה ב־25
                                  השנים האחרונות ללא היכר, דבר אחד לא השתנה: הסכמי אוסלו מעולם לא בוטלו ולא הוחלפו בהסכמים
                                  אחרים, והרשות הפלסטינית עדיין שולטת לכאורה באופן כזה או אחר על 39% מהשטח.
                              </p>
                          </div>
                          <div class="col-md-12 text-justify" style="">
                              <p style="text-align: right;" class="text-justify directionText" data-translate="p10">מפה זו
                                  מציגה בפעם הראשונה את שאירע בשטחי
                                  הרשות הפלסטינית ב־25 השנים האחרונות בשני היבטים:
                                  <br><b>1.</b> היבט אחד הוא צווים צבאיים קבועים שהוצאו בשטחי הרשות הפלסטינית לאחר 28
                                  בספטמבר
                                  1995 (תאריך חתימת הסכם אוסלו ב'), ובעיקר מפרוץ האינתיפאדה השנייה בשלהי שנת 2000,
                                  שבעקבותיה
                                  השתנתה המציאות בגדה המערבית באופן קיצוני.
                                  <br><b>2.</b> ההיבט השני הוא הפעילות המתמשכת של המתנחלים בשטחי הרשות הפלסטינית. פעילות
                                  שנועדה בעיקרה לכרסם בשטחה של הרשות ובכך לערער את הסכם אוסלו. להיבט זה יש בעינינו חשיבות
                                  ייחודית מכיוון שבמהלך המעקב אחר המאמצים שהמתנחלים בגיבוי ממשלות ישראל, משקיעים בהשתלטות
                                  על
                                  אזור C , קל שלא לשים לב שחלק הולך וגדל ממאמציהם מופנים גם לאזורים הנתונים באופן רשמי מאז
                                  הסכם אוסלו ב', בידי הרשות הפלסטינית.
                                  כפי שאפשר לראות במקרא של המפה, הן את הפעילות הצבאית הרשמית, הן את פעילות המתנחלים
                                  הלא־רשמית,
                                  הנעשית לרוב בחסות הצבא, חלקנו לכמה תתי־קבוצות שלכל אחת מהן מאפיינים יחודיים.
                              </p>
                          </div>

                          <div class="col-md-12 text-justify" style="">
                              <p style="text-align: right;" data-translate="p11" class="text-justify directionText">מקורות
                                  המידע
                                  המידע שאנו מציגים כאן מבוסס על שני סוגי מקורות:
                                  <br><b>1.</b> שכבות ממ"ג (GIS) שהעביר לידינו המנהל האזרחי בעקבות כמה בקשות ועתירות לחופש
                                  המידע. שכבות אלו כוללות את כל הצווים הצבאיים המוצגים כאן.
                                  <br><b>2.</b> עבודת שטח שמוקדה באיתור מקומות שבהם מתנחלים פועלים בדרכים מגוונות בתוך
                                  שטחי
                                  הרשות הפלסטינית, לא פעם מתוך כוונה מוצהרת לקרוא תגר על הסכמי אוסלו.
                                  פרויקט זה הוא דינמי ובכוונתנו להמשיך ולעדכן את המפה במידה והצבא יוציא צווים צבאיים חדשים
                                  או
                                  יבטל צווים קיימים, וככל שיחולו שינויים בשטח.

                                  * מפה זו אינה כוללת צווים צבאיים קצרי טווח, פלישות, מבצעים, מחסומים צבאיים ואירועי טרור
                                  של
                                  אזרחים ישראלים, המכונים בשם המכובס "תג מחיר". מדובר באלפי אירועים שאין ביכולתנו למנות
                                  כאן,
                                  וספק אם גוף כלשהו מחזיק בתיעוד מהימן ומלא שלהם.

                              </p>
                          </div>
                          <div class="col-md-12 text-justify" style="">
                              <p style="text-align: right;" class="text-justify directionText" data-translate="p12">
                              </p>
                          </div>

                          <div class="col-md-12 text-justify" style="">
                              <p style="text-align: right;" data-translate="p13">
                              </p>
                          </div>
                          <div class="col-md-12 text-justify" style="">
                              <p style="text-align: right;" class="text-justify directionText" data-translate="p14">

                              </p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

      </div>-->
    <svg class="Rectangle_393_b" style="display: none">
        <rect id="Rectangle_393_b" rx="0" ry="0" x="0" y="0" width="190" height="63">
        </rect>
    </svg>
<!--    <div id="i_i" onclick="showIntro()" style="display: none;height: 47px;width: 52px;">-->
<!--    </div>-->
    <div id="Group_2_j">
    </div>
    <svg class="Line_5_m" viewBox="0 0 4 43">
<!--        <path id="Line_5_m" d="M 0 0 L 0 43">-->
<!--        </path>-->
    </svg>
    <input type="text" name="search" id="searchBox" class="typeahead search">
    <div id="sidebar-container-layers" class="sidebar-container sidebar-container-right" style="border-radius: 5px">
        <div class="sidebar-content  col-md-12 col-sm-4">
            <div id="layer_about" class="layers-container-about">
            </div>
            <div id="layer-container" class="layers-container">
            </div>
        </div>

        <div style="margin-top: -40px;"
             class="sidebar-toggler-btn rotated-text d-flex align-items-center justify-content-center layers">
            <span data-translate="Layers" class="customeFontSze">Layers</span>
        </div>
    </div>


    <div class="modal rightModel fade " id="" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
         aria-hidden="true">
        <div class="modal-dialog modal-lg" style="opacity: 0.8;" role="document">
            <div class="modal-content">
                <div class="modal-body" style="height: 600px;overflow-y: scroll;background-color: transparent;">
                    <div class="row directionText" style="">
                        <div class="col-md-3" style="float: right !important;">
                            <a href="https://www.keremnavot.org/">
                                <img src="assets/img/KeremLogoWhite.png" width="200px" height="200px"/></a>
                        </div>
                        <div class="col-md-6" style="padding-top: 10px;">
                            <h4 style="" data-translate="lading_top_line1" class="directionTextHead"></h4>
                            <h5 style="" data-translate="lading_top_line2" class="directionTextHead"></h5>
                            <h5 style="" data-translate="lading_top_line3" class="directionTextHead"></h5>
                        </div>
                        <div class="col-md-3">
                            <img src="assets/img/OsloPic.jpeg" height="160px;"/>
                        </div>
                    </div>

                    <div class="col-md-12">
                        <div class="row">

                            <div class="col-md-12 " style="">
                                <p style="text-align: right; " class="text-justify directionText" data-translate="p1">
                                    בנובמבר 1991 התקיימה ועידת שלום במדריד, ובעקבותיה נפתח באוסלו
                                    ערוץ
                                    משא ומתן סודי בין אש"ף לבין ישראל. משא ומתן זה הוביל להסכם אוסלו, שנחתם בוושינגטון
                                    ב־13
                                    בספטמבר 1993. בהסכם הזה, המכונה אוסלו א', נחתמה בין הצדדים הצהרת עקרונות בדבר הסכמי
                                    ביניים. ההצהרה נפתחה במילים האלה:
                                    ממשלת ישראל וצוות אש"ף [...] המייצג את העם הפלסטיני, מסכימים כי הגיעה העת לשים קץ
                                    לעשרות
                                    שנים של עימות וסכסוך, מכירים הדדית בזכויותיהם הלגיטימיות והפוליטיות ושואפים לפעול
                                    ככל
                                    יכולתם לחיות בדו־קיום בשלום ובכבוד ובביטחון הדדיים, ולהגיע להסדר שלום צודק, בר־קיימא
                                    וכולל ולפיוס היסטורי באמצעות התהליך המדיני המוסכם.
                                </p>
                            </div>
                            <div class="col-md-12 text-justify" style="">
                                <p style="text-align: right;" data-translate="p2" class="text-justify directionText">
                                    בסעיף
                                    הראשון של ההסכם הביניים, שהיה אמור
                                    לפתוח פרק חדש ביחסיהם של שני העמים, נכתב כך:
                                    יעדו של המשא ומתן הישראלי–הפלסטיני במסגרת תהליך השלום הנוכחי הינו, בין היתר, להקים
                                    רשות
                                    פלסטינית לממשל עצמי בשלב הביניים, המועצה הנבחרת עבור העם הפלסטיני בגדה המערבית
                                    וברצועת
                                    עזה, לתקופת מעבר שלא תעלה על חמש שנים, אשר תוביל להסדר קבע, המבוסס על החלטות מועצת
                                    הביטחון 242 ו־338.

                                </p>
                            </div>
                            <div class="col-md-12 text-justify" style="">
                                <p style="text-align: right;" data-translate="p3" class="text-justify directionText">
                                    ב־4 במאי 1994 נחתם בקהיר הסכם שבו סוכם שישראל תעביר בתחילה את השליטה ברוב רצועת עזה
                                    (למעט אזורי ההתנחלויות שהיו שם באותה עת) ובעיר יריחו לרשות הפלסטינית.
                                    ב־28 בספטמבר 1995 נחתם הסכם נוסף בין אש"ף לישראל – "הסכם ביניים ישראלי–פלסטיני בדבר
                                    הגדה
                                    המערבית ורצועת עזה". בהסכם הזה, המכונה אוסלו ב', הוסכמו פרטי תהליך העברת השליטה בגדה
                                    המערבית לידי הרשות הפלסטינית בתהליך שהיה אמור להסתיים עד מאי 1999. בהסכם זה התחייבה
                                    ישראל לסגת מהגדה במערבית בכמה שלבים, ולשם כך חולקה הגדה המערבית לשלושה אזורים
                                    (קטגוריות):
                                    <br>●<br> אזור A – אזורים שבהם תהיה הרשות הפלסטינית אחראית לענייני ביטחון וסדר
                                    ציבורי.
                                    אזור
                                    זה כלל בשלב ראשון את הערים הפלסטיניות (למעט חברון) בגדה המערבית, ואת רוב רצועת עזה.
                                    <br>● אזור B – אזורים שבהם תהיה הרשות הפלסטינית אחראית לשירותים, לתשתיות ולסדר
                                    הציבורי,
                                    אך ישראל תמשיך להחזיק "באחריות המכריעה לביטחון על מנת להגן על ישראלים ולהתמודד עם
                                    איום
                                    הטרור" (אוסלו ב', סעיף XIII 2 א).
                                    <br>● אזור C – שאר שטחי הגדה המערבית, שיישארו בשליטה אזרחית ביטחונית ישראלית.

                                </p>
                            </div>
                            <div class="col-md-12 text-justify" style="">
                                <p style="text-align: right;" class="text-justify directionText" data-translate="p4">ב־4
                                    לנובמבר 1995 נרצח רה"מ יצחק רבין בשל
                                    חתימתו על הסכמי אוסלו. ביוני 1996 מונה בנימין נתניהו לראש ממשלה, אך בניגוד לקו החריף
                                    שהוא נקט כנגד הסכמי אוסלו בהיותו באופוזיציה, הוא המשיך את המו"מ עם הרשות הפלסטינית.
                                    ב־17
                                    בינואר 1997 נחתם בטאבה הסכם שבעקבותיו נערכה ישראל מחדש בעיר חברון, העיר הפלסטינית
                                    היחידה
                                    שהצבא הישראלי עדיין שלט בכל שטחיה בשל מגורי מתנחלים במרכזה. על פי ההסכם חולקה העיר
                                    חברון
                                    לשני חלקים: 1H (כ־80% משטח העיר), שהועבר לשליטת הרשות הפלסטינית, והיה במעמד זהה לשאר
                                    שטחי A. ו־H2 (כ־20% משטחי העיר), שכלל את גרעינה ההיסטורי והמסחרי של העיר, וכן את
                                    "מערת
                                    המכפלה" – המכונה בערבית "חראם אל־אברהימי".</p>
                            </div>
                            <div class="col-md-12 text-justify" style="">
                                <p style="text-align: right;" class="text-justify directionText" data-translate="p5">
                                    ב־23
                                    באוקטובר 1998 נחתם בוושינגטון הסכם
                                    ואי (Wye), ובו הוסכם בין ממשלת נתניהו, ובין הרשות הפלסטינית, בראשות יאסר ערפאת, כי
                                    ישראל
                                    תיסוג מ־13% נוספים משטחי הגדה המערבית, שיועברו לרשות הפלסטינית: אחוז אחד מהשטח יהפוך
                                    לשטח A, ואילו 12% יהפכו לשטחי B ( 3% מהם במעמד של "שמורות טבע" שתיאסר בהם בנייה
                                    פלסטינית
                                    חדשה).</p>
                            </div>
                            <div class="col-md-12 text-justify" style="">
                                <p style="text-align: right;" class="text-justify directionText" data-translate="p6">
                                    ב־1998, לאחר נסיגת ישראל מהשטחים על פי ההסכמים שהוזכרו לעיל, הוגדרו 18% משטחי הגדה
                                    המערבית אזור A, ו־21% אזור B. שטחים אלו (בסך הכול כ־39% מהגדה המערבית) מכונים כיום
                                    "שטחי
                                    הרשות הפלסטינית". בשטחים אלו הועברו כל סמכויות הבנייה והתכנון לידי הפלסטינים. כלומר
                                    על
                                    ישראל נאסר לבנות שם התנחלויות או מתקנים צבאיים. כלשון ההסכם (אוסלו ב', סעיףXI 2 ב):
                                    "כל הכוחות והאחריות האזרחיים, לרבות תכנון ובנייה, באזורים A ו־B, כפי שהם קבועים
                                    בנספח
                                    III, יועברו למועצה וינטלו על ידה בשלב הראשון של ההיערכות מחדש."

                                    61% הנותרים משטחי הגדה המערבית נותרו מאז ועד היום באזור C, כלומר בשליטה ישראלית
                                    ישירה
                                    ומלאה. על פי הערכות האו"ם בשנת 2014, התגוררו באזור C כ־300 אלף פלסטינים, שהם כ־10%
                                    מהאוכלוסייה הפלסטינית בגדה המערבית. ההתנחלויות הישראליות בגדה המערבית נמצאות אף הן
                                    כולן
                                    באזור C.

                                </p>
                            </div>

                            <div class="col-md-12 text-justify" style="">
                                <p style="text-align: right;" class="text-justify directionText" data-translate="p7">על
                                    הפרויקט
                                    חצי יובל חלף מחתימת הסכם אוסלו ב' ו־21 שנים מאז הייתה ישראל אמורה להשלים את הנסיגה
                                    משטחי
                                    הגדה המערבית, או למצער מרובם ( סעיף XIהסכם אוסלו ב'), אך הדברים, כידוע, התפתחו אחרת
                                    מהמתוכנן. 25 שנה הם פרק זמן המזמין עצירה והתבוננות לאחור כדי לבחון תהליכים פוליטיים
                                    ארוכי טווח. ימים אלו של פוסט־סיפוח שלא אירע, מזמינים במיוחד בחינה כזאת, שכן המציאות
                                    בשטח
                                    היא דינמית, וגורמים שונים, הן בצד הפלסטיני הן בצד הישראלי, קוראים, מטעמים אחרים
                                    לחלוטין
                                    אומנם, לבטל את הסכמי אוסלו ולאלץ את ישראל לקבל את האחריות לכל שטחי הגדה המערבית
                                    ולאוכלוסייתה הפלסטינית, המונה כיום כשלושה מיליון נפש (כולל מזרח ירושלים).
                                </p>
                            </div>
                            <div class="col-md-12 text-justify" style="">
                                <p style="text-align: right;" class="text-justify directionText" data-translate="p8">
                                    בסוף
                                    1995 חיו בגדה המערבית (בלא מזרח
                                    ירושלים) כ־120 אלף מתנחלים, ב־120 התנחלויות. כיום חיים בגדה המערבית כ־450 אלף
                                    מתנחלים,
                                    ולהתנחלויות שהיו קיימות אז (למעט ארבע התנחלויות בצפון הגדה שפונו בקיץ 2005), נוספו
                                    עוד
                                    כ־-140 מאחזים בגדלים שונים ומסוגים שונים. </p>
                            </div>
                            <div class="col-md-12 text-justify" style="">
                                <p style="text-align: right;" class="text-justify directionText" data-translate="p9">אף
                                    שבמובנים רבים הגדה המערבית השתנתה ב־25
                                    השנים האחרונות ללא היכר, דבר אחד לא השתנה: הסכמי אוסלו מעולם לא בוטלו ולא הוחלפו
                                    בהסכמים
                                    אחרים, והרשות הפלסטינית עדיין שולטת לכאורה באופן כזה או אחר על 39% מהשטח.
                                </p>
                            </div>
                            <div class="col-md-12 text-justify" style="">
                                <p style="text-align: right;" class="text-justify directionText" data-translate="p10">
                                    מפה זו
                                    מציגה בפעם הראשונה את שאירע בשטחי
                                    הרשות הפלסטינית ב־25 השנים האחרונות בשני היבטים:
                                    <br><b>1.</b> היבט אחד הוא צווים צבאיים קבועים שהוצאו בשטחי הרשות הפלסטינית לאחר 28
                                    בספטמבר 1995 (תאריך חתימת הסכם אוסלו ב'), ובעיקר מפרוץ האינתיפאדה השנייה בשלהי שנת
                                    2000,
                                    שבעקבותיה השתנתה המציאות בגדה המערבית באופן קיצוני.
                                    <br><b>2.</b> ההיבט השני הוא הפעילות המתמשכת של המתנחלים בשטחי הרשות הפלסטינית.
                                    פעילות
                                    שנועדה בעיקרה לכרסם בשטחה של הרשות ובכך לערער את הסכם אוסלו. להיבט זה יש בעינינו
                                    חשיבות
                                    ייחודית מכיוון שבמהלך המעקב אחר המאמצים שהמתנחלים בגיבוי ממשלות ישראל, משקיעים
                                    בהשתלטות
                                    על אזור C , קל שלא לשים לב שחלק הולך וגדל ממאמציהם מופנים גם לאזורים הנתונים באופן
                                    רשמי
                                    מאז הסכם אוסלו ב', בידי הרשות הפלסטינית.
                                    כפי שאפשר לראות במקרא של המפה, הן את הפעילות הצבאית הרשמית, הן את פעילות המתנחלים
                                    הלא־רשמית, הנעשית לרוב בחסות הצבא, חלקנו לכמה תתי־קבוצות שלכל אחת מהן מאפיינים
                                    יחודיים.
                                </p>
                            </div>

                            <div class="col-md-12 text-justify" style="">
                                <p style="text-align: right;" class="text-justify directionText" data-translate="p11">
                                    מקורות
                                    המידע
                                    המידע שאנו מציגים כאן מבוסס על שני סוגי מקורות:
                                    <br><b>1.</b> שכבות ממ"ג (GIS) שהעביר לידינו המנהל האזרחי בעקבות כמה בקשות ועתירות
                                    לחופש
                                    המידע. שכבות אלו כוללות את כל הצווים הצבאיים המוצגים כאן.
                                    <br><b>2.</b> עבודת שטח שמוקדה באיתור מקומות שבהם מתנחלים פועלים בדרכים מגוונות בתוך
                                    שטחי הרשות הפלסטינית, לא פעם מתוך כוונה מוצהרת לקרוא תגר על הסכמי אוסלו.
                                    פרויקט זה הוא דינמי ובכוונתנו להמשיך ולעדכן את המפה במידה והצבא יוציא צווים צבאיים
                                    חדשים
                                    או יבטל צווים קיימים, וככל שיחולו שינויים בשטח.

                                    * מפה זו אינה כוללת צווים צבאיים קצרי טווח, פלישות, מבצעים, מחסומים צבאיים ואירועי
                                    טרור
                                    של אזרחים ישראלים, המכונים בשם המכובס "תג מחיר". מדובר באלפי אירועים שאין ביכולתנו
                                    למנות
                                    כאן, וספק אם גוף כלשהו מחזיק בתיעוד מהימן ומלא שלהם.

                                </p>
                            </div>
                            <div class="col-md-12 text-justify" style="">
                                <p class="text-justify directionText" style="text-align: right;" data-translate="p12">
                                </p>
                            </div>

                            <div class="col-md-12 text-justify" style="">
                                <p style="text-align: right;" class="text-justify " data-translate="p13">
                                </p>
                            </div>
                            <div class="col-md-12 text-justify" style="">
                                <p class="text-justify directionText" style="text-align: right;" data-translate="p14">

                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>
    <script src="assets/lib/fontawesome/js/all.min.js"></script>
    <script src="assets/lib/bootstrap/bootstrap.bundle.js"></script>
    <script src="assets/lib/range_slider/script.js"></script>
    <script src="assets/lib/leaflet/leaflet.js"></script>
    <script src="assets/js/ytube.js"></script>
    <script src='https://unpkg.com/leaflet.vectorgrid@latest/dist/Leaflet.VectorGrid.bundled.js'></script>
    <script src='assets/lib/zlib.js'></script>
    <script src="assets/lib/leaflet_plugins/leaflet-marker-cluster/leaflet.markercluster-src.js"></script>
    <script src="assets/lib/leaflet_plugins/leaflet.markercluster.freezable.js"></script>
    <script src="assets/lib/leaflet_plugins/basemaps/L.Control.Basemaps-min.js"></script>
    <script src="assets/lib/leaflet_plugins/leaflet.pattern.js"></script>
    <script src="assets/js/leaflet-patterns.js"></script>

    <script src="assets/js/main.js"></script>
    <script src="assets/js/Leaflet.fullscreen.min.js"></script>
    <script src="assets/leaflet-groupedlayercontrol/leaflet.groupedlayercontrol.js"></script>
    <script src="assets/lib/opacity_slider/Control.Opacity.js"></script>
    <script src="assets/js/typeahead.min.js"></script>

    <script src="assets/images_slider/js-view/lightbox-2.6.min.js"></script>
    <script src="assets/images_slider/js-view/jQueryRotate.js"></script>
    <div id="fb-root"></div>
    <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v8.0"
            nonce="em0Iq2cN"></script>

</section>
<div class="special-modal portfolio-modal modal fade" id="philosophyVideo" tabindex="-1" role="dialog"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="close-modal" data-dismiss="modal"
                 onclick="philosophy_player.stopVideo();philosophy_player.destroy();"><img
                        src="assets/img/cross-512.png" alt="Close modal" class="icon-size"/></div>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-12">
                        <div class="modal-body">
                            <div style="height: 100%">
                                <div id="philosophyVideo_modal"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>

</html>
<style>

</style>
<script>

    function highlightFeature(e) {
        var layer = e.target;

        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
    }

    $(document).ready(function () {
        var selected_lang = '<?php if (isset($_GET['lang'])) {
            echo $_GET['lang'];
        } else {
            echo 'en';
        } ?>';
        setLanguage(selected_lang)

        var lgb_title = '';
        if (language_type === 'heb')
            lgb_title = 'ע ';
        if (language_type === 'en')
            lgb_title = 'E';
        if (language_type === 'arb')
            lgb_title = 'ع ';
        document.getElementById("language-bar-title").innerHTML = lgb_title;

        $('.customeFontSze').addClass(language_type + "-customeFontSze");
        $('.checkmark').addClass(language_type + "-checkmark");
        $('#opacityRange').addClass(language_type + "-opacityRange");
        $('.leaflet-control-layers-overlays').addClass(language_type + "-leaflet-control-layers-overlays");
        $('#nextSlide-2').addClass("btn-first-intro");
        $('.customCheckBoxBlue').addClass(language_type + "-customCheckBoxBlue");
        $('.customCheckBoxGolden').addClass(language_type + "-customCheckBoxGolden");
        $('.customCheckBoxBrown').addClass(language_type + "-customCheckBoxBrown");
        $('.list-group ').addClass(language_type + "-list-group ");
        $('.checkmarkLeft_375').addClass(language_type + "-checkmarkLeft_375");
        $('.AreaC').addClass(language_type + "-AreaC");
        $('.araa_a_area_b').addClass(language_type + "-araa_a_area_b");
        $('.checkmarkLeft1').addClass(language_type + "-checkmarkLeft1");
        $('.container-fluid').addClass(language_type + "-container-fluid");
        $('.container-fluid-title-div').addClass(language_type + "-container-fluid-title-div");


        $(".langCombo").change(function () {
            var val = document.getElementById("langCombo").value;
            setLanguage(val);
            location.reload();
        });
        $('#nextSlide-lang-heb').click(function () {
            setLanguage('heb');
            location.reload();
        })
        $('#nextSlide-lang-arb').click(function () {
            setLanguage('arb');
            location.reload();
        })
        $('#nextSlide-lang-en').click(function () {
            setLanguage('en');
            location.reload();
        })

        $(".fa-angle-down").click(function () {
            var property = $('.fa-angle-down').css("background-color")
            if (property !== "rgb(255, 255, 255)") {
                $('.language-bar-line').css("display", "none");
                $('.language-bar-title').css("width", "50%");
                $('.fa-angle-down').css("width", "50%");
                $('.fa-angle-down').css("background-color", "#fff");
                $('.fa-angle-down').css("color", "#333");
                $('.language-bar').css("display", "flex");
            } else {
                $('.language-bar-line').css("display", "initial");
                $('.language-bar-title').css("width", "49%");
                $('.fa-angle-down').css("width", "49%");
                $('.fa-angle-down').css("background-color", "initial");
                $('.fa-angle-down').css("color", "#fff");
                $('.language-bar').css("display", "none");
            }
        })

        $(".nextSlide-3, .nextSlide-4, .nextSlide-5, .nextSlide-6, .nextSlide-7, .nextSlide-8, .nextSlide-9").css("display", "none");
        var dirctoryImage;

        $('#nextSlide-2-down').click(function () {
            var size = {
                width: window.innerWidth
            }
            if (size.width > 540) {
                var myobj = document.getElementById("img-nextSlide-2");
                myobj.remove();
                $(".nextSlide-2").removeClass("intro-slide");
                $(".nextSlide-2").removeClass(language_type + "-intro-slide-2");
                $('.nextSlide-2').css("display", "none");
                dirctoryImage = "<img src='http://d3lc3b5z70nh5p.cloudfront.net/en-intro/" + language_type + "/3.webp' style='width: 100%; height: 100vh;' id='img-nextSlide-3' />"
                $('.nextSlide-3').prepend(dirctoryImage);
                $('.nextSlide-3').css("display", "block");
                $('.nextSlide-3').addClass("intro-slide");
                $('.nextSlide-3').addClass(language_type + "-intro-slide-3");
            } else {
                var myobj = document.getElementById("img-nextSlide-2");
                myobj.remove();
                $(".nextSlide-2").removeClass("intro-slide");
                $(".nextSlide-2").removeClass(language_type + "-intro-slide-2");
                $('.nextSlide-2').css("display", "none");
                dirctoryImage = "<img src='http://d3lc3b5z70nh5p.cloudfront.net/en-intro/mobile_intro.jpg' style='width: 100%;' id='img-nextSlide-9' />"
                $('.nextSlide-9').prepend(dirctoryImage);
                $('.nextSlide-9').css("display", "block");
                $('.nextSlide-9').addClass("intro-slide");
            }
        })
        $('#nextSlide-3-down').click(function () {
            var myobj = document.getElementById("img-nextSlide-3");
            myobj.remove();
            $(".nextSlide-3").removeClass("intro-slide");
            $(".nextSlide-3").removeClass(language_type + "-intro-slide-3");
            $('.nextSlide-3').css("display", "none");
            dirctoryImage = "<img src='http://d3lc3b5z70nh5p.cloudfront.net/en-intro/" + language_type + "/4.webp' style='width: 100%; height: 100vh;' id='img-nextSlide-4' />"
            $('.nextSlide-4').prepend(dirctoryImage);
            $('.nextSlide-4').css("display", "block");
            $('.nextSlide-4').addClass("intro-slide");
            $('.nextSlide-4').addClass(language_type + "-intro-slide-4");
        })
        $('#nextSlide-3').click(function () {
            var myobj = document.getElementById("img-nextSlide-3");
            myobj.remove();
            $(".nextSlide-3").removeClass("intro-slide");
            $(".nextSlide-3").removeClass(language_type + "-intro-slide-3");
            $('.nextSlide-3').css("display", "none");
            dirctoryImage = "<img src='http://d3lc3b5z70nh5p.cloudfront.net/en-intro/2.jpg' style='width: 100%; height: 100vh;' id='img-nextSlide-2' />"
            $('.nextSlide-2').prepend(dirctoryImage);
            $('.nextSlide-2').css("display", "block");
            $('.nextSlide-2').addClass("intro-slide");
            $('.nextSlide-2').addClass(language_type + "-intro-slide-2");
        })
        $('#nextSlide-4-down').click(function () {
            var myobj = document.getElementById("img-nextSlide-4");
            myobj.remove();
            $(".nextSlide-4").removeClass("intro-slide");
            $(".nextSlide-4").removeClass(language_type + "-intro-slide-4");
            $('.nextSlide-4').css("display", "none");
            dirctoryImage = "<img src='http://d3lc3b5z70nh5p.cloudfront.net/en-intro/" + language_type + "/5.webp' style='width: 100%; height: 100vh;' id='img-nextSlide-5' />"
            $('.nextSlide-5').prepend(dirctoryImage);
            $('.nextSlide-5').css("display", "block");
            $('.nextSlide-5').addClass("intro-slide");
            $('.nextSlide-5').addClass(language_type + "-intro-slide-5");
        })
        $('#nextSlide-4').click(function () {
            var myobj = document.getElementById("img-nextSlide-4");
            myobj.remove();
            $(".nextSlide-4").removeClass("intro-slide");
            $(".nextSlide-4").removeClass(language_type + "-intro-slide-4");
            $('.nextSlide-4').css("display", "none");
            dirctoryImage = "<img src='http://d3lc3b5z70nh5p.cloudfront.net/en-intro/" + language_type + "/3.webp' style='width: 100%; height: 100vh;' id='img-nextSlide-3' />"
            $('.nextSlide-3').prepend(dirctoryImage);
            $('.nextSlide-3').css("display", "block");
            $('.nextSlide-3').addClass("intro-slide");
            $('.nextSlide-3').addClass(language_type + "-intro-slide-3");
        })
        $('#nextSlide-5-down').click(function () {
            var myobj = document.getElementById("img-nextSlide-5");
            myobj.remove();
            $(".nextSlide-5").removeClass("intro-slide");
            $(".nextSlide-5").removeClass(language_type + "-intro-slide-5");
            $('.nextSlide-5').css("display", "none");
            dirctoryImage = "<img src='http://d3lc3b5z70nh5p.cloudfront.net/en-intro/" + language_type + "/6.webp' style='width: 100%; height: 100vh;' id='img-nextSlide-6' />"
            $('.nextSlide-6').prepend(dirctoryImage);
            $('.nextSlide-6').css("display", "block");
            $('.nextSlide-6').addClass("intro-slide");
            $('.nextSlide-6').addClass(language_type + "-intro-slide-6");
        })
        $('#nextSlide-5').click(function () {
            var myobj = document.getElementById("img-nextSlide-5");
            myobj.remove();
            $(".nextSlide-5").removeClass("intro-slide");
            $(".nextSlide-5").removeClass(language_type + "-intro-slide-5");
            $('.nextSlide-5').css("display", "none");
            dirctoryImage = "<img src='http://d3lc3b5z70nh5p.cloudfront.net/en-intro/" + language_type + "/4.webp' style='width: 100%; height: 100vh;' id='img-nextSlide-4' />"
            $('.nextSlide-4').prepend(dirctoryImage);
            $('.nextSlide-4').css("display", "block");
            $('.nextSlide-4').addClass("intro-slide");
            $('.nextSlide-4').addClass(language_type + "-intro-slide-4");
        })
        $('#nextSlide-6-down').click(function () {
            var myobj = document.getElementById("img-nextSlide-6");
            myobj.remove();
            $(".nextSlide-6").removeClass("intro-slide");
            $(".nextSlide-6").removeClass(language_type + "-intro-slide-6");
            $('.nextSlide-6').css("display", "none");
            dirctoryImage = "<img src='http://d3lc3b5z70nh5p.cloudfront.net/en-intro/" + language_type + "/7.webp' style='width: 100%; height: 100vh;' id='img-nextSlide-7' />"
            $('.nextSlide-7').prepend(dirctoryImage);
            $('.nextSlide-7').css("display", "block");
            $('.nextSlide-7').addClass("intro-slide");
            $('.nextSlide-7').addClass(language_type + "-intro-slide-7");
        })
        $('#nextSlide-6').click(function () {
            var myobj = document.getElementById("img-nextSlide-6");
            myobj.remove();
            $(".nextSlide-6").removeClass("intro-slide");
            $(".nextSlide-6").removeClass(language_type + "-intro-slide-6");
            $('.nextSlide-6').css("display", "none");
            dirctoryImage = "<img src='http://d3lc3b5z70nh5p.cloudfront.net/en-intro/" + language_type + "/5.webp' style='width: 100%; height: 100vh;' id='img-nextSlide-5' />"
            $('.nextSlide-5').prepend(dirctoryImage);
            $('.nextSlide-5').css("display", "block");
            $('.nextSlide-5').addClass("intro-slide");
            $('.nextSlide-5').addClass(language_type + "-intro-slide-5");
        })
        $('#nextSlide-7-down').click(function () {
            var myobj = document.getElementById("img-nextSlide-7");
            myobj.remove();
            $(".nextSlide-7").removeClass("intro-slide");
            $(".nextSlide-7").removeClass(language_type + "-intro-slide-7");
            $('.nextSlide-7').css("display", "none");
            dirctoryImage = "<img src='http://d3lc3b5z70nh5p.cloudfront.net/en-intro/" + language_type + "/8.webp' style='width: 100%; height: 100vh;' id='img-nextSlide-8' />"
            $('.nextSlide-8').prepend(dirctoryImage);
            $('.nextSlide-8').css("display", "block");
            $('.nextSlide-8').addClass("intro-slide");
            $('.nextSlide-8').addClass(language_type + "-intro-slide-8");
        })
        $('#nextSlide-7').click(function () {
            var myobj = document.getElementById("img-nextSlide-7");
            myobj.remove();
            $(".nextSlide-7").removeClass("intro-slide");
            $(".nextSlide-7").removeClass(language_type + "-intro-slide-7");
            $('.nextSlide-7').css("display", "none");
            dirctoryImage = "<img src='http://d3lc3b5z70nh5p.cloudfront.net/en-intro/" + language_type + "/6.webp' style='width: 100%; height: 100vh;' id='img-nextSlide-6' />"
            $('.nextSlide-6').prepend(dirctoryImage);
            $('.nextSlide-6').css("display", "block");
            $('.nextSlide-6').addClass("intro-slide");
            $('.nextSlide-6').addClass(language_type + "-intro-slide-6");
        })
        $('#nextSlide-8-down').click(function () {
            var myobj = document.getElementById("img-nextSlide-8");
            myobj.remove();
            $(".nextSlide-8").removeClass("intro-slide");
            $(".nextSlide-8").removeClass(language_type + "-intro-slide-8");
            $('.nextSlide-8').css("display", "none");
            dirctoryImage = "<img src='assets/img/intro/" + language_type + "/9.webp' style='width: 100%; height: 100vh;' id='img-nextSlide-9' />"
            $('.nextSlide-9').prepend(dirctoryImage);
            $('.nextSlide-9').css("display", "block");
            $('.nextSlide-9').addClass("intro-slide");
        })
        $('#nextSlide-8').click(function () {
            var myobj = document.getElementById("img-nextSlide-8");
            myobj.remove();
            $(".nextSlide-8").removeClass("intro-slide");
            $(".nextSlide-8").removeClass(language_type + "-intro-slide-8");
            $('.nextSlide-8').css("display", "none");
            dirctoryImage = "<img src='http://d3lc3b5z70nh5p.cloudfront.net/en-intro/" + language_type + "/7.webp' style='width: 100%; height: 100vh;' id='img-nextSlide-7' />"
            $('.nextSlide-7').prepend(dirctoryImage);
            $('.nextSlide-7').css("display", "block");
            $('.nextSlide-7').addClass("intro-slide");
            $('.nextSlide-7').addClass(language_type + "-intro-slide-7");
        })
        $('#nextSlide-9').click(function () {
            var size = {
                width: window.innerWidth
            }
            var myobj = document.getElementById("img-nextSlide-9");
            myobj.remove();
            $(".nextSlide-9").removeClass("intro-slide");
            $('.nextSlide-9').css("display", "none");
            if (size.width > 540) {
                dirctoryImage = "<img src='http://d3lc3b5z70nh5p.cloudfront.net/en-intro/" + language_type + "/8.webp' style='width: 100%; height: 100vh;' id='img-nextSlide-8' />"
                $('.nextSlide-8').prepend(dirctoryImage);
                $('.nextSlide-8').css("display", "block");
                $('.nextSlide-8').addClass("intro-slide");
                $('.nextSlide-8').addClass(language_type + "-intro-slide-8");
            } else {
                dirctoryImage = "<img src='http://d3lc3b5z70nh5p.cloudfront.net/en-intro/2.jpg' style='width: 100%; height: 100vh;' id='img-nextSlide-2' />"
                $('.nextSlide-2').prepend(dirctoryImage);
                $('.nextSlide-2').css("display", "block");
                $('.nextSlide-2').addClass("intro-slide");
                $('.nextSlide-2').addClass(language_type + "-intro-slide-2");
            }
        })
        $('.fa-bars').click(function () {
            $(".sidebar-container-left").removeClass("sidebar-container-open-left");
            $(".sidebar-container-right").removeClass("sidebar-container-open-right");
            var property = $('.topnavbar_375').css("display")
            if (property !== "flex") {
                $('.topnavbar_375').css("display", "flex")
                var elem = $('.topnavbar_375');
                var pos = 50;
                var opacy = 0;
                var id = setInterval(frame, 10);
                var id1 = setInterval(frame1, 20);

                function frame() {
                    if (pos == 110) {
                        clearInterval(id);
                    } else {
                        pos++;
                        $('.topnavbar_375').css("top", `${pos}px`)
                    }
                }

                function frame1() {
                    if (opacy == 0.7999999999999999) {
                        clearInterval(id1);
                    } else {
                        opacy = opacy + 0.1;
                        $('.topnavbar_375').css("opacity", `${opacy}px`)
                    }
                }
            } else {
                var elem = $('.topnavbar_375');
                var pos = 110;
                var opacy = 0.7999999999999999;
                var id = setInterval(frame, 10);
                var id1 = setInterval(frame1, 20);

                function frame() {
                    if (pos == 50) {
                        clearInterval(id);
                        $('.topnavbar_375').css("display", "none")
                    } else {
                        pos--;
                        $('.topnavbar_375').css("top", `${pos}px`)
                    }
                }

                function frame1() {
                    if (opacy < 0) {
                        clearInterval(id1);
                    } else {
                        opacy = opacy - 0.1;
                        $('.topnavbar_375').css("opacity", `${opacy}px`)
                    }
                }
            }
        })

        $('.button-reset').click(function () {
            $(".mainSection").removeClass("invisible");
            $(".sidebar-toggler-btn").css("display", "flex");
            $(".intro").css("display", "none");
            $(".sidebar-container").css("position", "fixed");
            $(".mainSection ").css("display", "block");
            $(".mainSection ").css("opacity", "1");
            $(".Rectangle_393_b ").css("display", "block");
            $("#KeremLogoWhite_bj").css("display", "block");
            // $("#i_i ").css("display", "block");

            if (language_type == 'en') {
                $(".tooltipstered").css("left", "0");
                $(".checkmark").css("right", "0");
                $(".checkmarkLeft").css("right", "41%");
                $(".checkmarkLeftUpper").css("right", "5%");
                $(".customCheckBoxBlue").css("left", "60%");
                $(".customCheckBoxPurple").css("left", "57%");
                $(".customCheckBoxGolden").css("left", "60%");
                $(".customCheckBoxGoldenLi").css("left", "57%");
                $(".customCheckBoxBrown").css("left", "60%");
                $(".customCheckBoxBrownLi").css("left", "57%");
            } else {
                $(".checkmarkLeftUpper").css("left", "14%");
                $(".tooltipstered").css("right", "0");
                $(".checkmarkLeft").css("left", "50%");

                $(".customCheckBoxBlue").css("right", "-25%");
                $(".customCheckBoxPurple").css("right", "17%");
                $(".customCheckBoxGolden").css("right", "-25%");
                $(".customCheckBoxGoldenLi").css("right", "17%");
                $(".customCheckBoxBrown").css("right", "-25%");
                $(".customCheckBoxBrownLi").css("right", "17%");
                $("#vc1, #vc2, #vc3, #vc4").css("text-align", "right");
            }
        })

        $('.intro-slideMedia').click(function () {
            $(".mainSection").removeClass("invisible");
            $(".sidebar-toggler-btn").css("display", "flex");
            $(".intro").css("display", "none");
            $(".sidebar-container").css("position", "fixed");
            $(".mainSection ").css("display", "block");
            $(".mainSection ").css("opacity", "1");
            $(".Rectangle_393_b ").css("display", "block");
            $("#KeremLogoWhite_bj").css("display", "block");
            // $("#i_i ").css("display", "block");

            if (language_type == 'en') {
                $(".tooltipstered").css("right", "0");
                $(".checkmark").css("right", "0");
                $(".checkmarkLeft").css("right", "41%");
                $(".checkmarkLeftUpper").css("right", "5%");
                $(".customCheckBoxBlue").css("left", "60%");
                $(".customCheckBoxPurple").css("left", "57%");
                $(".customCheckBoxGolden").css("left", "60%");
                $(".customCheckBoxGoldenLi").css("left", "57%");
                $(".customCheckBoxBrown").css("left", "60%");
                $(".customCheckBoxBrownLi").css("left", "57%");
            } else {
                $(".checkmarkLeftUpper").css("left", "14%");
                $(".tooltipstered").css("right", "0");
                $(".checkmarkLeft").css("left", "50%");

                $(".customCheckBoxBlue").css("right", "-25%");
                $(".customCheckBoxPurple").css("right", "17%");
                $(".customCheckBoxGolden").css("right", "-25%");
                $(".customCheckBoxGoldenLi").css("right", "17%");
                $(".customCheckBoxBrown").css("right", "-25%");
                $(".customCheckBoxBrownLi").css("right", "17%");
                $("#vc1, #vc2, #vc3, #vc4").css("text-align", "right");
            }
        })
    });
    var toggler = document.getElementsByClassName("caret");
    var i;

    for (i = 0; i < toggler.length; i++) {
        toggler[i].addEventListener("click", function () {
            this.parentElement.querySelector(".nested").classList.toggle("active");
            this.classList.toggle("caret-down");
        });
    }
    $(document).ready(function () {
        $(".Rectangle_393_b ").css("display", "none");
        // $("#i_i ").css("display", "none");
        setTimeout(function () {
            $('.typeahead').typeahead({
                name: 'hce',
                remote: 'http://localhost/herding/kn_api/search/eng/%QUERY',
                highlight: true,
                limit: 5
            });
            $('.typeahead')[0].style.removeProperty('background-color');
            $(".mainSection ").css("display", "none");
        }, 10);

        $(".intro-slide").hide();
        // $(".mainSection").hide();

        setTimeout(function () {
            $(".intro-slideMedia").fadeOut(8000, () => {

                // CallBack After fadeOut

                $(".langCls").css("display", "block");
                $(".mainSection").removeClass("invisible");
                $(".sidebar-toggler-btn").css("display", "flex");
                $(".intro").css("display", "none");
                $(".sidebar-container").css("position", "fixed");
                $(".mainSection ").css("display", "block");
                $(".mainSection ").css("opacity", "1");
                $(".Rectangle_393_b ").css("display", "block");
                $("#KeremLogoWhite_bj").css("display", "block");
                // $("#i_i ").css("display", "block");
            });
            // $(".intro-slideMedia").fadeOut(10000);
            // $(".langCls").css("display", "block");
        }, 10);

        setTimeout(function () {


            if (language_type == 'en') {
                $(".tooltipstered").css("left", "0");
                $(".checkmark").css("right", "0");
                $(".checkmarkLeft").css("right", "41%");
                $(".checkmarkLeftUpper").css("right", "5%");
                $(".customCheckBoxBlue").css("left", "60%");
                $(".customCheckBoxPurple").css("left", "57%");
                $(".customCheckBoxGolden").css("left", "60%");
                $(".customCheckBoxGoldenLi").css("left", "57%");
                $(".customCheckBoxBrown").css("left", "60%");
                $(".customCheckBoxBrownLi").css("left", "57%");
            } else {
                $(".checkmarkLeftUpper").css("left", "14%");
                $(".tooltipstered").css("right", "0");
                $(".checkmarkLeft").css("left", "50%");

                $(".customCheckBoxBlue").css("right", "-25%");
                $(".customCheckBoxPurple").css("right", "17%");
                $(".customCheckBoxGolden").css("right", "-25%");
                $(".customCheckBoxGoldenLi").css("right", "17%");
                $(".customCheckBoxBrown").css("right", "-25%");
                $(".customCheckBoxBrownLi").css("right", "17%");
                $("#vc1, #vc2, #vc3, #vc4").css("text-align", "right");
            }
        }, 6000);

        setTimeout(function () {
            $(".intro-slide").show(1000);
            // $(".mainSection").show();
        }, 1000);
        $("#top_bar").css("display", "block");
        getLanguage();

        if (fid != '') {
            setTimeout(function () {
                popuponthefly(fid, lat, lng);
            }, 3000)
        }

        setTimeout(function () {
            $('[data-toggle="tooltip"]').tooltip();
        }, 3000);

        $("#body").css("background-color", "transparent")
        if (language_type == 'en') {
            $("#body").css("font-family", "Trebuchet MS");
            $("#intro-2").prepend('<img src="http://d3lc3b5z70nh5p.cloudfront.net/en-intro/2.jpg" style="width: 100%; height: 100vh;" id="img-nextSlide-2" />');
            $(".directionText").css("direction", "ltr");
            $(".directionTextHead").css("direction", "ltr");
            $(".directionTextHead").css("text-align", "left");
            $(".leftPanelTitleCss").addClass("leftPanelEngTitleClass");
            $("#nextSlide-lang-en").css("color", "snow");
            document.getElementById("langCombo").value = language_type;
            $(".tooltip-custom").css("right", "0");
            $(".checkmark").css("right", "0");
        } else if (language_type == 'arb') {
            $("#nextSlide-8").css("display", "none");
            $("#nextSlide-8-down").css("display", "none");
            $("#body").css("font-family", "ibm-plex-arabic, sans-serif");
            $("#intro-2").prepend('<img src="http://d3lc3b5z70nh5p.cloudfront.net/en-intro/2.jpg" style="width: 100%; height: 100vh;" id="img-nextSlide-2" />');
            $(".directionText").css("direction", "rtl");
            $(".directionTextHead").css("direction", "rtl");
            $(".directionTextHead").css("text-align", "right");
            $(".leftPanelTitleCss").addClass("leftPanelArbHebTitleClass");
            $("#nextSlide-lang-arb").css("color", "snow");
            document.getElementById("langCombo").value = language_type;
            $(".tooltip-custom").css("right", "0");
            $(".checkmark").css("left", "0");
        } else {
            $("#nextSlide-8").css("display", "none");
            $("#nextSlide-8-down").css("display", "none");
            $("#body").css("font-family", "myHebrewFont");
            $("#intro-2").prepend('<img src="http://d3lc3b5z70nh5p.cloudfront.net/en-intro/2.jpg" style="width: 100%; height: 100vh;" id="img-nextSlide-2" />');
            $(".directionText").css("direction", "rtl", "", "");
            $(".directionTextHead").css("direction", "rtl");
            $(".directionTextHead").css("text-align", "right");
            $(".leftPanelTitleCss").addClass("leftPanelArbHebTitleClass");
            $("#nextSlide-lang-heb").css("color", "snow");
            document.getElementById("langCombo").value = language_type;
            $(".tooltip-custom").css("right", "0");
            $(".checkmark").css("left", "0");
        }
    });

    function search() {
        var sr = $(".typeahead").val();
        $.ajax({
            url: "http://localhost/herding/kn_api/search_result/eng/" + sr,
            type: 'GET',
            success: function (res) {
                map.setView(new L.LatLng(res[0].lat, res[0].lng), 14);
            }
        });
    }

    setTimeout(function () {
        var input = document.getElementById("searchBox");
        input.addEventListener("keyup", function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                search();
            } else {
                search();
            }
        });
    }, 2000)

    function showIntro() {
        // location.reload();
        /*   if (language_type === "en")
               window.open("https://www.keremnavot.org/oslo-25-yers");
           if (language_type === "arb")
               window.open("https://www.keremnavot.org/arabic-oslo-25-years");
           if (language_type === "heb")
               window.open("https://www.keremnavot.org/%D7%94%D7%9B%D7%9C-%D7%A6%D7%A4%D7%95%D7%99-%D7%95%D7%94%D7%A8%D7%A9%D7%95%D7%AA-%D7%A0%D7%AA%D7%95%D7%A0%D7%94");*/
    }

</script>
<link rel="stylesheet" href="assets/css/sidebarCard.css" type="text/css"/>

<script src="assets/js/sidebar.js"></script>

