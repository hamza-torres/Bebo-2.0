// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GithubAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkxKSyplb0QcyH0FHyHQOHX4wFc1-7ap8",
  authDomain: "bebo-2.firebaseapp.com",
  projectId: "bebo-2",
  storageBucket: "bebo-2.appspot.com",
  messagingSenderId: "776062846459",
  appId: "1:776062846459:web:e099c6ee2dff6dd6a6775e",
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
export const auth = getAuth();
const storage = getStorage(firebaseapp);
export const db = getFirestore();

export const uploadFile = async (user, file, type) => {
  if (type === "profile") {
    const storageRef = ref(storage, `users/${user.uid}/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  } else if (type === "post") {
    const storageRef = ref(storage, `posts/${user.uid}/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  }
}

export const deleteFile = async (user, file, type) => {
  if (type === "profile") {
    const storageRef = ref(storage, `users/${user.uid}/${file.name}`);
    await deleteObject(storageRef);
  } else if (type === "post") {
    const storageRef = ref(storage, `posts/${user.uid}/${file.name}`);
    await deleteObject(storageRef);
  }
}


export const downloadFile = async (user, file, type) => {
  if (type === "profile") {
    const storageRef = ref(storage, `users/${user.uid}/${file.name}`);
    const url = await getDownloadURL(storageRef);
    return url;
  } else if (type === "post") {
    const storageRef = ref(storage, `posts/${user.uid}/${file.name}`);
    const url = await getDownloadURL(storageRef);
    return url;
  }
}


// export const createUser = async (email, password) => {
//   const userCredential = await createUserWithEmailAndPassword(
//     auth,
//     email,
//     password
//   );
//   const user = userCredential.user;
//   const userRef = doc(db, "users", user.uid);
//   await setDoc(userRef, {
//     uid: user.uid,
//     email: user.email,
//     displayName: user.displayName,
//     photoURL: user.photoURL,
//     friends: [],
//     posts: [],
//   });
//   return user;
// };













const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

const githubProvider = new GithubAuthProvider();
githubProvider.addScope("repo");

export const signInWithGithubPopup = () =>
  signInWithPopup(auth, githubProvider);

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);


export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach((obj) => {
    const newDocRef = doc(collectionRef, obj.title.toLowerCase());
    batch.set(newDocRef, obj);
  });
  await batch.commit();
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data());
};

export const getUsers = async () => {
  const usersRef = collection(db, "users");
  const q = query(usersRef);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data());
};

export const getUser = async (userId) => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    console.log("No such document!");
  }
};

export const getPosts = async (user) => {
  const docRef = doc(db, "posts", user.uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
};

export const setPosts = async (posts, user, additionalInformation = {}) => {
  const postDocRef = doc(db, "posts", user.uid);
  try {
    console.log("adding posts to FireStore");
    await setDoc(postDocRef, {
      posts,
      ...additionalInformation,
    });
  } catch (error) {
    console.log("error setting user posts", error.message);
  }
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  const postDocRef = doc(db, "posts", userAuth.uid);
  const postSnapShot = await getDoc(postDocRef);

  if (!userSnapshot.exists()) {
    const { email } = userAuth;
    const createdAt = new Date().toISOString();
    try {
      await setDoc(userDocRef, {
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  if (!postSnapShot.exists()) {
    const posts = [
      {
        title: "Analyse Cars",
        classes: "car",
        outline: true,
        count: true,
      },
      {
        title: "Analyse Buses",
        classes: "bus",
        outline: true,
        count: true,
      },
    ];
    try {
      await setDoc(postDocRef, {
        posts,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

// firebase.auth().currentUser.getIdTokenResult()
//   .then((idTokenResult) => {
//      // Confirm the user is an Admin.
//      if (!!idTokenResult.claims.admin) {
//        // Show admin UI.
//        console.log('This is an admin user');
//      } else {
//        // Show regular user UI.
// 	   console.log('This is an not admin user');
//      }
//   })
//   .catch((error) => {
//     console.log(error);
//   });
