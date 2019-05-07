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
import { Redirect } from 'react-router-dom'
import { storeUser } from '../actions/storeUser'
import { redirect } from '../actions/redirect'
import { connect } from 'react-redux'

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "row"
  },
    bigPaper:{
        marginTop: theme.spacing.unit * 6,
        paddingTop: 0,
        paddingBottom: theme.spacing.unit * 10,
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
        marginTop:"10px",
        position: "relative",
        left: "5%",
        top: "25%",
        color:"#01BABB",
        fontSize:"16px"
    },
    questionResponse:{
        marginRight: "0px",
        marginTop:"10px",
        position: "relative",
        left: "5%",
        top: "25%",
        fontSize:"16px",
        width:"200px",
        marginLeft: "5px",
    },
    questionDiv:{
        display: "flex",
        flexDirection: "row",
        height: "auto",
        minHeight: "50px",
        width:"65%",
        marginRight:"0px",
    },
    commentIcon:{
        position: "relative",
        height: "auto",
        width: "auto",
        left: "20%",
        top: "25%",
        marginTop:"15px",
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
        top: "-10px",
        left:"225px",
        height: "40px",
        width: "40px",
    },
    cancelIcon:{
        color: "red",
        position:"absolute",
        top: "30px",
        left:"225px",
        height: "40px",
        width: "40px",
    },
    submitComment:{
        width: "100%",
    },
    uncommented:{
        color: "black"
    },
    commented:{
        color: "lightgreen"
    },
    commenting:{
        color:"gold"
    },
    saveProgress:{
        backgroundColor: "#01BABB",  
        color: "white",
        width: "400px",
        position: "relative",
        left: "30%",
        marginTop: "10px",
        marginBottom: "-25px",
        '&:hover': {
          backgroundColor: '#0069d9',
        },
    },
    title:{
        color: "#01BABB",
        textAlign: "center",
        paddingTop:"5px",
    },
    commentField:{
        position:"relative",
        width: "200px",
        height: "auto",
        left:"15%",
        marginTop: "8px",
        marginBottom: "5px"
    },
    questionDiv1:{
        display: "flex",
        flexDirection: "row",
        height: "auto",
        minHeight: "50px",
        width:"100%",
        marginRight:"0px",
    },
});


class DocReview extends React.Component {

   constructor(props) {
        super(props);
        let url = window.location.href
        let id = url.split("/")

       this.state = {clientName: "", commented: {}, commenting: {}, info: {}, docId: id[id.length-1]}
    }
    
    componentDidMount() {
        this.test();
  }
    
    submitReview(done) {
        let { user } = this.props.userReducer;
      let { client } = this.props.location.aboutProps;
        fetch('/api/forms/save', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                },
            body: JSON.stringify({
            id: this.state.docId,
            comments: this.state.commented,
            reviewed: done,
          })
        });
        
        
        if(done == 1){
            this.state.info['comments'] = JSON.stringify(this.state.commented);
            for (let key in client.forms) {
              if ( client.forms[key].id === parseInt(this.state.docId) ) {
                client.forms[key].reviewed = 1;
              }
            }
            user.clients[user.clients.indexOf(client)] = client;
            console.log(user.clients[user.clients.indexOf(client)]);
            this.props.storeUser(user);
        }
    };
    
   test = async e => {
        console.log("SENDING")
        try {
        const response = await fetch('/api/forms/display', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: this.state.docId}),
        });
        const body = await response.clone().json();
        this.setState({
                info: body
            });
            
        }catch(err){
            console.log("error");
            return; 
        }

    };
    
    comment(i, comments){
        
        const { classes } = this.props;
        let div1 = document.getElementById("q" + i);
        let divId = "submitContent" + i;
        let currentComment = "";
        
        if(i in this.state.commenting){
            currentComment = this.state.commenting[i];
        }else if(i in this.state.commented){
            currentComment = this.state.commented[i];
        }
        
        let commentBar = <div className = {classes.submitComment}><TextField id = {divId} InputProps={{
            classes: {
              input: classes.commentText,
            },}} label="Comment" defaultValue = {currentComment} className = {classes.commentBar} multiline rowsMax="3"/><CheckIcon className = {classes.checkIcon} onClick={() => this.submitComment(i)} /><CancelIcon onClick={() => this.cancelComment(i)} className = {classes.cancelIcon}/></div>;
        
        let h = div1.clientHeight * 2
        h = h.toString() + "px";
        div1.style.height = h;
        document.getElementById("q" + i).style.marginRight = "0px";
        document.getElementById("commentDiv" + i).style.position = "relative";
        document.getElementById("commentDiv" + i).style.top = "5%";
        document.getElementById("commentDiv" + i).style.left = "20%";
        ReactDOM.render(commentBar, document.getElementById("commentDiv" + i));  
    }
    
    submitComment(i){
        const { classes } = this.props;
        let div1 = document.getElementById("q" + i);
        let divId = "submitContent" + i;
        let comment = document.getElementById(divId).value;
        
        let commentId = "c" + i;
        let commentButton;
        
        if(comment == ""){
            commentButton = <CommentIcon id = {commentId} onClick={() => this.comment(i)} />;
            delete this.state.commented[i];
        }else{
        this.state.commented[i] = comment;
        delete this.state.commenting[i];
        commentButton = <CommentIcon className = {classes.commented} id = {commentId} onClick={() => this.comment(i)} />;
        }
        
        document.getElementById("commentDiv" + i).style.top = "30%";
        ReactDOM.render(commentButton, document.getElementById("commentDiv" + i));  
        div1.style.height = "auto";
        
    }
    
    cancelComment(i){
        const { classes } = this.props;
        let div1 = document.getElementById("q" + i);
        let divId = "submitContent" + i;
        let commentId = "c" + i;
        let comment = document.getElementById(divId).value;
        let commentButton;
        
        if(comment == ""){
            commentButton = <CommentIcon id = {commentId} onClick={() => this.comment(i)} />;
            delete this.state.commenting[i];
        }else{
            this.state.commenting[i] = comment;
            delete this.state.commented[i];

            commentButton = <CommentIcon className = {classes.commenting} id = {commentId} onClick={() => this.comment(i)} />;
        }
        document.getElementById("commentDiv" + i).style.top = "30%";
        ReactDOM.render(commentButton, document.getElementById("commentDiv" + i));   
        div1.style.height = "auto";
    }

    titleCase(str) {
       let splitStr = str.toLowerCase().split(' ');
       for (var i = 0; i < splitStr.length; i++) {
           // You do not need to check if i is larger than splitStr length, as your for does that for you
           // Assign it back to the array
           splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
       }
       // Directly return the joined string
       return splitStr.join(' '); 
    }

    
    parseFormsWithCommenting(dict1, dict2, comments, {classes}){
        
        let finalResult = []

        for(let i = 0; i < Object.keys(dict1).length; i++){

            let typeform = dict1[i]
            let response = dict2[i]
            
            let divId = "q" + i;
            let commentId = "c" + i;
            let commentDiv = "commentDiv" + i;

            let commentClass = classes.uncommented;
            
            if(i in comments){
                commentClass = classes.commented;
            }

            if(typeform[1] == "String"){
                
                let question = this.titleCase(typeform[0]);
                
                
                finalResult.push(<div id = {divId} className = {classes.questionDiv}><Typography className={classes.questionName}>{question}</Typography><TextField className = {classes.questionResponse} defaultValue={response} InputProps={{readOnly: true, }}/><div id = {commentDiv} className={classes.commentIcon}> <CommentIcon className = {commentClass} id = {commentId} onClick={() => this.comment(i, comments)} /></div></div>);
            }else if(typeform[1] == "options"){

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
            </FormControl><div id = {commentDiv} className={classes.commentIcon}> <CommentIcon className = {commentClass} id = {commentId} onClick={() => this.comment(i, comments)} /></div></div>
                );
            }
        }
        return finalResult;
    }
    
      parseFormsWithoutCommenting(dict1, dict2, comments, {classes}){
        
        let finalResult = []

        for(let i = 0; i < Object.keys(dict1).length; i++){

            let typeform = dict1[i]
            let response = dict2[i]
            
            let divId = "q" + i;
            let commentId = "c" + i;
            let commentDiv = "commentDiv" + i;

            let commentClass = classes.uncommented;
            
            if(i in comments){
                commentClass = classes.commented;
            }
            
            let element = ""
                
                if(i in comments){
                    element = <TextField
          defaultValue={comments[i]}
            multiline
          rowsMax="3"
          className={classes.commentField}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
                }
            

            if(typeform[1] == "String"){
                
                let question = this.titleCase(typeform[0]);
                
                finalResult.push(<div id = {divId} className = {classes.questionDiv1}><Typography className={classes.questionName}>{question}</Typography><TextField className = {classes.questionResponse} defaultValue={response} InputProps={{readOnly: true, }}/>{element}</div>);
            }else if(typeform[1] == "options"){

               const listItems = typeform[2].map((label) =>
                <MenuItem value={label}>{label}</MenuItem>
                );

                 finalResult.push(<div id = {divId} className = {classes.questionDiv1}><Typography className={classes.questionName}>{typeform[0]}</Typography><FormControl className = {classes.questionResponse}>
              <Select value={response}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>

                {listItems}

              </Select>
            </FormControl> {element}</div>
                );
            }
        }
        return finalResult;
    }
          
reviewAgain(){
        
    let { user } = this.props.userReducer;
    let { client } = this.props.location.aboutProps;
    let reviewed = 0;
      
      for(let key in client.forms){
          if (this.state.docId == client.forms[key]["id"]){
              client.forms[key]["reviewed"] = 0;
          }
      }
    
        user.clients[user.clients.indexOf(client)] = client;
        console.log(user.clients[user.clients.indexOf(client)]);
        this.props.storeUser(user);
}

  render() {
    const { classes } = this.props;
    if (this.props.location.aboutProps === undefined) {
      return <Redirect to="/" />;
    }
    const { client } = this.props.location.aboutProps;
      
      console.log(client);
      
      let reviewed = 0;
      
      for(let key in client.forms){
          if (this.state.docId == client.forms[key]["id"]){
              reviewed = client.forms[key]["reviewed"];
          }
      }
      
      
    
        let renderedOutput;
        let formQuestions;
        let topButton;
        let bottomButton;
      
      if(Object.keys(this.state.info).length != 0){
      
      let comments = JSON.parse(this.state.info['comments']);
          
        this.state.commented = comments;
      let typeform = JSON.parse(this.state.info['question_type']);
      let responses = JSON.parse(this.state.info['question_answer']);
        
      
      for(let key in responses){
          let temp = responses[key];
          responses[key] = temp[1];
      }
    
        if(reviewed == 0){
            formQuestions = this.parseFormsWithCommenting(typeform, responses, comments, {classes});
            topButton = <Button variant="outlined" onClick = {() => this.submitReview(0)} className={classes.saveProgress}>Save Progress</Button>;
            bottomButton = <Button variant="outlined" onClick = {() => this.submitReview(1)} color="white" className={classes.saveProgress}>Submit Review</Button>;
        }else{
            formQuestions = this.parseFormsWithoutCommenting(typeform, responses, comments, {classes});
            topButton = <Button variant="outlined" onClick = {() => this.reviewAgain()} color="white" className={classes.saveProgress}>Review Again</Button>;
            bottomButton = <Button variant="outlined" onClick = {() => this.reviewAgain()} color="white" className={classes.saveProgress}>Review Again</Button>;
        }
          
          renderedOutput = formQuestions.map(item => <div> {item} <hr /></div>);
      }
                                             
    
    
    return (
                                           
    <Paper className={classes.bigPaper} elevation={1}>
                                           
        <h1 className={classes.title}>Document Review - {this.state.info.full_name}</h1>
        
        <h2 className={classes.title}>Client - {client.first_name + " " + client.last_name}</h2>
                                             
        {topButton}
        

      <Paper className={classes.smallPaper} elevation={2}>
        {renderedOutput}
        </Paper>
                                           
        
        {bottomButton}
      </Paper>
    );
  }
}

DocReview.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  redirect: () => dispatch(redirect()),
  storeUser: string => dispatch(storeUser(string))
})


const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DocReview));