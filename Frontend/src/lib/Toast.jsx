
import Swal from "sweetalert2"

export const Toast = ({ msg = "Bien Hecho", pos = "bottom-right" }) => {
    Swal.fire({
        text: msg,
        position: pos,
        backdrop: false,
        iconHtml:
            "<img src='../../logo_.png' class=' card-img overflow-hidden' ><img/>",
        width: "300px",
        customClass: {
            icon: "no-border",
        },
        showConfirmButton: false,
        timer: 800,
    })
    return new Promise((resolve) => setTimeout(resolve, 800))
}


