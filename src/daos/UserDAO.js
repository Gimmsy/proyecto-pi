import {
  collection,
  doc,
  getDoc,
  updateDoc,
  setDoc,
  deleteDoc
} from "firebase/firestore";
import { db } from "../../firebase.config";

class UserDAO {
  constructor() {
    this.collectionRef = collection(db, "users");
  }

  /**
   * Obtener un usuario por su ID
   * @param {string} id - ID del usuario
   * @returns {Promise<{success: boolean, data: any, error?: string}>}
   */
  async getUserById(id) {
    try {
      const userDoc = await getDoc(doc(this.collectionRef, id));
      if (userDoc.exists()) {
        return { success: true, data: userDoc.data() };
      } else {
        return { success: false, data: null, error: "Usuario no encontrado" };
      }
    } catch (error) {
      console.error("Error obteniendo el usuario:", error);
      return { success: false, data: null, error: error.message };
    }
  }

  /**
   * Crear un nuevo usuario solo si no existe
   * @param {Object} userData - Datos del usuario
   * @returns {Promise<{success: boolean, id?: string, error?: string}>}
   */
  async createUser(userData) {
    try {
      // Verifica si el usuario ya existe antes de crearlo
      const userDoc = await getDoc(doc(this.collectionRef, userData.uid));
      if (userDoc.exists()) {
        return { success: false, error: "Usuario ya existe" };
      }

      await setDoc(doc(this.collectionRef, userData.uid), userData);
      console.log("Documento creado con ID:", userData.uid);
      return { success: true, id: userData.uid };
    } catch (error) {
      console.error("Error creando el documento:", error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Actualizar los datos de un usuario
   * @param {string} id - ID del usuario
   * @param {Object} userData - Nuevos datos del usuario
   * @returns {Promise<{success: boolean, error?: string}>}
   */
  async updateUser(id, userData) {
    try {
      const userRef = doc(this.collectionRef, id);
      await updateDoc(userRef, userData);
      console.log("Documento actualizado exitosamente");
      return { success: true };
    } catch (error) {
      console.error("Error actualizando el documento:", error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Eliminar un usuario por su ID
   * @param {string} id - ID del usuario
   * @returns {Promise<{success: boolean, error?: string}>}
   */
  async deleteUser(id) {
    try {
      await deleteDoc(doc(this.collectionRef, id));
      console.log("Documento eliminado exitosamente");
      return { success: true };
    } catch (error) {
      console.error("Error eliminando el documento:", error);
      return { success: false, error: error.message };
    }
  }
}

export default new UserDAO();
