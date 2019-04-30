import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Avatar from '@material-ui/core/Avatar';
import ClientPage from './ClientPage';
import { NavLink } from 'react-router-dom';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
    assignmentIcon:{
        color: "grey" 
    },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
});

class ClientList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {open: [false, false, false]}
  }


  handleClick = (i) => {
    let temp = this.state.open
    temp[i] = !temp[i]
    this.setState({ open: temp });
    console.log(this.state.open);
  };

//    routeToClient = (name) => {
//         <Route path='/ClientPage' render={(props) => <ClientPage {...props} isAuthed={true} />} />
//     };

  render () {
    const { classes } = this.props;
    console.log(this.state.open);
    return (
      <div>
        <Paper className={classes.root} elevation={1}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>
          <List
            component="nav"
            className={classes.root}
          >
            <ListItem button >
             <NavLink to="/ClientPage/Gokul-Ajith"> <AssignmentIcon className={classes.assignmentIcon}/></NavLink>
              <ListItemText inset primary="Gokul Ajith" onClick={() => { this.handleClick(0) }} />
              {this.state.open[0] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.open[0]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                 <NavLink to="/Document/test"> <ListItemText inset primary="Application for Asylum and for Withholding of Removal - I-589" /></NavLink>
                </ListItem>
                <ListItem button className={classes.nested}>
                  <ListItemText inset primary="Application for Employment Authorization  - I-765" />
                </ListItem>
              </List>
            </Collapse>
            <ListItem button >
               <NavLink to="/ClientPage/Michael-Bar"> <AssignmentIcon className={classes.assignmentIcon}/></NavLink>
              <ListItemText inset primary="Michael Bar" onClick={() => { this.handleClick(1) }} />
              {this.state.open[1] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.open[1]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemText inset primary="Application for Asylum and for Withholding of Removal - I-589" />
                </ListItem>
                <ListItem button className={classes.nested}>
                  <ListItemText inset primary="Application for Employment Authorization  - I-765" />
                </ListItem>
              </List>
            </Collapse>
            <ListItem button >
                <NavLink to="/ClientPage/Benjamin-Deckey"> <AssignmentIcon className={classes.assignmentIcon}/></NavLink>
              <ListItemText inset primary="Benjamin Deckey" onClick={() => { this.handleClick(2) }} />
              {this.state.open[2] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.open[2]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemText inset primary="Application for Asylum and for Withholding of Removal - I-589" />
                </ListItem>
                <ListItem button className={classes.nested}>
                  <ListItemText inset primary="Application for Employment Authorization  - I-765" />
                </ListItem>
              </List>
            </Collapse>
          </List>
        </Paper>
      </div>
    );
    }

}

ClientList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClientList);
