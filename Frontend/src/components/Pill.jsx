export const Pill= ({bakgroundClass,children}) => {
    return (
        <div className={`${bakgroundClass} w-auto text-center rounded-pill mt-2 py-2`}>
            <div className="text-white fw-semibold small">{children}</div>
    </div>
    )
}