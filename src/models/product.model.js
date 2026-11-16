import { collection, doc, getDocsFromServer, getDocFromServer, addDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase.js';

const productsCollection = collection(db, 'products');

const toProduct = (snapshot) => ({ id: snapshot.id, ...snapshot.data() });

// Se usan las variantes "FromServer" para no devolver datos vacíos de la caché
// local cuando Firestore no responde: en ese caso se lanza un error (500).

export const getAllProducts = async () => {
    const snapshot = await getDocsFromServer(productsCollection);
    return snapshot.docs.map(toProduct);
};

export const getProductById = async (id) => {
    const snapshot = await getDocFromServer(doc(productsCollection, id));
    return snapshot.exists() ? toProduct(snapshot) : null;
};

export const createProduct = async (product) => {
    const ref = await addDoc(productsCollection, product);
    return { id: ref.id, ...product };
};

export const deleteProduct = async (id) => {
    const ref = doc(productsCollection, id);
    const snapshot = await getDocFromServer(ref);
    if (!snapshot.exists()) return false;
    await deleteDoc(ref);
    return true;
};
