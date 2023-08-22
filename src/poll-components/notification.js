import Snackbar from "@material-ui/core/Snackbar";
// import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";

const styles = {
  styleSuccess: "snackbarSuccess",
  styleError: "snackbarError",
  styleInfo: "snackbarInfo",
};

const styleClass = getStyle();

function getStyle(type) {
  var style = "";
  switch (type) {
    case "success":
      style = styles.styleSuccess;
      break;

    case "error":
      style = styles.styleError;
      break;

    case "info":
      style = styles.styleInfo;
      break;

    default:
      style = styles.styleInfo;
      break;
  }

  return style;
}

function Notification(props) {
  return (
    <Snackbar
      open={props.switcher}
      onClose={props.close}
      autoHideDuration={6000}
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      action={[
        <IconButton arial-label="Close" color="inherit" onClick={props.close}>
          x
        </IconButton>,
      ]}
      ContentProps={{
        "aria-describedby": "message-id",
        className: "snackbarError",
      }}
      // sx={{ color: "white", backgroundColor: "red" }}
      message={
        <span id="message-id">
          <div>{props.message}</div>
        </span>
      }
    >
      {/* <Alert onClose={props.close} severity={props.nottype}>
        {props.message}
      </Alert> */}
    </Snackbar>
  );
}
export default Notification;
