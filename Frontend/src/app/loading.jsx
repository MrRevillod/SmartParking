import "@/components/load.css";
export default function Loading({children}) {
    return (
        <div className="end-0 start-0 bottom-0 top-0 position-absolute 
        d-grid justify-content-center align-content-center ">
            {children}
            <div className="loader"></div>
            
        </div>
    );
}
