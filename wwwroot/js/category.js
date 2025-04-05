class Category {
    constructor() { }

    listar() {
        let html = "";
        $.get("Category/Listar", (categorias) => {
            categorias.forEach(categoria => {
                html += `
                <div class="col-md-4 mb-4">
                    <div class="card shadow-sm h-100 border-0">
                        <div class="card-body">
                            <h5 class="card-title fw-bold">${categoria.nombre}</h5>
                            <p class="card-text">${categoria.descripcion || "Sin descripción"}</p>
                        </div>
                        <div class="card-footer bg-white border-0 d-flex justify-content-end gap-2">
                            <button class="btn btn-sm btn-warning" onclick="showEditCategory(${categoria.id}, '${categoria.nombre}', '${categoria.descripcion || ""}')">✏️</button>
                            <button class="btn btn-sm btn-danger" onclick="deleteCategory(${categoria.id})">🗑️</button>
                        </div>
                    </div>
                </div>
            `;
            });
            $("#listarCategorias").html(html);
        });
    }

    agregar(categoria) {
        $.ajax({
            url: "/Category/Add",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(categoria),
            success: function (res) {
                alert(res.message);
                $("#modalAgregarCategoria").modal("hide");
                $("#formAgregarCategoria")[0].reset();
                listCategory();
            },
            error: function () {
                alert("Error al agregar categoría.");
            }
        });
    }

    editar(categoria) {
        $.ajax({
            url: "/Category/Edit",
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify(categoria),
            success: function (res) {
                alert(res.message);
                $("#modalEditarCategoria").modal("hide");
                listCategory();
            },
            error: function () {
                alert("Error al editar categoría.");
            }
        });
    }

    eliminar(id) {
        $.ajax({
            url: `/Category/Delete?id=${id}`,
            type: "DELETE",
            success: function (res) {
                alert(res.message);
                listCategory();
            },
            error: function () {
                alert("Error al eliminar categoría.");
            }
        });
    }
}
