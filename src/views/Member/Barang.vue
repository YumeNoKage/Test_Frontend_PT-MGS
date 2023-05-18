<template>
  <div class="card border-0 shadow">
    <div class="card-header bg-info">
      <h5 class="mb-0 p-2">Dashboard</h5> 
    </div>

    <div class="card-body">
      <div class="d-flex justify-content-between mb-3">
        <h5 class="mb-0">Barang</h5>
        <div class="d-flex">
          <button type="button" class="btn btn-primary me-3" data-bs-toggle="modal" data-bs-target="#updateBarang" @click="addBarang = true, resetFormEdit()">Tambah Barang</button>
          <button v-if="!isLoading && data.length > 0" type="button" class="btn btn-secondary" @click="callGeneratePdf()">Unduh PDF</button>
        </div>
      </div>
    </div>

    <div class="card-body overflow-auto">
      <div
        v-if="!isLoading && data.length > 0" 
      >
        <table class="table border-1 border rounded">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Nama Barang</th>
              <th scope="col">Stock</th>
              <th scope="col">Harga</th>
              <th scope="col">Nama Supplier</th>
              <th scope="col">Alamat Supplier</th>
              <th scope="col">No Telp Supplier</th>
              <th scope="col" class="text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in data" :key="item.id">
              <th scope="row">{{ (pagination.currentPage - 1) * pagination.limit + index + 1 }}</th>
              <td>{{ item.namaBarang }}</td>
              <td>{{ item.stok }}</td>
              <td>{{ item.harga }}</td>
              <td>{{ item.supplier.namaSupplier }}</td>
              <td>{{ item.supplier.alamat }}</td>
              <td>{{ item.supplier.noTelp }}</td>
              <td>
                <div class="d-flex justify-content-center">
                  <button type="button" class="btn btn-danger" @click="deleteSomeBarang(item.id)">Hapus</button>
                  <button type="button" class="btn btn-warning ms-2" data-bs-toggle="modal" data-bs-target="#updateBarang" @click="onEdit = {...item}, addBarang = false">Update</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else-if="isLoading && data.length == 0" class="d-flex justify-content-center">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <div v-else-if="!isLoading && data.length == 0" class="text-center">
        Data Tidak Ada
      </div>
    </div>

    <Pagination :currentPage="pagination.currentPage" :totalPages="pagination.totalPages" :limit="pagination.limit"/>

    <div class="modal fade" id="updateBarang" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content border-0">
          <div class="modal-header bg-info">
            <h1 class="modal-title fs-5" id="exampleModalLabel">{{ addBarang ? "Tambah" : "Update"}} Barang</h1>
            <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
          </div>
          <div class="modal-body">
            <form @submit.prevent="addBarang ? tambahBarang() : updateBarang()">
              <div class="row mb-2">
                <div class="col-4 d-flex align-items-center">
                  <label for="namaBarang" class="form-label mb-0">Nama Barang</label>
                </div>
                <div class="col-8">
                  <input v-model="onEdit.namaBarang" type="text" class="form-control" id="namaBarang" placeholder="Masukkan Nama Barang">
                </div>
              </div>
              <div class="row mb-2">
                <div class="col-4 d-flex align-items-center">
                  <label for="harga" class="form-label mb-0">Harga Barang</label>
                </div>
                <div class="col-8">
                  <input v-model="onEdit.harga" type="text" class="form-control" id="harga" placeholder="Masukkan Harga Barang">
                </div>
              </div>
              <div class="row mb-2">
                <div class="col-4 d-flex align-items-center">
                  <label for="stok" class="form-label mb-0">Stok Barang</label>
                </div>
                <div class="col-8">
                  <input v-model="onEdit.stok" type="text" class="form-control" id="stok" placeholder="Masukkan Stok Barang">
                </div>
              </div>
              <div class="row mb-2">
                <div class="col-4 d-flex align-items-center">
                  <label for="supplier" class="form-label mb-0">Supplier Barang</label>
                </div>
                <div class="col-8">
                  <input v-model="onEdit.supplier.namaSupplier" type="text" class="form-control" id="supplier" placeholder="Masukkan Supplier Barang">
                </div>
              </div>

              <div class="modal-footer pb-0 px-0 mx-0 d-flex justify-content-between">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Kembali</button>
                <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">{{ addBarang ? "Submit" : "Update"}}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';

export default {
  name: 'Barang',

  data(){
    return{
      data: [],
      isLoading: false,

      pagination: {
        currentPage: parseInt(this.$route.query.offset) || 1,
        totalPages: null,
        limit: parseInt(this.$route.query.limit) || 20,
      },

      addBarang: false,

      onEdit: {
        harga: null,
        id: 0,
        namaBarang: "",
        stok: null,
        supplier: {
          alamat: "",
          id: 0,
          namaSupplier: "",
          noTelp: ""
        }
      }
    }
  },

  methods:{
    ...mapActions({
      getData: 'getData',
      postData: 'postData',
      putData: 'putData',
      deleteData: 'deleteData'
    }),

    ...mapMutations({
      setNotification: 'setNotification',
    }),

    callGeneratePdf(){
      const header = [
        {title: "No", dataKey: "index"},
        {title: "Nama Barang", dataKey: "namaBarang"}, 
        {title: "Stock", dataKey: "stok"},
        {title: "Harga", dataKey: "harga"},
        {title: "Nama Supplier", dataKey: "namaSupplier"},
        {title: "Alamat Supplier", dataKey: "alamat"},
        {title: "No Telp Supplier", dataKey: "noTelp"},
      ]

      const data = this.data.map((item, i) => {
        return {
          index: (this.pagination.currentPage - 1) * this.pagination.limit + i + 1,
          namaBarang: item.namaBarang,
          stok: item.stok,
          harga: item.harga,
          namaSupplier: item.supplier.namaSupplier,
          alamat: item.supplier.alamat,
          noTelp: item.supplier.noTelp,
        }
      })

      this.generatePdf(header, data, 'Barang')
    },

    resetFormEdit(){
      this.onEdit = {
        harga: null,
        id: 0,
        namaBarang: "",
        stok: null,
        supplier: {
          alamat: "",
          id: 0,
          namaSupplier: "",
          noTelp: ""
        }
      }
    },

    async getListBarang(){
      this.isLoading = true
      const params = {
        url: `barang/find-all?limit=${this.pagination.limit}&offset=${this.pagination.currentPage}`
      }
      try {
        const response = await this.getData(params)

        if (response.status == 200) {
          this.data = response.data.data
          this.pagination.totalPages = response.data.total_page
        }
      } catch (error) {
        this.setNotification({
          title: 'List Barang',
          message: error
        })
      } finally {
        this.isLoading = false
      }
    },

    async tambahBarang(){
      const params = {
        url: `barang/create`,
        params: this.onEdit
      }
      try {
        const response = await this.postData(params)
        if (response.status == 200){
          this.setNotification({
            title: 'Tambah Barang',
            message: response.data.message
          })

          this.getListBarang()
        }
      } catch (error) {
        this.setNotification({
          title: 'Tambah Barang',
          message: error
        })
      }
    },

    async updateBarang(){
      const params = {
        url: `barang/update/${this.onEdit.id}`,
        params: this.onEdit
      }
      try {
        const response = await this.putData(params)
        if (response.status == 200){
          this.setNotification({
            title: 'Update Barang',
            message: response.data.message
          })

          this.getListBarang()
        }
      } catch (error) {
        this.setNotification({
          title: 'Update Barang',
          message: error
        })
      }
    },

    async deleteSomeBarang(id){
      const params = {
        url: `barang/delete/${id}`
      }
      try {
        const response = await this.deleteData(params)

        if (response.status == 200) {
          this.setNotification({
            title: 'Delete Barang',
            message: response.data.message
          })

          this.getListBarang()
        }
      } catch (error) {
        this.setNotification({
          title: 'Delete Barang',
          message: error
        })
      }
    }
  },

  mounted(){
    this.getListBarang()
  }

}
</script>
