import styles from "./styles.styl";

import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react";
import useStyles from "isomorphic-style-loader/useStyles";
import { Helmet } from "react-helmet";

import { useTargetStore } from "app/store";
import HelloWorld from "components/helloworld";

const Home = observer(() => {
  useStyles(styles);

  const { list } = useTargetStore("homeStore");

  const handleClick = React.useCallback(() => {
    console.log("11111111");
  }, []);

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
        {list.map((item: any) => (
          <div key={item.id}>{item.title}</div>
        ))}
      </div>
      <HelloWorld />
    </Fragment>
  );
});

export default Home;
