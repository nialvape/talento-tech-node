import { collection, doc, getDocs, getDoc, addDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase.js';

const productsCollection = collection(db, 'products');

const toProduct = (snapshot) => ({ id: snapshot.id, ...snapshot.data() });

export const getAllProducts = async () => {
    const snapshot = await getDocs(productsCollection);
    return snapshot.docs.map(toProduct);
};

export const getProductById = async (id) => {
    const snapshot = await getDoc(doc(productsCollection, id));
    return snapshot.exists() ? toProduct(snapshot) : null;
};

export const createProduct = async (product) => {
    const ref = await addDoc(productsCollection, product);
    return { id: ref.id, ...product };
};

export const deleteProduct = async (id) => {
    const ref = doc(productsCollection, id);
    const snapshot = await getDoc(ref);
    if (!snapshot.exists()) return false;
    await deleteDoc(ref);
    return true;
};
