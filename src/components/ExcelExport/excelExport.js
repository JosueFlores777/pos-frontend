import React, { useEffect, useState } from 'react'
import {
    CButton,
} from '@coreui/react';
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";
import { BsDownload } from "react-icons/bs";
import PropTypes, { element } from 'prop-types';
import rutas from "../../views/rutas";
import service from "../../Http/httpHelper";

const ExportExcel = ({ fileName, fechaInicio, fechaFin, nombreRazon }) => {
    const fileType = "aplication/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx"


    const consultaListaRecibo = async () => {

        var fechaInicioQ = fechaInicio;
        var fechaFinQ = fechaFin;

        var lista = []
        let request = {
            fechaInicio: fechaInicioQ,
            fechaFin: fechaFinQ,
            nombreRazon: nombreRazon,
            reporte: true
        }

        var dataResponse = await service.apiBackend.post(rutas.recibo.listaRecibosPorMes, request);
        dataResponse.recibos.forEach(element => {

            var recibo = {
                "No.": element.no,
                "No. Recibo TGR1": element.recibo,
                "Institucion": element.institucion,
                "Regional": element.regional,
                "Nombre Razon": element.nombreRazon,
                "Rubro": element.descripcion,
                "Codigo": element.codigo,
                "Usuario Proceso": element.usuarioAsignado,
                "Monto Total": element.monto,
                "Banco": element.banco,
                "0.32% comisión del Banco": element.comision,
                "Monto menos comisión": element.total,
                "Creado en": element.fechaCreacion,
                "Pagado en": element.fechaPago,
                "Procesado en": element.fecha,
                
            }
            lista.push(recibo);
        });
        exportToExcel(lista);
    }

    const exportToExcel = async (excelData) => {

        var font = {
            sz: 12,
            bold: true,
            color: { rgb: "181A1B" }
        }
        var fill = {
            fgColor: { rgb: "00AED0" }
        }
        var alignment = {
            wrapText: true,
            vertical: "top",
            horizontal: "center"
        }
        const ws = XLSX.utils.json_to_sheet(excelData);
        ws['!rows'] = [];
        ws['!autofilter'] = { ref: `A1:O1` };

        ws['!cols'] = [
            { 'width': 5 }, //A
            { 'width': 10 }, //B
            { 'width': 15 }, //C
            { 'width': 25 }, //D
            { 'width': 25 }, //e
            { 'width': 12 }, //f
            { 'width': 10 }, //g
            { 'width': 20 }, //h
            { 'width': 10 }, //i
            { 'width': 15 }, //j
            { 'width': 15 }, //k
            { 'width': 15 }, //l
            { 'width': 10 }, //m
            { 'width': 10 }, //n
            { 'width': 10 }, //o

        ]; 

        ws['!rows'] = [
            { 'hpt': 30 }]; //height for row 2
        ws["A1"].s = {
            font: font,
            fill: fill,
            alignment: alignment
        };
        ws["B1"].s = {
            font: font,
            fill: fill,
            alignment: alignment
        };
        ws["C1"].s = {
            font: font,
            fill: fill,
            alignment: alignment
        };
        ws["D1"].s = {
            font: font,
            fill: fill,
            alignment: alignment
        };
        ws["E1"].s = {
            font: font,
            fill: fill,
            alignment: alignment
        };
        ws["F1"].s = {
            font: font,
            fill: fill,
            alignment: alignment
        };
        ws["G1"].s = {
            font: font,
            fill: fill,
            alignment: alignment
        };
        ws["H1"].s = {
            font: font,
            fill: fill,
            alignment: alignment
        };
        ws["I1"].s = {
            font: font,
            fill: fill,
            alignment: alignment
        };
        ws["J1"].s = {
            font: font,
            fill: fill,
            alignment: alignment
        };
        ws["K1"].s = {
            font: font,
            fill: fill,
            alignment: alignment
        };
        ws["L1"].s = {
            font: font,
            fill: fill,
            alignment: alignment
        };
        ws["M1"].s = {
            font: font,
            fill: fill,
            alignment: alignment
        };
        ws["N1"].s = {
            font: font,
            fill: fill,
            alignment: alignment
        };
        ws["O1"].s = {
            font: font,
            fill: fill,
            alignment: alignment
        };
        const wb = { Sheets: { "data": ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    }
    return (
        <>

            <CButton color="dark" variant="outline" onClick={(e) => consultaListaRecibo()} >
                Exportar a Excel <BsDownload className='ms-1 ' />
            </CButton>

        </>
    )

}
ExportExcel.propTypes = {
    excelData: PropTypes.array,
    fileName: PropTypes.string,
    nombreRazon: PropTypes.string,
    fechaInicio: PropTypes.string,
    fechaFin: PropTypes.string,
};

export default ExportExcel;