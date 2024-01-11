import React from "react";
import { Route, Redirect } from "react-router-dom";

export function ProtectedRoute({ children, auth }) {
  console.log("Protected route children", children);

  return <Route>{auth ? children : <Redirect to={"/"} />}</Route>;
}
