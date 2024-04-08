import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="d-flex flex-column align-items-center justify-content-center vh-100">
        <h2 className="display-3 mb-4 text-center">Hello!</h2>
        <h3 className="display-4 mb-4 text-center"> and Welcome to the Wild World of...</h3>
        <h1 className="display-1 mb-4 text-center">Fugglets!</h1>
        <p className="text-center">These fun little guys are just waiting to meet you.</p>
        <p className="text-center">So go ahead and click on 'My Fugglet' to get started!</p>
      </div>
    </Layout>
  );
}
