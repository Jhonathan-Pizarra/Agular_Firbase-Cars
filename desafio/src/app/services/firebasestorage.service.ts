import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebasestorageService {

  constructor(private firestore: AngularFirestore) { }
  // Meotodo para crear un nuevo vehiculo
  public crearGuitarra(data: {marca: string, modelo:string, anio:number, url: string}) {
    return this.firestore.collection('guitarras').add(data);
  }
  // Metodo para obtener un auto por ID
  public obtenerGuitarraId(documentId: string) {
    return this.firestore.collection('guitarras').doc(documentId).snapshotChanges();
  }
  // Metodo para obtener todos los autos
  public ObtenerGuitarras() {
    return this.firestore.collection('guitarras').snapshotChanges();
  }
  // Metodo para actualizar un auto
  public actualizarGuitarra(documentId: string, data: any) {
    return this.firestore.collection('guitarras').doc(documentId).set(data);
  }
    // Metodo para eliminar un auto
    public eliminarGuitarra(documentId: string) {
      return this.firestore.collection('guitarras').doc(documentId).delete();
    }
}
