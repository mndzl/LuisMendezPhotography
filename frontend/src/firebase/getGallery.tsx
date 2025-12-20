import { collection, getDocsFromServer } from "firebase/firestore";
import { db } from "./config";

const getGallery = async () => {
  try {
    const queryset = await getDocsFromServer(collection(db, "images"));
    return queryset.docs.map((doc) => ({ id: doc.id, url: doc.data().url }));
  } catch (e) {
    console.log("error!");
    throw e;
  }
};

export default getGallery;
