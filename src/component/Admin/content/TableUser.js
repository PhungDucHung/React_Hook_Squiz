

const TableUser = (props) => {

    const { listUsers } = props;
    // const listUsers = props.listUsers

    return (
        <>
            <table className="table table-hover table-bordered mt-3" >
            <thead>
                <tr>
                <th scope="col">ID</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                </tr>
            </thead>
            <tbody>
                {listUsers && listUsers.length > 0 && 
                    listUsers.map((item, index) => {
                        return(
                            <tr key={`table-users-${index}`}>
                                <td>{item.id}</td>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.role}</td>
                            </tr>
                        )
                    })
                }
                {listUsers && listUsers.length === 0 && 
                <tr>
                    <td colSpan={'4'}>
                        Not found data
                    </td>
                </tr>}
            </tbody>
            </table>
        </>
    )
}
export default TableUser