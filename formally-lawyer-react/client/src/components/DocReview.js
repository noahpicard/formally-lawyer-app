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
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ReactDOM from 'react-dom'; 
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "row"
  },
    bigPaper:{
        marginTop: theme.spacing.unit * 6,
        paddingTop: theme.spacing.unit * 15,
        paddingBottom: theme.spacing.unit * 2,
        backgroundColor: "lightgrey",
        height: "auto",
        width: "1000px",
        position: "relative",
        left: "15%",
    },
    smallPaper:{
        backgroundColor: "white",
        height: "auto",
        width: "900px",
        position: "relative",
        top: "50%",
        left: "5%",
        marginTop: "50px"
    },
    questionName:{
        width: "300px",  
        marginRight: "5px",
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
        fontSize:"16px",
        width:"200px",
        marginLeft: "5px",
    },
    questionDiv:{
        display: "flex",
        flexDirection: "row",
        height: "50px",
        width:"65%",
        marginRight:"0px",
    },
    commentIcon:{
        position: "relative",
        height: "auto",
        width: "auto",
        left: "20%",
        top: "25%",
    },
    commentBar:{
        position: "relative",
        height: "auto",
        width: "200px",
        left: "0%",
        top: "5%",
        margin: "0px",
        fontSize: "8px",
        paddingTop:"0px",
    },
    commentText:{
        fontSize: "13px",
    },
    checkIcon:{
        color: "green",
        position:"absolute",
        top: "5px",
        left:"250px",
        height: "40px",
        width: "40px",
    },
    cancelIcon:{
        color: "red",
        position:"absolute",
        top: "45px",
        left:"250px",
        height: "40px",
        width: "40px",
    },
    submitComment:{
        width: "100%",
    }
});


class DocReview extends React.Component {

   constructor(props) {
        super(props);
       this.state = {clientName: "", commentDict: {}, commenting: new Set()}
    }
    
    comment(i){
        
        const { classes } = this.props;
        let div1 = document.getElementById("q" + i);
        let commentBar = <div className = {classes.submitComment}><TextField InputProps={{
            classes: {
              input: classes.commentText,
            },}} label="Comment" className = {classes.commentBar} multiline rowsMax="4"/><CheckIcon className = {classes.checkIcon} onClick={() => this.submitComment(i)} /><CancelIcon onClick={() => this.cancelComment(i)} className = {classes.cancelIcon}/></div>;
        document.getElementById("commentDiv" + i).removeChild(document.getElementById("c" + i))
        this.state.commenting.add(i);
        div1.style.height = "100px";
        document.getElementById("q" + i).style.marginRight = "0px";
        document.getElementById("commentDiv" + i).style.position = "relative";
        document.getElementById("commentDiv" + i).style.top = "5%";
        document.getElementById("commentDiv" + i).style.left = "20%";
        ReactDOM.render(commentBar, document.getElementById("commentDiv" + i));    
    }
    
//    cancelComment(i){
//        const { classes } = this.props;
//        let div1 = document.getElementById("q" + i);
//        let commentId = "c" + i;
//        document.getElementById("commentDiv" + i).innerHTML = '';
//        let commentButton = <CommentIcon id = {commentId} onClick={() => this.comment(i)} />;
//        ReactDOM.render(commentButton, document.getElementById("commentDiv" + i));    
//    }
    
    parseForms(dict1, dict2, {classes}){
        
        let finalResult = []

        for(let i = 1; i <= Object.keys(dict1).length; i++){

            let typeform = dict1[i]
            let response = dict2[i]
            
            let divId = "q" + i;
            let commentId = "c" + i;
            let commentDiv = "commentDiv" + i;

            let questionDiv = <Typography>{typeform[0]}</Typography>;

            if(typeform[1] == "String" || typeform[1] == "Integer" || typeform[1] == "Date"){
                finalResult.push(<div id = {divId} className = {classes.questionDiv}><Typography className={classes.questionName}>{typeform[0]}</Typography><TextField className = {classes.questionResponse} defaultValue={response} InputProps={{readOnly: true, }}/><div id = {commentDiv} className={classes.commentIcon}> <CommentIcon id = {commentId} onClick={() => this.comment(i)} /></div></div>);
            }else if(typeform[1] == "Option"){

               const listItems = typeform[2].map((label) =>
                <MenuItem value={label}>{label}</MenuItem>
                );

                 finalResult.push(<div id = {divId} className = {classes.questionDiv}><Typography className={classes.questionName}>{typeform[0]}</Typography><FormControl className = {classes.questionResponse}>
              <Select value={response}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>

                {listItems}

              </Select>
            </FormControl><div id = {commentDiv} className={classes.commentIcon}> <CommentIcon id = {commentId} onClick={() => this.comment(i)} /></div></div>
                );
            }
        }
        return finalResult;
    }

  render() {
    const { classes } = this.props;
    let dict1 = {1: ["What is your first name?", "String"], 2: ["What is your last name?", "String"], 3: ["What is your gender?", "Options", "Male", "Female"]};
    //let dict2 = {1: "Gokul", 2: "Ajith", 3: "unknown"};
      
    let dict2 = {1: "Gokul", 2: "None", 3: "Ajith", 4: "True", 5: "Gokul", 6: "None", 7: "Ajith", 8: "Male", 9: "Widowed", 10: "None", 11: "Ajith", 12: "Ajith",13: "Gokul", 14: "None", 15: "Ajith", 16: "Ajith",17: "Gokul"};
      
    let typeformEAD = {1: ["What is your First Name?", "String"], 2: ["What is your Middle Name?", "String"], 3: ["What is your Last Name?", "String"], 4: ["Do you have any Other Names?", "Option", ["True", "False"]], 5: ["What is your Other First Name?", "String"], 6: ["What is your other Last name?", "String"], 7: ["What is your Birthdate?", "String"], 8: ["What is your Gender?", "Option", ["Male", "Female", "Other"]], 9: ["What is your Marital Status?", "Option", ["Single", "Married", "Widowed", "Other"]], 10: ["What is your Birth City?", "String"], 11: ["What is your Birth State?", "String"], 12: ["What is your Birth Country?", "String"], 13: ["What is your Birth City?", "String"], 14: ["What is the Reason for your Application?", "String"], 15: ["What is your Phone Number?", "String"], 16: ["What is your Email Address?", "String"], 17: ["What is your Mail Address?", "String"]}
    
    let formQuestions = this.parseForms(typeformEAD, dict2, {classes});
      
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