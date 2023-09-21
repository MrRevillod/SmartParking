"use client";

import { useEffect, useState } from "react";

const notificaciones = [
    { from: "carlos", message: "hola mundo", time: "12:00" },
    { from: "otro", message: "chaomundo", time: "13:00" },
];

export default function Notify() {
    const [noty, setNoty] = useState(false);

    useEffect(() => {
        const notyIcon = (e) => {

            if (
                e.target !== document.getElementById("noty-icon") &&
                e.target !== document.getElementById("noty-dot")
            ) {
                console.log("click2");
                setNoty(false);
            }
        };

        window.addEventListener("click", notyIcon,true);

        return window.removeEventListener("click",notyIcon);

    }, []);

    return (
        <>
            <div id="noty">
                <i
                    className=" position-absolute bi bi-envelope-exclamation-fill h2 text-light "
                    id="noty-icon"
                    onClick={(e) => {
                        e.preventDefault;
                        setNoty(!noty);
                    }}
                ></i>
                {notificaciones.length !== 0 && (
                    <i
                        onClick={(e) => {
                            e.preventDefault;
                            console.log("click");
                            setNoty(!noty);
                        }}
                        className="position-absolute  bi bi-circle-fill text-danger  small notify-dot "
                        id="noty-dot"
                    ></i>
                )}

                {noty && (
                    <ul className="list-group position-absolute noty-list ">
                        {notificaciones.map(({ from, message, time }, i) => {
                            return (
                                <li
                                    onClick={(e) => {
                                        e.preventDefault;
                                        alert("redirecting..");
                                    }}
                                    className="link-opacity-25-hover  list-group-item d-flex justify-content-between align-items-start"
                                    key={i}
                                >
                                    <div className="ms-2 me-auto">
                                        {message}
                                        <div className="fw-bold">{from}</div>
                                    </div>
                                    <span className="badge bg-primary rounded-pill">
                                        {time}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </>
    );
}
