"use client";

import Head from 'next/head';
import Header from '../components/Header';
import VideoList from '../components/VideoList';
import VideoForm from '../components/VideoForm';
import React from "react";

const Home: React.FC = () => (
    <div>
      <Head>
        <title>Learnwell Video Platform</title>
      </Head>
      <Header />
      <main>
        <VideoForm />
        <VideoList />
      </main>
    </div>
);

export default Home;