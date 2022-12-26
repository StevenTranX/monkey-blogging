import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { result } from "lodash";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { db } from "../../firebase/firebase-config";
import Heading from "../../layout/Heading";
import { postStatus } from "../../utils/constants";
import PostFeatureItem from "../post/PostFeatureItem";
const HomeFeatureStyles = styled.div``;

const HomeFeature = () => {
  const [postList, setPostList] = useState([]);
  console.log(postList)
  useEffect(() => {
    const colRef = collection(db, "posts");
    const queries = query(
      colRef,
      where("status", "==", 1),
      where("hot", "==", true),
      limit(3)
    );
    onSnapshot(queries, (snapshot) => {
      const results = []
      snapshot.forEach((doc) => {
        console.log(doc.data());
        results.push({
          id : doc.id,
          ...doc.data()
        })
      });
      setPostList(results)
    });
  }, []);
  return (
    <HomeFeatureStyles className="home-block">
      <div className="container">
        <Heading>Bài viết nổi bật</Heading>
        <div className="grid-layout">
          {postList.map(post => (
            <PostFeatureItem key = {post.id} data={post}></PostFeatureItem>
          ))}
        </div>
      </div>
    </HomeFeatureStyles>
  );
};

export default HomeFeature;
