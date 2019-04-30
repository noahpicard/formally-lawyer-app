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
import TextField from '@material-ui/core/TextField';
import CommentIcon from '@material-ui/icons/Comment';


const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "row"
  },
    bigPaper:{
        marginTop: theme.spacing.unit * 6,
        paddingBottom: theme.spacing.unit * 2,
        backgroundColor: "lightgrey",
        height: "800px",
        width: "900px",
        position: "relative",
        left: "20%"
    },
    smallPaper:{
        marginTop: theme.spacing.unit * 3,
        backgroundColor: "white",
        height: "700px",
        width: "700px",
        position: "relative",
        top: "5%",
        left: "10%"
    },
    questionName:{
        width: "300px",  
        marginRight: "0px",
        marginTop:"0px",
        position: "relative",
        left: "5%",
        top: "30%",
        color:"#01BABB",
        fontSize:"16px"
    },
    questionResponse:{
        marginRight: "0px",
        marginTop:"0px",
        position: "relative",
        left: "5%",
        top: "20%",
        fontSize:"16px"
    },
    questionDiv:{
        display: "flex",
        flexDirection: "row",
        height: "50px",
    },
    commentIcon:{
        position: "relative",
        height: "30px",
        width: "30px",
        left: "20%",
        top: "25%",
    }
});

function parseForms(dict1, dict2, {classes}){

    let finalResult = []
    
    for(let i = 1; i <= Object.keys(dict1).length; i++){
    
        let typeform = dict1[i]
        let response = dict2[i]
        
        let questionDiv = <Typography>{typeform[0]}</Typography>;
        
        if(typeform[1] == "String"){
            finalResult.push(<div className = {classes.questionDiv}><Typography className={classes.questionName}>{typeform[0]}</Typography><TextField className = {classes.questionResponse} defaultValue={response} InputProps={{readOnly: true, }}/><CommentIcon className={classes.commentIcon}/></div>);
        }else{
            
        }
    }
    return finalResult;
}

class DocReview extends React.Component {

   constructor(props) {
        super(props);
       
    }

  render() {
    const { classes } = this.props;
    let dict1 = {1: ["What is your first name?", "String"], 2: ["What is your last name?", "String"], 3: ["What is your gender?", "Options", "Male", "Female"]};
    let dict2 = {1: "Gokul", 2: "Ajith", 3: "unknown"};
      
    let typeformEAD = {1: ["What is your First Name?", "String"], 2: ["What is your Middle Name?", "String"], 3: ["What is your Last Name?", "String"], 4: ["Do you have any Other Names?", "Option", ["True", "False"]], 5: ["What is your Other First Name?", "String"], 6: ["What is your other Last name?", "String"], 7: ["What is your Birthdate?", "String"], 8: ["What is your Gender?", "Option", ["Male", "Female", "Other"]], 9: ["What is your Marital Status?", "Option", ["Single", "Married", "Widowed", "Other"]], 10: ["What is your Birth City?", "String"], 11: ["What is your Birth State?", "String"], 12: ["What is your Birth Country?", "String"], 13: ["What is your Birth City?", "String"], 14: ["What is the Reason for your Application?", "String"], 15: ["What is your Phone Number?", "String"], 16: ["What is your Email Address?", "String"], 17: ["What is your Mail Address?", "String"]}
    
    let formQuestions = parseForms(dict1, dict2, {classes});
      
    let renderedOutput = formQuestions.map(item => <div> {item} <hr /></div>);
    
    return (
    <Paper className={classes.bigPaper} elevation={1}>
      <Paper className={classes.smallPaper} elevation={2}>
        {renderedOutput}
        </Paper>
      </Paper>
    );
  }
}

DocReview.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DocReview);