import { collection, getDocs } from "firebase/firestore";
import { db } from "./config";

const getGallery = async () => {
  try {
    const queryset = await getDocs(collection(db, "images"));
    return queryset.docs.map((doc) => ({ id: doc.id, url: doc.data().url }));
  } catch (e) {
    console.log(e);
  }
};

export default getGallery;
