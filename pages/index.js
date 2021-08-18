import Head from "next/head";
import Image from "next/image";
// import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import Footer from "../components/module/Footer";
import { authPage } from "middleware/authorizationPage";

export default function Home() {
  return (
    <>
      <Layout title="Home">
        <div>
          <h2>Hello World!</h2>
        </div>
        <Footer />
      </Layout>
    </>
  );
}
