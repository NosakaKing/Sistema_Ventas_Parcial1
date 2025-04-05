// ===========================
// CLIENTES
// ===========================

var listClient = () => {
    const cliente = new Client();
    cliente.listar();
};

var deleteClient = (id) => {
    if (confirm("¿Estás seguro de eliminar este cliente?")) {
        const cliente = new Client();
        cliente.eliminar(id);
    }
};

var showEdit = (id, nombres, apellidos, direccion, telefono, correo) => {
    $("#editId").val(id);
    $("#editNombre").val(nombres);
    $("#editApellido").val(apellidos);
    $("#editDireccion").val(direccion);
    $("#editTelefono").val(telefono);
    $("#editEmail").val(correo);
    $("#modalEditarCliente").modal("show");
};

// ===========================
// CATEGORÍAS
// ===========================

var listCategory = () => {
    const categoria = new Category();
    categoria.listar();
};

var deleteCategory = (id) => {
    if (confirm("¿Estás seguro de eliminar esta categoría?")) {
        const categoria = new Category();
        categoria.eliminar(id);
    }
};

var showEditCategory = (id, nombre, descripcion) => {
    $("#editIdCategoria").val(id);
    $("#editNombreCategoria").val(nombre);
    $("#editDescripcionCategoria").val(descripcion);
    $("#modalEditarCategoria").modal("show");
};

// ===========================
// PRODUCTOS
// ===========================

var listProduct = () => {
    const producto = new Product();
    producto.listar();
};

var deleteProduct = (id) => {
    if (confirm("¿Estás seguro de eliminar este producto?")) {
        const producto = new Product();
        producto.eliminar(id);
    }
};

var showEditProduct = (id, nombre, presentacion, codigo, categoriaId) => {
    $("#editIdProducto").val(id);
    $("#editNombreProducto").val(nombre);
    $("#editPresentacion").val(presentacion);
    $("#editCodigoBarras").val(codigo);
    $("#editCategoriaId").val(categoriaId);
    $("#modalEditarProducto").modal("show");
};

// ===========================
// STOCK
// ===========================

var listStock = () => {
    const stock = new Stock();
    stock.listar();
};

var deleteStock = (id) => {
    if (confirm("¿Estás seguro de eliminar este stock?")) {
        const stock = new Stock();
        stock.eliminar(id);
    }
};

var showEditStock = (id, productId, cantidad, precioUnitario, precioVenta, fabricacion, vencimiento, ingreso) => {
    $("#editIdStock").val(id);
    $("#editProductoId").val(productId);
    $("#editCantidad").val(cantidad);
    $("#editPrecioUnitario").val(precioUnitario);
    $("#editPrecioVenta").val(precioVenta);
    $("#editFechaFabricacion").val(fabricacion);
    $("#editFechaVencimiento").val(vencimiento);
    $("#editFechaIngreso").val(ingreso);
    $("#modalEditarStock").modal("show");
};

$().ready(() => {

    // CLIENTES
    if ($("#listarClientes").length) {
        listClient();
        $("#formAgregarCliente").submit(function (e) {
            e.preventDefault();
            const clienteNuevo = {
                nombres: $("#nombre").val(),
                apellidos: $("#apellido").val(),
                direccion: $("#direccion").val(),
                telefono: $("#telefono").val(),
                correoElectronico: $("#email").val()
            };
            const cliente = new Client();
            cliente.agregar(clienteNuevo);
        });

        $("#formEditarCliente").submit(function (e) {
            e.preventDefault();
            const clienteActualizado = {
                id: $("#editId").val(),
                nombres: $("#editNombre").val(),
                apellidos: $("#editApellido").val(),
                direccion: $("#editDireccion").val(),
                telefono: $("#editTelefono").val(),
                correoElectronico: $("#editEmail").val()
            };
            const cliente = new Client();
            cliente.editar(clienteActualizado);
        });
    }

    // CATEGORÍAS
    if ($("#listarCategorias").length) {
        listCategory();
        $("#formAgregarCategoria").submit(function (e) {
            e.preventDefault();
            const nuevaCategoria = {
                nombre: $("#nombreCategoria").val(),
                descripcion: $("#descripcionCategoria").val()
            };
            const categoria = new Category();
            categoria.agregar(nuevaCategoria);
        });

        $("#formEditarCategoria").submit(function (e) {
            e.preventDefault();
            const categoriaEditada = {
                id: $("#editIdCategoria").val(),
                nombre: $("#editNombreCategoria").val(),
                descripcion: $("#editDescripcionCategoria").val()
            };
            const categoria = new Category();
            categoria.editar(categoriaEditada);
        });
    }

    // PRODUCTOS
    if ($("#listarProductos").length) {
        const producto = new Product();
        producto.cargarCategorias("categoriaId");
        producto.cargarCategorias("editCategoriaId");
        listProduct();

        $("#formAgregarProducto").submit(function (e) {
            e.preventDefault();
            const nuevo = {
                nombreProducto: $("#nombreProducto").val(),
                presentacion: $("#presentacion").val(),
                codigoBarras: $("#codigoBarras").val(),
                categoriaId: $("#categoriaId").val()
            };
            producto.agregar(nuevo);
        });

        $("#formEditarProducto").submit(function (e) {
            e.preventDefault();
            const actualizado = {
                id: $("#editIdProducto").val(),
                nombreProducto: $("#editNombreProducto").val(),
                presentacion: $("#editPresentacion").val(),
                codigoBarras: $("#editCodigoBarras").val(),
                categoriaId: $("#editCategoriaId").val()
            };
            producto.editar(actualizado);
        });
    }

    // STOCK
    if ($("#listarStock").length) {
        const stock = new Stock();
        stock.cargarProductos("productoId");
        stock.cargarProductos("editProductoId");
        listStock();

        $("#formAgregarStock").submit(function (e) {
            e.preventDefault();
            const nuevo = {
                productId: $("#productoId").val(),
                cantidad: $("#cantidad").val(),
                precioUnitario: $("#precioUnitario").val(),
                precioVenta: $("#precioVenta").val(),
                fechaFabricacion: $("#fechaFabricacion").val(),
                fechaVencimiento: $("#fechaVencimiento").val(),
                fechaIngreso: $("#fechaIngreso").val()
            };
            stock.agregar(nuevo);
        });

        $("#formEditarStock").submit(function (e) {
            e.preventDefault();
            const actualizado = {
                id: $("#editIdStock").val(),
                productId: $("#editProductoId").val(),
                cantidad: $("#editCantidad").val(),
                precioUnitario: $("#editPrecioUnitario").val(),
                precioVenta: $("#editPrecioVenta").val(),
                fechaFabricacion: $("#editFechaFabricacion").val(),
                fechaVencimiento: $("#editFechaVencimiento").val(),
                fechaIngreso: $("#editFechaIngreso").val()
            };
            stock.editar(actualizado);
        });
    }

});

// ===========================
// CLIENTES
// ===========================

var listClient = () => {
    const cliente = new Client();
    cliente.listar();
};

var deleteClient = (id) => {
    if (confirm("¿Estás seguro de eliminar este cliente?")) {
        const cliente = new Client();
        cliente.eliminar(id);
    }
};

var showEdit = (id, nombres, apellidos, direccion, telefono, correo) => {
    $("#editId").val(id);
    $("#editNombre").val(nombres);
    $("#editApellido").val(apellidos);
    $("#editDireccion").val(direccion);
    $("#editTelefono").val(telefono);
    $("#editEmail").val(correo);
    $("#modalEditarCliente").modal("show");
};

// ===========================
// VENTAS - NUEVO FLUJO
// ===========================

var cargarSelectClientes = () => {
    $.get("/Sales/ListarClientes", function (data) {
        data.forEach(c => {
            $('#clienteId').append(`<option value="${c.id}">${c.nombre}</option>`);
        });
    });
};

var cargarSelectMetodosPago = () => {
    $.get("/Sales/ListarMetodosPago", function (data) {
        data.forEach(mp => {
            $('#metodoPagoId').append(`<option value="${mp.id}">${mp.nombre}</option>`);
        });
    });
};

var cargarSelectClientes = () => {
    $.get("/Sales/ListarClientes", function (data) {
        data.forEach(c => {
            $('#clienteId').append(`<option value="${c.id}">${c.nombre}</option>`);
        });
    });
};

var cargarSelectMetodosPago = () => {
    $.get("/Sales/ListarMetodosPago", function (data) {
        data.forEach(mp => {
            $('#metodoPagoId').append(`<option value="${mp.id}">${mp.nombre}</option>`);
        });
    });
};

var cargarSelectStock = () => {
    $.get("/Stock/Listar", function (data) {
        const agrupado = {};
        data.forEach(s => {
            if (!agrupado[s.productId]) agrupado[s.productId] = [];
            agrupado[s.productId].push(s);
        });

        const productosUnicos = Object.keys(agrupado);
        productosUnicos.forEach(id => {
            const primerStock = agrupado[id][0];
            $('#productoSelectId').append(`<option value="${id}">${primerStock.product.nombreProducto}</option>`);
        });

        $('#productoSelectId').on('change', function () {
            const productoId = $(this).val();
            $('#stockId').html('<option value="">Seleccione</option>');
            agrupado[productoId]?.forEach(s => {
                $('#stockId').append(`
                    <option 
                        value="${s.id}"
                        data-precio="${s.precioVenta}"
                        data-nombre="${s.product.nombreProducto}"
                        data-stock="${s.cantidad}"
                        data-producto-id="${s.productId}"
                    >
                        Lote #${s.id} - ${s.product.nombreProducto} ($${s.precioVenta.toFixed(2)}) - Stock: ${s.cantidad}
                    </option>`);
            });
        });
    });
};

var agregarFilaDetalle = () => {
    const stockId = $('#stockId').val();
    const cantidad = parseInt($('#cantidadDetalle').val());
    const option = $('#stockId option:selected');
    const precio = parseFloat(option.data('precio'));
    const nombre = option.data('nombre');
    const stockDisponible = parseInt(option.data('stock'));
    const productoId = parseInt(option.data('producto-id'));

    if (!stockId || isNaN(cantidad) || cantidad <= 0 || cantidad > stockDisponible) {
        alert('Seleccione un stock válido y una cantidad válida dentro del stock disponible.');
        return;
    }

    const subtotal = (precio * cantidad).toFixed(2);

    const fila = `
        <tr>
            <td>${nombre}</td>
            <td>${precio.toFixed(2)}</td>
            <td>${cantidad}</td>
            <td>${subtotal}</td>
            <td><button type="button" class="btn btn-danger btn-sm" onclick="$(this).closest('tr').remove(); recalcularTotal();">🗑️</button></td>
            <td class="d-none stock-id" data-producto-id="${productoId}">${stockId}</td>
        </tr>
    `;

    $('#tablaDetallesVenta').append(fila);
    recalcularTotal();
    $('#cantidadDetalle').val('');
    $('#stockId').val('');
};

var recalcularTotal = () => {
    let total = 0;
    $('#tablaDetallesVenta tr').each(function () {
        total += parseFloat($(this).find('td:eq(3)').text());
    });
    $('#totalVenta').text(`$${total.toFixed(2)}`);
};

var enviarVenta = () => {
    const clienteId = $('#clienteId').val();
    const metodoPagoId = $('#metodoPagoId').val();
    const fecha = $('#fechaIngreso').val();
    const detalles = [];

    if (!clienteId || !metodoPagoId || !fecha) {
        alert('Complete todos los campos.');
        return;
    }

    $('#tablaDetallesVenta tr').each(function () {
        detalles.push({
            productoId: parseInt($(this).find('.stock-id').data('producto-id')),
            stockId: parseInt($(this).find('.stock-id').text()),
            cantidad: parseInt($(this).find('td:eq(2)').text()),
            valor: parseFloat($(this).find('td:eq(1)').text())
        });
    });

    if (detalles.length === 0) {
        alert('Debe agregar al menos un producto.');
        return;
    }

    const venta = {
        clienteId: parseInt(clienteId),
        metodoPagoId: parseInt(metodoPagoId),
        fechaIngreso: fecha,
        detalles: detalles
    };

    $.ajax({
        url: '/Sales/RegistrarVenta',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(venta),
        success: function (res) {
            alert(res.message);
            location.reload();
        },
        error: function (xhr) {
            alert('Error al registrar la venta: ' + xhr.responseText);
            console.log(xhr);
        }
    });
};

$(() => {
    if ($('#formRegistrarVenta').length) {
        cargarSelectClientes();
        cargarSelectMetodosPago();
        cargarSelectStock();

        $('#btnAgregarDetalle').click(() => agregarFilaDetalle());
        $('#formRegistrarVenta').submit(function (e) {
            e.preventDefault();
            enviarVenta();
        });
    }
});

