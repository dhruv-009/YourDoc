import React, { useEffect, useState } from 'react';
import axios from "axios";
import { AdminNavbar } from "../../components/adminNavbar";
import { NavLink, useParams } from 'react-router-dom';
import CakeIcon from '@mui/icons-material/Cake';
import WcIcon from '@mui/icons-material/Wc';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WorkIcon from '@mui/icons-material/Work';
import HomeIcon from '@mui/icons-material/Home';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DoneIcon from '@mui/icons-material/Done';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './Admin.css';

const UserProfile = () => {

    const [getuserdata, setUserData] = useState([]);
    console.log(getuserdata);

    const { id } = useParams("");
    console.log(id);

    //const history = useHistory();
    const getdata = async () => {
        const response = await axios.get(`http://localhost:3000/admin/${id}`);
        setUserData(response.data.data);
      };

    useEffect(() => {
        getdata();
    }, [])

    const deleteUser = async (id) => {
        try {
          await axios.delete("http://localhost:3000/admin/" + id);
          toast.success("Doctor Removed Sucessfully", {
            position: toast.POSITION.TOP_CENTER,
          });
          window.location.href = '/admindashboard'
        } catch (err) {
          console.log(err);
        }
      };

    const approveUser = async (id) => {
        try {
          await axios.put("http://localhost:3000/admin/" + id);
          toast.success("Doctor Approved Successfully", {
            position: toast.POSITION.TOP_CENTER,
          });
          window.location.href = '/admindashboard'
        } catch (err) {
          console.log(err);
        }
      };

    return (
        <div>
            <div className="container mt-3 items-center justify-center">
            <AdminNavbar />

            <Card className= "chart-user" sx={{ maxWidth: 600 }}>
                <CardContent>
                    <div className="row">
                        <div className="left_view col-lg-6 col-md-6 col-12">
                            <img src="/profile.png" style={{ width: 50 }} alt="profile" />
                            <h3 className="mt-3" font-black>Name: <span >{getuserdata.name}</span></h3>
                            <p className="mt-3"><CakeIcon />DOB: <span >{getuserdata.dob}</span></p>
                            <p className="mt-3"><MailOutlineIcon />Email: <span>{getuserdata.email}</span></p>
                            <p className="mt-3"><WorkIcon />Occuption: <span>{getuserdata.specialization}</span></p>
                            <p className="mt-3"><WcIcon />Gender: <span>{getuserdata.gender}</span></p>
                        </div>
                        <div className="right_view  col-lg-6 col-md-6 col-12">

                            <p className="mt-5"><PhoneAndroidIcon />Mobile: <span>+1 {getuserdata.phone}</span></p>
                            <p className="mt-3"><HomeIcon/>Address: <span>{getuserdata.address}</span></p>
                            <p className="mt-3"><LocationOnIcon  />ZipCode: <span>{getuserdata.latlong}</span></p><br />
                        </div>
                        <div className='flex-row justify-center'>
                        <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={e => approveUser(getuserdata.id)}><DoneIcon /> Approve</button>
                        <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={e => deleteUser(getuserdata.id)}><DeleteOutlineIcon /> Delete</button>
                        <ToastContainer />
                        </div>
                    </div>
                </CardContent>
            </Card>
            </div>
        </div>
    )
}

export default UserProfile;