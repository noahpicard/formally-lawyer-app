import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux'

const styles = theme => ({
  root: {
  },
  card: {
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 10,
    marginRight: theme.spacing.unit * 2,
    backgroundColor: "#01BABB",
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 45,
    marginTop: theme.spacing.unit * 4,
    marginLeft: theme.spacing.unit * 16,
  },
  pos: {
    marginBottom: 12,
  },
  topText: {
    marginLeft: theme.spacing.unit * 2,
    fontSize: "x-large"
  },
  bottomText: {
    marginLeft: theme.spacing.unit * 2,
    fontSize: "large"
  },
  button: {
    padding: 0,
    marginLeft: theme.spacing.unit * 2,
  },
  content: {
    paddingBottom: 0
  }
});

function LawyerCard(props) {

  const { classes, user } = props;

  return (
   <div className={classes.root}>
     <Typography className={classes.title} color="primary" >
       Welcome {user.first_name}
     </Typography>
     <Card className={classes.card}>
       <CardContent className={classes.content}>
         <Typography className={classes.topText} color="secondary">
           {user.first_name} {user.last_name}
         </Typography>
         <Typography className={classes.bottomText} color="secondary">
           {user.email}
         </Typography>
       </CardContent>
       <CardActions>
         <Button size="small" color="secondary" className={classes.button}>(Edit)</Button>
       </CardActions>
       <Divider variant="middle" />
       <CardContent className={classes.content}>
         <Typography className={classes.topText} color="secondary">
           Your Networks
         </Typography>
         <Typography className={classes.bottomText} color="secondary">
           Coalition of Princes
         </Typography>
         <CardActions>
           <Button size="small" color="secondary" className={classes.button}>(Add new Connection)</Button>
         </CardActions>
       </CardContent>
     </Card>
   </div>
  );
}

LawyerCard.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(LawyerCard);
