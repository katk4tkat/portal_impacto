export const loginErrorHandler = (error) => {
  console.log(error.code);

  const errorCode = error.code;
  if (errorCode === "auth/invalid-login-credentials") {
    return "Verifique que su usuario y/o contraseña sean correctos.";
  } else if (errorCode === "auth/too-many-requests") {
    return "Se han realizado demasiados intentos fállidos.";
  }

  return "Ha ocurrido un error en el inicio de sesión.";
};
