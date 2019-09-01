import jwt_decode from "jwt-decode";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { decorate, observable } from "mobx";
import React, { Component } from "react";

class AuthStore {
  user = null;

  setUser = token => {
    if (token) {
      axios.defaults.headers.common.Authorization = `JWT ${token}`;
      this.user = jwt_decode(token);
    }
  };

  login = async (userData, history) => {
    //i had history as a parameter
    try {
      const res = await axios.post(
        "https://the-index-api.herokuapp.com/login/",
        userData
      );
      const user = res.data;
      this.setUser(user.token);
      history.replace("/");
      console.log("[login from appstore] done");
    } catch (err) {
      console.log(err);
      console.error(err);
    }
  };

  signup = async (userData, history) => {
    //i had history as a parameter
    try {
      const res = await axios.post(
        "https://the-index-api.herokuapp.com/signup/",
        userData
      );
      const user = res.data;
      //this.user = jwt_decode(user.token);
      this.setUser(user.token);
      this.props.history.replace("/");
      console.log("[sign up from appstore] done");
    } catch (err) {
      console.error(err);
    }
  };
  render() {
    if (authStore.user) return <Redirect to="/" />;
  }
}
decorate(AuthStore, {
  user: observable
});

const authStore = new AuthStore();

export default authStore;
