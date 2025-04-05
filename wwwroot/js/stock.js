class Stock {
    constructor() { }

    listar() {
        let html = "";
        $.get("/Stock/Listar", (stocks) => {
            stocks.forEach((s, i) => {
                html += `
                    <tr>
                        <td>${s.product.nombreProducto}</td>
                        <td>${s.cantidad}</td>
                        <td>${s.precioUnitario.toFixed(2)}</td>
                        <td>${s.precioVenta.toFixed(2)}</td>
                        <td>${s.fechaFabricacion}</td>
                        <td>${s.fechaVencimiento}</td>
                        <td>${s.fechaIngreso}</td>
                        <td>
                            <button class="btn btn-sm btn-warning" onclick="showEditStock(${s.id}, ${s.productId}, ${s.cantidad}, ${s.precioUnitario}, ${s.precioVenta}, '${s.fechaFabricacion}', '${s.fechaVencimiento}', '${s.fechaIngreso}')">✏️</button>
                            <button class="btn btn-sm btn-danger" onclick="deleteStock(${s.id})">🗑️</button>
                        </td>
                    </tr>
                `;
            });
            $("#listarStock").html(html);
        });
    }

    agregar(stock) {
        $.ajax({
            url: "/Stock/Add",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(stock),
            success: function (res) {
                alert(res.message);
                $("#modalAgregarStock").modal("hide");
                $("#formAgregarStock")[0].reset();
                listStock();
            },
            error: function () {
                alert("Error al agregar stock.");
            }
        });
    }

    editar(stock) {
        $.ajax({
            url: "/Stock/Edit",
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify(stock),
            success: function (res) {
                alert(res.message);
                $("#modalEditarStock").modal("hide");
                listStock();
            },
            error: function () {
                alert("Error al editar stock.");
            }
        });
    }

    eliminar(id) {
        $.ajax({
            url: `/Stock/Delete?id=${id}`,
            type: "DELETE",
            success: function (res) {
                alert(res.message);
                listStock();
            },
            error: function () {
                alert("Error al eliminar stock.");
            }
        });
    }

    cargarProductos(selectId) {
        $.get("/Stock/ListarProductos", (productos) => {
            let options = productos.map(p => `<option value="${p.id}">${p.nombreProducto}</option>`).join('');
            $(`#${selectId}`).html(options);
        });
    }
}
