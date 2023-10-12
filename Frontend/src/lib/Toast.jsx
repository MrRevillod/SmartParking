import Swal from "sweetalert2";

export default function Toast(msg="Bien Hecho"){
    Swal.fire({
        text:msg,
        position:'bottom-right',
        iconHtml:"<img src='../../public/logo_.png' class=' card-img overflow-hidden' ><img/>",
        width:"300px",
        height:"70px",
        customClass:{
            icon:'no-border',
      
        },
        showConfirmButton:false,
        timer:800,
    })
}

