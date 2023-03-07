import { useState, useEffect } from "react";

function AccountPage(props) {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
          token: props.user.credential,
        };

        const response = await fetch(
          "https://dallehost.herokuapp.com/api/v1/users/user",
          {
            method: "GET",
            headers,
          }
        );

        const data = await response.json();
        setUserInfo(data.user);
      } catch (err) {
        alert(err);
      }
    };

    props.user? fetchUser() : setUserInfo(null);
  }, [props.user]);
  console.log(userInfo);
  return (
    <div>
      {userInfo ? (
        <>
          <h1 className="font-extrabold text-[#222328] text-[32px]">
            Welcome to your Dashboard
          </h1>
          <p>Here you can see your account details and manage your settings.</p>
          <div className="cardN-holder">
            <div className="cardN">
              {" "}
              <h2 className="font-extrabold text-[#222328] text-[16px]">
                Your Account Details:
              </h2>
              <ul>
                <p>Email: {userInfo.email}</p>
                
                <p>Posts: {userInfo.posts.length}</p>
              </ul>
              <h2 className="font-extrabold text-[#222328] text-[16px]">
                Your Settings:
              </h2>
              <ul>
                <li>Language: English</li>
                <li>Posts: Public</li>
              </ul>{" "}
            </div>
          </div>
        </>
      ) : (
        <p>Please Sign in</p>
      )}
    </div>
  );
}

export default AccountPage;
