import PDFDocument from 'pdfkit';
import { getTopCustomer, getTopProduct } from './OrderService.js';

export const generateSalesReport = async (req, res) => {
  try {
    const topCustomer = await getTopCustomer();
    const topProduct = await getTopProduct();

    const doc = new PDFDocument();

    // Configura cabeceras para forzar descarga
    res.setHeader('Content-Disposition', 'attachment; filename="reporte-ventas.pdf"');
    res.setHeader('Content-Type', 'application/pdf');

    doc.pipe(res); // 👈 No escribimos en disco, sino directo a la respuesta

    doc.fontSize(20).text('📊 Reporte de Ventas', { align: 'center' });
    doc.moveDown();
    doc.fontSize(16).text(`Cliente que más ha comprado:`);
    doc.fontSize(12).text(`Nombre: ${topCustomer?.customer?.name || 'N/A'}`);
    doc.text(`Total Comprado: $${topCustomer?.totalComprado || 0}`);
    doc.moveDown();

    doc.fontSize(16).text(`Producto más vendido:`);
    doc.fontSize(12).text(`Producto: ${topProduct?.product?.name || 'N/A'}`);
    doc.text(`Unidades Vendidas: ${topProduct?.cantidadVendida || 0}`);

    doc.end(); // 👈 Cierra y envía la respuesta
  } catch (error) {
    console.error('Error generando PDF:', error);
    res.status(500).json({ error: 'Error generando PDF' });
  }
};
