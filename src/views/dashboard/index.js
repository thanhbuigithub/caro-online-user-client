import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useStyles from "./muiStyle";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import Brightness1Icon from "@material-ui/icons/Brightness1";
import Container from "@material-ui/core/Container";
import AddGameButton from "../game/AddGameButton";
import JoinGameButton from "../game/JoinGameButton";
import UserContext from "../../contexts/UserContext";
import Box from "@material-ui/core/Box";
import PageTittle from '../../components/PageTittle';
import BudgetNewGame from './NewgameView';
import BudgetPlayNowGame from './PlaygameNowView';
import PlaygameIdView from './PlaygameIdView';
import OnlineList from './OnlineList';
function Home() {
  const classes = useStyles();
  let history = useNavigate();
  const { listUserOnline } = useContext(UserContext);

  return (
    // <div className={classes.root}>
    //   <Grid container spacing={2} style={{ height: "100%" }}>
    //     <Grid item xs={3} className={classes.box}>
    //       <Grid container direction="column">
    //         <Grid item style={{ position: "sticky", top: "0", zIndex: "2" }}>
    //           <Paper className={classes.paper}>Online</Paper>
    //         </Grid>
    //         <Grid item className={classes.list}>
    //           <List style={{ padding: 0 }}>
    //             {listUserOnline.map((user) => (
    //               <ListItem key={user.id} className={classes.itemUser}>
    //                 <ListItemAvatar>
    //                   <Avatar>
    //                     <PersonIcon />
    //                   </Avatar>
    //                 </ListItemAvatar>
    //                 <ListItemText primary={user.username} />
    //                 <Brightness1Icon className={classes.iconOnline} />
    //               </ListItem>
    //             ))}
    //           </List>
    //         </Grid>
    //       </Grid>
    //     </Grid>
    //     <Grid item xs={9} className={classes.box}>
    //       <Container className={classes.cardGrid} maxWidth="xl">
    //         <Grid container spacing={3} component="span">
    //           <AddGameButton />
    //           <JoinGameButton />
    //         </Grid>
    //       </Container>
    //     </Grid>
    //   </Grid>
    // </div>
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
              <OnlineList />
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              xl={3}
              xs={12}
            >
              <OnlineList />
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              xl={3}
              xs={12}
            >
              <OnlineList />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </PageTittle >
  );
}

export default Home;
