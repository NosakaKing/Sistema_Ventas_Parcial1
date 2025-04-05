class Product {
    constructor() { }

    listar() {
        let html = "";
        $.get("/Product/Listar", (productos) => {
            productos.forEach((p, index) => {
                html += `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${p.nombreProducto}</td>
                        <td>${p.presentacion}</td>
                        <td>${p.codigoBarras}</td>
                        <td>${p.categoria}</td>
                        <td>
                            <button class="btn btn-sm btn-warning" onclick="showEditProduct(${p.id}, '${p.nombreProducto}', '${p.presentacion}', '${p.codigoBarras}', ${p.categoriaId})">✏️</button>
                            <button class="btn btn-sm btn-danger" onclick="deleteProduct(${p.id})">🗑️</button>
                        </td>
                    </tr>
                `;
            });
            $("#listarProductos").html(html);
        });
    }

    agregar(producto) {
        $.ajax({
            url: "/Product/Add",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(producto),
            success: function (res) {
                alert(res.message);
                $("#modalAgregarProducto").modal("hide");
                $("#formAgregarProducto")[0].reset();
                listProduct();
            },
            error: function () {
                alert("Error al agregar producto.");
            }
        });
    }

    editar(producto) {
        $.ajax({
            url: "/Product/Edit",
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify(producto),
            success: function (res) {
                alert(res.message);
                $("#modalEditarProducto").modal("hide");
                listProduct();
            },
            error: function () {
                alert("Error al editar producto.");
            }
        });
    }

    eliminar(id) {
        $.ajax({
            url: `/Product/Delete?id=${id}`,
            type: "DELETE",
            success: function (res) {
                alert(res.message);
                listProduct();
            },
            error: function () {
                alert("Error al eliminar producto.");
            }
        });
    }

    cargarCategorias(selectId) {
        $.get("/Product/ListarCategorias", (categorias) => {
            let opciones = `<option disabled selected>Seleccione una categoría</option>`;
            categorias.forEach(cat => {
                opciones += `<option value="${cat.id}">${cat.nombre}</option>`;
            });
            $(`#${selectId}`).html(opciones);
        });
    }
}
