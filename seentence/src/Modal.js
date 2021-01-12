import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import HelpIcon from "@material-ui/icons/Help";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import EmailIcon from "@material-ui/icons/Email";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
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

export default function SimpleModal() {
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
      <div className="modalContainer">
        <Card className={cardClasses.root}>
          <a href="https://superchange.fun/" target="_blank" rel="noreferrer">
            <CardMedia
              className={cardClasses.media}
              image="https://i.imgur.com/QHLb2B4.jpg"
              title="William Soukkachaang"
            />
          </a>

          <CardContent>
            <Typography gutterBottom variant="h4" component="h4">
              About Developer:
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
              William Soukkachang
            </Typography>
          </CardContent>
          <CardActions>
            <div class="iconContainer">
              <a
                href="https://www.linkedin.com/in/wsoukkachang/"
                target="_blank"
                rel="noreferrer"
              >
                <div id="icon-2">
                  <LinkedInIcon
                    color="action"
                    className="flex-icon"
                    fontSize="large"
                  ></LinkedInIcon>
                </div>
              </a>
              <a
                href="https://github.com/Wsoukkachang/"
                target="_blank"
                rel="noreferrer"
              >
                <div id="icon-3">
                  <GitHubIcon
                    color="action"
                    className="flex-icon"
                    fontSize="large"
                  ></GitHubIcon>
                </div>
              </a>
              <a
                href="mailto: Wsoukkachang@yahoo.com"
                target="_blank"
                rel="noreferrer"
              >
                <div id="icon-4">
                  <EmailIcon
                    color="action"
                    className="flex-icon"
                    fontSize="large"
                  ></EmailIcon>
                </div>
              </a>
            </div>
          </CardActions>
        </Card>
      </div>
    </div>
  );

  return (
    <div>
      <EmojiPeopleIcon type="button" onClick={handleOpen} />
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
