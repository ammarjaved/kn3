$('.btn-show').on('click', function(){
    
    $('form').animate({
        top: '0px'
    });
    
    $('.shape').fadeIn();
    
    $('body').css({
        overflow: 'hidden'
    })
    
})

$('.shape').on('click', function(){
    
     $('form').animate({
        top: '-400px'
    });
    
    $('.shape').fadeOut();
    
    $('body').css({
        overflowY: 'scroll'
    })
    
})

$('.load-image').on('click', function(){
    
    $('.seleted').click();
    
})


/*VISOR DE FOTOS*/

$(function() {
  $('.seleted').change(function(e) {
      addImage(e); 
     });

     function addImage(e){
      var file = e.target.files[0],
      imageType = /image.*/;
    
      if (!file.type.match(imageType))
       return;
  
      var reader = new FileReader();
      reader.onload = fileOnload;
      reader.readAsDataURL(file);
     }
  
     function fileOnload(e) {
      var result=e.target.result;
      $('.image-select').attr("src",result);
     }
    });

$(".upload").click(function(e){
        var inputFileImage = document.getElementById("arch");
        var file = inputFileImage.files[0];
        var data = new FormData();
        data.append("img",file);

        $.ajax({
            url: "/img/upload",
            type: "post",
            data: data,
            cache: false,
            contentType: false,
            processData: false
        }).done(function(res){
            var title = $("#title").val();
            var link = res;

            $.ajax({
               url: "/img/register",
               type: "post",
               data: {
                "title":title,
                "link":link
               }
            }).done(function(data){
                location.href = data;
            });
        });
   })


