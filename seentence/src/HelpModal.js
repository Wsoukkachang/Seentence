import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import HelpIcon from "@material-ui/icons/Help";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import EmailIcon from "@material-ui/icons/Email";
import YouTubeIcon from "@material-ui/icons/YouTube";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import DevicesIcon from "@material-ui/icons/Devices";
import {
  Avatar,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@material-ui/core";
import "./Modal.css";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  console.log("This is width", width);
  console.log("This is height", height);
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    height: 500,
    width: 350,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const useCardStyles = makeStyles({
  root: {
    maxWidth: 400,
  },
  media: {
    height: 300,
  },
});

export default function HelpModal() {
  const classes = useStyles();
  const cardClasses = useCardStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div className="helpModalContainer">
        <Card className={cardClasses.root}>
          <CardContent>
            <Typography gutterBottom variant="h4" component="h4">
              Technologies Used:
            </Typography>
          </CardContent>
          <CardActions>
            <div className="iconContainer">
              <div className="helpSection">
                <Typography variant="body1" color="textSecondary" component="p">
                  ReactJS - Front End / Web Speech API for speech synthesis.
                </Typography>
                <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
                  <div id="icon-3">
                    <DevicesIcon
                      color="action"
                      className="flex-icon"
                      fontSize="large"
                    ></DevicesIcon>
                  </div>
                </a>
              </div>
              <div className="helpSection">
                <Typography variant="body1" color="textSecondary" component="p">
                  Unsplash API - All photos belong to Unsplash.
                </Typography>
                <a
                  href="https://unsplash.com/developers/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div id="icon-2">
                    <PhotoLibraryIcon
                      color="action"
                      className="flex-icon"
                      fontSize="large"
                    ></PhotoLibraryIcon>
                  </div>
                </a>
              </div>
              <div className="helpSection">
                <Typography variant="body1" color="textSecondary" component="p">
                  YouTube API - All videos belong to Youtube.
                </Typography>
                <a
                  href="https://developers.google.com/youtube/v3"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div id="icon-4">
                    <YouTubeIcon
                      color="action"
                      className="flex-icon"
                      fontSize="large"
                    ></YouTubeIcon>
                  </div>
                </a>
              </div>
            </div>
          </CardActions>
        </Card>
      </div>
    </div>
  );

  return (
    <div>
      <HelpIcon type="button" onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
