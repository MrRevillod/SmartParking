import { useRouter } from "next/navigation";

export default function Tbody({results}){
    const router = useRouter()
    return(
        <tbody>
        {results.map((e, i) => {
            return (
                <tr
                    key={e._id}
                    className="rounded-4 shadow   "
                >
                    <td className="  p-2 ">
                        <img
                            src={"http://localhost:3000/images/default.jpeg "}
                            className="rounded-circle profile-img"
                        ></img>
                    </td>
                    <td className="p-2">{e.username}</td>
                    <td className="p-2">
                        {e.vehicles[0].patente}
                    </td>
                    <td className="p-2">
                        {e.active  ? (
                            <i className="bi bi-circle-fill text-success h3"></i>
                        ) : (
                            <i className="bi bi-circle-fill text-danger h3"></i>
                        )}
                    </td>
                    <td className="p-2">
                        {e.parking }
                    </td>
                    <td className="p-2  ">
                        {e.active ? (
                            <i className="h3 bi bi-chat-dots-fill icon-blue h-100 "></i>
                        ) : (
                            <i className="h3 bi bi-chat-dots-fill opacity-25 h-100 "></i>
                        )}
                    </td>
                    <td className="p-2">
                        <button className="btn bt " onClick={(ev) => {ev.preventDefault();router.push(`../dashboard/usuario/${e._id}`)}}>
                        <i className="bi bi-pencil-square  icon-blue h-75  h3" />
                        </button>
                    </td>
                </tr>
            );
        })}
    </tbody>
    )
}