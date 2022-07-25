const HeaderItem = ({children, to}:{children:any, to:string}) => {
    return(
        <a href={to} className="inline-flex items-center mb-2">{children}</a>
    )
}

export default HeaderItem;