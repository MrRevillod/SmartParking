export default function userRow({ e, estacionamiento, patente }) {
    return (
        <tr key={e._id} className="rounded-4 shadow-sm    ">
            <td className="  p-2 ">
                <img
                    src={e.imageUrl}
                    className="rounded-circle profile-img"
                ></img>
            </td>
            <td className="p-2">{e.name}</td>
            <td className="p-2">{patente}</td>
            <td className="p-2">
                {estacionamiento !== "null" ? (
                    <i className="bi bi-circle-fill text-success h3"></i>
                ) : (
                    <i className="bi bi-circle-fill text-danger h3"></i>
                )}
            </td>
            <td className="p-2">{estacionamiento}</td>
            <td className="p-2  ">
                {estacionamiento !== "null" ? (
                    <i className="h3 bi bi-chat-dots-fill icon-blue h-100 "></i>
                ) : (
                    <i className="h3 bi bi-chat-dots-fill opacity-25 h-100 "></i>
                )}
            </td>
        </tr>
    );
}
