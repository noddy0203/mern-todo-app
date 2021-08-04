import React, { useEffect, useState } from "react";
import Pagination from "@material-ui/lab/Pagination"
const UserApi = () => {
   const [data, setData] = useState([]);
   const [page , setPage] = useState("")

  const getUserData = async () => {
    try {
      const res = await fetch(`https://reqres.in/api/users?page=${setPage(page)}`);
      const resData = await res.json();
      setData(resData.data);
      console.log(resData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  });
  return (
    <>
      <div className="row">
        {data.map((currEl, index) => {
          return (
            <div className="card col-3" key={index}>
              <h4>{currEl.id}</h4>
              <img
                src={currEl.avatar}
                className="card-img-top"
                alt="..avatar"
              />
              <div className="card-body">
                <h5 className="card-title">
                  {currEl.first_name} {currEl.last_name}
                </h5>
                <p className="card-text">{currEl.email}</p>
              </div>
            </div>
          );
        })}
       
      </div>
      <section py={3}>
               <p><Pagination count={3} color="primary" onChange={(event , value)=>{
                 setPage(value)
               }}/></p> 
        </section>
    </>
  );
};

export default UserApi;
