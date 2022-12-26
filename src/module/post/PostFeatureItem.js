import { collection, doc, getDoc, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import slugify from "slugify";
import styled from "styled-components";
import { db } from "../../firebase/firebase-config";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostFeatureItemStyles = styled.div`
  width: 100%;
  border-radius: 16px;
  position: relative;
  height: 169px;
  .post {
    &-image {
    }
    &-overlay {
      position: absolute;
      inset: 0;
      border-radius: 16px;
      background-color: rgba(0, 0, 0, 0.75);
      mix-blend-mode: multiply;
      opacity: 0.6;
    }
    &-content {
      position: absolute;
      inset: 0;
      z-index: 10;
      padding: 20px;
      color: white;
    }
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    @media screen and (max-width: 1023.98px) {
      .post {
        &-content {
          padding: 15px;
        }
      }
    }
  }

  @media screen and (min-width: 1024px) {
    height: 272px;
  }
`;
const PostFeatureItem = ({ data }) => {
  console.log(data);
  const [category, setCategory] = useState("");
  const [user, setUser] = useState("");
  useEffect(() => {
    // * hàm fetch này dùng để gọi lấy ra tên của category dựa vào categoryId
    async function fetch() {
      const docRef = doc(db, "categories", data.categoryId);
      const docSnap = await getDoc(docRef);
      // truy cập vào collection categories và truyền vào id, sau đó getDoc để lấy data
      setCategory(docSnap.data());
      // set lại data cho categories rồi render ra ngoài UI
    }
    fetch();
  }, [data.categoryId]);

  useEffect(() => {
    async function fetchUser() {
      if (data.userId) {
        const docRef = doc(db, "users", data.userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.data) setUser(docSnap.data());
      }
    }
    fetchUser();
  }, [data.userId]);
  if (!data || !data.id) return null;
  const date = data?.createdAt?.seconds ? new Date(data?.createdAt?.seconds * 1000) : new Date()
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  return (
    <PostFeatureItemStyles>
      <PostImage
        url={data.image}
        alt={data.image_name}
        className="post-image"
      />
      <div className="post-overlay"></div>
      <div className="post-content">
        <div className="post-top">
          {category?.name && (
            <PostCategory to={category.slug}>{category.name}</PostCategory>
          )}
          {user?.fullname && <PostMeta date = {formatDate} to = {slugify(user?.fullname || '', {lower : true})} authorName={user?.fullname}></PostMeta>}
        </div>
        <PostTitle to={data.slug} className="post-title">
          {data.title}
        </PostTitle>
      </div>
    </PostFeatureItemStyles>
  );
};

export default PostFeatureItem;
