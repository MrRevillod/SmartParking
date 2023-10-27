export const SearchBar = ({ search, setSearch }) => {

    const onChangeHandler = (e) => {
        setSearch(e.target.value)
    }

    return (
        <div className="col-8 search-container row  border rounded-2   fs-5" style={{ height: "6vh" }}>
            <input
                type="text"
                value={search}
                placeholder="Ingrese nombre de usuario"
                onChange={onChangeHandler}
                className="searchbar bg-transparent col-11 pe-0 border-0 px-3 py-1"
            />

            <div className="searchIcon col-1 border border-0 p-2 justify-content-center align-content-center d-grid">
                <i className="bi bi-search icon-blue"></i>
            </div>
        </div>
    )
}