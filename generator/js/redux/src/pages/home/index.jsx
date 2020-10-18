import styles from "./styles.styl";

import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import useStyles from "isomorphic-style-loader/useStyles";

import HelloWorld from "components/helloworld";
import { Helmet } from 'react-helmet'

const Home = React.memo(() => {
  useStyles(styles);

  const list = useSelector((state) => state.home.list);

  const handleClick = React.useCallback(() => {
    console.log("11111111");
  });

  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Title</title>
      </Helmet>
      <div>
        <div className="home_page">home pasge</div>
        <NavLink to="/login">login</NavLink>
        <button className="button" onClick={handleClick}>
          button
        </button>
        {list.map((item) => (
          <div key={item.id}>{item.title}</div>
        ))}
      </div>
      <HelloWorld />
    </Fragment>
  );
});

export default Home;
