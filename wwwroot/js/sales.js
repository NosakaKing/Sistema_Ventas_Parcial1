class Sales {
    constructor() {
        this.detalles = [];
    }

    obtenerStock(productId) {
        if (!productId) return;
        $.get(`/Sales/ObtenerStockPorProducto/${productId}`, (data) => {
            $("#stockDisponible").text(data.stock);
            $("#precioUnitario").text(data.precioVenta);
        });
    }

    agregarDetalle() {
        const productoId = $("#productoId").val();
        const productoText = $("#productoId option:selected").text();
        const cantidad = parseInt($("#cantidad").val());
        const precio = parseFloat($("#precioUnitario").text());
        const stock = parseInt($("#stockDisponible").text());

        if (!productoId || isNaN(cantidad) || cantidad <= 0 || cantidad > stock) {
            alert("Cantidad inválida o producto no seleccionado.");
            return;
        }

        this.detalles.push({ productoId, cantidad, precio });
        this.renderDetalles();
        $("#cantidad").val("");
    }

    renderDetalles() {
        let html = "";
        this.detalles.forEach((d, i) => {
            html += `
            <tr>
                <td>${i + 1}</td>
                <td>${$("#productoId option[value='" + d.productoId + "']").text()}</td>
                <td>${d.cantidad}</td>
                <td>${d.precio.toFixed(2)}</td>
                <td>${(d.cantidad * d.precio).toFixed(2)}</td>
                <td><button class="btn btn-danger btn-sm" onclick="venta.eliminarDetalle(${i})">🗑️</button></td>
            </tr>`;
        });
        $("#tablaDetalles tbody").html(html);
    }

    eliminarDetalle(index) {
        this.detalles.splice(index, 1);
        this.renderDetalles();
    }

    registrarVenta() {
        const clienteId = $("#clienteId").val();
        const metodoPagoId = $("#metodoPagoId").val();

        if (!clienteId || !metodoPagoId || this.detalles.length === 0) {
            alert("Complete todos los campos y agregue al menos un producto.");
            return;
        }

        const data = {
            clienteId,
            metodoPagoId,
            detalles: this.detalles.map(d => ({
                productModelId: d.productoId,
                cantidad: d.cantidad,
                valor: d.precio
            }))
        };

        $.ajax({
            url: "/Sales/RegistrarVenta",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (res) {
                alert(res.message);
                location.reload();
            },
            error: function () {
                alert("Error al registrar la venta.");
            }
        });
    }
}
