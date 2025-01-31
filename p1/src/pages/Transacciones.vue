<template>
  <div class="content">
    <div class="row">
      <div class="col-12">
        <card>
          <template slot="header">
            <h4 class="card-title">Transacciones</h4>
          </template>
          <div class="table-responsive text-left">
            <base-table :data="table1.data" :columns="table1.columns" thead-classes="text-primary">
            <template slot="columns">
          <th class="text-center">#</th>
          <th>Fecha</th>
          <th>Categoria</th>
          <th>Valor</th>
          <th>Cuenta</th>
          <th>Detalles</th>
          <th>Actions</th>
        </template>  
              <template slot-scope="{row}">
                <td>{{ row.id}}</td>
                <td>{{ row.fecha}}</td>
                <td>{{ row.categoria}}</td>
                <td>{{ row.valor}}</td>
                <td>{{ row.cuenta}}</td>
                <td>{{ row.detalles}}</td>
                <td class="td-actions">
                  <base-button class="mr-1" type="success" size="sm" icon>
                    <i class="tim-icons icon-pencil"></i>
                  </base-button>
                  <base-button class="mr-1" type="danger" size="sm" icon>
                    <i class="tim-icons icon-simple-delete"></i>
                  </base-button>
                </td>
              </template>
            </base-table>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>

<script>

import { Card } from "@/components/index";

import BaseTable from "@/components/BaseTable";

const tableColumns = ["Fecha", "Categoria", "Valor", "Cuenta", "Detalles", ""];
const tableData = [
  {
    id: 1,
    fecha: "01/01/2025",
    categoria: "Ventas",
    valor: "$10000",
    cuenta: "Efectivo",
    detalles: "Ganancias",
  },
];

export default {
  components: {
    Card,
    BaseTable,
  },
  data() {
    return {
      table1: {
        title: "Simple Table",
        columns: [...tableColumns],
        data: [...tableData],
      }
    };
  },
};

</script>

<style></style>