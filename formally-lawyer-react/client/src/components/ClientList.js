import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import AssignmentIcon from '@material-ui/icons/Assignment';
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
  Reviewed: {
    color: "green",
  },
  notReviewed: {
    color: "red",
  },
});

class ClientList extends React.Component {
  constructor(props) {
    super(props)
    const { clients } = props;
    
    if(clients != undefined){
        clients.sort(function(a,b) {
          let afull = a.first_name + a.last_name;
          let bfull = b.first_name + b.last_name;
          if (afull > bfull) {
            return 1;
          } else {
            return -1;
          }
        })
    }
    

    const display = clients.slice(0,10)
    this.state = {open: [false, false, false, false, false, false, false, false, false, false], clients: clients, display: display, search: ""}
  }


  handleClick = (i) => {
    console.log(i);
    let temp = this.state.open
    temp[i] = !temp[i]
    this.setState({ open: temp });
  };

  handleChange = name => (event) => {

    let results = []
    for (let i = 0; i < this.state.clients.length; i++) {
      let name = this.state.clients[i].first_name + " " + this.state.clients[i].last_name;
      let low = name.toLowerCase();
      let lowInput = (event.target.value).toLowerCase();
      if (low.startsWith(lowInput)) {
        results.push(this.state.clients[i])
        if (results.length == 10) {
          break;
        }
      }
    }
    this.setState({ [name]: event.target.value,
                    display: results
    });
  };


  render () {
    const { classes } = this.props;
    const { display } = this.state;

    return (
      <div>
        <Paper className={classes.root} elevation={1}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              value={this.state.search}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onChange={this.handleChange('search')}
            />
          </div>
          <List
            component="nav"
            className={classes.root}
          >
            {display.map((c, i) => (<div id={i}><ListItem button >
              <NavLink to={{
                pathname:"/ClientPage/"+c.first_name+"-"+c.last_name,
                aboutProps:{client:c}}}> <AssignmentIcon className={classes.assignmentIcon}/></NavLink>
              <ListItemText inset primary={c.first_name + " " + c.last_name} onClick={() => { this.handleClick(i) }} />
              {this.state.open[i] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.open[i]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {(c.forms).map((f) => (<ListItem button className={classes.nested}>
                  {f.reviewed === 0 ? <FiberManualRecord className={classes.notReviewed}/> : <FiberManualRecord className={classes.Reviewed}/> }
                  <NavLink to={{
                    pathname:"/Document/"+f.id,
                    aboutProps:{client:c}}}> {f.full_name}</NavLink>
                </ListItem>))}
              </List>
            </Collapse></div>))}

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
