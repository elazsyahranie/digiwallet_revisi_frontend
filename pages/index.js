import Link from "next/link";
import Layout from "/components/Layout";

function LandingPage() {
  const goToLogin = () => {
    console.log("Go to login page!");
  };

  return (
    <>
      <Layout title="Digiwallet">
        <h1>Landing Page</h1>
        <div style={{ cursor: "pointer" }}>
          <Link href="/login">
            <h6>Login</h6>
          </Link>
        </div>
        <div style={{ cursor: "pointer" }}>
          <Link href="/dashboard">
            <h6>Dashboard</h6>
          </Link>
        </div>
      </Layout>
    </>
  );
}

export default LandingPage;
