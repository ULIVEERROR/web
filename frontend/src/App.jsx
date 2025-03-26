import React, { useState } from "react";
import UsersTable from "./UsersTable";
import Form from "./Form";

function App() {
  const [data, setData] = useState(undefined);
  return (
    <>
      <Form setData={setData}/>
      <UsersTable data={data}/>
    </>
  );
}

export default App;
