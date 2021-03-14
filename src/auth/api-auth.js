const signin = async (user) => {
  console.log(user, "jaa");
  try {
    let response = await fetch("http://localhost:3050/api/auth/signin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    console.log(response, "from h");
    return resp.json();
  } catch (err) {
    console.log(err);
  }
};

const signout = async () => {
  try {
    let response = await fetch("http://localhost:3050/api/auth/signout/", {
      method: "GET",
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export { signin, signout };
