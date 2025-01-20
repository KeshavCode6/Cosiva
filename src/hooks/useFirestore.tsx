"use client";
import React, { createContext, useContext } from "react";
import { firestore } from "@/lib/firebase/client";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  getDoc,
  updateDoc,
  query,
  where,
  QuerySnapshot,
  DocumentData,
  WithFieldValue,
  UpdateData,
  DocumentReference,
  setDoc,
} from "firebase/firestore";

interface FirestoreContextType {
  getDocuments: <T>(collectionName: string) => Promise<T[]>;
  getDocument: <T>(
    collectionName: string,
    documentId: string
  ) => Promise<T | undefined>;
  queryDocuments: <T>(
    collectionName: string,
    field: string,
    value: any
  ) => Promise<T[]>;
  deleteDocument: (collectionName: string, documentId: string) => Promise<void>;
  createDocument: <T extends DocumentData>(
    collectionName: string,
    data: WithFieldValue<T>,
    id?: string
  ) => Promise<void>;
  editDocument: <T extends DocumentData>(
    collectionName: string,
    documentId: string,
    data: UpdateData<T>
  ) => Promise<void>;
}

export const FirestoreContext = createContext<FirestoreContextType | undefined>(
  undefined
);

export function FirestoreProvider({ children }: { children: React.ReactNode }) {
  const getDocuments = async <T,>(collectionName: string): Promise<T[]> => {
    try {
      const querySnapshot: QuerySnapshot = await getDocs(
        collection(firestore, collectionName)
      );
      const documents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as T[];
      return documents;
    } catch (error) {
      console.error(
        `Error fetching documents from collection '${collectionName}':`,
        error
      );
      throw error;
    }
  };

  const getDocument = async <T,>(
    collectionName: string,
    documentId: string
  ): Promise<T | undefined> => {
    try {
      const docRef = doc(firestore, collectionName, documentId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as T;
      } else {
        return undefined;
      }
    } catch (error) {
      console.error(
        `Error fetching document with ID '${documentId}' from collection '${collectionName}':`,
        error
      );
      throw error;
    }
  };

  const queryDocuments = async <T,>(
    collectionName: string,
    field: string,
    value: any
  ): Promise<T[]> => {
    try {
      const q = query(
        collection(firestore, collectionName),
        where(field, "==", value)
      );
      const querySnapshot: QuerySnapshot = await getDocs(q);
      const documents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as T[];
      return documents;
    } catch (error) {
      console.error(
        `Error querying documents in collection '${collectionName}':`,
        error
      );
      throw error;
    }
  };

  const createDocument = async <T extends DocumentData>(
    collectionName: string,
    data: WithFieldValue<T>,
    id?: string
  ): Promise<void> => {
    try {
      if (id) {
        await setDoc(doc(firestore, collectionName, id), {
          data,
        });
      } else {
        await addDoc(collection(firestore, collectionName), data);
      }
    } catch (error) {
      console.error(
        `Error creating document in collection '${collectionName}':`,
        error
      );
      throw error;
    }
  };

  const editDocument = async <T extends DocumentData>(
    collectionName: string,
    documentId: string,
    data: UpdateData<T>
  ): Promise<void> => {
    try {
      const docRef = doc(
        firestore,
        collectionName,
        documentId
      ) as DocumentReference<DocumentData, T>;
      await updateDoc(docRef, data);
    } catch (error) {
      console.error(
        `Error updating document in collection '${collectionName}':`,
        error
      );
      throw error;
    }
  };

  const deleteDocument = async (
    collectionName: string,
    documentId: string
  ): Promise<void> => {
    try {
      const docRef = doc(firestore, collectionName, documentId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error(
        `Error deleting document from collection '${collectionName}':`,
        error
      );
      throw error;
    }
  };

  return (
    <FirestoreContext.Provider
      value={{
        getDocuments,
        getDocument,
        queryDocuments,
        createDocument,
        editDocument,
        deleteDocument,
      }}
    >
      {children}
    </FirestoreContext.Provider>
  );
}

export function useFirestore() {
  const context = useContext(FirestoreContext);

  if (context === undefined) {
    throw new Error("useFirestore must be used within a FirestoreProvider");
  }

  return context;
}
