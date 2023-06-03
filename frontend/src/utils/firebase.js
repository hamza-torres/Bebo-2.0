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
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB60xxt_viNV9x0xhF-7FqiIkEnfxypm3c",
  authDomain: "extended-creek-388409.firebaseapp.com",
  projectId: "extended-creek-388409",
  storageBucket: "extended-creek-388409.appspot.com",
  messagingSenderId: "328476895839",
  appId: "1:328476895839:web:7a31ad02673c69c6a249ea"
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
};

export const deleteFile = async (user, file, type) => {
  if (type === "profile") {
    const storageRef = ref(storage, `users/${user.uid}/${file.name}`);
    await deleteObject(storageRef);
  } else if (type === "post") {
    const storageRef = ref(storage, `posts/${user.uid}/${file.name}`);
    await deleteObject(storageRef);
  }
};

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
};

export const getProfilePhoto = async (userId) => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return userSnap.data().picture;
  } else {
    console.log("No such document!");
  }
};

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

export const getUsers = async () => {
  const usersRef = collection(db, "users");
  const q = query(usersRef);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data());
};

export const getAllPosts = async () => {
  const postsRef = collection(db, "posts");
  const q = query(postsRef);
  const querySnapshot = await getDocs(q);
  const posts = querySnapshot.docs.map((doc) => doc.data());
  return posts.flatMap(obj => Object.values(obj.posts || []))
}

export const getUser = async (userId) => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    return null;
  }
};

// export const getPosts = async (user) => {
//   const docRef = doc(db, "posts", user.uid);
//   const docSnap = await getDoc(docRef);
//   if (docSnap.exists()) {
//     return docSnap.data();
//   } else {
//     console.log("No such document!");
//   }
// };

export const setFirePosts = async (user, posts) => {
  console.log('stuff in posts:', posts);
  const postDocRef = doc(db, "posts", user.uid);
  try {
    console.log("adding posts to FireStore");
    await setDoc(postDocRef, {
      posts,
    });
  } catch (error) {
    console.log("error setting user posts", error.message);
  }
};

export const getUserPosts = async (user) => {
  const docRef = doc(db, "posts", user.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().posts;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
};

export const setFireFriends = async (user, friends) => {
  const postDocRef = doc(db, "friends", user.uid);
  try {
    console.log("adding friends to FireStore");
    await setDoc(postDocRef, {
      friends,
    });
  } catch (error) {
    console.log("error setting user friends", error.message);
  }
};

export const getUserFriends = async (userId) => {
  const docRef = doc(db, "friends", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().friends;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
};

export const updatePostLikes = async (postUserId, postId, userId, action) => {
  try {
    console.log('Beginning like process')
    const documentRef = doc(db, "posts", postUserId);
    const documentSnapshot = await getDoc(documentRef);

    if (documentSnapshot.exists()) {
      const postsArray = documentSnapshot.data().posts;
      console.log("This is the posts array retrieved", postsArray)

      // Find the index of the post with the specified postId
      const postIndex = postsArray.findIndex((post) => post.postId === postId);
      console.log('this is the index of the post with the specified postId', postIndex)

      if (postIndex !== -1) {
        // Update the likes array based on the action
        const likesArray = postsArray[postIndex].likes
        if (action === "add") {
          const isLikedByUser = likesArray.includes(userId);
          if (!isLikedByUser) {
            postsArray[postIndex].likes.push(userId);
          }
        } else if (action === "remove") {
          const userIndex = postsArray[postIndex].likes.indexOf(userId);
          if (userIndex !== -1) {
            postsArray[postIndex].likes.splice(userIndex, 1);
          }
        }

        // Update the Firestore document with the modified posts array
        await updateDoc(documentRef, { posts: postsArray });

        console.log("Post likes updated successfully.");
      } else {
        console.log("Post not found.");
      }
    } else {
      console.log("Document does not exist.");
    }
  } catch (error) {
    console.error("Error updating post likes:", error);
  }
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const { email, uid } = userAuth;
    const createdAt = new Date().toISOString();
    const impressions = Math.floor(Math.random() * (1000 - 10 + 1)) + 10;
    const viewedProfile = Math.floor(Math.random() * (1000 - 10 + 1)) + 10;
    if (additionalInformation) {
      const { firstName, lastName, location, bio, picture } =
        additionalInformation;
      try {
        await setDoc(userDocRef, {
          uid,
          email,
          createdAt,
          impressions,
          viewedProfile,
          firstName,
          lastName,
          location,
          bio,
          picture,
        });
      } catch (error) {
        console.log("error creating the user document", error.message);
      }
    } else {
      try {
        await setDoc(userDocRef, {
          email,
          createdAt,
          impressions,
          viewedProfile,
          ...additionalInformation,
        });
      } catch (error) {
        console.log("error creating the user document", error.message);
      }
    }
  }

  const postDocRef = doc(db, "posts", userAuth.uid);
  const postSnapShot = await getDoc(postDocRef);
  if (!postSnapShot.exists()) {
    try {
      await setDoc(postDocRef, {});
    } catch (error) {
      console.log("error creating the posts document", error.message);
    }
  }

  const friendsDocRef = doc(db, "friends", userAuth.uid);
  const friendsSnapShot = await getDoc(friendsDocRef);
  if (!friendsSnapShot.exists()) {
    try {
      await setDoc(friendsDocRef, {});
    } catch (error) {
      console.log("error creating the friends document", error.message);
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
