<template>
  <div class="card border-0 shadow">
    <div class="card-header bg-info">
      <h5 class="mb-0 p-2">Dashboard</h5> 
    </div>
    <div class="card-body">
      <div class="d-flex justify-content-between">
        <h5 class="mb-0">Supplier</h5>
        <div class="d-flex">
          <button type="button" class="btn btn-primary me-3" data-bs-toggle="modal" data-bs-target="#updateSupplier" @click="addSupplier = true, resetFormEdit()">Tambah Supplier</button>
          <button v-if="!isLoading && data.length > 0" type="button" class="btn btn-secondary" @click="callGeneratePdf()">Unduh PDF</button>
        </div>
      </div>
    </div>
    <div class="card-body overflow-auto">
      <table v-if="!isLoading && data.length > 0" class="table border-1 border rounded">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Nama Supplier</th>
            <th scope="col">Alamat</th>
            <th scope="col">No Telp</th>
            <th scope="col" class="text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data" :key="item.id">
            <th scope="row">{{ (pagination.currentPage - 1) * pagination.limit + index + 1 }}</th>
            <td>{{ item.namaSupplier }}</td>
            <td>{{ item.alamat }}</td>
            <td>{{ item.noTelp }}</td>
            <td>
              <div class="d-flex justify-content-center">
                <button type="button" class="btn btn-danger" @click="deleteSomeSupplier(item.id)">Hapus</button>
                <button type="button" class="btn btn-warning ms-2" data-bs-toggle="modal" data-bs-target="#updateSupplier" @click="onEdit = {...item}, addSupplier = false">Update</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

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

    <div class="modal fade" id="updateSupplier" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content border-0">
          <div class="modal-header bg-info">
            <h1 class="modal-title fs-5" id="exampleModalLabel">{{ addSupplier ? "Tambah" : "Update"}} Supplier</h1>
            <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
          </div>
          <div class="modal-body">
            <form @submit.prevent="addSupplier ? tambahSupplier() : updateSupplier()">
              <div class="row mb-2">
                <div class="col-4 d-flex align-items-center">
                  <label for="namaSupplier" class="form-label mb-0">Nama Supplier</label>
                </div>
                <div class="col-8">
                  <input v-model="onEdit.namaSupplier" type="text" class="form-control" id="namaSupplier" placeholder="Masukkan Nama Supplier">
                </div>
              </div>
              <div class="row mb-2">
                <div class="col-4 d-flex align-items-center">
                  <label for="alamat" class="form-label mb-0">Alamat Supplier</label>
                </div>
                <div class="col-8">
                  <input v-model="onEdit.alamat" type="text" class="form-control" id="alamat" placeholder="Masukkan Alamat Supplier">
                </div>
              </div>
              <div class="row mb-2">
                <div class="col-4 d-flex align-items-center">
                  <label for="noTelpSupplier" class="form-label mb-0">No Telp Supplier</label>
                </div>
                <div class="col-8">
                  <input v-model="onEdit.noTelp" type="text" class="form-control" id="noTelpSupplier" placeholder="Masukkan No Telp Supplier">
                </div>
              </div>

              <div class="modal-footer pb-0 px-0 mx-0 d-flex justify-content-between">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Kembali</button>
                <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">{{ addSupplier ? "Tambah" : "Update"}}</button>
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

      addSupplier: false,

      onEdit: {
        alamat: "",
        id: 0,
        namaSupplier: "",
        noTelp: ""
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
        {title: "Nama Supplier", dataKey: "namaSupplier"},
        {title: "Alamat", dataKey: "alamat"},
        {title: "No Telp", dataKey: "noTelp"},
      ]

      const data = this.data.map((item, i) => {
        return {
          index: (this.pagination.currentPage - 1) * this.pagination.limit + i + 1,
          namaSupplier: item.namaSupplier,
          alamat: item.alamat,
          noTelp: item.noTelp,
        }
      })

      this.generatePdf(header, data, 'Supplier')
    },

    resetFormEdit(){
      this.onEdit = {
        alamat: "",
        id: 0,
        namaSupplier: "",
        noTelp: ""
      }
    },

    async getListSupplier(){
      this.isLoading = true
      const params = {
        url: `supplier/find-all?limit=${this.pagination.limit}&offset=${this.pagination.currentPage}`
      }
      try {
        const response = await this.getData(params)

        if (response.status == 200) {
          this.data = response.data.data
          this.pagination.totalPages = response.data.total_page
        }
      } catch (error) {
        this.setNotification({
          title: 'List Supplier',
          message: error
        })
      } finally {
        this.isLoading = false
      }
    },

    async tambahSupplier(){
      const params = {
        url: `supplier/create`,
        params: this.onEdit
      }
      try {
        const response = await this.postData(params)
        if (response.status == 200){
          this.setNotification({
            title: 'Tambah Supplier',
            message: response.data.message
          })

          this.getListSupplier()
        }
      } catch (error) {
        this.setNotification({
          title: 'Tambah Supplier',
          message: error
        })
      }
    },

    async updateSupplier(){
      const params = {
        url: `supplier/update/${this.onEdit.id}`,
        params: this.onEdit
      }
      try {
        const response = await this.putData(params)
        if (response.status == 200){
          this.setNotification({
            title: 'Update Supplier',
            message: response.data.message
          })

          this.getListSupplier()
        }
      } catch (error) {
        this.setNotification({
          title: 'Update Supplier',
          message: error
        })
      }
    },

    async deleteSomeSupplier(id){
      const params = {
        url: `supplier/delete/${id}`
      }
      try {
        const response = await this.deleteData(params)

        if (response.status == 200) {
          this.setNotification({
            title: 'Delete Supplier',
            message: response.data.message
          })

          this.getListSupplier()
        }
      } catch (error) {
        this.setNotification({
          title: 'Delete Supplier',
          message: error
        })
      }
    }
  },

  mounted(){
    this.getListSupplier()
  }

}
</script>
