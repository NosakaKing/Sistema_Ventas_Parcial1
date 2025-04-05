class Client {
    constructor() { }

    listar() {
        let html = "";
        $.get("Client/Listar", (listaClientes) => {
            listaClientes.forEach(cliente => {
                html += `
                <div class="col-md-4 mb-4">
                    <div class="card shadow-sm h-100 border-0">
                        <div class="card-body">
                            <h5 class="card-title fw-bold">${cliente.nombres}</h5>

                        <h6 class="card-subtitle mb-2 text-muted">${cliente.apellidos}</h6>
                            <p class="card-text">
                                <strong>Email:</strong> ${cliente.correoElectronico}<br>
                                <strong>Teléfono:</strong> ${cliente.telefono}<br>
                                <strong>Dirección:</strong> ${cliente.direccion}
                            </p>
                        </div>
                        <div class="card-footer bg-white border-0 d-flex justify-content-end gap-2">
                            <button class="btn btn-sm btn-warning" onclick="showEdit(${cliente.id}, '${cliente.nombres}','${cliente.apellidos}' , '${cliente.direccion}', '${cliente.telefono}', '${cliente.correoElectronico}')">✏️</button>
                            <button class="btn btn-sm btn-danger" onclick="deleteClient(${cliente.id})">🗑️</button>
                        </div>
                    </div>
                </div>
            `;
            });
            $("#listarClientes").html(html);
        });
    }


    agregar(cliente) {
        $.ajax({
            url: "/Client/Add",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(cliente),
            success: function (res) {
                alert(res.message);
                $("#modalAgregarCliente").modal("hide");
                $("#formAgregarCliente")[0].reset();
                listClient();
            },
            error: function (err) {
                alert("Error al agregar cliente.");
            }
        });
    }

    editar(cliente) {
        $.ajax({
            url: "/Client/Edit",
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify(cliente),
            success: function (res) {
                alert(res.message);
                $("#modalEditarCliente").modal("hide");
                listClient();
            },
            error: function () {
                alert("Error al editar cliente.");
            }
        });
    }

    eliminar(id) {
        $.ajax({
            url: `/Client/Delete?id=${id}`,
            type: "DELETE",
            success: function (res) {
                alert(res.message);
                listClient();
            },
            error: function () {
                alert("Error al eliminar cliente.");
            }
        });
    }
}
