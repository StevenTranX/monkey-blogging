import { addDoc, collection, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import slugify from "slugify";
import styled from "styled-components";

import { Button } from "../../components/button";
import { Dropdown } from "../../components/dropdown";
import { Field } from "../../components/field";
import ImageUpload from "../../components/image/ImageUpload";
import { Input } from "../../components/input";
import { Label } from "../../components/label";
import Radio from "../../components/radio/Radio";
import Toggle from "../../components/toggle/Toggle";
import { useAuth } from "../../contexts/authContext";
import { db } from "../../firebase/firebase-config";
import useFirebaseImage from "../../hooks/useFirebaseImage";
import { postStatus } from "../../utils/constants";

const PostAddNewStyles = styled.div``;

const PostAddNew = () => {
  const { control, watch, setValue, handleSubmit, getValues, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      categoryId: "",
      hot: false,
      image: "",
    },
  });
  const { image, progress, handleSelectImage, handleDeleteImage, handleResetUpload } =
    useFirebaseImage(setValue, getValues);
  const { userInfo } = useAuth();

  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [loading, setLoading] = useState(false)

  const watchStatus = watch("status");
  const watchCategory = watch("category");
  const watchHot = watch("hot");

  const addPostHandler = async (values) => {
    setLoading(true)
    try {
      const cloneValues = { ...values };
      cloneValues.slug = slugify(values.title || values.slug, {
        lower: true,
      });
      cloneValues.status = Number(values.status);
      // * Hàm addPostHandler này mục đích để xử lý về onSubmit ( vẫn chưa hoàn thiện ....)
      const colRef = collection(db, "posts");
      await addDoc(colRef, {
        // title : cloneValues.title,
        // slug : cloneValues.slug,
        // hot : cloneValues.hot,
        // status : cloneValues.status,
        // categoryId : cloneValues.categoryId,
        ...cloneValues,
        image,
        userId: userInfo.uid,
        createdAt : serverTimestamp(),
      });
      console.log();
      toast.success("Create new post successfully");
      reset({
        title: "",
        slug: "",
        status: 2,
        categoryId: "",
        hot: false,
        image: "",
      });
      setSelectCategory({})
      handleResetUpload()
    } catch (error) {
      setLoading(false)
    } finally {
      setLoading(false)
   }

  };
  const handleClickOption = (item) => {
    setValue("categoryId", item.id);
    setSelectCategory(item);
  };

  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "categories");
      const q = query(colRef, where("status", "==", 1));
      const querySnapshot = await getDocs(q);
      let result = [];
      querySnapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
        setCategories(result);
      });
    }
    getData();
  }, []);
  useEffect( () => {
    document.title = 'Monkey blogging - Add new post'
  }, [])
  return (
    <PostAddNewStyles>
      <h1 className='dashboard-heading'>Add new post</h1>
      <form onSubmit={handleSubmit(addPostHandler)}>
        <div className='grid grid-cols-2 gap-x-10 mb-10'>
          <Field>
            <Label>Title</Label>
            <Input
              control={control}
              placeholder='Enter your title'
              name='title'
              required
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              placeholder='Enter your slug'
              name='slug'
            ></Input>
          </Field>
        </div>
        <div className='grid grid-cols-2 gap-x-10 mb-10'>
          <Field>
            <Label>Image</Label>
            <ImageUpload
              handleDeleteImage={handleDeleteImage}
              type='file'
              onChange={handleSelectImage}
              className='h-[250px]'
              progress={progress}
              image={image}
            />
          </Field>
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Select
                placeholder={`${
                  "Please select categories " || selectCategory.name
                }`}
              ></Dropdown.Select>
              <Dropdown.List>
                {categories.length > 0 &&
                  categories.map((item) => (
                    <Dropdown.Option
                      key={item.id}
                      onClick= { () => handleClickOption(item)}
                    >
                      {item.name}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
            {selectCategory?.name && (
              <span className='inline-block p-4 rounded-lg bg-green-100 text-sm text-green-500 font-medium'>
                {selectCategory.name}
              </span>
            )}
          </Field>
        </div>
        <div className='grid grid-cols-2 gap-x-10 mb-10'>
          <Field>
            <Label>Status</Label>
            <div className='flex items-center gap-x-5'>
              <Radio
                name='status'
                control={control}
                checked={+watchStatus === postStatus.APPROVED}
                value={postStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name='status'
                control={control}
                checked={+watchStatus === postStatus.PENDING}
                value={postStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name='status'
                control={control}
                checked={+watchStatus === postStatus.REJECTED}
                // watchStatus tự động convert number sang string '3' nên ta để dấu + để convert sang number
                value={postStatus.REJECTED}
              >
                {/* 1 là approved 2 là pending 3 là reject  */}
                Reject
              </Radio>
            </div>
          </Field>
          <Field>
            <Label>Feature Post</Label>
            <Toggle
              on={watchHot === true}
              onClick={() => setValue("hot", !watchHot)}
            ></Toggle>
          </Field>
        </div>
        <div className='grid grid-cols-2 gap-x-10 mb-10'>
          <Field></Field>
        </div>
        <Button type='submit' className='mx-auto w-[250px]' isLoading = {loading} disabled = {loading}>
          Add new post
        </Button>
      </form>
    </PostAddNewStyles>
  );
};

export default PostAddNew;
