

function Login() {

  const urlParams = new URLSearchParams(window.location.search);
  const accessToken = urlParams.get('code');

  console.log(window.location.pathname);
  console.log(window.location);
  console.log('hi');
  console.log(accessToken);

  var url = window.location.href
  return (
    <>
      <div>

        {/* <ImageArray /> */}

      </div>
      <h1>Nutritionify</h1>
      <div className="card">
        <a href="https://756d-2600-387-15-12-00-7.ngrok-free.app/login">Login with spotify Click
        </a>

      </div>
      <p className="read-the-docs">
        Music nutrition label
      </p>

    </>
  );
}

export default Login
