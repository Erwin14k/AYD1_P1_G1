
const Historial = ({ historial }) => {
    return (
        <table className="table" style={{ width: "100%", margin: "auto", marginTop: "2%" }}>
            <thead className="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>Estado</th>
                    <th>Fecha</th>
                    <th>Calificación</th>
                </tr>
            </thead>
            <tbody>
                {historial.map((pedido, index) => {
                    return (
                        <tr className='table-light' key={`P${index}`}>
                            <td>{pedido.order_id}</td>
                            <td>{pedido.user_name}</td>
                            <td>{pedido.order_status}</td>
                            <td>{
                                new Date(pedido.order_date).toLocaleString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })
                            }</td>
                            <td>{pedido.rating}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default Historial;