import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { toast } from "react-toastify";

export default function useFirebaseImage(setValue , getValues) {
  const storage = getStorage();
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState("");
  if (!setValue || !getValues) return;
  const handleUploadImage = (file) => {
    const storageRef = ref(storage, `images/${file.name}`);
    // storageRef này dùng hàm ref để truy cập vào storage trong firebase ( 2 tham số là FirebaseStorage và url)
    const uploadTask = uploadBytesResumable(storageRef, file);
    // hàm này dùng để upload file lên đường dẫn của storageRef
    // * Dưới đây là onStateChange và progress để lấy được phần trăm upload
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressPercent =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // progress 5% 10% 15 %
        setProgress(progressPercent);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("Nothing at all");
        }
      }, // xử lý lỗi
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            toast("Unauthorized");
            break;
          case "storage/canceled":
            toast("Canceled");
            break;
          case "storage/unknown":
            toast("Unknown Error");
            break;
          default:
            console.log("nothing at all");
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImage(downloadURL);
        });
      }
    );
  };
  // * dùng hàm này khi submit
  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setValue("image_name", file.name);
    // hiện ảnh lên trên giao diện
    handleUploadImage(file);
  };

  const handleDeleteImage = async () => {
    const storage = getStorage();
    const imageRef = ref(storage, `images/${getValues("image_name")}`);
    await deleteObject(imageRef)
      .then(() => {
        toast("File Deleted Successfully");
        setImage("");
        setProgress(0);
      })
      .catch((error) => {
        toast("Oops! an error occurred");
        console.log(error);
      });
  };
  const handleResetUpload = () => {
    setImage('');
    setProgress(0)
  }
  return {
    progress,
    image,
    handleSelectImage,
    handleDeleteImage,
    handleResetUpload
  };
}
