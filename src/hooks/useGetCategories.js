import { useEffect, useState } from "react";
import {
  query,
  collection,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetCategories = () => {
  const [categories, setCategories] = useState([]);

  const categoryCollectionRef = collection(db, "categories");

  const getCategories = async () => {
    let unsubscribe;

    try {
      const queryCategories = query(
        categoryCollectionRef,
        orderBy("name")
      );

     unsubscribe = onSnapshot(queryCategories, (snapshot) => {
        let docs = [];

        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;

          docs.push({ ...data, id });
        });

        setCategories(docs);
      });
    } catch (err) {
      console.error(err);
    }

    return () => unsubscribe();
  };

  useEffect(() => {
    getCategories();
  }, []);

  return { categories };
};
