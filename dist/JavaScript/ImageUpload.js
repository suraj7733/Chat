// ImageUpload.js
$(document).ready(function () {
    $("#crop_image").hide();
    $("#imagesShow").hide();
});
function imageUploadFunc() {
    //$("#crop_image").show();

    $image_crop = $("#uploadimage").croppie({
        enableExif: true,
        viewport: {
            width: 200,
            height: 200,
            type: 'circle'
        },
        boundary: {
            width: 250,
            height: 250
        }
        /*orientationControls : {
            enabled : true,
            leftClass : '',
            rightclass : ''
        }*/
    });

    $("#upload_image").on("change", function () {
        var reader = new FileReader();

        reader.onload = function (event) {
            $image_crop.croppie('bind', {
                url: event.target.result
            }).then(function () {
                console.log("Image is binded to croppie library successfully");
            })

        }
        reader.readAsDataURL(this.files[0]);

        $("#crop_image").show();
    });

    $("#crop_image").click(function (event) {
        $image_crop.croppie('result', {
            type: 'canvas',
            size: 'viewport'
        }).then(function (response) {
            $.ajax({
                url: "/uploadImage",
                type: "POST",
                data: {
                    image: response
                },
                success: function (data) {
                    if (data.rdata == "image upload") {
                        //$("#ChangeProfilePicture").hide();
                        document.getElementById("closeModel").click();
                    }
                },
                error: function (x, y, z) {
                    console.log("there is a error");
                }
            });
        })
    });




};

// send Images
function chooseImage() {
    alert("yes images");
    //$("#chatsShow").hide();
    //$("#imagesShow").show();
    document.getElementById("chooseImage").removeAttribute("oninput", "chooseImage();");
    document.getElementById("chooseImage").setAttribute("data-toggle","modal");
    document.getElementById("chooseImage").setAttribute("data-target","#imagesShow");
    document.getElementById("chooseImage").click();
    document.getElementById("chooseImage").removeAttribute("data-toggle","modal");
    document.getElementById("chooseImage").removeAttribute("data-target","#imagesShow");
    document.getElementById("chooseImage").setAttribute("oninput", "chooseImage();");
    //data-toggle="modal" data-target="#ChangeProfilePicture"
}