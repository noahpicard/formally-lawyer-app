import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import LawyerCard from './lawyerCard';
import CardSelector from './CardSelector';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Redirect } from 'react-router-dom'


const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "row"
  },
    bigPaper:{
        marginTop: theme.spacing.unit * 6,
        paddingTop: theme.spacing.unit * 4,
        paddingBottom: theme.spacing.unit * 4,
        backgroundColor: "lightgrey",
        height: "auto",
        width: "900px",
        position: "relative",
        left: "20%"
    },
    smallPaper:{
        
        backgroundColor: "white",
        height: "auto",
        width: "700px",
        position: "relative",
        top: "5%",
        left: "10%"
    },
    clientname:{
        position: "relative",
        top: theme.spacing.unit * 2,
        textAlign: "center",
        fontSize: "40px",
        marginBottom: theme.spacing.unit * 3
    },
    divider:{
        color: "lightgrey",
        width: "90%"
    },
     dividerTitle:{
        textAlign: "center"
    },
    detailsList:{
        listStyle: "none",
        marginBottom: "25px"
    },
    formsTable:{
        position: "relative",
        left:"12%",
        width:"70%",
        height:"auto"
    },
    tableTitle:{
        textAlign: "center",
        color:"#01BABB",
        fontSize:"16px"
    },
    
});


    function getColor(status){
        if(status === 0){
            return "red";
        }
        else{
            return "green";
        }
    }

class ClientPage extends React.Component {

  render() {
    const { classes } = this.props;
    if (this.props.location.aboutProps === undefined) {
      return <Redirect to="/" />;
    }
    const { client } = this.props.location.aboutProps;
    return (
    <Paper className={classes.bigPaper} elevation={1}>
      
      <Paper className={classes.smallPaper} elevation={2}>
        
      <Typography className={classes.clientname} component="h1" variant="h5">
          {client.first_name + " " + client.last_name}
        </Typography>
      
      <hr className={classes.divider} /> 
        
        <Typography className={classes.dividerTitle} component="h2" variant="h5">
          Personal Information
        </Typography>
        
        <ul>
            
        <li className={classes.detailsList}><span style={{color:"#01BABB"}}>DoB: </span> {client.dob}</li>
        <li className={classes.detailsList}><span style={{color:"#01BABB"}}>Immigration Status: </span> {client.immigration_status}</li>
        <li className={classes.detailsList}><span style={{color:"#01BABB"}}>Address: </span> {client.address}</li>
        <li className={classes.detailsList}><span style={{color:"#01BABB"}}>Alien Registration Number: </span> {client.arn}</li>
        <li className={classes.detailsList}><span style={{color:"#01BABB"}}>Nationality: </span> {client.nationality}</li>
        </ul>
        
        <hr className={classes.divider} /> 
        
        <Typography className={classes.dividerTitle} component="h2" variant="h5">
          Forms
        </Typography>
        
        <Table className={classes.formsTable}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableTitle}>Name</TableCell>
                <TableCell className={classes.tableTitle} align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(client.forms).map(f => (
                <TableRow key={f.id}>
                  <TableCell component="th" scope="row">
                    {f.full_name}
                  </TableCell>
                  <TableCell style={{color:getColor(f.reviewed)}} align="right">{f.reviewed === 0 ? "Not Reviewed" : "Reviewed"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
      </Table>
        
      </Paper>
      </Paper>
    );
  }
}

ClientPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClientPage);