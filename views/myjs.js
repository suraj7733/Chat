$(document).ready(function(){
    $(".crop_image").hide();
    
    $image_crop = $("#uploadimage").croppie({
        enableExif : true,
        viewport : {
            width : 200,
            height : 200,
            type : 'circle'
        },
        boundary : {
            width : 300,
            height : 300
        } 
        /*orientationControls : {
            enabled : true,
            leftClass : '',
            rightclass : ''
        }*/
    });

    $("#upload_image").on("change", function(){
        var reader = new FileReader();

        reader.onload = function(event){
            $image_crop.croppie('bind',{
                url : event.target.result
            }).then(function(){
                console.log("Image is binded to croppie library successfully");
            })

        }
        reader.readAsDataURL(this.files[0]);

        $(".crop_image").show();
    });

    $(".crop_image").click(function(event){
        $image_crop.croppie('result',{
            type : 'canvas',
            size : 'viewport'
        }).then(function(response){
            //var blob = response.slice(0, response.size, 'image/png');
            //var newFile = new File([response], 'suraj.png' , {type : response.type});
            $("#showimg").attr({"src" : response});
            

        })
    });




});