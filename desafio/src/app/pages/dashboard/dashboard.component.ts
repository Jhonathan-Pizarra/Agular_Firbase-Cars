import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FirebasestorageService } from 'src/app/services/firebasestorage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']


})
export class DashboardComponent implements OnInit {

  // CERAR UN ARREGLO
  public guitarras:any = [];
  // PARA LA PARTE DE AGREGAR Y ACTUALIZAR UN AUTO
   public documentId = null;
   public currentStatus = 1;
   myFormGuitarra: FormGroup;


   // CREAR UNA VARIABLE DENTRO DEL CONSTRUCTOR
   constructor(private serviceStore: FirebasestorageService) {}

   ngOnInit() {
     // INICIALIZAR EL METODO CREADO
     this.obtenerGuitarras();
     this.myFormGuitarra = new FormGroup({
       marcaF: new FormControl(''),
       modeloF: new FormControl(''),
       anioF: new FormControl(''),
       urlF: new FormControl(''),
       idF: new FormControl('')
     });

   }

   // CREAR UN METODO PARA OBTENER TODOS LOS GUITARRAS
   public obtenerGuitarras() {
     this.serviceStore.ObtenerGuitarras().subscribe((r)=>{
       this.guitarras= r.map(i =>
        {
        this.guitarras = i.payload.doc.data() as {};
        const id = i.payload.doc.id;
        return {id, ...this.guitarras}
        }
       )
     })
   }

   //METODO PARA ACTUALIZAR Y AGREGAR UN NUEVO AUTO
   public nuevoGuitarra(form, documentId = this.documentId) {
     if (this.currentStatus == 1) {
       let data = {
         marca: form.marcaF,
         modelo: form.modeloF,
         anio: form.anioF,
         url: form.urlF
       }
       this.serviceStore.crearGuitarra(data).then(() => {
         console.log('Documento creado exitósamente!');
         this.myFormGuitarra.setValue({
           marcaF: '',
           modeloF: '',
           anioF: '',
           urlF: '',
           idF: ''
         });
       }, (error) => {
         console.error(error);
       });
     } else {
       let data = {
         marca: form.marcaF,
         modelo: form.modeloF,
         anio: form.anioF,
         url: form.urlF
       }
       this.serviceStore.actualizarGuitarra(documentId, data).then(() => {
         this.myFormGuitarra.setValue({
           marcaF: '',
           modeloF: '',
           anioF: '',
           urlF: '',
           idF: ''
         });
         console.log('Documento editado exitósamente');
       }, (error) => {
         console.log(error);
       });
     }
   }


   // METODO PARA CARGAR LOS DATOS EN LOS CAMPOS DEL FORMULARIO
   // POSTERIOR A ELLO REALIZAR EL ACTUALIZAR
   public actualizarGuitarra(documentId) {
     let editSubscribe = this.serviceStore.obtenerGuitarraId(documentId).subscribe((data) => {
       this.currentStatus = 2;
       this.documentId = documentId;
         this.myFormGuitarra.setValue({
         idF: documentId,
         marcaF: data.payload.data()['marca'],
         modeloF: data.payload.data()['modelo'],
         anioF: data.payload.data()['anio'],
         urlF: data.payload.data()['url']
       });
       editSubscribe.unsubscribe();
     });
   }

   //ELIMINAR AUTO
   public eliminarGuitarra(documentId) {
     this.serviceStore.eliminarGuitarra(documentId).then(() => {
       console.log('Documento eliminado!');
     }, (error) => {
       console.error(error);
     });
   }




}
