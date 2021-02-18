import React from 'react';
import Layout from './core/Layout';

const App = () => {
  return (
    <Layout>
      <h1 className="pt-5 text-center">Welcome</h1>
      <div className="text-center">
        <img
          src={`${process.env.PUBLIC_URL}/toppage.jpg`}
          style={{ height: "80vh" }}
        />
      </div>

    </Layout>
  );
}

export default App;
