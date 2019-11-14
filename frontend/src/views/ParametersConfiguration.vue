<template id='parConfig'>
    <div class="card mt-5 mb-5" id="body" style="width: 60%; margin: auto; background-color: #FAFAFA; padding: 20px;">
        <h1>Configuración de Parámetros</h1>   
        <h3>Editar parámetros de configuración</h3>     
        <div class="card-body">
            <form>
                <div class="form-group row">
                    <div class="col-md-7">
                        <label style="margin-right:10vh;" class="mt-3 ml-5">Máximo de envíos permitidos del token</label>
                        <label style="margin-right:5vh;" class="mt-4 ml-5">Máximo de movimientos</label>
                        <label style="margin-right:20vh;" class="mt-4 ml-5">Máximo de cuentas permitidas</label>
                        <label class="mt-3 ml-5">Mayoría de edad</label>
                    </div>                    
                    <div class="col-md-5">
                        <input :disabled="disable" style="width:50%;" type="text" class="form-control mt-2">
                        <input :disabled="disable" style="width:50%;" type="text" class="form-control mt-2">
                        <input :disabled="disable" style="width:50%;" type="text" class="form-control mt-2">
                        <input :disabled="disable" style="width:50%;" type="text" class="form-control mt-2">
                    </div>                    
                </div>
            </form>
            <div class="row">
                <button style="background-color: rgba(0,203,138,0.66);" class="btn text-black btn-lg bnt-md" @click="modify">Modificar</button>
                <button style="background-color: rgba(0,203,138,0.66);" class="btn text-black btn-lg bnt-md" @click="save">Guardar</button>
            </div>
        </div>
    </div>
</template>

<script>
import router from "@/router.js";
import { mapState } from "vuex";
import Swal from 'sweetalert2';
export default {
    data(){
        return{
            disable: true,
        }
    },
    methods:{
        modify(){
            this.disable = false;
        },
        save(){
            Swal.fire({ 
                type: 'success',
                title: 'Se ha guardado exitosamente',
                showConfirmButton: false,
                timer: 1500
            });
            this.disable = true;
        }
    }
}
</script>

<style scoped>
.card{
    color: #566787;
	background: #f5f5f5;
	font-family: 'Montserrat';
	font-size: 13px;
}
</style>