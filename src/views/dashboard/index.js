import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useStyles from "./muiStyle";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import UserContext from "../../contexts/UserContext";
import Box from "@material-ui/core/Box";
import PageTittle from '../../components/PageTittle';
import BudgetNewGame from './NewgameView';
import BudgetPlayNowGame from './PlaygameNowView';
import PlaygameIdView from './PlaygameIdView';
import OnlineList from './OnlineList/index';
import GameList from './GameList';
import RankList from './RankList';

function Home() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { listUserOnline } = useContext(UserContext);

  return (
    <PageTittle
      className={classes.root}
      title="DashBoard"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            sm={6}
            xl={3}
            xs={12}
          >
            <BudgetNewGame />
          </Grid>
          <Grid
            item
            lg={4}
            sm={6}
            xl={3}
            xs={12}
          >
            <BudgetPlayNowGame />
          </Grid>
          <Grid
            item
            lg={4}
            sm={6}
            xl={3}
            xs={12}
          >
            <PlaygameIdView />
          </Grid>
          <Box component="span" m={4} width="100%" />
          <Grid
            container
            spacing={3}
            style={{ margin: 0 }}
          >
            <Grid
              item
              lg={4}
              md={6}
              xl={3}
              xs={12}
            >
              <OnlineList data={listUserOnline} />
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              xl={3}
              xs={12}
            >
              <GameList />
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              xl={3}
              xs={12}
            >
              <RankList />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </PageTittle >
  );
}

export default Home;
