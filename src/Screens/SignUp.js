// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// export default function SignUp() {
//     const [credentials, setCredentials] = useState({
//         name: '',
//         email: '',
//         password: '',
//         geolocation: '',
//     });

//     const handleSubmit = async (e) => {
//         e.preventDefault(); // Prevent the default form submission behavior

//         console.log("Before fetch");

//         try {
//             const response = await fetch('http://localhost:4900/api/createUser', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation }),
//             });

//             const json = await response.json();
//             console.log(json);

//             if (!json.success) {
//                 alert("Enter Valid Credentials")
//             }
//             else {
//                 // Show popup if the account was created successfully
//                 alert("Account created successfully!");

//             // Handle the response (you might want to check if it was successful)
//             console.log('Response:', response);
//         } catch (error) {
//             console.error('Error submitting form:', error);
//         }
//     };

//     // console.log("After fetch");

//     const onChange = (e) => {
//         setCredentials({ ...credentials, [e.target.name]: e.target.value });
//     };

//     return (
//         <>
//             <div className="container">
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-3">
//                         <label htmlFor="name" className="form-label">
//                             Name
//                         </label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             id="name"
//                             name="name"
//                             value={credentials.name}
//                             onChange={onChange}
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="email" className="form-label">
//                             Email address
//                         </label>
//                         <input
//                             type="email"
//                             className="form-control"
//                             id="email"
//                             aria-describedby="emailHelp"
//                             name="email"
//                             value={credentials.email}
//                             onChange={onChange}
//                         />
//                         <div id="emailHelp" className="form-text">
//                             We'll never share your email with anyone else.
//                         </div>
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="password" className="form-label">
//                             Password
//                         </label>
//                         <input
//                             type="password"
//                             className="form-control"
//                             id="password"
//                             name="password"
//                             value={credentials.password}
//                             onChange={onChange}
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="geolocation" className="form-label">
//                             Address
//                         </label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             id="geolocation"
//                             name="geolocation"
//                             value={credentials.geolocation}
//                             onChange={onChange}
//                         />
//                     </div>
//                     <button type="submit" className="m-3 btn btn-success">
//                         Submit
//                     </button>
//                     <Link to="/login" className="m-3 btn btn-danger">
//                         Already a user
//                     </Link>
//                 </form>
//             </div>
//         </>
//     );
// }


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
// import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        password: '',
        geolocation: '',
    });

    const handleSubmit = async (e) => {
        let navigate = useNavigate();
        e.preventDefault(); // Prevent the default form submission behavior

        try {
            const response = await fetch('http://localhost:4900/api/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation }),
            });

            const json = await response.json();
            console.log(json);

            if (!json.success) {
                alert("Enter Valid Credentials");
            } else {
                // Show popup if the account was created successfully
                alert("Account created successfully!");
                
                navigate('/login');
                // Optionally, you can redirect the user to another page, e.g., the login page
                // window.location.href = "/login";
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (


        <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover',height: '100vh' }}>
    
      <div>
      <Navbar />
      </div>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={credentials.name}
                            onChange={onChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            aria-describedby="emailHelp"
                            name="email"
                            value={credentials.email}
                            onChange={onChange}
                        />
                        <div id="emailHelp" className="form-text">
                            We'll never share your email with anyone else.
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={credentials.password}
                            onChange={onChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="geolocation" className="form-label">
                            Address
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="geolocation"
                            name="geolocation"
                            value={credentials.geolocation}
                            onChange={onChange}
                        />
                    </div>
                    <button type="submit" className="m-3 btn btn-success">
                        Submit
                    </button>
                    <Link to="/login" className="m-3 btn btn-danger">
                        Already a user
                    </Link>
                </form>
            </div>
        </div>
    );
}
